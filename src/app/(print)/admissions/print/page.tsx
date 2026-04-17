"use client";

import Loader from "@/components/ui/Loader";
import { useEffect, useState } from "react";

const Field = ({ label, value }: any) =>
  value ? (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  ) : null;

export default function PrintPage() {
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem("print_admission");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed);

      setTimeout(() => {
        window.print();
      }, 300);
    }
  }, []);

  if (!mounted) return null;

  const currentDate = new Date().toLocaleString();

  return (
    <div
      id="print-section"
      className="bg-white text-black p-10 max-w-[210mm] mx-auto"
    >
      {/* HEADER */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-2xl font-bold tracking-wide">Swar Sadhana</h1>
        <p className="text-sm text-gray-500">Admission Form</p>
        <p className="text-[10px] text-gray-400">Date: {currentDate}</p>
      </div>

      {/* STUDENT DETAILS */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3">
          Student Details
        </h2>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <Field label="Name" value={data.student_name} />
          <Field label="DOB" value={data.date_of_birth} />
          <Field label="WhatsApp" value={data.whatsapp_number} />
          <Field label="Admission Type" value={data.admission_type} />
          <Field label="Rejoin ID" value={data.rejoin_id} />
        </div>

        <div className="mt-3 text-sm">
          <span className="text-gray-500">Address</span>
          <p className="font-medium">{data.address}</p>
        </div>
      </div>

      {/* COURSE */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3">
          Course Details
        </h2>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <Field label="Instrument" value={data.instrument} />
          <Field
            label="Pre Knowledge"
            value={data.has_pre_knowledge ? "Yes" : "No"}
          />
          <Field label="Days" value={data.days_per_week} />
          <Field label="Batch" value={data.batch_timing} />
          <Field label="Duration" value={data.course_duration} />
        </div>
      </div>

      {/* PAYMENT */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3">
          Payment Details
        </h2>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <Field label="Mode" value={data.payment_mode} />
          <Field label="Installment" value={data.payment_installment} />
        </div>
      </div>

      {/* PARENTS */}
      {(data.father_name || data.mother_name) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">
            Parent Details
          </h2>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <Field label="Father Name" value={data.father_name} />
            <Field label="Father Occupation" value={data.father_occupation} />
            <Field label="Father WhatsApp" value={data.father_whatsapp} />

            <Field label="Mother Name" value={data.mother_name} />
            <Field label="Mother Occupation" value={data.mother_occupation} />
            <Field label="Mother WhatsApp" value={data.mother_whatsapp} />
          </div>
        </div>
      )}

      {/* SIGNATURE */}
      <div className="flex justify-between mt-16 text-sm">
        <div className="text-center">
          <div className="border-t border-black w-40 mx-auto mb-1"></div>
          Student Signature
        </div>

        <div className="text-center">
          <div className="border-t border-black w-40 mx-auto mb-1"></div>
          Authorized Sign
        </div>
      </div>
    </div>
  );
}
