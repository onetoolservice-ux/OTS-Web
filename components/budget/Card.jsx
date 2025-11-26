"use client";
import React from "react";
export default function Card({title,children,footer,className=""}){
  return (
    <div className={"bg-white rounded-xl shadow p-4 "+className}>
      {title && <div className="mb-3 flex items-center justify-between"><h3 className="text-lg font-semibold text-slate-800">{title}</h3></div>}
      <div>{children}</div>
      {footer && <div className="mt-3 text-sm text-slate-500">{footer}</div>}
    </div>
  );
}
