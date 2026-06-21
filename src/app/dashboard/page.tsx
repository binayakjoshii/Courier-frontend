"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Booking {
  _id: string;
  receiver: { name: string };
  package: { weight: number };
  status: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userName, setUserName] = useState("");
  
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [packageType, setPackageType] = useState("");
  const [packageWeight, setPackageWeight] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(userStr);
    setUserName(user.name);
    fetchBookings(token);
  }, [router]);

  const fetchBookings = async (token: string) => {
    try {
     const res = await fetch(`${API_URL}/api/bookings/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings");
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Optional: Add a quick check before sending to backend to ensure it's EXACTLY 10 digits
    if (senderPhone.length !== 10 || receiverPhone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const newBooking = {
      sender: { name: senderName, phone: senderPhone },
      receiver: { name: receiverName, phone: receiverPhone },
      package: { type: packageType, weight: Number(packageWeight) },
    };

    try {
     const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBooking),
      });

      if (res.ok) {
        alert("Booking created successfully!");
        fetchBookings(token as string);
        
        setSenderName(""); setSenderPhone("");
        setReceiverName(""); setReceiverPhone("");
        setPackageType(""); setPackageWeight("");
      } else {
        alert("Failed to create booking.");
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

  // Helper function for strict phone number validation
  const handlePhoneChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    // Replace any non-digit character with an empty string
    const numbersOnly = e.target.value.replace(/\D/g, "");
    // Only update state if it's 10 digits or less
    if (numbersOnly.length <= 10) {
      setter(numbersOnly);
    }
  };

  const inputClass = "w-full p-3 sm:p-3.5 bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-base sm:text-sm";

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
            <span className="text-white font-bold text-lg leading-none tracking-tighter">S</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight hidden sm:block">SwiftCourier</h1>
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <span className="text-sm font-medium text-gray-500">
            Welcome, <span className="text-gray-900">{userName}</span>
          </span>
          <button 
            onClick={handleLogout} 
            className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            Log out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        
        {/* Left Column: Create Booking Form */}
        <div className="lg:col-span-1 bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 h-fit">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">New Booking</h2>
            <p className="text-sm text-gray-500 mt-1">Enter details to create a new shipment.</p>
          </div>

          <form onSubmit={handleCreateBooking} className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sender Details</h3>
              <input type="text" placeholder="Full Name" required className={inputClass} value={senderName} onChange={(e) => setSenderName(e.target.value)} />
              <input 
                type="tel" 
                inputMode="numeric"
                placeholder="Phone Number (10 digits)" 
                required 
                className={inputClass} 
                value={senderPhone} 
                onChange={handlePhoneChange(setSenderPhone)} 
              />
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Receiver Details</h3>
              <input type="text" placeholder="Full Name" required className={inputClass} value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
              <input 
                type="tel" 
                inputMode="numeric"
                placeholder="Phone Number (10 digits)" 
                required 
                className={inputClass} 
                value={receiverPhone} 
                onChange={handlePhoneChange(setReceiverPhone)} 
              />
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Package Details</h3>
              <input type="text" placeholder="Type (e.g. Documents, Electronics)" required className={inputClass} value={packageType} onChange={(e) => setPackageType(e.target.value)} />
              <div className="relative">
                <input type="number" step="0.1" placeholder="Weight" required className={inputClass} value={packageWeight} onChange={(e) => setPackageWeight(e.target.value)} />
                <span className="absolute right-4 top-3 sm:top-3.5 text-sm text-gray-400">kg</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white p-3.5 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4 active:scale-[0.98] shadow-sm">
              Submit Booking
            </button>
          </form>
        </div>

        {/* Right Column: Bookings Table */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
          <div className="mb-6 border-b border-gray-100 pb-4">
             <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Booking History</h2>
             <p className="text-sm text-gray-500 mt-1">Review your past and current shipments.</p>
          </div>
          
          {bookings.length === 0 ? (
            <div className="text-center py-16 px-4">
              <p className="text-sm font-medium text-gray-900">No bookings found</p>
              <p className="text-sm text-gray-500 mt-1">Create your first booking using the form.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-5 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-5 sm:px-0">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50">
                      <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Booking ID</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Receiver</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Weight</th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-4 px-4 text-sm font-mono text-gray-500 whitespace-nowrap">#{booking._id.slice(-6).toUpperCase()}</td>
                        <td className="py-4 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">{booking.receiver.name}</td>
                        <td className="py-4 px-4 text-sm text-gray-500 whitespace-nowrap">{booking.package.weight} kg</td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                            booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                            booking.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : 
                            'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {booking.status}
                          </span>
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