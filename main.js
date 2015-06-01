!function e(t,n,r){function s(i,a){if(!n[i]){if(!t[i]){var o="function"==typeof require&&require;if(!a&&o)return o(i,!0);if(l)return l(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[i]={exports:{}};t[i][0].call(f.exports,function(e){var n=t[i][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[i].exports}for(var l="function"==typeof require&&require,i=0;i<r.length;i++)s(r[i]);return s}({1:[function(e){"use strict";function t(){s.init(new l);for(var e=[],t=0;r>t;t++)e.push(new i.Database("cluster"+t)),e.push(new i.Database("cluster"+t+"slave"));s.nextFrame().write(function(){s.vdom.inject(a,{dbs:e,interval:n},document.body)})}var n=0,r=100,s=e("kivi"),l=e("kivi/lib/scheduler"),i=e("./data"),a=e("./component/main");document.addEventListener("DOMContentLoaded",function(){t()})},{"./component/main":8,"./data":10,kivi:3,"kivi/lib/scheduler":4}],2:[function(e,t){"use strict";var n={scheduler:null};t.exports=n},{}],3:[function(e,t){"use strict";function n(e){i.scheduler=e}function r(){return i.scheduler.nextFrame()}function s(e){i.scheduler.scheduleMicrotask(e)}function l(e){i.scheduler.action(e)}var i=e("./env"),a=e("./vdom"),o=e("./utils");t.exports={ENV:i,vdom:a,init:n,nextFrame:r,scheduleMicrotask:s,action:l,toFastObj:o.toFastObj,inherits:o.inherits,shallowEq:o.shallowEq}},{"./env":2,"./utils":5,"./vdom":6}],4:[function(e,t){"use strict";function n(e){this._observer=new window.MutationObserver(e),this._node=document.createTextNode(""),this._observer.observe(this._node,{characterData:!0})}function r(){this.flags=0,this.writeTaskGroups=[],this.writeTasks=null,this.readTasks=null,this.afterTasks=null}function s(){this.flags=0,this.dataClock=0,this.clock=-1,this._actions=null,this._microtasks=null,this._currentFrame=new r,this._nextFrame=new r;var e=this;this._microtaskScheduler=new n(function(){e.flags&=~h,e.flags|=f,e.clock++;var t=e._microtasks;if(null!=t){e._microtasks=null;for(var n=0;n<t.length;n++)t[n]()}e.dataClock++,e.performActions(),e.flags&=~f}),this._handleAnimationFrame=function(){var t,n,r,s,h,d;e.flags&=~c,e.flags|=f,e.clock++,t=e._nextFrame,e._nextFrame=e._currentFrame,e._currentFrame=t;do{for(;0!==(t.flags&u);){if(0!==(t.flags&l))for(t.flags&=~l,n=t.writeTaskGroups,h=0;h<n.length;h++)if(r=n[h],null!=r)for(n[h]=null,d=0;d<r.length;d++)(s=r[d])();if(0!==(t.flags&i))for(t.flags&=~i,r=t.writeTasks,h=0;h<r.length;h++)(s=r[h])()}for(;0!==(t.flags&a);)for(t.flags&=~a,r=t.readTasks,t.readTasks=null,h=0;h<r.length;h++)(s=r[h])()}while(0!==(t.flags&u));for(;0!==(t.flags&o);)for(t.flags&=~o,r=t.afterTasks,h=0;h<r.length;h++)(s=r[h])();e.dataClock++,e.performActions(),e.flags&=~f}}n.prototype.requestNextTick=function(){this._toggle^=1,this._node.data=this._toggle};var l=4,i=8,a=16,o=32,u=i|l;r.prototype.write=function(e,t){var n;if(void 0===t&&(t=-1),-1===t)this.flags|=i,null==this.writeTasks&&(this.writeTasks=[]),this.writeTasks.push(e);else{for(this.flags|=l;t>=this.writeTaskGroups.length;)this.writeTaskGroups.push(null);n=this.writeTaskGroups[t],null==n&&(n=this.writeTaskGroups[t]=[]),n.push(e)}},r.prototype.read=function(e){this.flags|=a,null==this.readTasks&&(this.readTasks=[]),this.readTasks.push(e)},r.prototype.after=function(e){this.flags|=o,null==this.afterTasks&&(this.afterTasks=[]),this.afterTasks.push(e)};var f=1,h=2,c=4,d=8,p=16;s.RUNNING=f,s.FRAMETASK_RUNNING=p,s.MICROTASK_RUNNING=d,s.prototype.currentFrame=function(){return this._currentFrame},s.prototype.nextFrame=function(){return 0===(this.flags&c)&&(this.flags|=c,window.requestAnimationFrame(this._handleAnimationFrame)),this._nextFrame},s.prototype.scheduleMicrotask=function(e){0===(this.flags&h)&&(this.flags|=h,this._microtaskScheduler.requestNextTick()),null==this._microtasks&&(this._microtasks=[]),this._microtasks.push(e)},s.prototype.action=function(e){0===(this.flags&h)&&(this.flags|=h,this._microtaskScheduler.requestNextTick()),null==this._actions&&(this._actions=[]),this._actions.push(e)},s.prototype.performActions=function(){for(;null!=this._actions;){var e=this._actions;this._actions=null;for(var t=0;t<e.length;t++)e[t]()}},t.exports=s},{}],5:[function(e,t){"use strict";function n(e,t){function n(){}n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}function r(e,t){var n,r,s;for(s=Object.keys(e),n=0;n<s.length;n++)if(r=s[n],!t.hasOwnProperty(r)||e[r]!==t[r])return!1;for(s=Object.keys(t),n=0;n<s.length;n++)if(!e.hasOwnProperty(r))return!1;return!0}t.exports={inherits:n,shallowEq:r}},{}],6:[function(e,t){"use strict";function n(e,t,n,r){this.flags=e,this.key=t,this.tag=n,this.data=r,this.type=null,this.attrs=null,this.customAttrs=null,this.style=null,this.classes=null,this.children=null,this.ref=null,this.cref=null}function r(e){return new n(C,null,null,e)}function s(e,t){return new n(C,e,null,t)}function l(e){return new n(S,null,e,null)}function i(e,t){return new n(S,e,t,null)}function a(e){return new n(S|U,null,e,null)}function o(e,t){return new n(S|U,e,t,null)}function u(e,t){return void 0===t&&(t=null),new n(L,null,e,t)}function f(e,t,r){return void 0===r&&(r=null),new n(L,e,t,r)}function h(){return new n(I,null,null,null)}function c(e,t){return e.flags===t.flags&&e.tag===t.tag}function d(e,t){var n=e.flags;if(0!==(n&C))e.ref=document.createTextNode(e.data);else if(0!==(n&S))e.ref=0===(n&U)?document.createElement(e.tag):document.createElementNS("http://www.w3.org/2000/svg",e.tag);else if(0!==(n&L)){var r=M(e.tag,e.data,e.children,t);e.ref=r.element,e.cref=r}}function p(e,t){var n,r,s,l,i,a,o,u,f=e.flags;if(0!==(f&(S|L|I))){if(i=e.ref,null!=e.attrs)for(l=Object.keys(e.attrs),n=0,r=l.length;r>n;n++)s=l[n],i.setAttribute(s,e.attrs[s]);if(null!=e.style)for(a=i.style,l=Object.keys(e.style),n=0,r=l.length;r>n;n++)s=l[n],a.setProperty(s,e.style[s]);if(0!==(f&(S|L))){if(o=null,null!=e.type&&(o=e.type),null!=e.classes){var h=e.classes.join(" ");o=null==o?h:o+" "+h}null!=o&&(e.data=o,i.className=o)}else if(u=null,null!=e.type&&(u=i.classList,u.add(e.type)),null!=e.classes)for(null==u&&(u=i.classList),n=0,r=e.classes.length;r>n;n++)u.add(e.classes[n]);if(0!==(f&L))q(e.cref);else if(null!=e.children)for(n=0,r=e.children.length;r>n;n++)w(e,e.children[n],null,t)}}function g(e,t,n){var r,s,l,i=e.ref,a=e.flags;t.ref=i,0!==(a&C)?e.data!=t.data&&(e.ref.nodeValue=t.data):0!==(a&(S|L|I))&&(e.attrs!==t.attrs&&v(e.attrs,t.attrs,i),e.style!==t.style&&y(e.style,t.style,i.style),0!==(a&S)?e.classes!==t.classes?(null==t.data&&(s=t.type,null!=t.classes&&(r=t.classes.join(" "),s=null==s?r:s+" "+r),t.data=s),e.data!==t.data&&(i.className=null==t.data?"":s)):t.data=e.data:e.classes!==t.classes&&k(e.classes,t.classes,i.classList),0!==(a&L)?(l=t.cref=e.cref,l.descriptor.setData(l,t.data),q(l)):T(e,e.children,t.children,n))}function v(e,t,n){var r,s,l,i,a,o;if(null!=e)if(null==t)for(i=Object.keys(e),r=0,s=i.length;s>r;r++)n.removeAttribute(i[r]);else{for(i=Object.keys(e),r=0,s=i.length;s>r;r++)l=i[r],t.hasOwnProperty(l)?(a=e[l],o=t[l],a!==o&&n.setAttribute(l,o)):n.removeAttribute(l);for(i=Object.keys(t),r=0,s=i.length;s>r;r++)l=i[r],e.hasOwnProperty(l)||n.setAttribute(l,t[l])}else if(null!=t)for(i=Object.keys(t),r=0,s=i.length;s>r;r++)l=i[r],n.setAttribute(l,t[l])}function y(e,t,n){var r,s,l,i;if(null!=e)if(null==t)for(i=Object.keys(e),r=0,s=i.length;s>r;r++)n.removeProperty(i[r]);else{for(i=Object.keys(e),r=0,s=i.length;s>r;r++)l=i[r],t.hasOwnProperty(l)?n.setProperty(l,t[l],""):n.removeProperty(l);for(i=Object.keys(t),r=0,s=i.length;s>r;r++)l=i[r],e.hasOwnProperty(l)||n.setProperty(l,t[l],"")}else if(null!=t)for(i=Object.keys(t),r=0,s=i.length;s>r;r++)l=i[r],n.setProperty(l,t[l],"")}function k(e,t,n){var r,s,l,i;if(null!=e&&0!==e.length)if(null==t||0===t.length)for(r=0;r<e.length;r++)n.remove(e[r]);else if(1===e.length&&1===t.length)s=e[0],l=t[0],s!==l&&(n.remove(s),n.add(l));else if(1===e.length){for(s=e[0],i=-1,r=0;r<t.length;r++){if(l=t[r],s===l){i=r;break}n.add(l)}if(-1!==i)for(r=i+1;r<t.length;r++)n.add(t[r]);else n.remove(s)}else if(1===t.length){for(l=t[0],i=-1,r=0;r<e.length;r++){if(s=e[r],s===l){i=r;break}n.remove(s)}if(-1!==i)for(r=i+1;r<e.length;r++)n.remove(e[r]);else n.add(l)}else{for(var a,o=0,u=0,f=e.length-1,h=t.length-1,c=!1;f>=o&&h>=u&&e[o]===t[u];)o++,u++;for(;f>=o&&h>=u&&e[f]===t[h];)f--,h--;var d=new Array(h-u+1);for(r=o;f>=r;r++){for(s=e[r],c=!0,a=u;h>=a;a++)if(l=t[a],s==l){c=!1,d[a-u]=!0;break}c&&n.remove(s)}for(r=u;h>=r;r++)d[r-u]||n.add(t[r])}else if(null!=t&&t.length>0)for(r=0;r<t.length;r++)n.add(t[r])}function m(e){if(0!==(e.flags&L))j(e.cref);else if(null!=e.children)for(var t=0;t<e.children.length;t++)m(e.children[t])}function w(e,t,n,r){d(t,r),e.ref.insertBefore(t.ref,n),p(t,r)}function b(e,t,n){e.ref.insertBefore(t.ref,n)}function _(e,t){e.ref.removeChild(t.ref),m(t)}function T(e,t,n,r){var s,l,i=0,a=!1;if(null!=t&&0!==t.length)if(null==n||0===n.length)for(;i<t.length;)_(e,t[i++]);else if(1===t.length&&1===n.length)s=t[0],l=n[0],null==s.key&&c(s,l)||null!=s.key&&s.key===l.key?g(s,l,r):(_(e,s),w(e,l,null,r));else if(1===t.length){if(s=t[0],null==s.key)for(;i<n.length;){if(l=n[i++],c(s,l)){g(s,l,r),a=!0;break}w(e,l,s.ref,r)}else for(;i<n.length;){if(l=n[i++],s.key===l.key){g(s,l,r),a=!0;break}w(e,l,s.ref,r)}if(a)for(;i<n.length;)w(e,n[i++],null,r);else _(e,s)}else if(1===n.length){if(l=n[0],null==l.key)for(;i<t.length;){if(s=t[i++],c(s,l)){g(s,l,r),a=!0;break}_(e,s)}else for(;i<t.length;){if(s=t[i++],s.key===l.key){g(s,l,r),a=!0;break}_(e,s)}if(a)for(;i<t.length;)_(e,t[i++]);else w(e,l,null,r)}else null==t[0].key?O(e,t,n,r):N(e,t,n,r);else if(null!=n&&n.length>0)for(i=0;i<n.length;i++)w(e,n[i],null,r)}function O(e,t,n,r){for(var s,l,i,a,o=0,u=0,f=t.length-1,h=n.length-1;f>=o&&h>=u&&(s=t[o],l=n[u],c(s,l));)o++,u++,g(s,l,r);for(;f>=o&&h>=u&&(s=t[f],l=n[h],c(s,l));)f--,h--,g(s,l,r);for(;f>=o&&h>=u;)s=t[o++],l=n[u++],c(s,l)?g(s,l,r):(w(e,l,s.ref,r),_(e,s));for(;f>=o;)_(e,t[o++]);for(i=h+1,a=i<n.length?n[i].ref:null;h>=u;)w(e,n[u++],a,r)}function N(e,t,n,r){var s,l,i,a,o,u,f,h,c=0,d=0,p=t.length-1,v=n.length-1,y=t[c],k=n[d],m=t[p],T=n[v],O=!1,N=0;e:do{for(O=!0;y.key===k.key;){if(g(y,k,r),c++,d++,c>p||d>v)break e;y=t[c],k=n[d],O=!1}for(;m.key===T.key;){if(g(m,T,r),p--,v--,c>p||d>v)break e;m=t[p],T=n[v],O=!1}for(;y.key===T.key;){if(g(y,T,r),i=v+1,a=i<n.length?n[i].ref:null,b(e,T,a),c++,v--,c>p||d>v)break e;y=t[c],T=n[v],O=!1;continue e}for(;m.key===k.key;){if(g(m,k,r),b(e,k,y.ref),p--,d++,c>p||d>v)break e;m=t[p],k=n[d],O=!1}}while(!O&&p>=c&&v>=d);if(c>p)for(i=v+1,a=i<n.length?n[i].ref:null;v>=d;)w(e,n[d++],a,r);else if(d>v)for(;p>=c;)_(e,t[c++]);else{var F=p-c+1,A=v-d+1,E=new Array(A);for(s=0;A>s;s++)E[s]=-1;var M=!1,q=0;if(16>=F*A)for(s=c;p>=s;s++){var j=!0;for(o=t[s],l=d;v>=l;l++)if(u=n[l],o.key===u.key){E[l-d]=s,N>l?M=!0:N=l,g(o,u,r),j=!1;break}j&&(_(e,o),q++)}else{var D={};for(s=d;v>=s;s++)h=n[s],D[h.key]=s;for(s=c;p>=s;s++)o=t[s],l=D[o.key],void 0!==l?(u=n[l],E[l-d]=s,N>l?M=!0:N=l,g(o,u,r)):(_(e,o),q++)}if(M){var G=x(E);for(l=G.length-1,s=A-1;s>=0;s--)-1===E[s]?(f=s+d,h=n[f],i=f+1,a=i<n.length?n[i].ref:null,w(e,h,a,r)):0>l||s!=G[l]?(f=s+d,h=n[f],i=f+1,a=i<n.length?n[i].ref:null,b(e,h,a)):l--}else if(F-q!=A)for(s=A-1;s>=0;s--)-1===E[s]&&(f=s+d,h=n[f],i=f+1,a=i<n.length?n[i].ref:null,w(e,h,a,r))}}function x(e){var t,n,r,s,l,i,a=e.slice(0),o=[0];for(t=0,n=e.length;n>t;t++)if(-1!==e[t])if(r=o[o.length-1],e[r]<e[t])a[t]=r,o.push(t);else{for(s=0,l=o.length-1;l>s;)i=(s+l)/2|0,e[o[i]]<e[t]?s=i+1:l=i;e[t]<e[o[s]]&&(s>0&&(a[t]=o[s-1]),o[s]=t)}for(s=o.length,l=o[s-1];s-->0;)o[s]=l,l=a[l];return o}function F(e,t,n,r,s,l,i){this.flags=e,this.tag=t,this.init=n,this.setData=r,this.update=s,this.invalidated=l,this.disposed=i}function A(e){var t=0,n=e.tag,r=e.init,s=e.setData,l=e.update,i=e.invalidated,a=e.disposed;return void 0===n&&(n="div"),void 0===r&&(r=null),void 0===s&&(s=D),void 0===l&&(l=null),void 0===i&&(i=null),void 0===a&&(a=null),new F(t,n,r,s,l,i,a)}function E(e,t,n,r){this.flags=B,this.descriptor=e,this.parent=t,this.depth=null==t?0:t.depth+1,this.data=n,this.children=r,this.state=null,this.root=null,this.element=document.createElement(e.tag),this._update=null}function M(e,t,n,r){var s=new E(e,r,t,n);return null!=e.init&&e.init(s),s}function q(e){(e.flags&B)==B&&(e.descriptor.update(e),e.flags&=~V)}function j(e){e.flags&=~$,null!=e.root&&m(e.root);var t=e.descriptor;null!=t.disposed&&t.disposed(e)}function D(e,t){e.data!==t&&(e.data=t,e.flags|=V)}function G(e,t,n){var r=M(e,t,null,null);n.appendChild(r.element),q(r)}var P=e("./scheduler"),R=e("./env"),C=1,S=2,L=4,I=8,U=16;n.TEXT=C,n.ELEMENT=S,n.COMPONENT=L,n.ROOT=I,n.SVG=U;var V=1,$=2,Q=4,K=8,B=V|$;E.DIRTY=V,E.ATTACHED=$,E.SVG=Q,E.MOUNTING=K,E.SHOULD_UPDATE_FLAGS=B,E.prototype.updateRoot=function(e){null==this.root?(e.cref=this,0!==(this.flags&K)?(vNodeMount(this.element,this),this.flags&=~K):(e.ref=this.element,p(e,this))):g(this.root,e,this),this.root=e},E.prototype.invalidate=function(){if(0===(this.flags&V)){var e=R.scheduler;if(this.flags|=V,null==this._update){var t=this;this._update=function(){q(t)}}0===(e.flags&P.FRAMETASK_RUNNING)&&e.nextFrame().write(this._update,this.depth)}},t.exports={VNode:n,Component:E,t:r,$t:s,e:l,$e:i,s:a,$s:o,c:u,$c:f,r:h,decl:A,inject:G}},{"./env":2,"./scheduler":4}],7:[function(e,t){"use strict";function n(e){if(!e)return"";var t=parseFloat(e).toFixed(2);if(e>60){var n=Math.floor(e/60),r=(value%60).toFixed(2).split("."),s=r[0].lpad("0",2),l=r[1];t=n+":"+s+"."+l}return t}var r=e("kivi"),s=r.vdom,l=e("./popover"),i=["label-important"],a=["label-warning"],o=["label-success"],u=s.decl({tag:"tr",update:function(e){var t=e.data.db,r=t.getTopFiveQueries(),u=s.e("td");u.type="dbname",u.children=[s.t(t.name)];var f=t.queries.length,h=s.e("span");h.type="label",h.children=[s.t(f)],h.classes=f>=20?i:f>=10?a:o;var c=s.e("td");c.type="query-count",c.children=[h];for(var d=[u,c],p=0;5>p;p++){var g=r[p],v=g.elapsed,y=s.t(n(v)),k=s.c(l,{query:g.query}),m=s.e("td");m.type="Query";var w=[];w.push("elapsed"),w.push(v>=10?"warn_long":v>=1?"warn":"short"),m.classes=w,m.children=[y,k],d.push(m)}var b=s.r();b.children=d,e.updateRoot(b)}});t.exports=u},{"./popover":9,kivi:3}],8:[function(e,t){"use strict";var n=e("kivi"),r=n.vdom,s=e("./entry"),l=["table","table-striped","latest-data"],i=r.decl({tag:"table",init:function(e){setInterval(function(){for(var t=e.data,n=0;n<t.dbs.length;n++)t.dbs[n].update();e.invalidate()},e.data.interval)},update:function(e){for(var t=e.data.dbs,n=[],i=0;i<t.length;i++){var a=t[i];n.push(r.$c(a.id,s,{db:a}))}var o=r.e("tbody");o.children=n;var u=r.r();u.classes=l,u.children=[o],e.updateRoot(u)}});t.exports=i},{"./entry":7,kivi:3}],9:[function(e,t){"use strict";var n=e("kivi"),r=n.vdom,s=["popover","left"],l=r.decl({update:function(e){var t=r.e("div");t.type="popover-content",t.children=[r.t(e.data.query)];var n=r.e("div");n.type="arrow";var l=r.r();l.classes=s,l.children=[t,n],e.updateRoot(l)}});t.exports=l},{kivi:3}],10:[function(e,t){"use strict";function n(e,t,n){this.elapsed=e,this.waiting=t,this.query=n}function r(e){this.id=s++,this.name=e,this.queries=null,this.update()}n.rand=function(){var e=15*Math.random(),t=Math.random()<.5,r="SELECT blah FROM something";return Math.random()<.2&&(r="<IDLE> in transaction"),Math.random()<.1&&(r="vacuum"),new n(e,t,r)};var s=0;r.prototype.update=function(){for(var e=[],t=Math.floor(10*Math.random()+1),r=0;t>r;r++)e.push(n.rand());this.queries=e},r.prototype.getTopFiveQueries=function(){var e=this.queries.slice();for(e.sort(function(e,t){return e.elapsed-t.elapsed}),e=e.slice(0,5);e.length<5;)e.push(new n(0,!1,""));return e},t.exports={Query:n,Database:r}},{}]},{},[1]);
//# sourceMappingURL=main.js.map