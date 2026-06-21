"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Define the shape of our data
interface Booking {
  _id: string;
  customerId: { name: string; email: string };
  receiver: { name: string };
  package: { weight: number };
  status: string;
  trackingNumber?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  // States for updating shipment
  const [trackingUpdate, setTrackingUpdate] = useState("");
  const [transitStatus, setTransitStatus] = useState("In Transit");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== "admin") {
      alert("Access Denied. Admins only.");
      router.push("/dashboard");
      return;
    }

    fetchAdminBookings(token);
  }, [router]);

  const fetchAdminBookings = async (token: string) => {
    try {
     const res = await fetch(`${API_URL}/api/bookings/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch all bookings");
    }
  };

  const handleBookingAction = async (bookingId: string, newStatus: string) => {
    const token = localStorage.getItem("token");
    try {
     const res = await fetch(`${API_URL}/api/bookings/admin/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchAdminBookings(token as string); // Refresh table immediately
      } else {
        alert("Failed to update booking status.");
      }
    } catch (error) {
      alert("Server error.");
    }
  };

  const handleUpdateShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
     const res = await fetch(`${API_URL}/api/track/admin/${trackingUpdate}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: transitStatus }),
      });

      if (res.ok) {
        alert("Shipment timeline updated successfully!");
        setTrackingUpdate("");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update shipment.");
      }
    } catch (error) {
      alert("Server error.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Reusable input class updated for light mode & mobile
  const inputClass = "p-3 sm:p-3.5 bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-base sm:text-sm";

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
            <span className="text-white font-bold text-lg leading-none tracking-tighter">S</span>
          </div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight hidden sm:block">SwiftCourier</h1>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] sm:text-xs font-bold rounded uppercase tracking-wider border border-blue-100">
              Admin
            </span>
          </div>
        </div>
        <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
          Log out
        </button>
      </nav>

      <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6 sm:space-y-8 relative z-10">
        
        {/* TOP SECTION: Update Physical Shipment */}
        <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
          <div className="mb-5 sm:mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Update Active Shipment</h2>
            <p className="text-sm text-gray-500 mt-1">Push new transit status updates to a tracking number.</p>
          </div>
          
          <form onSubmit={handleUpdateShipment} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <input 
              type="text" 
              placeholder="e.g., TRK-123456" 
              required 
              className={`flex-1 ${inputClass} font-mono uppercase`}
              value={trackingUpdate}
              onChange={(e) => setTrackingUpdate(e.target.value)}
            />
            <select 
              className={`w-full sm:w-48 cursor-pointer ${inputClass}`}
              value={transitStatus}
              onChange={(e) => setTransitStatus(e.target.value)}
            >
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3.5 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm active:scale-[0.98] shadow-sm">
              Update Timeline
            </button>
          </form>
        </div>

        {/* BOTTOM SECTION: Review All Bookings Table */}
        <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
          <div className="mb-5 sm:mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">All Customer Bookings</h2>
            <p className="text-sm text-gray-500 mt-1">Review and approve pending delivery requests.</p>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-16 px-4">
              <p className="text-sm font-medium text-gray-900">No bookings found</p>
              <p className="text-sm text-gray-500 mt-1">There are currently no customer bookings in the system.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-5 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-5 sm:px-0">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50">
                      <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Customer</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Receiver</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Weight</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider whitespace-nowrap">Tracking No.</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-4 px-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900">{booking.customerId?.name || "Unknown"}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{booking.customerId?.email || "N/A"}</p>
                        </td>
                        <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">{booking.receiver.name}</td>
                        <td className="py-4 px-4 text-sm text-gray-500 whitespace-nowrap">{booking.package.weight} kg</td>
                        
                        <td className="py-4 px-4 whitespace-nowrap">
                          {booking.trackingNumber ? (
                            <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2 py-1.5 rounded-md border border-gray-200">
                              {booking.trackingNumber}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">—</span>
                          )}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                            booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                            booking.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : 
                            'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                          {booking.status === "Pending" ? (
                            <>
                              <button 
                                onClick={() => handleBookingAction(booking._id, "Approved")}
                                className="bg-emerald-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleBookingAction(booking._id, "Rejected")}
                                className="bg-white text-red-600 border border-red-200 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-red-50 transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}