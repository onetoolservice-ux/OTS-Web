"use client";
import React from "react";
export default function Table({columns=[],data=[],onAction}){
  return (
    <div className="overflow-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-blue-50 text-slate-600">
          <tr>{columns.map(c=><th key={c.key} className="text-left p-2 border-b">{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row,i)=>(
            <tr key={i} className="odd:bg-white even:bg-blue-50">
              {columns.map(col=> <td key={col.key} className="p-2 border-b">{col.render?col.render(row):row[col.key]??""}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
