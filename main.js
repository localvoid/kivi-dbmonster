(function(){'use strict';function q(a,b){this.a=a;this.b=b}var r=0;function t(a){r++;this.name=a;this.a=null;u(this)}function u(a){for(var b=[],c=Math.floor(10*Math.random()+1),d=0;d<c;d++){var f=15*Math.random(),e="SELECT blah FROM something";.2>Math.random()&&(e="<IDLE> in transaction");.1>Math.random()&&(e="vacuum");b.push(new q(f,e))}a.a=b}function v(a){a=a.a.slice();a.sort(function(a,c){return a.a-c.a});for(a=a.slice(0,5);5>a.length;)a.push(new q(0,""));return a};var w=null;function y(){this.i=this.a=0;this.h=-1;this.g=this.b=null;this.f=new z;this.c=new z;var a=this;new A(function(){a.a&=~B;a.a|=C;a.h++;var b=a.g;if(null!=b){a.g=null;for(var c=0;c<b.length;c++)b[c]()}a.i++;D(a);a.a&=~C});this.j=function(){var b,c,d,f,e,h;a.a&=~F;a.a|=C;a.h++;b=a.c;a.c=a.f;a.f=b;do{for(;0!==(b.a&G);){if(0!==(b.a&H))for(b.a&=~H,c=b.b,e=0;e<c.length;e++)if(d=c[e],null!=d)for(c[e]=null,h=0;h<d.length;h++)f=d[h],f();if(0!==(b.a&I))for(b.a&=~I,d=b.c,e=0;e<d.length;e++)f=d[e],f()}for(;0!==
(b.a&J);)for(b.a&=~J,d=b.f,b.f=null,e=0;e<d.length;e++)f=d[e],f()}while(0!==(b.a&G));for(;0!==(b.a&K);)for(b.a&=~K,d=b.g,e=0;e<d.length;e++)f=d[e],f();a.i++;D(a);a.a&=~C}}var C=1,B=2,F=4;function D(a){for(;null!=a.b;){var b=a.b;a.b=null;for(var c=0;c<b.length;c++)b[c]()}}function A(a){this.b=new window.MutationObserver(a);this.a=document.createTextNode("");this.b.observe(this.a,{characterData:!0})}function z(){this.a=0;this.b=[];this.g=this.f=this.c=null}var H=1,I=2,J=4,K=8,G=3;
function aa(a){var b,c;c=w;0===(c.a&F)&&(c.a|=F,window.requestAnimationFrame(c.j));c=c.c;var d;void 0===b&&(b=-1);if(-1===b)c.a|=I,null==c.c&&(c.c=[]),c.c.push(a);else{for(c.a|=H;b>=c.b.length;)c.b.push(null);d=c.b[b];null==d&&(d=c.b[b]=[]);d.push(a)}};function L(a,b,c){this.i=a;this.j=b;this.c=c;this.h=this.f=this.b=this.a=this.g=null}function M(a){return new L(2,a,null)}function N(a,b){return a.i===b.i&&a.j===b.j}
function O(a,b){var c,d,f=a.i,e;if(0!==(f&14)){c=a.f;if(0!==(f&6))e=null,null!=a.g&&(e=a.g),null!=a.a&&(d=a.a.join(" "),e=null==e?d:e+" "+d),null!=e&&(a.c=e,c.className=e);else if(null!=a.g&&(e=c.classList,e.add(a.g)),null!=a.a)for(void 0===e&&(e=c.classList),c=0,d=a.a.length;c<d;c++)e.add(a.a[c]);if(0!==(f&4))P(a.h);else if(null!=a.b)for(c=0,d=a.b.length;c<d;c++)R(a,a.b[c],null,b)}}
function S(a,b,c){var d=a.f,f=a.i,e,h;b.f=d;if(0!==(f&1))a.c!=b.c&&(a.f.nodeValue=b.c);else if(0!==(f&14)){if(0!==(f&2))a.a!==b.a?(null==b.c&&(h=b.g,null!=b.a&&(e=b.a.join(" "),h=null==h?e:h+" "+e),b.c=h),a.c!==b.c&&(null==b.c?d.className="":d.className=h)):b.c=a.c;else if(a.a!==b.a){e=a.a;h=b.a;var d=d.classList,g,k,l,m;if(null!=e&&0!==e.length)if(null==h||0===h.length)for(g=0;g<e.length;g++)d.remove(e[g]);else if(1===e.length&&1===h.length)k=e[0],l=h[0],k!==l&&(d.remove(k),d.add(l));else if(1===
e.length){k=e[0];m=-1;for(g=0;g<h.length;g++)if(l=h[g],k===l){m=g;break}else d.add(l);if(-1!==m)for(g=m+1;g<h.length;g++)d.add(h[g]);else d.remove(k)}else if(1===h.length){l=h[0];m=-1;for(g=0;g<e.length;g++)if(k=e[g],k===l){m=g;break}else d.remove(k);if(-1!==m)for(g=m+1;g<e.length;g++)d.remove(e[g]);else d.add(l)}else{m=g=0;for(var p=e.length-1,n=h.length-1,E=!1,x;g<=p&&m<=n&&e[g]===h[m];)g++,m++;for(;g<=p&&m<=n&&e[p]===h[n];)p--,n--;for(var Q=Array(n-m+1);g<=p;g++){k=e[g];E=!0;for(x=m;x<=n;x++)if(l=
h[x],k==l){E=!1;Q[x-m]=!0;break}E&&d.remove(k)}for(g=m;g<=n;g++)Q[g-m]||d.add(h[g])}else if(null!=h&&0<h.length)for(g=0;g<h.length;g++)d.add(h[g])}if(0!==(f&4))c=b.h=a.h,a.c!==b.c&&c.g.f(c,b.c),P(c);else if(f=a.b,b=b.b,d=0,g=!1,null!=f&&0!==f.length)if(null==b||0===b.length)for(;d<f.length;)T(a,f[d++]);else if(1===f.length&&1===b.length)e=f[0],h=b[0],N(e,h)?S(e,h,c):(T(a,e),R(a,h,null,c));else if(1===f.length){for(e=f[0];d<b.length;){h=b[d++];if(N(e,h)){S(e,h,c);g=!0;break}R(a,h,e.f,c)}if(g)for(;d<
b.length;)R(a,b[d++],null,c);else T(a,e)}else if(1===b.length){for(h=b[0];d<f.length;){e=f[d++];if(N(e,h)){S(e,h,c);g=!0;break}T(a,e)}if(g)for(;d<f.length;)T(a,f[d++]);else R(a,h,null,c)}else{e=d=0;g=f.length-1;for(h=b.length-1;d<=g&&e<=h;){k=f[d];l=b[e];if(!N(k,l))break;d++;e++;S(k,l,c)}for(;d<=g&&e<=h;){k=f[g];l=b[h];if(!N(k,l))break;g--;h--;S(k,l,c)}for(;d<=g&&e<=h;)k=f[d++],l=b[e++],N(k,l)?S(k,l,c):(R(a,l,k.f,c),T(a,k));for(;d<=g;)T(a,f[d++]);f=h+1;for(f=f<b.length?b[f].f:null;e<=h;)R(a,b[e++],
f,c)}else if(null!=b&&0<b.length)for(d=0;d<b.length;d++)R(a,b[d],null,c)}}function U(a){if(0!==(a.i&4))a=a.h,a.a&=-3,null!=a.c&&U(a.c);else if(null!=a.b)for(var b=0;b<a.b.length;b++)U(a.b[b])}function R(a,b,c,d){var f=b.i;0!==(f&1)?b.f=document.createTextNode(b.c):0!==(f&2)?b.f=0===(f&16)?document.createElement(b.j):document.createElementNS("http://www.w3.org/2000/svg",b.j):0!==(f&4)&&(f=V(b.j,b.c,d),b.f=f.f,b.h=f);a.f.insertBefore(b.f,c);O(b,d)}function T(a,b){a.f.removeChild(b.f);U(b)}
function W(){this.c="div";this.b=null;this.f=ba;this.a=null}function ca(a,b,c){this.a=3;this.g=a;this.h=null==b?0:b.h+1;this.b=c;this.c=null;this.f=document.createElement(a.c)}function X(a,b){null==a.c?(b.h=a,0!==(a.a&8)?a.a&=-9:(b.f=a.f,O(b,a))):S(a.c,b,a);a.c=b}function ba(a,b){a.b!==b&&(a.b=b,a.a|=1)}function V(a,b,c){b=new ca(a,c,b);null!=a.b&&a.b(b);return b}function P(a){3==(a.a&3)&&(a.g.a(a),a.a&=-2)};function da(a){this.a=a}var Y=new W;Y.a=function(a){var b=M("div");b.g="popover-content";b.b=[new L(1,null,a.b.a)];var c=M("div");c.g="arrow";var d=new L(8,null,null);d.a=ea;d.b=[b,c];X(a,d)};var ea=["popover","left"];function fa(a){this.a=a}var Z=new W;Z.c="table";Z.b=function(a){setInterval(function(){for(var b=a.b.a,c=0;c<b.length;c++)u(b[c]);Z.a(a);window.Monitoring.renderRate.ping()},0)};
Z.a=function(a){for(var b=a.b.a,c=Array(b.length),d=0;d<b.length;d++){var f=b[d],e=M("tr"),h=v(f),g=M("td");g.g="dbname";g.b=[new L(1,null,f.name)];var k=f.a.length,f=M("span");f.g="label";f.b=[new L(1,null,k.toString())];f.a=20<=k?ga:10<=k?ha:ia;k=M("td");k.g="query-count";k.b=[f];g=[g,k];for(f=0;5>f;f++){var l=h[f],k=l.a,m;k?(m=parseFloat(k).toFixed(2),60<k&&(m=(k%60).toFixed(2).split("."),m=Math.floor(k/60)+":"+m[0]+"."+m[1])):m="";m=new L(1,null,m);var l=new da(l.b),p=Y;void 0===l&&(l=null);l=
new L(4,p,l);p=M("td");p.g="Query";var n=[];n.push("elapsed");10<=k?n.push("warn_long"):1<=k?n.push("warn"):n.push("short");p.a=n;p.b=[m,l];g.push(p)}e.b=g;c[d]=e}b=M("tbody");b.b=c;c=new L(8,null,null);c.a=ja;c.b=[b];X(a,c)};var ja=["table","table-striped","latest-data"],ga=["label-important"],ha=["label-warning"],ia=["label-success"];document.addEventListener("DOMContentLoaded",function(){w=new y;for(var a=[],b=0;100>b;b++)a.push(new t("cluster"+b)),a.push(new t("cluster"+b+"slave"));aa(function(){var b=document.getElementById("app"),d=V(Z,new fa(a),null);b.appendChild(d.f);P(d)})});}).call();