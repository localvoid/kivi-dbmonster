(function(){'use strict';var n;function r(a){return"m"===a[2]?"http://www.w3.org/XML/1998/namespace":"http://www.w3.org/1999/xlink"}function u(a,c,b){"$"!==c[0]?a.setAttribute(c,b):a.setAttributeNS(r(c),c.substring(1),b)}function v(a,c){"$"!==c[0]?a.removeAttribute(c):a.removeAttributeNS(r(c),c.substring(1))}function w(a,c,b){this.a=a;this.tag=c;this.m=null;this.f=b;this.i=this.b=this.g=this.j=this.A=this.u=null}n=w.prototype;n.style=function(a){this.A=a;return this};n.className=function(a){this.j=a;return this};
n.children=function(a){this.g=a;return this};n.value=function(a){this.a|=512;this.g=a;return this};n.checked=function(a){this.a|=1024;this.g=a;return this};function x(a,c){return a.a===c.a&&a.tag===c.tag&&null===c.m}
n.create=function(a){var c=this.a;this.a&=-65;0!==(c&1)?this.b=document.createTextNode(this.f):0!==(c&2)?0===(c&524288)?this.b=0===(c&32768)?document.createElement(this.tag):document.createElementNS("http://www.w3.org/2000/svg",this.tag):this.b=this.tag.createElement():(a=A(this.tag,a),this.b=a.element,this.i=a)};
function B(a,c){var b,d,f,g,e=a.a,h;if(0!==(e&10)){h=a.b;if(0===(e&1048576)){var k=a.f;if(null!==k)for(g=Object.keys(k),b=0,d=g.length;b<d;b++)f=g[b],h[f]=k[f];if(null!==a.u)for(g=Object.keys(a.u),b=0,d=g.length;b<d;b++)f=g[b],u(h,f,a.u[f]);null!==a.A&&(0===(e&32768)?h.style.cssText=a.A:h.setAttribute("style",a.A));null!==a.j&&(0===(e&32768)?h.className=a.j:h.setAttribute("class",a.j))}else 0===(e&8)?a.tag.update(h,void 0,a.f):c.o.D.update(h,void 0,a.f);e=a.g;if(null!==e)if(0===(a.a&1536))if("string"===
typeof e)h.textContent=e;else for(b=0,d=e.length;b<d;b++)a.v(e[b],null,c);else 0!==(a.a&512)?a.b.value=a.g:a.b.checked=a.g}else 0!==(e&4)&&(b=a.i,h=a.b,null!==a.j&&(0===(e&32768)?h.className=a.j:h.setAttribute("class",a.j)),b.setData(a.f),b.S(a.g),b.update())}
function C(a,c,b){var d=a.a,f=a.g;a.b=c;if(0!==(d&4))f=a.tag,c=new D(f.C|4,f,b,c),c.G(),c=a.i=c,c.setData(a.f),c.S(a.g),c.update();else if(null!==f&&"string"!==typeof f&&0<f.length){for(var d=c.firstChild,g;8===d.nodeType;)g=d,d=d.nextSibling,c.removeChild(g);for(a=0;a<f.length;a++)for(C(f[a],d,b),d=d.nextSibling;8===d.nodeType;)g=d,d=d.nextSibling,c.removeChild(g)}}
n.l=function(a,c){var b=this.b,d=this.a,f;a.b=b;if(0!==(d&1))this.f!==a.f&&(this.b.nodeValue=a.f);else if(0!==(d&10)){if(0===(d&1048576)){if(this.f!==a.f)if(0===(this.a&256)){f=this.f;var g=a.f,e=Object.keys(f),h,k;for(k=0;k<e.length;k++){h=e[k];var p=g[h];f[h]!==p&&(b[h]=p)}}else if(f=this.f,g=a.f,null!==f)if(null===g)for(h=Object.keys(f),e=0;e<h.length;e++)b[h[e]]=void 0;else{h=Object.keys(f);for(e=0;e<h.length;e++)k=h[e],g.hasOwnProperty(k)?(p=g[k],f[k]!==p&&(b[k]=p)):b[k]=void 0;h=Object.keys(g);
for(e=0;e<h.length;e++)k=h[e],f.hasOwnProperty(k)||(b[k]=g[k])}else if(null!==g)for(h=Object.keys(g),e=0;e<h.length;e++)k=h[e],b[k]=g[k];if(this.u!==a.u)if(0===(this.a&128))for(f=this.u,g=a.u,e=Object.keys(f),k=0;k<e.length;k++)h=e[k],p=g[h],f[h]!==p&&u(b,h,p);else if(f=this.u,g=a.u,null!==f)if(null===g)for(h=Object.keys(f),e=0;e<h.length;e++)v(b,h[e]);else{h=Object.keys(f);for(e=0;e<h.length;e++)k=h[e],g.hasOwnProperty(k)?(p=g[k],f[k]!==p&&u(b,k,p)):v(b,k);h=Object.keys(g);for(e=0;e<h.length;e++)k=
h[e],f.hasOwnProperty(k)||u(b,k,g[k])}else if(null!==g)for(h=Object.keys(g),e=0;e<h.length;e++)k=h[e],u(b,k,g[k]);this.A!==a.A&&(f=null===a.A?"":a.A,0===(d&32768)?b.style.cssText=f:b.setAttribute("style",f));this.j!==a.j&&(f=null===a.j?"":a.j,0===(d&32768)?b.className=f:b.setAttribute("class",f))}else this.f!==a.f&&(0===(d&8)?this.tag.update(b,this.f,a.f):c.o.D.update(b,this.f,a.f));if(0===(this.a&1536)){if(this.g!==a.g)if(d=this.g,b=a.g,e=0,h=!1,"string"===typeof d)if(null===b)this.b.removeChild(this.b.firstChild);
else if("string"===typeof b)(d=this.b.firstChild)?d.nodeValue=b:this.b.textContent=b;else for(this.b.removeChild(this.b.firstChild);e<b.length;)this.v(b[e++],null,c);else if("string"===typeof b){if(null!==d)for(;e<d.length;)this.w(d[e++]);this.b.textContent=b}else if(null!==d&&0!==d.length)if(null===b||0===b.length)for(;e<d.length;)this.w(d[e++]);else if(1===d.length&&1===b.length)f=d[0],g=b[0],x(f,g)?f.l(g,c):this.N(g,f,c);else if(1===d.length){f=d[0];if(0===(this.a&16))for(;e<b.length;){g=b[e++];
if(x(f,g)){f.l(g,c);h=!0;break}this.v(g,f.b,c)}else for(;e<b.length;){g=b[e++];if(f.m===g.m){f.l(g,c);h=!0;break}this.v(g,f.b,c)}if(h)for(;e<b.length;)this.v(b[e++],null,c);else this.w(f)}else if(1===b.length){g=b[0];if(0===(this.a&16))for(;e<d.length;){f=d[e++];if(x(f,g)){f.l(g,c);h=!0;break}this.w(f)}else for(;e<d.length;){f=d[e++];if(f.m===g.m){f.l(g,c);h=!0;break}this.w(f)}if(h)for(;e<d.length;)this.w(d[e++]);else this.v(g,null,c)}else if(0===(this.a&16)){f=e=0;h=d.length-1;for(g=b.length-1;e<=
h&&f<=g;){k=d[e];p=b[f];if(!x(k,p))break;e++;f++;k.l(p,c)}for(;e<=h&&f<=g;){k=d[h];p=b[g];if(!x(k,p))break;h--;g--;k.l(p,c)}for(;e<=h&&f<=g;)k=d[e++],p=b[f++],x(k,p)?k.l(p,c):this.N(p,k,c);if(e<=h){do this.w(d[e++]);while(e<=h)}else if(f<=g){d=g+1;d=d<b.length?b[d].b:null;do this.v(b[f++],d,c);while(f<=g)}}else{var m=0;f=0;h=d.length-1;k=b.length-1;var e=d[m],g=b[f],l=d[h],q=b[k],t=!1,y,p=0;a:do{for(t=!0;e.m===g.m;){e.l(g,c);m++;f++;if(m>h||f>k)break a;e=d[m];g=b[f];t=!1}for(;l.m===q.m;){l.l(q,c);
h--;k--;if(m>h||f>k)break a;l=d[h];q=b[k];t=!1}for(;e.m===q.m;){e.l(q,c);e=k+1;e=e<b.length?b[e].b:null;this.L(q,e);m++;k--;if(m>h||f>k)break a;e=d[m];q=b[k];t=!1;continue a}for(;l.m===g.m;){l.l(g,c);this.L(g,e.b);h--;f++;if(m>h||f>k)break a;l=d[h];g=b[f];t=!1;continue a}}while(!t&&m<=h&&f<=k);if(m>h)for(e=k+1,e=e<b.length?b[e].b:null;f<=k;)this.v(b[f++],e,c);else if(f>k)for(;m<=h;)this.w(d[m++]);else{t=h-m+1;e=k-f+1;g=Array(e);for(l=0;l<e;l++)g[l]=-1;var I=!1,J=0;if(16>=t*e)for(l=m;l<=h;l++){for(var z=
!0,q=d[l],m=f;m<=k;m++)if(y=b[m],q.m===y.m){g[m-f]=l;p>m?I=!0:p=m;q.l(y,c);z=!1;break}z&&(this.w(q),J++)}else{z=new Map;for(l=f;l<=k;l++)q=b[l],z.set(q.m,l);for(l=m;l<=h;l++)q=d[l],m=z.get(q.m),void 0!==m?(y=b[m],g[m-f]=l,p>m?I=!0:p=m,q.l(y,c)):(this.w(q),J++)}if(I){h=g.slice(0);d=[];d.push(0);k=0;for(p=g.length;k<p;k++)if(-1!==g[k])if(l=d[d.length-1],g[l]<g[k])h[k]=l,d.push(k);else{l=0;for(m=d.length-1;l<m;)q=(l+m)/2|0,g[d[q]]<g[k]?l=q+1:m=q;g[k]<g[d[l]]&&(0<l&&(h[k]=d[l-1]),d[l]=k)}l=d.length;for(m=
d[l-1];0<l--;)d[l]=m,m=h[m];m=d.length-1;for(l=e-1;0<=l;l--)-1===g[l]?(e=l+f,q=b[e],e+=1,e=e<b.length?b[e].b:null,this.v(q,e,c)):0>m||l!==d[m]?(e=l+f,q=b[e],e+=1,e=e<b.length?b[e].b:null,this.L(q,e)):m--}else if(t-J!==e)for(l=e-1;0<=l;l--)-1===g[l]&&(e=l+f,q=b[e],e+=1,e=e<b.length?b[e].b:null,this.v(q,e,c))}}else if(null!==b&&0<b.length)for(e=0;e<b.length;e++)this.v(b[e],null,c)}else 0!==(d&512)?b.value!==a.g&&(b.value=a.g):b.checked!==a.g&&(b.checked=a.g)}else this.j!==a.j&&(f=null===a.j?"":a.j,
0===(d&32768)?b.className=f:b.setAttribute("class",f)),b=a.i=this.i,b.setData(a.f),b.S(a.g),b.update()};n.F=function(){if(0===(this.a&4)){var a=this.g;if(null!==a&&"string"!==typeof a)for(var c=0;c<a.length;c++)a[c].F()}else this.i.F()};n.G=function(){0!==(this.a&4)&&this.i.F()};n.detach=function(){if(0===(this.a&4)){var a=this.g;if(null!==a&&"string"!==typeof a)for(var c=0;c<a.length;c++)a[c].detach()}else this.i.detach()};
n.I=function(){if(0!==(this.a&4))this.i.I();else if(null!==this.g){var a=this.g;if("string"!==typeof a)for(var c=0;c<a.length;c++)a[c].I()}};n.v=function(a,c,b){0!==(this.a&32)&&null!==a.i.o.v?a.i.o.v(a.i,this,a):null===a.b?(a.create(b),this.b.insertBefore(a.b,c),a.G(),B(a,b)):(this.b.insertBefore(a.b,c),a.F())};
n.N=function(a,c,b){0!==(this.a&32)&&null!==a.i.o.N?a.i.o.N(a.i,this,a):(null===a.b?(a.create(b),this.b.replaceChild(a.b,c.b),a.G(),B(a,b)):(this.b.replaceChild(a.b,c.b),a.F()),0===(c.a&2048)?c.I():c.detach())};n.L=function(a,c){0!==(this.a&32)&&null!==a.i.o.L?a.i.o.L(a.i,this):this.b.insertBefore(a.b,c)};n.w=function(a){0!==(this.a&32)&&null!==a.i.o.w?a.i.o.w(a.i):(this.b.removeChild(a.b),0===(a.a&2048)?a.I():a.detach())};
function aa(a){this.h=new MutationObserver(a);this.c=document.createTextNode("");this.h.observe(this.c,{characterData:!0})}function ba(a){var c=this.c="__kivi"+Math.random().toString();window.addEventListener("message",function(b){b.source===window&&b.data===c&&a()})}function E(){this.a=0;this.c=[];this.focus=this.s=this.h=this.B=null}function F(a){0===(a.a&8)&&(a.a|=8,requestAnimationFrame(a.O))}
var G=new function(){var a=this;this.da=function(){a.a|=1;for(a.c=Date.now();0<a.h.length;){var c=a.h;a.h=[];for(var b=0;b<c.length;b++)c[b]()}a.B++;a.a&=-4};this.V=function(){a.a&=-5;a.a|=1;a.c=Date.now();var c=a.K;a.K=[];for(var b=0;b<c.length;b++)c[b]();a.B++;a.a&=-2};this.O=function(){var c=a.ea,b,d;a.a&=-9;a.a|=1;a.c=Date.now();var f=a.s;a.s=a.J;a.J=f;for(d=0;d<c.length;d++)b=c[d],b.a|=8;do{for(;0!==(f.a&3);){if(0!==(f.a&1)){f.a&=-2;var g=f.c;for(d=0;d<g.length;d++){var e=g[d];if(null!==e)for(g[d]=
null,b=0;b<e.length;b++)e[b].update()}}if(0!==(f.a&2))for(f.a&=-3,b=f.B,d=0;d<b.length;d++)b[d]()}d=0;for(b=c.length;d<b;)g=c[d++],0===(g.a&16)?(g.a&=-33,d===b?c.pop():c[--d]=c.pop()):g.update();for(;0!==(f.a&4);)for(f.a&=-5,b=f.h,f.h=null,d=0;d<b.length;d++)b[d]()}while(0!==(f.a&3));for(;0!==(f.a&8);)for(f.a&=-9,b=f.s,d=0;d<b.length;d++)b[d]();null!==f.focus&&(f.focus.constructor===w?f.focus.b.focus():f.focus.focus(),f.focus=null);0<c.length&&F(a);a.B++;a.a&=-2};this.a=0;this.B=1;this.c=0;this.h=
[];this.K=[];this.J=new E;this.s=new E;this.ea=[];new aa(this.da);new ba(this.V)};function H(a,c,b,d){this.c=a;this.R=c;this.s=b;this.h=d}H.prototype.P=function(){0!==(this.c&1)?this.s.P():this.h()};function K(a){this.C=524288;this.D=a;this.j=this.A=this.u=this.f=null}n=K.prototype;n.style=function(a){this.A=a;return this};n.className=function(a){this.j=a;return this};n.H=function(a){return new w(2|this.C,this,void 0===a?null:a)};
n.createElement=function(){var a,c,b,d;a=document.createElement(this.D);if(null!==this.f)for(b=Object.keys(this.f),c=0;c<b.length;c++)d=b[c],a[d]=this.f[d];if(null!==this.u)for(b=Object.keys(this.u),c=0;c<b.length;c++)d=b[c],u(a,d,this.u[d]);null!==this.A&&(a.style.cssText=this.A);null!==this.j&&(a.className=this.j);return a};n.update=function(a,c,b){null(a,c,b)};function L(){this.C=8;this.a=0;this.D="div";this.Y=this.ca=this.X=this.T=this.Z=this.$=null}
function M(a){var c=new L;c.C|=a.C;c.a|=a.C;c.D=a;return c}n=L.prototype;n.setData=function(a){this.$=a;return this};n.S=function(a){this.Z=a;return this};n.update=function(a){this.T=a;return this};n.G=function(a){this.X=a;return this};n.H=function(a){return new w(4,this,void 0===a?null:a)};function A(a,c){var b;0===(a.a&524288)?b=0===(a.a&32768)?document.createElement(a.D):document.createElementNS("http://www.w3.org/2000/svg",a.D):b=a.D.createElement();return new D(a.C,a,c,b)}
function D(a,c,b,d){this.a=a;this.o=c;this.depth=null===b?0:b.depth+1;this.children=this.data=null;this.element=d;this.c=0===(a&65536)?null:d.getContext("2d");this.s=this.h=null}n=D.prototype;n.setData=function(a){var c=this.o.$;null===c?this.data!==a&&(this.data=a,this.a|=8):c(this,a)};n.S=function(a){var c=this.o.Z;null!==c&&c(this,a)};n.update=function(){10===(this.a&10)&&(this.o.T(this),this.a&=-9)};
n.l=function(a){null===this.c?(a.i=this,0!==(this.a&4)?(C(a,this.element,this),this.a&=-5):(a.b=this.element,B(a,this))):this.c.l(a,this);this.c=a};n.P=function(){if(0===(this.a&9)){this.a|=8;ca(this);var a;F(G);a=G.s;var c=this.depth;for(a.a|=1;c>=a.c.length;)a.c.push(null);var b=a.c[c];null===b&&(b=a.c[c]=[]);b.push(this)}};n.F=function(){this.G();null!==this.c&&0===(this.a&65536)&&this.c.F()};n.G=function(){this.a|=2;var a=this.o.X;null!==a&&a(this)};
n.detach=function(){null!==this.c&&0===(this.a&65536)&&this.c.detach();da(this)};function da(a){a.a&=-19;var c=a.h;if(null!==c)if(c.constructor===H)N(c.R,c);else for(var b=0;b<c.length;b++){var d=c[b];N(d.R,d)}a.h=null;ca(a);c=a.o.ca;null!==c&&c(a)}n.I=function(){this.a|=1;null!==this.c&&0===(this.a&65536)&&this.c.I();0!==(this.a&2)&&da(this);null!==this.o.Y&&this.o.Y(this)};function N(a,c){var b=a.h;b.constructor===H||1===b.length?a.h=null:b[b.indexOf(c)]=b.pop()}
function ca(a){var c=a.s;if(null!==c)if(c.constructor===H)N(c.R,c);else for(var b=0;b<c.length;b++){var d=c[b];N(d.R,d)}a.s=null}function ea(a){var c=document.getElementById("app"),b=A(fa,null);c.appendChild(b.element);b.G();b.setData(a);b.update();return b}function ga(a,c){this.U=a;this.fa=c}var ha=new ga(0,"");function O(a){ia++;this.name=a;this.W=null;this.update()}
O.prototype.update=function(){for(var a=[],c=Math.floor(10*Math.random()+1),b=0;b<c;b++)a.push(new ga(15*Math.random(),.1>Math.random()?"vacuum":.2>Math.random()?"<IDLE> in transaction":"SELECT blah FROM something"));this.W=a};function ja(a){a=a.W.slice();a.sort(function(a,b){return a.U-b.U});for(a=a.slice(0,5);5>a.length;)a.push(ha);return a}var ia=0;function ka(a){this.M=[];for(var c=0;c<a;c++)this.M.push(new O("cluster"+c)),this.M.push(new O("cluster"+c+"slave"))}
ka.prototype.update=function(){for(var a=this.M,c=0;c<a.length;c++)a[c]=new O(a[c].name)};var P=(new K("div")).className("popover left"),la=(new K("div")).className("popover-content"),ma=(new K("div")).className("arrow"),na=M(P).update(function(a){a.l((new w(8|P.C,P,null)).children([la.H().children(a.data),ma.H()]))});function oa(a){if(!a)return"";if(60<a){var c=(a%60).toFixed(2).split(".");return Math.floor(a/60)+":"+c[0]+"."+c[1]}return a.toFixed(2)}
var pa=(new K("td")).className("dbname"),qa=(new K("td")).className("query-count"),ra=new L;ra.D="tr";
var sa=ra.update(function(a){var c=a.data,b=ja(c),d=c.W.length,f=Array(7);f[0]=pa.H().children(c.name);f[1]=qa.H().children([(new w(2,"span",null)).className(20<=d?"label label-important":10<=d?"label label-warning":"label label-success").children(""+d)]);for(c=0;5>c;c++){var d=b[c],g=d.U;f[c+2]=(new w(2,"td",null)).className(10<=g?"Query elapsed warn_long":1<=g?"Query elapsed warn":"Query elapsed short").children([new w(1,null,oa(g)),na.H(d.fa)])}a.l((new w(8,null,null)).children(f))}),Q=(new K("table")).className("table table-striped latest-data"),
fa=M(Q).update(function(a){for(var c=a.data.M,b=Array(c.length),d=0;d<c.length;d++)b[d]=sa.H(c[d]);a.l((new w(8|Q.C,Q,null)).children([(new w(2,"tbody",null)).children(b)]))}),R=null,S=[],ta=-1;function ua(a){S.push(a);-1===ta&&requestAnimationFrame(function(){ta=-1;var a=S;S=[];for(var b=0;b<a.length;b++)a[b]()})}function va(a,c,b,d){this.min=a;this.max=c;this.aa=b;this.now=d}function T(){this.c=[]}function U(a,c){100===a.c.length&&a.c.shift();a.c.push(c)}
function V(a){for(var c=a.c[0],b=a.c[0],d=0,f=0;f<a.c.length;f++){var g=a.c[f];g<c&&(c=g);g>b&&(b=g);d+=g}return new va(c,b,d/a.c.length,a.c[a.c.length-1])}
function W(a,c,b){b=void 0===b?0:b;var d=this;this.V=function(){var a=d.c[d.c.length-1],b=30/(1.2*a.max);console.log(d.a);d.O.innerHTML=""+(0===(d.a&1)?"<div>min: &nbsp;"+a.aa.toFixed(2)+d.B+"</div>":"")+(0===(d.a&2)?"<div>max: &nbsp;"+a.max.toFixed(2)+d.B+"</div>":"")+(0===(d.a&4)?"<div>mean: "+a.aa.toFixed(2)+d.B+"</div>":"")+(0===(d.a&8)?"<div>now: &nbsp;"+a.now.toFixed(2)+d.B+"</div>":"");if(0===(d.a&16))for(d.s.fillStyle="#010",d.s.fillRect(0,0,100,30),d.s.fillStyle="#0f0",a=0;a<d.c.length;a++)d.s.fillRect(a,
30,1,-(d.c[a].now*b));d.K=!1};this.name=a;this.B=c;this.a=b;this.c=[];this.element=document.createElement("div");this.element.style.cssText="padding: 2px;background-color: #020;font-family: monospace;font-size: 12px;color: #0f0";this.J=document.createElement("div");this.J.style.cssText="text-align: center";this.J.textContent=this.name;this.O=document.createElement("div");this.element.appendChild(this.J);this.element.appendChild(this.O);0===(b&16)?(this.h=document.createElement("canvas"),this.h.style.cssText=
"display: block; padding: 0; margin: 0",this.h.width=100,this.h.height=30,this.s=this.h.getContext("2d"),this.element.appendChild(this.h)):this.s=this.h=null;this.K=!1}function X(a,c){100===a.c.length&&a.c.shift();a.c.push(c);a.P()}W.prototype.P=function(){this.K||(this.K=!0,ua(this.V))};
function wa(){function a(g){var e=1/((g-(0===f?g:f))/1E3);if(Infinity!==e){64===d.length&&d.shift();d.push(e);for(var h=e=0;h<d.length;h++)e+=d[h];U(c,e/d.length);X(b,V(c))}f=g;requestAnimationFrame(a)}R||(R=document.createElement("div"),R.style.cssText="position: fixed;opacity: 0.9;right: 0;bottom: 0",document.body.appendChild(R));var c=new T,b=new W("FPS","fps",7);R.appendChild(b.element);var d=[],f=0;requestAnimationFrame(a)}
function xa(){if(void 0!==performance.memory){var a=function(){U(c,Math.round(d.usedJSHeapSize/1048576));X(b,V(c));setTimeout(a,30)},c=new T,b=new W("Memory","MB",5);R.appendChild(b.element);var d=performance.memory;a()}}function ya(a){this.data=new T;this.ba=new W(a,"ms");this.startTime=0}var Y={};function za(a){a=Y[a];void 0!==a&&(a.startTime=performance.now())}function Aa(a){var c=performance.now();a=Y[a];void 0!==a&&(U(a.data,c-a.startTime),X(a.ba,V(a.data)))}
function Ba(a){var c=Y[a];void 0===c&&(Y[a]=c=new ya(a),R.appendChild(c.ba.element))}var Z=.5;
document.addEventListener("DOMContentLoaded",function(){function a(){za("data update");for(var b=Z,d=c.M,f=0;f<d.length;f++)Math.random()<b&&(d[f]=new O(d[f].name));Aa("data update");za("view update");fa.T(g);Aa("view update");requestAnimationFrame(a)}wa();xa();Ba("data update");Ba("view update");var c=new ka(50),b=document.createElement("div");b.style.display="flex";var d=document.createElement("input");d.type="range";d.style.marginBottom="10px";d.style.marginTop="5px";var f=document.createElement("label");
f.textContent="mutations : "+(100*Z).toFixed(0)+"%";d.addEventListener("change",function(a){Z=Number.parseFloat(a.target.value)/100;f.textContent="mutations : "+(100*Z).toFixed(0)+"%"});b.appendChild(f);b.appendChild(d);document.body.insertBefore(b,document.body.firstChild);var g=ea(c);requestAnimationFrame(a)});}).call();
