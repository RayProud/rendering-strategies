(()=>{var e={};e.id=697,e.ids=[697],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5315:e=>{"use strict";e.exports=require("path")},7360:e=>{"use strict";e.exports=require("url")},4635:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>m,originalPathname:()=>c,pages:()=>d,routeModule:()=>p,tree:()=>u}),r(1931),r(3308),r(996);var n=r(170),i=r(5002),s=r(3876),a=r.n(s),o=r(6299),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let u=["",{children:["client-static",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,1931)),"/Users/roman.prudnikov/other/rendering-strategies/src/app/client-static/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,3308)),"/Users/roman.prudnikov/other/rendering-strategies/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,996,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/roman.prudnikov/other/rendering-strategies/src/app/client-static/page.tsx"],c="/client-static/page",m={require:r,loadChunk:()=>Promise.resolve()},p=new n.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/client-static/page",pathname:"/client-static",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},6863:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,3642,23)),Promise.resolve().then(r.t.bind(r,7586,23)),Promise.resolve().then(r.t.bind(r,7838,23)),Promise.resolve().then(r.t.bind(r,8057,23)),Promise.resolve().then(r.t.bind(r,7741,23)),Promise.resolve().then(r.t.bind(r,3118,23))},4927:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,4080,23)),Promise.resolve().then(r.bind(r,7847))},1706:(e,t,r)=>{Promise.resolve().then(r.bind(r,9351))},9351:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var n=r(7247);function i(){return console.log("Client Side Static page"),n.jsx("div",{children:n.jsx("h1",{children:"this is a client only page"})})}},7847:(e,t,r)=>{"use strict";r.d(t,{default:()=>s});var n=r(7247);let i=(0,r(8964).createContext)({});function s({children:e}){return n.jsx(i.Provider,{value:"dark",children:e})}},1931:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});let n=(0,r(5347).createProxy)(String.raw`/Users/roman.prudnikov/other/rendering-strategies/src/app/client-static/page.tsx#default`)},3308:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p,metadata:()=>m});var n=r(2051),i=r(7818),s=r.n(i),a=r(494),o=r.n(a),l=r(5347);(0,l.createProxy)(String.raw`/Users/roman.prudnikov/other/rendering-strategies/src/app/theme-provider.tsx#ThemeContext`);let u=(0,l.createProxy)(String.raw`/Users/roman.prudnikov/other/rendering-strategies/src/app/theme-provider.tsx#default`);r(5023);var d=r(2349);function c(){return(0,n.jsxs)("div",{className:"flex flex-wrap items-center justify-center",children:[n.jsx(d.default,{href:"/server-static",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Server Side Static page"})}),n.jsx(d.default,{href:"/client-static",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Client Side Static page"})}),n.jsx(d.default,{href:"/server-dynamic",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Server Side Dynamic page"})}),n.jsx(d.default,{href:"/client-dynamic",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Client Side Dynamic page"})}),n.jsx(d.default,{href:"/server-static-turned-dynamic",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Static Server Side Turned Dynamic page"})}),n.jsx(d.default,{href:"/server-static-use-server",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Dynamic Server Side page with use server"})})]})}let m={title:"Create Next App",description:"Generated by create next app"};function p({children:e}){return n.jsx("html",{lang:"en",children:n.jsx("body",{className:`${s().variable} ${o().variable} antialiased`,children:(0,n.jsxs)("div",{className:"flex flex-col flex-wrap justify-center items-center",children:[n.jsx("time",{dateTime:new Date().toLocaleTimeString(),suppressHydrationWarning:!0,children:new Date().toLocaleTimeString()}),n.jsx("h1",{className:"mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-3xl mb-3",children:"Choose which type of rendering you want to try out"}),n.jsx(c,{}),n.jsx(u,{children:e})]})})})}},3881:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var n=r(4564);let i=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,n.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},5023:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[379,59,564],()=>r(4635));module.exports=n})();