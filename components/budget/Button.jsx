"use client";
import React from "react";
export default function Button({children,variant="primary",onClick,type="button",className=""}){
  const base="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ";
  const styles={
    primary:"bg-blue-600 text-white hover:bg-blue-700 shadow",
    outline:"border border-blue-600 text-blue-600 hover:bg-blue-50",
    danger:"bg-red-500 text-white hover:bg-red-600"
  };
  return <button type={type} onClick={onClick} className={base + (styles[variant]||styles.primary) + " " + className}>{children}</button>;
}
