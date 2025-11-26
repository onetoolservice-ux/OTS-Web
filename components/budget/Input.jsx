"use client";
import React from "react";
export default function Input({label,name,value,onChange,placeholder="",type="text",className=""}){
  return (
    <div className={"flex flex-col "+className}>
      {label && <label className="text-xs text-slate-600 mb-1">{label}</label>}
      <input name={name} value={value} onChange={onChange} placeholder={placeholder} type={type}
             className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" />
    </div>
  );
}
