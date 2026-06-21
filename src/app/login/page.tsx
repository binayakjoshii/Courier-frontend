"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError("Server error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-zinc-200 selection:text-zinc-900 flex items-center justify-center p-4 sm:p-6">
      
      <div className="max-w-md w-full bg-white sm:rounded-2xl rounded-xl shadow-sm border border-zinc-200 p-6 sm:p-8 relative z-10">
        
        {/* Brand Logo / Back to Home */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => router.push("/")}
            className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center shadow-sm hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-950"
            aria-label="Go to home page"
          >
            <span className="text-white font-bold text-xl leading-none tracking-tighter">S</span>
          </button>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">Welcome back</h2>
          <p className="text-sm text-zinc-500 mt-2">Please enter your details to sign in.</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3.5 rounded-lg mb-6 text-center text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
            <input 
              type="email" 
              required 
              placeholder="name@example.com"
              className="w-full p-3.5 bg-white text-zinc-950 placeholder-zinc-400 border border-zinc-200 rounded-lg outline-none transition-all focus:ring-2 focus:ring-zinc-950 focus:border-transparent text-base sm:text-sm"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              className="w-full p-3.5 bg-white text-zinc-950 placeholder-zinc-400 border border-zinc-200 rounded-lg outline-none transition-all focus:ring-2 focus:ring-zinc-950 focus:border-transparent text-base sm:text-sm"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-zinc-950 text-white p-3.5 rounded-lg font-medium hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-950 disabled:opacity-70 mt-2 active:scale-[0.98]"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        
        <p className="text-center mt-8 text-sm text-zinc-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-zinc-950 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}