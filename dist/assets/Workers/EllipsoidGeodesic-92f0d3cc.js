define(["exports","./Cartesian2-b4b7b0b3","./Check-5e798bbf","./when-208fe5b0","./Math-8386669c"],(function(t,a,i,n,e){"use strict";function s(t,a,i,n,e,s,r){return(1-(i=t*i*(4+t*(4-3*i))/16))*t*a*(n+i*e*(r+i*s*(2*r*r-1)))}var r=new a.Cartesian3,h=new a.Cartesian3;function o(t,i,n,o){var d,u,c,M,l,g,_,p,f,m,v,C,H,b,O,S,q,U,w;a.Cartesian3.normalize(o.cartographicToCartesian(i,h),r),a.Cartesian3.normalize(o.cartographicToCartesian(n,h),h),function(t,a,i,n,r,h,o){var d=(a-i)/a,u=h-n,c=(n=Math.atan((1-d)*Math.tan(r)),r=Math.atan((1-d)*Math.tan(o)),o=Math.cos(n),n=Math.sin(n),Math.cos(r)),M=o*c,l=o*(r=Math.sin(r)),g=n*r,_=n*c,p=u,f=(e.CesiumMath.TWO_PI,Math.cos(p)),m=Math.sin(p);do{f=Math.cos(p),m=Math.sin(p);var v,C,H,b,O,S=l-_*f,q=p,U=(H=g+M*f)-2*g/(O=0===(C=Math.sqrt(c*c*m*m+S*S))?(v=0,1):1-(v=M*m/C)*v);p=u+s(d,v,O,b=Math.atan2(C,H),C,H,U=isFinite(U)?U:0)}while(Math.abs(p-q)>e.CesiumMath.EPSILON12);n=i*(1+(r=O*(a*a-i*i)/(i*i))*(4096+r*(r*(320-175*r)-768))/16384)*(b-(n=r*(256+r*(r*(74-47*r)-128))/1024)*C*(U+n*(H*(2*(a=U*U)-1)-n*U*(4*C*C-3)*(4*a-3)/6)/4)),a=Math.atan2(c*m,l-_*f),o=Math.atan2(o*m,l*f-_),t._distance=n,t._startHeading=a,t._endHeading=o,t._uSquared=r}(t,o.maximumRadius,o.minimumRadius,i.longitude,i.latitude,n.longitude,n.latitude),t._start=a.Cartographic.clone(i,t._start),t._end=a.Cartographic.clone(n,t._end),t._start.height=0,t._end.height=0,u=(d=t)._uSquared,l=((c=d._ellipsoid.maximumRadius)-(M=d._ellipsoid.minimumRadius))/c,g=Math.cos(d._startHeading),_=Math.sin(d._startHeading),p=(1-l)*Math.tan(d._start.latitude),m=(f=1/Math.sqrt(1+p*p))*p,v=Math.atan2(p,g),b=1-(H=(C=f*_)*C),O=Math.sqrt(b),U=1-3*(S=u/4)+35*(q=S*S)/4,w=1-5*S,u=(n=1+S-3*q/4+5*(o=q*S)/4-175*(i=q*q)/64)*v-(t=1-S+15*q/8-35*o/8)*Math.sin(2*v)*S/2-U*Math.sin(4*v)*q/16-w*Math.sin(6*v)*o/48-5*Math.sin(8*v)*i/512,(d=d._constants).a=c,d.b=M,d.f=l,d.cosineHeading=g,d.sineHeading=_,d.tanU=p,d.cosineU=f,d.sineU=m,d.sigma=v,d.sineAlpha=C,d.sineSquaredAlpha=H,d.cosineSquaredAlpha=b,d.cosineAlpha=O,d.u2Over4=S,d.u4Over16=q,d.u6Over64=o,d.u8Over256=i,d.a0=n,d.a1=t,d.a2=U,d.a3=w,d.distanceRatio=u}function d(t,i,e){e=n.defaultValue(e,a.Ellipsoid.WGS84),this._ellipsoid=e,this._start=new a.Cartographic,this._end=new a.Cartographic,this._constants={},this._startHeading=void 0,this._endHeading=void 0,this._distance=void 0,this._uSquared=void 0,n.defined(t)&&n.defined(i)&&o(this,t,i,e)}Object.defineProperties(d.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},surfaceDistance:{get:function(){return this._distance}},start:{get:function(){return this._start}},end:{get:function(){return this._end}},startHeading:{get:function(){return this._startHeading}},endHeading:{get:function(){return this._endHeading}}}),d.prototype.setEndPoints=function(t,a){o(this,t,a,this._ellipsoid)},d.prototype.interpolateUsingFraction=function(t,a){return this.interpolateUsingSurfaceDistance(this._distance*t,a)},d.prototype.interpolateUsingSurfaceDistance=function(t,i){var e=this._constants,r=e.distanceRatio+t/e.b,h=Math.cos(2*r),o=Math.cos(4*r),d=Math.cos(6*r),u=Math.sin(2*r),c=Math.sin(4*r),M=Math.sin(6*r),l=Math.sin(8*r),g=r*r,_=e.u8Over256,p=e.u2Over4,f=e.u6Over64;g=r*g*2*_*h/3+r*(1-p+7*(t=e.u4Over16)/4-15*f/4+579*_/64-(t-15*f/4+187*_/16)*h-(5*f/4-115*_/16)*o-29*_*d/16)+(p/2-t+71*f/32-85*_/16)*u+(5*t/16-5*f/4+383*_/96)*c-g*((f-11*_/2)*u+5*_*c/2)+(29*f/96-29*_/16)*M+539*_*l/1536,u=Math.asin(Math.sin(g)*e.cosineAlpha),c=Math.atan(e.a/e.b*Math.tan(u));return g-=e.sigma,f=Math.cos(2*e.sigma+g),M=Math.sin(g),_=Math.cos(g),l=e.cosineU*_,u=e.sineU*M,f=Math.atan2(M*e.sineHeading,l-u*e.cosineHeading)-s(e.f,e.sineAlpha,e.cosineSquaredAlpha,g,M,_,f),n.defined(i)?(i.longitude=this._start.longitude+f,i.latitude=c,i.height=0,i):new a.Cartographic(this._start.longitude+f,c,0)},t.EllipsoidGeodesic=d}));