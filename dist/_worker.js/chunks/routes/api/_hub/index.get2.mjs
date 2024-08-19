import{e as t,a as s,q as a}from"../../../runtime.mjs";import{r as n}from"../../../_/auth.mjs";const o=t((async t=>{await n(t),s("cache");const o=await a("cache:nitro").getKeys(),c={handlers:0,functions:0};for(const t of o){if(!t.includes(":"))continue;const[s]=t.split(":");c[s]=(c[s]||0)+1}return c}));export{o as default};
//# sourceMappingURL=index.get2.mjs.map
