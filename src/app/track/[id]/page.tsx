"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Basic Types
interface TimelineEvent {
  status: string;
  timestamp: string;
  _id: string;
}

interface ShipmentData {
  trackingNumber: string;
  currentStatus: string;
  timeline: TimelineEvent[];
  bookingId: {
    receiver: { name: string };
    package: { type: string; weight: number };
  };
}

export default function TrackingPage() {
  const params = useParams();
  const router = useRouter();
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const trackingId = params.id as string;

  useEffect(() => {
    const fetchTracking = async () => {
      try {
       const res = await fetch(`${API_URL}/api/track/${trackingId}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Package not found");
        } else {
          setShipment(data);
        }
      } catch (err) {
        setError("Failed to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [trackingId]);

  if (loading) return <div className="p-10 text-center text-xl">Loading tracking details...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.push("/")} className="text-blue-600 mb-6 font-medium">
          &larr; Back Home
        </button>

        {error ? (
          <div className="bg-red-100 text-red-700 p-6 rounded-lg text-center font-semibold">
            {error}
          </div>
        ) : shipment ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8 border-b pb-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Tracking Number</p>
                <h1 className="text-3xl font-bold text-gray-900">{shipment.trackingNumber}</h1>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Current Status</p>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-bold">
                  {shipment.currentStatus}
                </span>
              </div>
            </div>

            {/* Package Details */}
            <div className="grid grid-cols-2 gap-4 mb-10 bg-gray-50 p-6 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Receiver</p>
                <p className="font-semibold">{shipment.bookingId.receiver.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Package</p>
                <p className="font-semibold">{shipment.bookingId.package.weight} kg - {shipment.bookingId.package.type}</p>
              </div>
            </div>

            {/* BONUS CHALLENGE: The Timeline */}
            <h3 className="text-xl font-bold text-gray-800 mb-6">Shipment History</h3>
            <div className="space-y-6">
              {shipment.timeline.map((event, index) => (
                <div key={event._id} className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-4 h-4 bg-blue-600 rounded-full mt-1"></div>
                    {/* Don't show the line on the last item */}
                    {index !== shipment.timeline.length - 1 && (
                      <div className="w-1 h-12 bg-blue-200 mt-1"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{event.status}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}