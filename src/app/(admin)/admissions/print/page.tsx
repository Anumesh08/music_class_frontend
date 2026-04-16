"use client";

import { Card } from "@mui/material";
import { useEffect, useState } from "react";

export default function PrintPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("print_admission");
    if (stored) {
      setData(JSON.parse(stored));
    }

    // Auto print
    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <Card>
      <div className="p-8 text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admission Details
        </h1>

        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {data.student_name}
          </p>
          <p>
            <strong>DOB:</strong> {data.date_of_birth}
          </p>
          <p>
            <strong>WhatsApp:</strong> {data.whatsapp_number}
          </p>
          <p>
            <strong>Address:</strong> {data.address}
          </p>

          <p>
            <strong>Instrument:</strong> {data.instrument}
          </p>
          <p>
            <strong>Days:</strong> {data.days_per_week}
          </p>
          <p>
            <strong>Batch:</strong> {data.batch_timing}
          </p>

          <p>
            <strong>Payment Mode:</strong> {data.payment_mode}
          </p>
          <p>
            <strong>Installment:</strong> {data.payment_installment}
          </p>

          {data.father_name && (
            <>
              <h2 className="mt-4 font-semibold">Parent Details</h2>
              <p>
                <strong>Father:</strong> {data.father_name}
              </p>
              <p>
                <strong>Mother:</strong> {data.mother_name}
              </p>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
