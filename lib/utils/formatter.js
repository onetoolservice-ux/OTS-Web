export function fmtMoney(n,currency="₹"){const num=Number(n)||0;return currency+num.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});}
export function shortId(){return Math.random().toString(36).slice(2,9);}
