import{e as t,y as e,z as a,b as s,A as o,B as r,C as i,D as n,E as m,a as d,h as u}from"../../../../runtime.mjs";import{r as c}from"../../../../_/auth.mjs";const h={GET:"read",HEAD:"read",PUT:"write",DELETE:"write"};const w=t((async w=>{await c(w),d("kv");return function(d,u={}){return t((async t=>{const c=u.resolvePath?.(t)??t.path,w=c.endsWith(":")||c.endsWith("/"),f=w?e(c):a(c);if(!(t.method in h))throw s({statusCode:405,statusMessage:`Method Not Allowed: ${t.method}`});try{await(u.authorize?.({type:h[t.method],event:t,key:f}))}catch(t){throw o(t)?t:s({statusMessage:t?.message,statusCode:401,...t})}if("GET"===t.method){if(w)return(await d.getKeys(f)).map((t=>t.replace(/:/g,"/")));const checkNotFound=t=>{if(null===t)throw s({statusMessage:"KV value not found",statusCode:404})};if("application/octet-stream"===r(t,"accept")){const t=await d.getItemRaw(f);return checkNotFound(t),t}{const t=await d.getItem(f);return checkNotFound(t),i(t)}}if("HEAD"===t.method){const e=await d.hasItem(f);if(t.node.res.statusCode=e?200:404,e){const e=await d.getMeta(f);e.mtime&&n(t,"last-modified",new Date(e.mtime).toUTCString())}return""}if("PUT"===t.method){if("application/octet-stream"===r(t,"content-type")){const e=await m(t);await d.setItemRaw(f,e)}else{const e=await m(t,"utf8");void 0!==e&&await d.setItem(f,e)}return"OK"}if("DELETE"===t.method)return await(w?d.clear(f):d.removeItem(f)),"OK";throw s({statusCode:405,statusMessage:`Method Not Allowed: ${t.method}`})}))}(u(),{resolvePath:t=>t.context.params.path||""})(w)}));export{w as default};
//# sourceMappingURL=_...path_.mjs.map
