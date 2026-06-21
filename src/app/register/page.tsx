"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "customer" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        alert("Registration successful! Please login.");
        router.push("/login");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Create an Account</h2>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center text-sm font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              placeholder="John Doe"
              className="w-full p-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="name@example.com"
              className="w-full p-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              className="w-full p-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={formData.password} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
            <select 
              className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={formData.role} 
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800 transition active:scale-[0.98] disabled:opacity-70 mt-2"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}