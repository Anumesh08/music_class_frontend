"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoginForm from "@/components/auth/LoginForm";
import { Paper } from "@mui/material";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // =====================
  const DEMO_ENABLED = process.env.NEXT_PUBLIC_ENABLE_DEMO_LOGIN === "true";
  const DEMO_MOBILE = process.env.NEXT_PUBLIC_DEMO_MOBILE;
  const DEMO_PIN = process.env.NEXT_PUBLIC_DEMO_PIN;
  // =========================

  // const handleLogin = async (mobile_no: string, login_pin: string) => {
  //   setLoading(true);
  //   setError("");

  //   try {
  //     console.log("Making API call to:", `${API_BASE_URL}/User/login`);

  //     // Convert login_pin to number
  //     const pinNumber = parseInt(login_pin);
  //     const response = await axios.post(`${API_BASE_URL}/User/login`, {
  //       mobile_no: mobile_no,
  //       login_pin: pinNumber,
  //     });

  //     const data = response.data;
  //     console.log("API Response:", data);

  //     if (data.status && data.token) {
  //       // Save token to localStorage
  //       localStorage.setItem("token", data.token);

  //       // Decode token to get user info
  //       try {
  //         const tokenParts = data.token.split(".");
  //         const payload = JSON.parse(atob(tokenParts[1]));
  //         console.log("Decoded Token Payload:", payload);

  //         // Save user info
  //         localStorage.setItem(
  //           "user",
  //           JSON.stringify({
  //             employee_id: payload.employee_id,
  //             employee_name: payload.employee_name,
  //             mobile_no: payload.mobile_no,
  //             shop_id: payload.shop_id,
  //             employee_type: payload.employee_type,
  //             shop: payload.shop,
  //           }),
  //         );
  //       } catch (decodeError) {
  //         console.error("Token decode error:", decodeError);
  //       }

  //       console.log("Login successful, redirecting to admissions...");
  //       router.push("/admissions");
  //     } else {
  //       // Login failed
  //       setError(data.message || "Login failed");
  //     }
  //   } catch (err: any) {
  //     console.error("Login error:", err);

  //     // Error handling
  //     if (err.response?.data?.message) {
  //       setError(err.response.data.message);
  //     } else if (err.message?.includes("Network Error")) {
  //       setError("Cannot connect to server. Please check backend.");
  //     } else if (err.response?.status === 401) {
  //       setError("Invalid mobile number or PIN");
  //     } else {
  //       setError("Something went wrong. Please try again.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (mobile_no: string, login_pin: string) => {
    setLoading(true);
    setError("");

    if (DEMO_ENABLED && mobile_no === DEMO_MOBILE && login_pin === DEMO_PIN) {
      localStorage.setItem("token", "demo-token");
      localStorage.setItem(
        "user",
        JSON.stringify({
          employee_id: 1,
          employee_name: "Demo User",
          mobile_no,
          shop_id: 1,
          employee_type: "demo",
        }),
      );
      router.push("/admissions");
      setLoading(false);
      return;
    }

    try {
      console.log("Making API call to:", `${API_BASE_URL}/User/login`);

      // Convert login_pin to number
      const pinNumber = parseInt(login_pin);
      const response = await axios.post(`${API_BASE_URL}/User/login`, {
        mobile_no: mobile_no,
        login_pin: pinNumber,
      });

      const data = response.data;
      console.log("API Response:", data);

      if (data.status && data.token) {
        // Save token to localStorage
        localStorage.setItem("token", data.token);

        // Decode token to get user info
        try {
          const tokenParts = data.token.split(".");
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log("Decoded Token Payload:", payload);

          // Save user info
          localStorage.setItem(
            "user",
            JSON.stringify({
              employee_id: payload.employee_id,
              employee_name: payload.employee_name,
              mobile_no: payload.mobile_no,
              shop_id: payload.shop_id,
              employee_type: payload.employee_type,
              shop: payload.shop,
            }),
          );
        } catch (decodeError) {
          console.error("Token decode error:", decodeError);
        }

        console.log("Login successful, redirecting to admissions...");
        router.push("/admissions");
      } else {
        // Login failed
        setError(data.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err);

      // Error handling
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message?.includes("Network Error")) {
        setError("Cannot connect to server. Please check backend.");
      } else if (err.response?.status === 401) {
        setError("Invalid mobile number or PIN");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/images/guitars.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full flex justify-center px-4 md:px-8">
          <Paper
            elevation={6}
            style={{ borderRadius: "45px" }}
            className="w-full max-w-lg p-6 md:p-7 rounded-[40px] bg-white/90 backdrop-blur-sm max-h-[90vh] overflow-auto shadow-lg bg-gradient-to-br from-white/80 to-white/60"
          >
            <div className="w-full">
              <div>
                {/* Logo/Header */}
                <div className="text-center mb-5">
                  <div
                    className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background:
                        "linear-gradient(135deg, #E6C200 0%, #D4B000 100%)",
                      boxShadow:
                        "inset 0 1px 3px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.1)",
                      color: "black",
                      fontWeight: "2px",
                    }}
                  >
                    <span className="text-2xl text-white font-bold">
                      <i className="ri-music-2-line"></i>
                    </span>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Melody Hub
                  </h1>
                  <p className="text-xs text-gray-600 mt-2">
                    Sign in with Mobile & PIN
                  </p>
                </div>

                {/* Login Form */}
                <LoginForm
                  onSubmit={handleLogin}
                  loading={loading}
                  error={error}
                />

                {/* Footer */}
                <div className="mt-5 text-center">
                  <p className="text-sm text-gray-500">
                    © 2026 Melody Hub System
                  </p>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
