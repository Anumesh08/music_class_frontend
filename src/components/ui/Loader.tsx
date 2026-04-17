"use client";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div className="border-t-2 border-black rounded-full animate-spin h-10 w-10"></div>
    </div>
  );
};

export default Loader;
