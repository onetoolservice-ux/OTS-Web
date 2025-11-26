export function arrayToCSV(rows){return rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\\n");}
export function csvToRows(text){const lines=text.split(/\\r?\\n/).filter(Boolean);return lines.map(l=>l.split(",").map(cell=>cell.replace(/^"|"$/g,""))); }
