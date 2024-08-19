import{e as a}from"../../runtime.mjs";import{h as e}from"../../_/database.mjs";const t=a((async()=>{const a=e();await a.exec("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, text TEXT, created_at INTEGER)");const{results:t}=await a.prepare("SELECT * FROM messages ORDER BY created_at DESC").all();return t}));export{t as default};
//# sourceMappingURL=index.get2.mjs.map
