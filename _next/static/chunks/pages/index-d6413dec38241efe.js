(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(n,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(8937)}])},8937:function(n,r,t){"use strict";t.r(r),t.d(r,{default:function(){return G}});var e=t(5893),i=t(9008),o=t(7294);function a(n,r,t){return r in n?Object.defineProperty(n,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[r]=t,n}function c(n){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},e=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),e.forEach((function(r){a(n,r,t[r])}))}return n}function l(n){return function(n){if(Array.isArray(n))return n}(n)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var u=function(n){var r=function(t,e){if(0===e.length)return n(t);var i=l(e),o=i[0],u=i.slice(1);if(!t.divided)throw new Error("Moving down a path which is not split");return c({},t,{children:c({},t.children,a({},o,r(t.children[o],u)))})};return r},s=u((function(n){if(n.divided)throw new Error("Rotating a path which is split");return c({},n,{orientation:n.orientation+1})})),f=u((function(n){return{divided:!0,children:{mid:n,left:n,right:n,top:n}}})),d=function(n,r){if(0===r.length)return n;if(1===r.length){if(!n.divided)throw new Error("Merging a path which is not split");return n.children[r[0]]}var t=l(r),e=t[0],i=t.slice(1);if(!n.divided)throw new Error("Moving down a path which is not split");return c({},n,{children:c({},n.children,a({},e,d(n.children[e],i)))})},h={subdivide:f,rotate:s,merge:d};function p(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var t=[],e=!0,i=!1,o=void 0;try{for(var a,c=n[Symbol.iterator]();!(e=(a=c.next()).done)&&(t.push(a.value),!r||t.length!==r);e=!0);}catch(l){i=!0,o=l}finally{try{e||null==c.return||c.return()}finally{if(i)throw o}}return t}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var v=[[h.subdivide,[]],[h.subdivide,["mid"]],[h.rotate,["mid","right"]],[h.subdivide,["mid","mid"]],[h.subdivide,["mid","mid","left"]]].reduce((function(n,r){var t=p(r,2);return(0,t[0])(n,t[1])}),{divided:!1,orientation:2}),m=t(2287),y=t.n(m),g=function(n){var r=n.values,t=n.value,i=n.setValue,a=(0,o.useCallback)((function(n){i(n.target.value)}),[i]);return(0,e.jsx)("select",{value:t,onChange:a,children:Object.keys(r).map((function(n){return(0,e.jsx)("option",{children:n},n)}))})},j=function(n){var r=n.values,t=n.value,i=n.setValue,a=(0,o.useCallback)((function(n){i(n.target.value)}),[i]);return(0,e.jsx)(e.Fragment,{children:Object.keys(r).map((function(n){return(0,e.jsxs)(o.Fragment,{children:[(0,e.jsx)(e.Fragment,{children:" "}),(0,e.jsx)("button",{disabled:n===t,value:n,onClick:a,children:n})]},n)}))})},x=t(3652),b=t.n(x),w={grayscale:b().grayscale,blackpink:b().blackpink,pastels:b().pastels};function _(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var t=[],e=!0,i=!1,o=void 0;try{for(var a,c=n[Symbol.iterator]();!(e=(a=c.next()).done)&&(t.push(a.value),!r||t.length!==r);e=!0);}catch(l){i=!0,o=l}finally{try{e||null==c.return||c.return()}finally{if(i)throw o}}return t}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var k=function(n,r){var t=_(n,2),e=t[0],i=t[1],o=_(r,2),a=o[0],c=o[1];return Math.sqrt(Math.pow(e-a,2)+Math.pow(i-c,2))},T=function(n,r,t){var e=_(n,2),i=e[0],o=e[1],a=_(r,2),c=1-t;return[i*t+a[0]*c,o*t+a[1]*c]},C=function(n,r){return n.map((function(t,e){return n[(e+r)%n.length]}))},A=t(2123),S=t.n(A);function N(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var t=[],e=!0,i=!1,o=void 0;try{for(var a,c=n[Symbol.iterator]();!(e=(a=c.next()).done)&&(t.push(a.value),!r||t.length!==r);e=!0);}catch(l){i=!0,o=l}finally{try{e||null==c.return||c.return()}finally{if(i)throw o}}return t}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function M(n){return function(n){if(Array.isArray(n)){for(var r=0,t=new Array(n.length);r<n.length;r++)t[r]=n[r];return t}}(n)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var F=function(n){var r=n.coords,t=n.triTree,i=n.path,a=n.onClickTriangle,c=n.TriangleVisualizer,l=(0,o.useCallback)((function(){a(i)}),[a,i]);if(t.divided){var u=N(r,3),s=u[0],f=u[1],d=u[2],h=T(f,s,.5),p=T(f,d,.5),v=T(s,d,.5),m=t.children,y=m.mid,g=m.left,j=m.right,x=m.top;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(F,{triTree:g,coords:[s,h,v],path:M(i).concat(["left"]),onClickTriangle:a,TriangleVisualizer:c}),(0,e.jsx)(F,{triTree:j,coords:[v,p,d],path:M(i).concat(["right"]),onClickTriangle:a,TriangleVisualizer:c}),(0,e.jsx)(F,{triTree:y,coords:[h,v,p],path:M(i).concat(["mid"]),onClickTriangle:a,TriangleVisualizer:c}),(0,e.jsx)(F,{triTree:x,coords:[h,f,p],path:M(i).concat(["top"]),onClickTriangle:a,TriangleVisualizer:c})]})}return(0,e.jsx)(c,{coords:r,orientation:t.orientation,path:i,onClick:l})},E=function(n){var r=n.triTree,t=n.onClickTriangle,i=n.TriangleVisualizer;return(0,e.jsx)("div",{className:S().triTreeVisualizer,children:(0,e.jsx)("svg",{viewBox:"0 0 1000 866",children:(0,e.jsx)(F,{triTree:r,coords:[[0,0],[500,866],[1e3,0]],path:[],onClickTriangle:t,TriangleVisualizer:i})})})},V=t(1796),O=t.n(V);function z(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var t=[],e=!0,i=!1,o=void 0;try{for(var a,c=n[Symbol.iterator]();!(e=(a=c.next()).done)&&(t.push(a.value),!r||t.length!==r);e=!0);}catch(l){i=!0,o=l}finally{try{e||null==c.return||c.return()}finally{if(i)throw o}}return t}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var H=function(n){var r=n.coords,t=n.orientation,i=n.socketCount,o=n.socketNumber,a=n.sweepFlag,c=2*i,l=z(C(r,t),3),u=l[0],s=l[1],f=l[2],d=(c-2*o-1)/c,h=T(s,u,d),p=T(s,f,d),v=k(s,h),m=["M ".concat(h.join(" ")),"A ".concat(v," ").concat(v," 0 0 ").concat(a," ").concat(p.join(" "))];return(0,e.jsx)("path",{d:m.join(" "),className:O().circleSection,strokeWidth:5})},I=function(n){var r=n.coords,t=n.orientation,i=n.socketCount,o=n.socketNumber,a=n.sweepFlag,c=2*i,l=z(C(r,t),3),u=l[0],s=l[1],f=l[2],d=(c-2*o-1+5/k(u,s)*c/2)/c,h=T(s,f,d),p=T(s,u,d),v=k(s,h),m=["M ".concat(s.join(" ")),"L ".concat(p.join(" ")),"A ".concat(v," ").concat(v," 0 0 ").concat(a," ").concat(h.join(" ")),"Z"];return(0,e.jsx)("path",{d:m.join(" "),className:O().circleCover})},P=t(8540),L=t.n(P);function B(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var t=[],e=!0,i=!1,o=void 0;try{for(var a,c=n[Symbol.iterator]();!(e=(a=c.next()).done)&&(t.push(a.value),!r||t.length!==r);e=!0);}catch(l){i=!0,o=l}finally{try{e||null==c.return||c.return()}finally{if(i)throw o}}return t}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function R(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var t=[],e=!0,i=!1,o=void 0;try{for(var a,c=n[Symbol.iterator]();!(e=(a=c.next()).done)&&(t.push(a.value),!r||t.length!==r);e=!0);}catch(l){i=!0,o=l}finally{try{e||null==c.return||c.return()}finally{if(i)throw o}}return t}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var X={CircleSections:function(n){var r=n.coords,t=n.orientation,i=n.path,o=n.onClick,a=7-i.length;if(a<0)return(0,e.jsx)(e.Fragment,{});var c=r.map((function(n){return n.join(",")})).join(" "),l=Math.pow(2,a),u=a>=2?Math.pow(2,a-2):0,s=l-u,f=a>=2?Math.pow(2,a-1)+1:0,d=a>=2?Math.pow(2,a-1)-1:0,h=(1+i.length+i.filter((function(n){return"mid"!==n})).length)%2;return(0,e.jsxs)(e.Fragment,{children:[Array(f).fill(null).map((function(n,i){return(0,e.jsx)(H,{coords:r,orientation:t+1,socketCount:l,socketNumber:i,sweepFlag:h},i)})),Array(d).fill(null).map((function(n,i){return(0,e.jsx)(H,{coords:r,orientation:t+2,socketCount:l,socketNumber:i,sweepFlag:h},i)})),(0,e.jsx)(I,{coords:r,orientation:t,socketCount:l,socketNumber:s,sweepFlag:h}),Array(s).fill(null).map((function(n,i){return(0,e.jsx)(H,{coords:r,orientation:t,socketCount:l,socketNumber:i,sweepFlag:h},i)})),(0,e.jsx)("polygon",{points:c,className:O().interactionHelper,onClick:o})]})},Triangles:function(n){var r=n.coords,t=n.orientation,i=n.path,o=n.onClick,a=r.map((function(n){return n.join(",")})).join(" "),c=t+i.reduce((function(n,r){return n+{mid:0,left:1,right:3,top:2}[r]}),0),l="var(--color".concat(c%8,")");return(0,e.jsx)("polygon",{points:a,"data-path":i.join(","),"data-orientation":t,style:{fill:l},onClick:o})},Lines:function(n){var r=n.coords,t=n.orientation,i=n.path,o=n.onClick,a=7-i.length;if(a<0)return(0,e.jsx)(e.Fragment,{});var c=r.map((function(n){return n.join(",")})).join(" "),l=Math.pow(2,a),u=2*l,s=B(C(r,t),3),f=s[0],d=s[1],h=s[2],p=Array(l).fill(null).flatMap((function(n,r){var t=(u-2*r-1)/u,e=T(d,h,t),i=T(d,f,t);return["M ".concat(e.join(" ")),"L ".concat(i.join(" "))]}));return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("path",{d:p.join(" "),className:L().line}),";",(0,e.jsx)("polygon",{points:c,className:L().interactionHelper,onClick:o})]})},Arrows:function(n){var r=n.coords,t=n.orientation,i=(n.path,n.onClick),o=R(C(r,t),3),a=o[0],c=o[1],l=o[2],u=[T(a,l,2/3),c,T(a,l,1/3)].map((function(n){return n.join(",")})).join(" ");return(0,e.jsx)(e.Fragment,{children:(0,e.jsx)("polygon",{points:u,style:{fill:"var(--colorPrimary)"},onClick:i})})}},q=function(){var n=(0,o.useState)(!0),r=n[0],t=n[1],i=(0,o.useState)(v),a=i[0],c=i[1],l=(0,o.useState)("subdivide"),u=l[0],s=l[1],f=(0,o.useState)("CircleSections"),d=f[0],p=f[1],m=(0,o.useState)("grayscale"),x=m[0],b=m[1],_=(0,o.useCallback)((function(n){c((function(r){return h[u](r,n)}))}),[u]);return(0,e.jsxs)("div",{className:"".concat(w[x]," ").concat(y().theme),children:[(0,e.jsxs)("main",{className:y().main,children:[(0,e.jsx)(E,{triTree:a,onClickTriangle:_,TriangleVisualizer:X[d]}),(0,e.jsxs)("aside",{className:y().controls,children:[(0,e.jsx)("button",{title:r?"collapse controls":"expand controls",onClick:function(){return t((function(n){return!n}))},children:r?"-":"+"}),r&&(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("span",{className:y().title,children:" Tritreeeee"}),(0,e.jsx)(j,{values:h,value:u,setValue:s}),(0,e.jsx)(e.Fragment,{children:" "}),(0,e.jsx)(g,{values:X,value:d,setValue:p}),(0,e.jsx)(e.Fragment,{children:" "}),(0,e.jsx)(g,{values:w,value:x,setValue:b})]})]})]}),r&&(0,e.jsxs)("footer",{className:y().footer,children:["Made 2022 by Bernhard H\xe4ussner \u2013 ",(0,e.jsx)("a",{href:"https://github.com/bxt/tritreeeee",target:"_blank",rel:"noopener noreferrer",children:"Code on GitHub"})]})]})},G=function(){return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(i.default,{children:[(0,e.jsx)("title",{children:"Tritreeeee"}),(0,e.jsx)("meta",{name:"description",content:"Build your own Tritree for fun"}),(0,e.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,e.jsx)(q,{})]})}},2287:function(n){n.exports={theme:"Main_theme__NElIF",main:"Main_main__m2Vt2",controls:"Main_controls__879_R",footer:"Main_footer___QY_3",title:"Main_title___17TJ"}},2123:function(n){n.exports={triTreeVisualizer:"TriTreeVisualizer_triTreeVisualizer__wij2T"}},3652:function(n){n.exports={grayscale:"themes_grayscale__zUPj_",blackpink:"themes_blackpink__3LiSq",pastels:"themes_pastels__j_2dx"}},1796:function(n){n.exports={circleSection:"CircleSections_circleSection__s0Gat",circleCover:"CircleSections_circleCover__l1xuL",interactionHelper:"CircleSections_interactionHelper__tUyxT"}},8540:function(n){n.exports={line:"Lines_line__PRH_X",interactionHelper:"Lines_interactionHelper__JgCLr"}},9008:function(n,r,t){n.exports=t(5443)}},function(n){n.O(0,[774,888,179],(function(){return r=5301,n(n.s=r);var r}));var r=n.O();_N_E=r}]);