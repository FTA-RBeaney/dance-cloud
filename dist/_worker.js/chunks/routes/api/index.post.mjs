import{e as a,r as t}from"../../runtime.mjs";import{h as e}from"../../_/database.mjs";const r=a((async a=>{const{text:r}=await t(a),s=e();return await s.prepare("INSERT INTO messages (text, created_at) VALUES (?1, ?2)").bind(r,Date.now()).run(),{}}));export{r as default};
//# sourceMappingURL=index.post.mjs.map
