"use client"; // Required for interactivity and hooks

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a brief authentication delay for a better UX
    setTimeout(() => {
      setIsLoading(false);
      // Redirects to your dashboard folder
      router.push("/dashboard"); 
    }, 1200);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left Side: Login Form */}
      <div className="flex flex-col justify-center px-8 md:px-24 py-12">
        <div className="mb-10 flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Activity size={24} />
          </div>
          <span className="text-2xl font-bold text-slate-800">HealthStake</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Nurse Login</h1>
          <p className="text-slate-500">Welcome back! Please enter your details to access the portal.</p>
        </div>

        {/* Added onSubmit handler */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input 
                required
                type="email" 
                placeholder="nursing@healthstake.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <Link href="#" className="text-xs text-blue-600 font-semibold hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="remember" className="text-sm text-slate-600">Keep me logged in</label>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl text-lg font-semibold group flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Authenticating...
              </>
            ) : (
              <>
                Login to Dashboard
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </>
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Don't have an account yet?{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">Apply for Nursing Staff</Link>
        </p>
      </div>

      {/* Right Side: Visual Content */}
      <div className="hidden md:block relative overflow-hidden bg-blue-600">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-900/90 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070" 
          alt="Medical Background" 
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative z-20 h-full flex flex-col justify-end p-16 text-white">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
            <h2 className="text-3xl font-bold mb-4">Dedicated to Patient Care</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Our portal provides real-time alerts and patient data to help you focus on what matters most—saving lives and providing comfort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}