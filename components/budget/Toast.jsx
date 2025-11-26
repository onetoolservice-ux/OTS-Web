"use client";
import React, {useEffect} from "react";
export default function Toast({message,show,timeout=3000,onClose}){
  useEffect(()=>{
    if(!show) return;
    const t=setTimeout(()=>{onClose&&onClose()},timeout);
    return ()=>clearTimeout(t);
  },[show,timeout,onClose]);
  if(!show) return null;
  return (
    <div className="fixed right-4 bottom-6 z-50">
      <div className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow">{message}</div>
    </div>
  );
}
