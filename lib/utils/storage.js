export function save(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(e){console.warn("storage save failed",e);}}
export function load(key,def=[]){try{const raw=localStorage.getItem(key);if(!raw) return def;return JSON.parse(raw);}catch(e){console.warn("storage load failed",e);return def;}}
