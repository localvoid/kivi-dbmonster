(function(){'use strict';function q(a,b){this.a=a;this.b=b}var aa=0;function t(a){aa++;this.name=a;this.a=null;a=[];for(var b=Math.floor(10*Math.random()+1),d=0;d<b;d++)a.push(new q(15*Math.random(),.1>Math.random()?"vacuum":.2>Math.random()?"<IDLE> in transaction":"SELECT blah FROM something"));this.a=a}var ba=new q(0,"");function ca(a){a=a.a.slice();a.sort(function(a,d){return a.a-d.a});for(a=a.slice(0,5);5>a.length;)a.push(ba);return a}
function da(){this.a=[];for(var a=0;100>a;a++)this.a.push(new t("cluster"+a)),this.a.push(new t("cluster"+a+"slave"))};function u(a,b){this.a=a;this.b=b};function v(){this.a=0;this.g=[];this.b=this.f=this.c=this.h=null};function ea(a){var b=this.a="__pms"+Math.random().toString();window.addEventListener("message",function(d){d.source===window&&d.data===b&&a()})};function fa(a){this.b=new window.MutationObserver(a);this.a=document.createTextNode("");this.b.observe(this.a,{characterData:!0})};function w(){this.a=[];this.b=[]}function x(a){for(var b=0,d=a.a;b<d.length;)d[b++]();b=0;for(d=a.b;b<d.length;)d[b].call(d[b+1]),b+=2};new function(){this.a=0;this.c=1;this.b=new w;this.g=new w;this.f=new v;this.h=new v;this.j=[];var a=this;new fa(function(){a.a|=256;for(var b=a.b;0!==b.a.length||0!==b.b.length;)a.b=new w,x(b),b=a.b;a.c++;a.a&=-258});new ea(function(){a.a&=-3;a.a|=256;var b=a.g;if(0!==b.a.length||0!==b.b.length)a.g=new w,x(b);a.c++;a.a&=-257});this.i=function(){var b=a.j,d,c,f,e,h,g;a.a&=-9;a.a|=256;d=a.h;a.h=a.f;a.f=d;for(h=0;h<b.length;h++)b[h].a|=8;do{for(;0!==(d.a&3);){if(0!==(d.a&1))for(d.a&=-2,c=d.g,h=0;h<
c.length;h++)if(f=c[h],null!==f)for(c[h]=null,g=0;g<f.length;g++)e=f[g],e.constructor===y?z(e):e.call();if(0!==(d.a&2))for(d.a&=-3,f=d.h,h=0;h<f.length;h++)e=f[h],e.constructor===y?z(e):e.call()}h=0;for(g=b.length;h<g;)e=b[h++],0===(e.a&16)?(e.a&=-33,h===g?b.pop():b[--h]=b.pop()):z(e);for(;0!==(d.a&4);)for(d.a&=-5,f=d.c,d.c=null,h=0;h<f.length;h++)e=f[h],e.constructor===y?z(e):e.call()}while(0!==(d.a&3));for(;0!==(d.a&8);)for(d.a&=-9,f=d.f,h=0;h<f.length;h++)e=f[h],e.constructor===y?z(e):e.call();
null!==d.b&&(d.b.constructor===B?d.b.b.focus():d.b.focus(),d.b=null);0<b.length&&0===(a.a&8)&&(a.a|=8,window.requestAnimationFrame(a.i));a.c++;a.a&=-257}};function C(){this.a=0;this.c="div";this.b=null}function y(a,b,d,c,f,e){this.a=a;this.i=b;this.j=null===d?0:d.j+1;this.b=c;this.c=e;this.h=this.g=this.f=null}function E(a,b,d){var c;void 0===c&&(c=0===(a.a&1)?document.createElement(a.c):document.createElementNS(G,a.c));return new y(10,a,d,b,0,c)}function z(a){10===(a.a&10)&&(a.i.b(a),a.a&=-9)}function H(a,b){null===a.f?(b.h=a,0!==(a.a&4)?(I(b,a.c,a),a.a&=-5):(b.b=a.c,K(b,a))):L(a.f,b,a);a.f=b}
function M(a){a.a|=1;a.a&=-19;var b=a.g;if(null!==b)if(b.constructor===u)b.b.a(b);else for(var d=0;d<b.length;d++){var c=b[d];c.b.a(c)}a.g=null;b=a.h;if(null!==b)if(b.constructor===u)b.b.a(b);else for(d=0;d<b.length;d++)c=b[d],c.b.a(c);a.h=null;a=a.f;null!==a&&(a.constructor===B?N(a):a.constructor===y&&M(a))};var G="http://www.w3.org/2000/svg";function B(a,b,d){this.a=a;this.i=b;this.c=d;this.h=this.b=this.g=this.f=this.j=null}function O(a){return new B(2,a,null)}function P(a,b){void 0===b&&(b=null);return new B(4,a,b)}function Q(a,b){a.j=b;return a}function R(a,b){a.f=b;return a}function S(a,b){a.g=b;return a}function T(a,b){return a.a===b.a&&a.i===b.i&&a.j===b.j&&!0}
function U(a,b){var d=a.a;0!==(d&1)?a.b=document.createTextNode(a.c):0!==(d&2)?a.b=0===(d&16)?document.createElement(a.i):document.createElementNS(G,a.i):0!==(d&4)&&(d=E(a.i,a.c,b),a.b=d.c,a.h=d)}
function K(a,b){var d,c;c=a.a;var f,e;if(0!==(c&14))if(d=a.b,f=null,null!==a.j&&(f=a.j),null!==a.f&&(e=a.f.join(" "),f=null===f?e:f+" "+e),null!==f&&(0!==(c&2)?(a.c=f,d.className=f):0!==(c&4)?d.className=f:(e=d.className,d.className=""===e?f:e+" "+f)),0!==(c&4))z(a.h);else if(null!==a.g)if(c=a.g,"string"===typeof c)d.textContent=c;else for(d=0,c=a.g.length;d<c;d++)V(a,a.g[d],null,b)}
function I(a,b,d){var c=a.a,f=a.g;a.b=b;if(0!==(c&4))b=new y(14,a.i,d,a.c,0,b),z(a.h=b);else if(null!==f&&"string"!==typeof f&&0<f.length){for(var c=b.firstChild,e;8===c.nodeType;)e=c,c=c.nextSibling,b.removeChild(e);for(a=0;a<f.length;a++)for(I(f[a],c,d),c=c.nextSibling;8===c.nodeType;)e=c,c=c.nextSibling,b.removeChild(e)}}
function L(a,b,d){var c=a.b,f=a.a,e,h;b.b=c;if(0!==(f&1))a.c!==b.c&&(a.b.nodeValue=b.c);else if(0!==(f&14)){if(0!==(f&2))a.f!==b.f?(null===b.c&&(h=b.j,null!==b.f&&(e=b.f.join(" "),h=null===h?e:h+" "+e),b.c=h),a.c!==b.c&&(c.className=null===b.c?"":b.c)):b.c=a.c;else if(a.f!==b.f){e=a.f;h=b.f;var c=c.classList,g,m,l,k;if(null!==e&&0!==e.length)if(null===h||0===h.length)for(g=0;g<e.length;g++)c.remove(e[g]);else if(1===e.length&&1===h.length)m=e[0],l=h[0],m!==l&&(c.remove(m),c.add(l));else if(1===e.length){m=
e[0];k=-1;for(g=0;g<h.length;g++)if(l=h[g],m===l){k=g;break}else c.add(l);if(-1!==k)for(g=k+1;g<h.length;g++)c.add(h[g]);else c.remove(m)}else if(1===h.length){l=h[0];k=-1;for(g=0;g<e.length;g++)if(m=e[g],m===l){k=g;break}else c.remove(m);if(-1!==k)for(g=k+1;g<e.length;g++)c.remove(e[g]);else c.add(l)}else{k=g=0;for(var n=e.length-1,p=h.length-1,A=!1,r;g<=n&&k<=p&&e[g]===h[k];)g++,k++;for(;g<=n&&k<=p&&e[n]===h[p];)n--,p--;for(var D=Array(p-k+1);g<=n;g++){m=e[g];A=!0;for(r=k;r<=p;r++)if(l=h[r],m===
l){A=!1;D[r-k]=!0;break}A&&c.remove(m)}for(g=k;g<=p;g++)D[g-k]||c.add(h[g])}else if(null!==h&&0<h.length)for(g=0;g<h.length;g++)c.add(h[g])}if(0!==(f&4))a=b.h=a.h,d=b.c,a.b!==d&&(a.b=d,a.a|=8),z(a);else if(f=a.g,b=b.g,c=0,g=!1,"string"===typeof f)if("string"===typeof b)f!==b&&((d=a.b.firstChild)?d.nodeValue=b:a.b.textContent=b);else{if(null!==b)for(;c<b.length;)V(a,b[c++],null,d)}else if("string"===typeof b){if(null!==f)for(;c<f.length;)W(a,f[c++]);a.b.textContent=b}else if(null!==f&&0!==f.length)if(null===
b||0===b.length)for(;c<f.length;)W(a,f[c++]);else if(1===f.length&&1===b.length)e=f[0],h=b[0],T(e,h)?L(e,h,d):(b=h,f=e,U(b,d),a.b.replaceChild(b.b,f.b),N(f),K(b,d));else if(1===f.length){e=f[0];if(0===(a.a&32))for(;c<b.length;){h=b[c++];if(T(e,h)){L(e,h,d);g=!0;break}V(a,h,e.b,d)}else for(;c<b.length;){h=b[c++];L(e,h,d);g=!0;break}if(g)for(;c<b.length;)V(a,b[c++],null,d);else W(a,e)}else if(1===b.length){h=b[0];if(0===(a.a&32))for(;c<f.length;){e=f[c++];if(T(e,h)){L(e,h,d);g=!0;break}W(a,e)}else for(;c<
f.length;){e=f[c++];L(e,h,d);g=!0;break}if(g)for(;c<f.length;)W(a,f[c++]);else V(a,h,null,d)}else if(0===(a.a&32)){e=c=0;g=f.length-1;for(h=b.length-1;c<=g&&e<=h;){k=f[c];l=b[e];if(!T(k,l))break;c++;e++;L(k,l,d)}for(;c<=g&&e<=h;){k=f[g];l=b[h];if(!T(k,l)){console.log(k,l);break}g--;h--;L(k,l,d)}for(;c<=g&&e<=h;)k=f[c++],l=b[e++],T(k,l)?L(k,l,d):(m=a,n=d,U(l,n),m.b.replaceChild(l.b,k.b),N(k),K(l,n));if(c<=g){do W(a,f[c++]);while(c<g)}else if(e<=h){f=h+1;f=f<b.length?b[f].b:null;do V(a,b[e++],f,d);
while(e<h)}}else{e=l=0;k=f.length-1;m=b.length-1;h=f[l];var c=b[e],J,n=0;a:do for(;;){L(h,c,d);l++;e++;if(l>k||e>m)break a;h=f[l];c=b[e]}while(l<=k&&e<=m);if(l>k)for(k=m+1,k=k<b.length?b[k].b:null;e<=m;)V(a,b[e++],k,d);else if(e>m)for(;l<=k;)W(a,f[l++]);else{p=k-l+1;c=m-e+1;h=Array(c);for(g=0;g<c;g++)h[g]=-1;A=!1;D=0;if(16>=p*c)for(g=l;g<=k;g++){var F=!0;r=f[g];for(l=e;l<=m;){J=b[l];h[l-e]=g;n>l?A=!0:n=l;L(r,J,d);F=!1;break}F&&(W(a,r),D++)}else{F={};for(g=e;g<=m;g++)F[null]=g;for(g=l;g<=k;g++)r=f[g],
l=F[null],void 0!==l?(J=b[l],h[l-e]=g,n>l?A=!0:n=l,L(r,J,d)):(W(a,r),D++)}if(A){g=h.slice(0);f=[];f.push(0);m=0;for(l=h.length;m<l;m++)if(-1!==h[m])if(k=f[f.length-1],h[k]<h[m])g[m]=k,f.push(m);else{k=0;for(n=f.length-1;k<n;)p=(k+n)/2|0,h[f[p]]<h[m]?k=p+1:n=p;h[m]<h[f[k]]&&(0<k&&(g[m]=f[k-1]),f[k]=m)}k=f.length;for(n=f[k-1];0<k--;)f[k]=n,n=g[n];l=f.length-1;for(g=c-1;0<=g;g--)-1===h[g]?(m=g+e,c=b[m],k=m+1,k=k<b.length?b[k].b:null,V(a,c,k,d)):0>l||g!==f[l]?(m=g+e,c=b[m],k=m+1,k=k<b.length?b[k].b:null,
a.b.insertBefore(c.b,k)):l--}else if(p-D!==c)for(g=c-1;0<=g;g--)-1===h[g]&&(m=g+e,c=b[m],k=m+1,k=k<b.length?b[k].b:null,V(a,c,k,d))}}else if(null!==b&&0<b.length)for(c=0;c<b.length;c++)V(a,b[c],null,d)}}function N(a){if(0!==(a.a&4))M(a.h);else if(null!==a.g&&(a=a.g,"string"!==typeof a))for(var b=0;b<a.length;b++)N(a[b])}function V(a,b,d,c){U(b,c);a.b.insertBefore(b.b,d);K(b,c)}function W(a,b){a.b.removeChild(b.b);N(b)};var ga=["popover","left"],X=new C;X.b=function(a){H(a,S(R(new B(8,null,null),ga),[S(Q(O("div"),"popover-content"),a.b),Q(O("div"),"arrow")]))};var ha=["elapsed","warn_long"],ia=["elapsed","warn"],ja=["elapsed","short"],ka=["label-important"],la=["label-warning"],ma=["label-success"];function na(a){if(!a)return"";var b=parseFloat(a).toFixed(2);60<a&&(b=(a%60).toFixed(2).split("."),b=Math.floor(a/60)+":"+b[0]+"."+b[1]);return b}var Y=new C;Y.c="tr";
Y.b=function(a){for(var b=a.b,d=ca(b),c=b.a.length,b=[S(Q(O("td"),"dbname"),b.name),S(Q(O("td"),"query-count"),[S(R(Q(O("span"),"label"),20<=c?ka:10<=c?la:ma),""+c)])],c=0;5>c;c++){var f=d[c],e=f.a;b.push(S(R(Q(O("td"),"Query"),10<=e?ha:1<=e?ia:ja),[new B(1,null,na(e)),P(X,f.b)]))}H(a,S(new B(8,null,null),b))};var oa=["table","table-striped","latest-data"],Z=new C;Z.c="table";Z.b=function(a){for(var b=a.b.a,d=Array(b.length),c=0;c<b.length;c++)d[c]=P(Y,b[c]);H(a,S(R(new B(8,null,null),oa),[S(O("tbody"),d)]))};function pa(a){var b=document.getElementById("app");a=E(Z,a,null);b.appendChild(a.c);z(a);return a};document.addEventListener("DOMContentLoaded",function(){function a(){for(var c=b.a,f=0;f<c.length;f++)c[f]=new t(c[f].name);Z.b(d);window.Monitoring.renderRate.ping();setTimeout(a,0)}var b=new da,d=pa(b);setTimeout(a,0)});}).call();
