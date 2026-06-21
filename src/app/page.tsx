"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) {
      alert("Please enter a tracking number");
      return;
    }
    router.push(`/track/${trackingNumber}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none overflow-hidden flex justify-center">
        <div className="w-[1000px] h-[400px] bg-gradient-to-b from-blue-50 to-transparent opacity-60 rounded-full blur-3xl translate-y-[-50%]"></div>
      </div>

      {/* Glassmorphism Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => router.push("/")}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center shadow-sm border border-gray-700">
              <span className="text-white font-bold text-lg sm:text-xl leading-none tracking-tighter">S</span>
            </div>
            {/* Scales text down slightly on very small screens to fit both buttons */}
            <h1 className="text-base sm:text-xl font-bold text-gray-900 tracking-tight">SwiftCourier</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-500">
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Services</span>
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Solutions</span>
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Company</span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <button 
              onClick={() => router.push("/login")}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => router.push("/register")}
              className="text-xs sm:text-sm bg-gray-900 hover:bg-black text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-medium transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-95"
            >
              <span className="sm:hidden">Sign up</span>
              <span className="hidden sm:inline">Create account</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="relative z-10 pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm mb-6 sm:mb-8">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wide">Live Global Tracking API</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter mb-4 sm:mb-6 leading-[1.1] max-w-4xl mx-auto">
          Logistics, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            simplified.
          </span>
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
          The modern infrastructure for global shipping. Enter your tracking number to monitor your package with real-time accuracy.
        </p>

        {/* The Tracking Pill (Responsive) */}
        <div className="w-full max-w-2xl relative px-2 sm:px-0">
          <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-20 hidden sm:block"></div>
          <form 
            onSubmit={handleTrack} 
            className="relative flex flex-col sm:flex-row items-center bg-white p-2 rounded-2xl shadow-xl sm:shadow-lg border border-gray-100 transition-all focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-200 gap-2 sm:gap-0"
          >
            <div className="hidden sm:block pl-5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Enter tracking number (e.g. TRK-123456)"
              className="w-full flex-1 p-3 sm:p-4 outline-none text-base sm:text-lg text-gray-900 placeholder-gray-400 bg-transparent font-medium rounded-xl sm:rounded-none"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:py-4 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              Track Package
            </button>
          </form>
        </div>
      </main>

      {/* Feature / Trust Section */}
      <section className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 text-center md:text-left">
            
            {/* Feature 1 */}
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Real-Time Updates</h3>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                Our infrastructure pushes webhook updates the millisecond your package changes status. Never guess where your shipment is.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Enterprise Security</h3>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                Built with bank-level encryption and JWT authentication. Your shipping data and customer information are heavily guarded.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mx-auto md:mx-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.438 4.438 0 002.946 2.946 4.493 4.493 0 004.306-1.758q.162-.278.3-.56M14.37 15.59l-5.2-5.2" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Developer Friendly</h3>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                Powered by a robust Node.js/Express backend and MongoDB. Built to scale from a single booking to millions seamlessly.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 text-center px-4">
        <p className="text-gray-400 text-xs sm:text-sm">© {new Date().getFullYear()} SwiftCourier API. Assessment Project.</p>
      </footer>
    </div>
  );
}