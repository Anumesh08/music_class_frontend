"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <div className="flex items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Swar Sadhana</h1>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
}
