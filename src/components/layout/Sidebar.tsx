"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) => {
  const pathname = usePathname();

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #E6C200 0%, #D4B000 100%)",
        boxShadow:
          "inset 0 1px 3px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.1)",
      }}
      className={`p-2 text-center flex flex-col ${
        collapsed ? "w-[70px]" : "w-[220px]"
      }`}
    >
      <div className="flex justify-center items-center  p-4 ">
        {/* {!collapsed && (
          <div className="">
            <span className="font-bold text-3xl">LIS</span>
          </div>
        )} */}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 hover:text-blue-600"
        >
          <i className="ri-menu-line text-xl text-black"></i>
        </button>
      </div>

      {/* Menu */}
      <ul className="space-y-4">
        {/* Dashboard */}
        {/* <li>
          <Link
            href="/dashboard"
            className={`flex flex-col items-center text-white gap-1 p-4 rounded-xl transition-all duration-200
              
              ${
                pathname === "/dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-blue-50 text-gray-700"
              }
              
            `}
          > 
            <i
              className={`ri-home-9-line text-2xl ${
                pathname === "/dashboard" ? "text-gray-900" : "text-white-500"
              }`}
            ></i>
            {!collapsed && (
              <span
                className={`font-medium text-sm ${
                  pathname === "/dashboard" ? "text-gray-900" : "text-white"
                } `}
              >
                Dashboard
              </span>
            )}{" "}
          </Link>
        </li> */}

        {/* admissions */}
        <li>
          <Link
            href="/admissions"
            className={`flex flex-col items-center gap-1 p-4 rounded-xl transition-all duration-200
              
              ${
                pathname === "/admissions"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-blue-50 text-gray-700"
              }
              
            `}
          >
            <i
              className={`ri-shopping-bag-3-line text-2xl  ${
                pathname === "/admissions" ? "text-gray-900" : "text-black"
              }`}
            ></i>
            {!collapsed && (
              <span
                className={`font-medium text-sm  ${
                  pathname === "/admissions" ? "text-gray-900" : "text-black"
                } `}
              >
                Admissions Management
              </span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};
