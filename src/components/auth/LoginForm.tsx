"use client";

import { useState } from "react";

interface LoginFormProps {
  onSubmit: (mobile_no: string, login_pin: string) => void;
  loading: boolean;
  error: string;
}

export default function LoginForm({
  onSubmit,
  loading,
  error,
}: LoginFormProps) {
  const [mobile_no, setMobileNo] = useState("");
  const [login_pin, setLoginPin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(mobile_no, login_pin);
  };

  const clearForm = () => {
    setMobileNo("");
    setLoginPin("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mobile Number */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <div className="space-x-2">
            <button
              type="button"
              onClick={clearForm}
              className="text-xs text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
        <input
          type="tel"
          value={mobile_no}
          autoComplete="off"
          onChange={(e) =>
            setMobileNo(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Enter 10-digit mobile number"
          pattern="[0-9]{10}"
          maxLength={10}
          required
          disabled={loading}
        />

        <p className="text-xs text-gray-500 mt-1">10 digits only</p>
      </div>

      {/* PIN - Updated for 4 digits */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Login PIN
          </label>
        </div>
        <input
          type="password"
          autoComplete="off"
          value={login_pin}
          onChange={(e) =>
            setLoginPin(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Enter 6-digit PIN"
          pattern="[0-9]{6}"
          maxLength={6}
          required
          disabled={loading}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">6 digits only</p>
          <p className="text-xs text-gray-500">Length: {login_pin.length}/6</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
          <p className="text-xs text-red-500 mt-1">
            Check console (F12) for details
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="
    w-full py-3 px-4 rounded-lg font-medium
    transition-all duration-300 ease-in-out
    hover:scale-[1.02] hover:shadow-lg
    active:scale-[0.96] active:shadow-sm
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
    disabled:opacity-50 disabled:cursor-not-allowed
  "
        style={{
          background: "linear-gradient(135deg, #E6C200 0%, #D4B000 100%)",
          boxShadow:
            "inset 0 1px 3px rgba(255,255,255,0.3), 0 4px 10px rgba(0,0,0,0.15)",
          color: "black",
          fontWeight: "500",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
            Signing in...
          </div>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
