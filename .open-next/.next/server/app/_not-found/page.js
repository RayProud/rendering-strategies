(()=>{var e={};e.id=409,e.ids=[409],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9859:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>s.a,__next_app__:()=>b,originalPathname:()=>c,pages:()=>d,routeModule:()=>f,tree:()=>a}),r(9333),r(996),r(3308);var n=r(170),o=r(5002),i=r(3876),s=r.n(i),u=r(6299),l={};for(let e in u)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>u[e]);r.d(t,l);let a=["",{children:["/_not-found",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.t.bind(r,996,23)),"next/dist/client/components/not-found-error"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,3308)),"/Users/roman.prudnikov/other/rendering-strategies/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,996,23)),"next/dist/client/components/not-found-error"]}],d=[],c="/_not-found/page",b={require:r,loadChunk:()=>Promise.resolve()},f=new n.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/_not-found/page",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:a}})},6863:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,3642,23)),Promise.resolve().then(r.t.bind(r,7586,23)),Promise.resolve().then(r.t.bind(r,7838,23)),Promise.resolve().then(r.t.bind(r,8057,23)),Promise.resolve().then(r.t.bind(r,7741,23)),Promise.resolve().then(r.t.bind(r,3118,23))},4927:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,4080,23)),Promise.resolve().then(r.bind(r,7847))},7847:(e,t,r)=>{"use strict";r.d(t,{default:()=>i});var n=r(7247);let o=(0,r(8964).createContext)({});function i({children:e}){return n.jsx(o.Provider,{value:"dark",children:e})}},6868:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{isNotFoundError:function(){return o},notFound:function(){return n}});let r="NEXT_NOT_FOUND";function n(){let e=Error(r);throw e.digest=r,e}function o(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9333:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{PARALLEL_ROUTE_DEFAULT_PATH:function(){return o},default:function(){return i}});let n=r(6868),o="next/dist/client/components/parallel-route-default.js";function i(){(0,n.notFound)()}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3308:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>f,metadata:()=>b});var n=r(2051),o=r(7818),i=r.n(o),s=r(494),u=r.n(s),l=r(5347);(0,l.createProxy)(String.raw`/Users/roman.prudnikov/other/rendering-strategies/src/app/theme-provider.tsx#ThemeContext`);let a=(0,l.createProxy)(String.raw`/Users/roman.prudnikov/other/rendering-strategies/src/app/theme-provider.tsx#default`);r(5023);var d=r(2349);function c(){return(0,n.jsxs)("div",{className:"flex flex-wrap items-center justify-center",children:[n.jsx(d.default,{href:"/server-static",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Server Side Static page"})}),n.jsx(d.default,{href:"/client-static",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Client Side Static page"})}),n.jsx(d.default,{href:"/server-dynamic",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Server Side Dynamic page"})}),n.jsx(d.default,{href:"/client-dynamic",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Client Side Dynamic page"})}),n.jsx(d.default,{href:"/server-static-turned-dynamic",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Static Server Side Turned Dynamic page"})}),n.jsx(d.default,{href:"/server-static-use-server",children:n.jsx("button",{type:"button",className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"To Dynamic Server Side page with use server"})})]})}let b={title:"Create Next App",description:"Generated by create next app"};function f({children:e}){return n.jsx("html",{lang:"en",children:n.jsx("body",{className:`${i().variable} ${u().variable} antialiased`,children:(0,n.jsxs)("div",{className:"flex flex-col flex-wrap justify-center items-center",children:[n.jsx("time",{dateTime:new Date().toLocaleTimeString(),suppressHydrationWarning:!0,children:new Date().toLocaleTimeString()}),n.jsx("h1",{className:"mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-3xl mb-3",children:"Choose which type of rendering you want to try out"}),n.jsx(c,{}),n.jsx(a,{children:e})]})})})}},5023:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[379,59],()=>r(9859));module.exports=n})();