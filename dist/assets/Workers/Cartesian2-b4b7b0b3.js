define(["exports","./Check-5e798bbf","./when-208fe5b0","./Math-8386669c"],(function(e,t,n,a){"use strict";function r(e,t,a){this.x=n.defaultValue(e,0),this.y=n.defaultValue(t,0),this.z=n.defaultValue(a,0)}r.fromSpherical=function(e,t){n.defined(t)||(t=new r);var a=e.clock,i=e.cone,u=n.defaultValue(e.magnitude,1);e=u*Math.sin(i);return t.x=e*Math.cos(a),t.y=e*Math.sin(a),t.z=u*Math.cos(i),t},r.fromElements=function(e,t,a,i){return n.defined(i)?(i.x=e,i.y=t,i.z=a,i):new r(e,t,a)},r.fromCartesian4=r.clone=function(e,t){if(n.defined(e))return n.defined(t)?(t.x=e.x,t.y=e.y,t.z=e.z,t):new r(e.x,e.y,e.z)},r.packedLength=3,r.pack=function(e,t,a){return a=n.defaultValue(a,0),t[a++]=e.x,t[a++]=e.y,t[a]=e.z,t},r.unpack=function(e,t,a){return t=n.defaultValue(t,0),(a=n.defined(a)?a:new r).x=e[t++],a.y=e[t++],a.z=e[t],a},r.packArray=function(e,a){var i=e.length,u=3*i;if(n.defined(a)){if(!Array.isArray(a)&&a.length!==u)throw new t.DeveloperError("If result is a typed array, it must have exactly array.length * 3 elements");a.length!==u&&(a.length=u)}else a=new Array(u);for(var o=0;o<i;++o)r.pack(e[o],a,3*o);return a},r.unpackArray=function(e,t){var a=e.length;n.defined(t)?t.length=a/3:t=new Array(a/3);for(var i=0;i<a;i+=3){var u=i/3;t[u]=r.unpack(e,i,t[u])}return t},r.fromArray=r.unpack,r.maximumComponent=function(e){return Math.max(e.x,e.y,e.z)},r.minimumComponent=function(e){return Math.min(e.x,e.y,e.z)},r.minimumByComponent=function(e,t,n){return n.x=Math.min(e.x,t.x),n.y=Math.min(e.y,t.y),n.z=Math.min(e.z,t.z),n},r.maximumByComponent=function(e,t,n){return n.x=Math.max(e.x,t.x),n.y=Math.max(e.y,t.y),n.z=Math.max(e.z,t.z),n},r.magnitudeSquared=function(e){return e.x*e.x+e.y*e.y+e.z*e.z},r.magnitude=function(e){return Math.sqrt(r.magnitudeSquared(e))};var i=new r;r.distance=function(e,t){return r.subtract(e,t,i),r.magnitude(i)},r.distanceSquared=function(e,t){return r.subtract(e,t,i),r.magnitudeSquared(i)},r.normalize=function(e,t){var n=r.magnitude(e);return t.x=e.x/n,t.y=e.y/n,t.z=e.z/n,t},r.dot=function(e,t){return e.x*t.x+e.y*t.y+e.z*t.z},r.multiplyComponents=function(e,t,n){return n.x=e.x*t.x,n.y=e.y*t.y,n.z=e.z*t.z,n},r.divideComponents=function(e,t,n){return n.x=e.x/t.x,n.y=e.y/t.y,n.z=e.z/t.z,n},r.add=function(e,t,n){return n.x=e.x+t.x,n.y=e.y+t.y,n.z=e.z+t.z,n},r.subtract=function(e,t,n){return n.x=e.x-t.x,n.y=e.y-t.y,n.z=e.z-t.z,n},r.multiplyByScalar=function(e,t,n){return n.x=e.x*t,n.y=e.y*t,n.z=e.z*t,n},r.divideByScalar=function(e,t,n){return n.x=e.x/t,n.y=e.y/t,n.z=e.z/t,n},r.negate=function(e,t){return t.x=-e.x,t.y=-e.y,t.z=-e.z,t},r.abs=function(e,t){return t.x=Math.abs(e.x),t.y=Math.abs(e.y),t.z=Math.abs(e.z),t};var u=new r;r.lerp=function(e,t,n,a){return r.multiplyByScalar(t,n,u),a=r.multiplyByScalar(e,1-n,a),r.add(u,a,a)};var o=new r,s=new r;r.angleBetween=function(e,t){return r.normalize(e,o),r.normalize(t,s),e=r.dot(o,s),t=r.magnitude(r.cross(o,s,o)),Math.atan2(t,e)};var d=new r;r.mostOrthogonalAxis=function(e,t){return e=r.normalize(e,d),r.abs(e,e),e.x<=e.y?e.x<=e.z?r.clone(r.UNIT_X,t):r.clone(r.UNIT_Z,t):e.y<=e.z?r.clone(r.UNIT_Y,t):r.clone(r.UNIT_Z,t)},r.projectVector=function(e,t,n){return e=r.dot(e,t)/r.dot(t,t),r.multiplyByScalar(t,e,n)},r.equals=function(e,t){return e===t||n.defined(e)&&n.defined(t)&&e.x===t.x&&e.y===t.y&&e.z===t.z},r.equalsArray=function(e,t,n){return e.x===t[n]&&e.y===t[n+1]&&e.z===t[n+2]},r.equalsEpsilon=function(e,t,r,i){return e===t||n.defined(e)&&n.defined(t)&&a.CesiumMath.equalsEpsilon(e.x,t.x,r,i)&&a.CesiumMath.equalsEpsilon(e.y,t.y,r,i)&&a.CesiumMath.equalsEpsilon(e.z,t.z,r,i)},r.cross=function(e,t,n){var a=e.x,r=e.y,i=e.z,u=t.x,o=t.y;t=i*u-a*(e=t.z),u=a*o-r*u;return n.x=r*e-i*o,n.y=t,n.z=u,n},r.midpoint=function(e,t,n){return n.x=.5*(e.x+t.x),n.y=.5*(e.y+t.y),n.z=.5*(e.z+t.z),n},r.fromDegrees=function(e,t,n,i,u){return e=a.CesiumMath.toRadians(e),t=a.CesiumMath.toRadians(t),r.fromRadians(e,t,n,i,u)};var h=new r,l=new r,f=new r(40680631590769,40680631590769,40408299984661.445);r.fromRadians=function(e,t,a,i,u){a=n.defaultValue(a,0);var o=n.defined(i)?i.radiiSquared:f;i=Math.cos(t);return h.x=i*Math.cos(e),h.y=i*Math.sin(e),h.z=Math.sin(t),h=r.normalize(h,h),r.multiplyComponents(o,h,l),o=Math.sqrt(r.dot(h,l)),l=r.divideByScalar(l,o,l),h=r.multiplyByScalar(h,a,h),n.defined(u)||(u=new r),r.add(l,h,u)},r.fromDegreesArray=function(e,t,a){var i=e.length;n.defined(a)?a.length=i/2:a=new Array(i/2);for(var u=0;u<i;u+=2){var o=e[u],s=e[u+1],d=u/2;a[d]=r.fromDegrees(o,s,0,t,a[d])}return a},r.fromRadiansArray=function(e,t,a){var i=e.length;n.defined(a)?a.length=i/2:a=new Array(i/2);for(var u=0;u<i;u+=2){var o=e[u],s=e[u+1],d=u/2;a[d]=r.fromRadians(o,s,0,t,a[d])}return a},r.fromDegreesArrayHeights=function(e,t,a){var i=e.length;n.defined(a)?a.length=i/3:a=new Array(i/3);for(var u=0;u<i;u+=3){var o=e[u],s=e[u+1],d=e[u+2],h=u/3;a[h]=r.fromDegrees(o,s,d,t,a[h])}return a},r.fromRadiansArrayHeights=function(e,t,a){var i=e.length;n.defined(a)?a.length=i/3:a=new Array(i/3);for(var u=0;u<i;u+=3){var o=e[u],s=e[u+1],d=e[u+2],h=u/3;a[h]=r.fromRadians(o,s,d,t,a[h])}return a},r.ZERO=Object.freeze(new r(0,0,0)),r.UNIT_X=Object.freeze(new r(1,0,0)),r.UNIT_Y=Object.freeze(new r(0,1,0)),r.UNIT_Z=Object.freeze(new r(0,0,1)),r.prototype.clone=function(e){return r.clone(this,e)},r.prototype.equals=function(e){return r.equals(this,e)},r.prototype.equalsEpsilon=function(e,t,n){return r.equalsEpsilon(this,e,t,n)},r.prototype.toString=function(){return"("+this.x+", "+this.y+", "+this.z+")"};var c=new r,m=new r;function y(e,t,i,u,o){var s=e.x,d=e.y,h=e.z,l=s*s*(p=t.x)*p,f=d*d*(g=t.y)*g,y=h*h*(t=t.z)*t,p=l+f+y,g=Math.sqrt(1/p);t=r.multiplyByScalar(e,g,c);if(p<u)return isFinite(g)?r.clone(t,o):void 0;var M=i.x,x=i.y,w=i.z;(i=m).x=t.x*M*2,i.y=t.y*x*2,i.z=t.z*w*2;var v=(1-g)*r.magnitude(e)/(.5*r.magnitude(i)),_=0;do{var C,z,S,q,O,T,A;_=(A=l*(q=(C=1/(1+(v-=_)*M))*C)+f*(O=(z=1/(1+v*x))*z)+y*(T=(S=1/(1+v*w))*S)-1)/(-2*(l*(q*C)*M+f*(O*z)*x+y*(T*S)*w))}while(Math.abs(A)>a.CesiumMath.EPSILON12);return n.defined(o)?(o.x=s*C,o.y=d*z,o.z=h*S,o):new r(s*C,d*z,h*S)}function p(e,t,a){this.longitude=n.defaultValue(e,0),this.latitude=n.defaultValue(t,0),this.height=n.defaultValue(a,0)}p.fromRadians=function(e,t,a,r){return a=n.defaultValue(a,0),n.defined(r)?(r.longitude=e,r.latitude=t,r.height=a,r):new p(e,t,a)},p.fromDegrees=function(e,t,n,r){return e=a.CesiumMath.toRadians(e),t=a.CesiumMath.toRadians(t),p.fromRadians(e,t,n,r)};var g=new r,M=new r,x=new r,w=new r(1/6378137,1/6378137,1/6356752.314245179),v=new r(1/40680631590769,1/40680631590769,1/40408299984661.445),_=a.CesiumMath.EPSILON1;function C(e,t,i,u){t=n.defaultValue(t,0),i=n.defaultValue(i,0),u=n.defaultValue(u,0),e._radii=new r(t,i,u),e._radiiSquared=new r(t*t,i*i,u*u),e._radiiToTheFourth=new r(t*t*t*t,i*i*i*i,u*u*u*u),e._oneOverRadii=new r(0===t?0:1/t,0===i?0:1/i,0===u?0:1/u),e._oneOverRadiiSquared=new r(0===t?0:1/(t*t),0===i?0:1/(i*i),0===u?0:1/(u*u)),e._minimumRadius=Math.min(t,i,u),e._maximumRadius=Math.max(t,i,u),e._centerToleranceSquared=a.CesiumMath.EPSILON1,0!==e._radiiSquared.z&&(e._squaredXOverSquaredZ=e._radiiSquared.x/e._radiiSquared.z)}function z(e,t,n){this._radii=void 0,this._radiiSquared=void 0,this._radiiToTheFourth=void 0,this._oneOverRadii=void 0,this._oneOverRadiiSquared=void 0,this._minimumRadius=void 0,this._maximumRadius=void 0,this._centerToleranceSquared=void 0,this._squaredXOverSquaredZ=void 0,C(this,e,t,n)}p.fromCartesian=function(e,t,i){var u=n.defined(t)?t.oneOverRadii:w,o=n.defined(t)?t.oneOverRadiiSquared:v;u=y(e,u,o,n.defined(t)?t._centerToleranceSquared:_,M);if(n.defined(u))return t=r.multiplyComponents(u,o,g),t=r.normalize(t,t),o=r.subtract(e,u,x),u=Math.atan2(t.y,t.x),t=Math.asin(t.z),o=a.CesiumMath.sign(r.dot(o,e))*r.magnitude(o),n.defined(i)?(i.longitude=u,i.latitude=t,i.height=o,i):new p(u,t,o)},p.toCartesian=function(e,t,n){return r.fromRadians(e.longitude,e.latitude,e.height,t,n)},p.clone=function(e,t){if(n.defined(e))return n.defined(t)?(t.longitude=e.longitude,t.latitude=e.latitude,t.height=e.height,t):new p(e.longitude,e.latitude,e.height)},p.equals=function(e,t){return e===t||n.defined(e)&&n.defined(t)&&e.longitude===t.longitude&&e.latitude===t.latitude&&e.height===t.height},p.equalsEpsilon=function(e,t,a){return a=n.defaultValue(a,0),e===t||n.defined(e)&&n.defined(t)&&Math.abs(e.longitude-t.longitude)<=a&&Math.abs(e.latitude-t.latitude)<=a&&Math.abs(e.height-t.height)<=a},p.ZERO=Object.freeze(new p(0,0,0)),p.prototype.clone=function(e){return p.clone(this,e)},p.prototype.equals=function(e){return p.equals(this,e)},p.prototype.equalsEpsilon=function(e,t){return p.equalsEpsilon(this,e,t)},p.prototype.toString=function(){return"("+this.longitude+", "+this.latitude+", "+this.height+")"},Object.defineProperties(z.prototype,{radii:{get:function(){return this._radii}},radiiSquared:{get:function(){return this._radiiSquared}},radiiToTheFourth:{get:function(){return this._radiiToTheFourth}},oneOverRadii:{get:function(){return this._oneOverRadii}},oneOverRadiiSquared:{get:function(){return this._oneOverRadiiSquared}},minimumRadius:{get:function(){return this._minimumRadius}},maximumRadius:{get:function(){return this._maximumRadius}}}),z.clone=function(e,t){if(n.defined(e)){var a=e._radii;return n.defined(t)?(r.clone(a,t._radii),r.clone(e._radiiSquared,t._radiiSquared),r.clone(e._radiiToTheFourth,t._radiiToTheFourth),r.clone(e._oneOverRadii,t._oneOverRadii),r.clone(e._oneOverRadiiSquared,t._oneOverRadiiSquared),t._minimumRadius=e._minimumRadius,t._maximumRadius=e._maximumRadius,t._centerToleranceSquared=e._centerToleranceSquared,t):new z(a.x,a.y,a.z)}},z.fromCartesian3=function(e,t){return n.defined(t)||(t=new z),n.defined(e)&&C(t,e.x,e.y,e.z),t},z.WGS84=Object.freeze(new z(6378137,6378137,6356752.314245179)),z.UNIT_SPHERE=Object.freeze(new z(1,1,1)),z.MOON=Object.freeze(new z(a.CesiumMath.LUNAR_RADIUS,a.CesiumMath.LUNAR_RADIUS,a.CesiumMath.LUNAR_RADIUS)),z.prototype.clone=function(e){return z.clone(this,e)},z.packedLength=r.packedLength,z.pack=function(e,t,a){return a=n.defaultValue(a,0),r.pack(e._radii,t,a),t},z.unpack=function(e,t,a){return t=n.defaultValue(t,0),t=r.unpack(e,t),z.fromCartesian3(t,a)},z.prototype.geocentricSurfaceNormal=r.normalize,z.prototype.geodeticSurfaceNormalCartographic=function(e,t){var a=e.longitude,i=e.latitude,u=Math.cos(i);e=u*Math.cos(a),a=u*Math.sin(a),i=Math.sin(i);return(t=n.defined(t)?t:new r).x=e,t.y=a,t.z=i,r.normalize(t,t)},z.prototype.geodeticSurfaceNormal=function(e,t){if(!r.equalsEpsilon(e,r.ZERO,a.CesiumMath.EPSILON14))return n.defined(t)||(t=new r),t=r.multiplyComponents(e,this._oneOverRadiiSquared,t),r.normalize(t,t)};var S=new r,q=new r;z.prototype.cartographicToCartesian=function(e,t){var a=S,i=q;this.geodeticSurfaceNormalCartographic(e,a),r.multiplyComponents(this._radiiSquared,a,i);var u=Math.sqrt(r.dot(a,i));return r.divideByScalar(i,u,i),r.multiplyByScalar(a,e.height,a),n.defined(t)||(t=new r),r.add(i,a,t)},z.prototype.cartographicArrayToCartesianArray=function(e,t){var a=e.length;n.defined(t)?t.length=a:t=new Array(a);for(var r=0;r<a;r++)t[r]=this.cartographicToCartesian(e[r],t[r]);return t};var O=new r,T=new r,A=new r;z.prototype.cartesianToCartographic=function(e,t){var i=this.scaleToGeodeticSurface(e,T);if(n.defined(i)){var u=this.geodeticSurfaceNormal(i,O),o=r.subtract(e,i,A);i=Math.atan2(u.y,u.x),u=Math.asin(u.z),o=a.CesiumMath.sign(r.dot(o,e))*r.magnitude(o);return n.defined(t)?(t.longitude=i,t.latitude=u,t.height=o,t):new p(i,u,o)}},z.prototype.cartesianArrayToCartographicArray=function(e,t){var a=e.length;n.defined(t)?t.length=a:t=new Array(a);for(var r=0;r<a;++r)t[r]=this.cartesianToCartographic(e[r],t[r]);return t},z.prototype.scaleToGeodeticSurface=function(e,t){return y(e,this._oneOverRadii,this._oneOverRadiiSquared,this._centerToleranceSquared,t)},z.prototype.scaleToGeocentricSurface=function(e,t){n.defined(t)||(t=new r);var a=e.x,i=e.y,u=e.z,o=this._oneOverRadiiSquared;o=1/Math.sqrt(a*a*o.x+i*i*o.y+u*u*o.z);return r.multiplyByScalar(e,o,t)},z.prototype.transformPositionToScaledSpace=function(e,t){return n.defined(t)||(t=new r),r.multiplyComponents(e,this._oneOverRadii,t)},z.prototype.transformPositionFromScaledSpace=function(e,t){return n.defined(t)||(t=new r),r.multiplyComponents(e,this._radii,t)},z.prototype.equals=function(e){return this===e||n.defined(e)&&r.equals(this._radii,e._radii)},z.prototype.toString=function(){return this._radii.toString()},z.prototype.getSurfaceNormalIntersectionWithZAxis=function(e,t,a){t=n.defaultValue(t,0);var i=this._squaredXOverSquaredZ;if((a=n.defined(a)?a:new r).x=0,a.y=0,a.z=e.z*(1-i),!(Math.abs(a.z)>=this._radii.z-t))return a};var R=[.14887433898163,.43339539412925,.67940956829902,.86506336668898,.97390652851717,0],V=[.29552422471475,.26926671930999,.21908636251598,.14945134915058,.066671344308684,0];function b(e,t,n){for(var a=.5*(t+e),r=.5*(t-e),i=0,u=0;u<5;u++){var o=r*R[u];i+=V[u]*(n(a+o)+n(a-o))}return i*r}function I(e,t,a,r){this.west=n.defaultValue(e,0),this.south=n.defaultValue(t,0),this.east=n.defaultValue(a,0),this.north=n.defaultValue(r,0)}z.prototype.surfaceArea=function(e){for(var t=e.west,n=e.east,r=e.south,i=e.north;n<t;)n+=a.CesiumMath.TWO_PI;var u=(e=this._radiiSquared).x,o=e.y,s=e.z,d=u*o;return b(r,i,(function(e){var a=Math.cos(e),r=Math.sin(e);return Math.cos(e)*b(t,n,(function(e){var t=Math.cos(e);e=Math.sin(e);return Math.sqrt(d*r*r+s*(o*t*t+u*e*e)*a*a)}))}))},Object.defineProperties(I.prototype,{width:{get:function(){return I.computeWidth(this)}},height:{get:function(){return I.computeHeight(this)}}}),I.packedLength=4,I.pack=function(e,t,a){return a=n.defaultValue(a,0),t[a++]=e.west,t[a++]=e.south,t[a++]=e.east,t[a]=e.north,t},I.unpack=function(e,t,a){return t=n.defaultValue(t,0),(a=n.defined(a)?a:new I).west=e[t++],a.south=e[t++],a.east=e[t++],a.north=e[t],a},I.computeWidth=function(e){var t=e.east;return t<(e=e.west)&&(t+=a.CesiumMath.TWO_PI),t-e},I.computeHeight=function(e){return e.north-e.south},I.fromDegrees=function(e,t,r,i,u){return e=a.CesiumMath.toRadians(n.defaultValue(e,0)),t=a.CesiumMath.toRadians(n.defaultValue(t,0)),r=a.CesiumMath.toRadians(n.defaultValue(r,0)),i=a.CesiumMath.toRadians(n.defaultValue(i,0)),n.defined(u)?(u.west=e,u.south=t,u.east=r,u.north=i,u):new I(e,t,r,i)},I.fromRadians=function(e,t,a,r,i){return n.defined(i)?(i.west=n.defaultValue(e,0),i.south=n.defaultValue(t,0),i.east=n.defaultValue(a,0),i.north=n.defaultValue(r,0),i):new I(e,t,a,r)},I.fromCartographicArray=function(e,t){for(var r=Number.MAX_VALUE,i=-Number.MAX_VALUE,u=Number.MAX_VALUE,o=-Number.MAX_VALUE,s=Number.MAX_VALUE,d=-Number.MAX_VALUE,h=0,l=e.length;h<l;h++){var f=e[h];r=Math.min(r,f.longitude),i=Math.max(i,f.longitude),s=Math.min(s,f.latitude),d=Math.max(d,f.latitude),f=0<=f.longitude?f.longitude:f.longitude+a.CesiumMath.TWO_PI,u=Math.min(u,f),o=Math.max(o,f)}return o-u<i-r&&(r=u,(i=o)>a.CesiumMath.PI&&(i-=a.CesiumMath.TWO_PI),r>a.CesiumMath.PI&&(r-=a.CesiumMath.TWO_PI)),n.defined(t)?(t.west=r,t.south=s,t.east=i,t.north=d,t):new I(r,s,i,d)},I.fromCartesianArray=function(e,t,r){t=n.defaultValue(t,z.WGS84);for(var i=Number.MAX_VALUE,u=-Number.MAX_VALUE,o=Number.MAX_VALUE,s=-Number.MAX_VALUE,d=Number.MAX_VALUE,h=-Number.MAX_VALUE,l=0,f=e.length;l<f;l++){var c=t.cartesianToCartographic(e[l]);i=Math.min(i,c.longitude),u=Math.max(u,c.longitude),d=Math.min(d,c.latitude),h=Math.max(h,c.latitude),c=0<=c.longitude?c.longitude:c.longitude+a.CesiumMath.TWO_PI,o=Math.min(o,c),s=Math.max(s,c)}return s-o<u-i&&(i=o,(u=s)>a.CesiumMath.PI&&(u-=a.CesiumMath.TWO_PI),i>a.CesiumMath.PI&&(i-=a.CesiumMath.TWO_PI)),n.defined(r)?(r.west=i,r.south=d,r.east=u,r.north=h,r):new I(i,d,u,h)},I.clone=function(e,t){if(n.defined(e))return n.defined(t)?(t.west=e.west,t.south=e.south,t.east=e.east,t.north=e.north,t):new I(e.west,e.south,e.east,e.north)},I.equalsEpsilon=function(e,t,a){return a=n.defaultValue(a,0),e===t||n.defined(e)&&n.defined(t)&&Math.abs(e.west-t.west)<=a&&Math.abs(e.south-t.south)<=a&&Math.abs(e.east-t.east)<=a&&Math.abs(e.north-t.north)<=a},I.prototype.clone=function(e){return I.clone(this,e)},I.prototype.equals=function(e){return I.equals(this,e)},I.equals=function(e,t){return e===t||n.defined(e)&&n.defined(t)&&e.west===t.west&&e.south===t.south&&e.east===t.east&&e.north===t.north},I.prototype.equalsEpsilon=function(e,t){return I.equalsEpsilon(this,e,t)},I.validate=function(e){},I.southwest=function(e,t){return n.defined(t)?(t.longitude=e.west,t.latitude=e.south,t.height=0,t):new p(e.west,e.south)},I.northwest=function(e,t){return n.defined(t)?(t.longitude=e.west,t.latitude=e.north,t.height=0,t):new p(e.west,e.north)},I.northeast=function(e,t){return n.defined(t)?(t.longitude=e.east,t.latitude=e.north,t.height=0,t):new p(e.east,e.north)},I.southeast=function(e,t){return n.defined(t)?(t.longitude=e.east,t.latitude=e.south,t.height=0,t):new p(e.east,e.south)},I.center=function(e,t){var r=e.east,i=e.west;return r<i&&(r+=a.CesiumMath.TWO_PI),r=a.CesiumMath.negativePiToPi(.5*(i+r)),e=.5*(e.south+e.north),n.defined(t)?(t.longitude=r,t.latitude=e,t.height=0,t):new p(r,e)},I.intersection=function(e,t,r){var i=e.east,u=e.west,o=t.east,s=t.west;if(i<u&&0<o?i+=a.CesiumMath.TWO_PI:o<s&&0<i&&(o+=a.CesiumMath.TWO_PI),i<u&&s<0?s+=a.CesiumMath.TWO_PI:o<s&&u<0&&(u+=a.CesiumMath.TWO_PI),s=a.CesiumMath.negativePiToPi(Math.max(u,s)),i=a.CesiumMath.negativePiToPi(Math.min(i,o)),!((e.west<e.east||t.west<t.east)&&i<=s||(o=Math.max(e.south,t.south),(t=Math.min(e.north,t.north))<=o)))return n.defined(r)?(r.west=s,r.south=o,r.east=i,r.north=t,r):new I(s,o,i,t)},I.simpleIntersection=function(e,t,a){var r=Math.max(e.west,t.west),i=Math.max(e.south,t.south),u=Math.min(e.east,t.east);if(!((t=Math.min(e.north,t.north))<=i||u<=r))return n.defined(a)?(a.west=r,a.south=i,a.east=u,a.north=t,a):new I(r,i,u,t)},I.union=function(e,t,r){n.defined(r)||(r=new I);var i=e.east,u=e.west,o=t.east,s=t.west;return i<u&&0<o?i+=a.CesiumMath.TWO_PI:o<s&&0<i&&(o+=a.CesiumMath.TWO_PI),i<u&&s<0?s+=a.CesiumMath.TWO_PI:o<s&&u<0&&(u+=a.CesiumMath.TWO_PI),s=a.CesiumMath.convertLongitudeRange(Math.min(u,s)),o=a.CesiumMath.convertLongitudeRange(Math.max(i,o)),r.west=s,r.south=Math.min(e.south,t.south),r.east=o,r.north=Math.max(e.north,t.north),r},I.expand=function(e,t,a){return(a=n.defined(a)?a:new I).west=Math.min(e.west,t.longitude),a.south=Math.min(e.south,t.latitude),a.east=Math.max(e.east,t.longitude),a.north=Math.max(e.north,t.latitude),a},I.contains=function(e,t){var n=t.longitude,r=t.latitude,i=e.west;return(t=e.east)<i&&(t+=a.CesiumMath.TWO_PI,n<0&&(n+=a.CesiumMath.TWO_PI)),(i<n||a.CesiumMath.equalsEpsilon(n,i,a.CesiumMath.EPSILON14))&&(n<t||a.CesiumMath.equalsEpsilon(n,t,a.CesiumMath.EPSILON14))&&r>=e.south&&r<=e.north};var E=new p;function P(e,t){this.x=n.defaultValue(e,0),this.y=n.defaultValue(t,0)}I.subsample=function(e,t,r,i){t=n.defaultValue(t,z.WGS84),r=n.defaultValue(r,0),n.defined(i)||(i=[]);var u=0,o=e.north,s=e.south,d=e.east,h=e.west,l=E;l.height=r,l.longitude=h,l.latitude=o,i[u]=t.cartographicToCartesian(l,i[u]),u++,l.longitude=d,i[u]=t.cartographicToCartesian(l,i[u]),u++,l.latitude=s,i[u]=t.cartographicToCartesian(l,i[u]),u++,l.longitude=h,i[u]=t.cartographicToCartesian(l,i[u]),u++,l.latitude=o<0?o:0<s?s:0;for(var f=1;f<8;++f)l.longitude=-Math.PI+f*a.CesiumMath.PI_OVER_TWO,I.contains(e,l)&&(i[u]=t.cartographicToCartesian(l,i[u]),u++);return 0===l.latitude&&(l.longitude=h,i[u]=t.cartographicToCartesian(l,i[u]),u++,l.longitude=d,i[u]=t.cartographicToCartesian(l,i[u]),u++),i.length=u,i},I.MAX_VALUE=Object.freeze(new I(-Math.PI,-a.CesiumMath.PI_OVER_TWO,Math.PI,a.CesiumMath.PI_OVER_TWO)),P.fromElements=function(e,t,a){return n.defined(a)?(a.x=e,a.y=t,a):new P(e,t)},P.fromCartesian3=P.clone=function(e,t){if(n.defined(e))return n.defined(t)?(t.x=e.x,t.y=e.y,t):new P(e.x,e.y)},P.fromCartesian4=P.clone,P.packedLength=2,P.pack=function(e,t,a){return a=n.defaultValue(a,0),t[a++]=e.x,t[a]=e.y,t},P.unpack=function(e,t,a){return t=n.defaultValue(t,0),(a=n.defined(a)?a:new P).x=e[t++],a.y=e[t],a},P.packArray=function(e,a){var r=e.length,i=2*r;if(n.defined(a)){if(!Array.isArray(a)&&a.length!==i)throw new t.DeveloperError("If result is a typed array, it must have exactly array.length * 2 elements");a.length!==i&&(a.length=i)}else a=new Array(i);for(var u=0;u<r;++u)P.pack(e[u],a,2*u);return a},P.unpackArray=function(e,t){var a=e.length;n.defined(t)?t.length=a/2:t=new Array(a/2);for(var r=0;r<a;r+=2){var i=r/2;t[i]=P.unpack(e,r,t[i])}return t},P.fromArray=P.unpack,P.maximumComponent=function(e){return Math.max(e.x,e.y)},P.minimumComponent=function(e){return Math.min(e.x,e.y)},P.minimumByComponent=function(e,t,n){return n.x=Math.min(e.x,t.x),n.y=Math.min(e.y,t.y),n},P.maximumByComponent=function(e,t,n){return n.x=Math.max(e.x,t.x),n.y=Math.max(e.y,t.y),n},P.magnitudeSquared=function(e){return e.x*e.x+e.y*e.y},P.magnitude=function(e){return Math.sqrt(P.magnitudeSquared(e))};var N=new P;P.distance=function(e,t){return P.subtract(e,t,N),P.magnitude(N)},P.distanceSquared=function(e,t){return P.subtract(e,t,N),P.magnitudeSquared(N)},P.normalize=function(e,t){var n=P.magnitude(e);return t.x=e.x/n,t.y=e.y/n,t},P.dot=function(e,t){return e.x*t.x+e.y*t.y},P.cross=function(e,t){return e.x*t.y-e.y*t.x},P.multiplyComponents=function(e,t,n){return n.x=e.x*t.x,n.y=e.y*t.y,n},P.divideComponents=function(e,t,n){return n.x=e.x/t.x,n.y=e.y/t.y,n},P.add=function(e,t,n){return n.x=e.x+t.x,n.y=e.y+t.y,n},P.subtract=function(e,t,n){return n.x=e.x-t.x,n.y=e.y-t.y,n},P.multiplyByScalar=function(e,t,n){return n.x=e.x*t,n.y=e.y*t,n},P.divideByScalar=function(e,t,n){return n.x=e.x/t,n.y=e.y/t,n},P.negate=function(e,t){return t.x=-e.x,t.y=-e.y,t},P.abs=function(e,t){return t.x=Math.abs(e.x),t.y=Math.abs(e.y),t};var U=new P;P.lerp=function(e,t,n,a){return P.multiplyByScalar(t,n,U),a=P.multiplyByScalar(e,1-n,a),P.add(U,a,a)};var L=new P,W=new P;P.angleBetween=function(e,t){return P.normalize(e,L),P.normalize(t,W),a.CesiumMath.acosClamped(P.dot(L,W))};var k=new P;P.mostOrthogonalAxis=function(e,t){return e=P.normalize(e,k),P.abs(e,e),e.x<=e.y?P.clone(P.UNIT_X,t):P.clone(P.UNIT_Y,t)},P.equals=function(e,t){return e===t||n.defined(e)&&n.defined(t)&&e.x===t.x&&e.y===t.y},P.equalsArray=function(e,t,n){return e.x===t[n]&&e.y===t[n+1]},P.equalsEpsilon=function(e,t,r,i){return e===t||n.defined(e)&&n.defined(t)&&a.CesiumMath.equalsEpsilon(e.x,t.x,r,i)&&a.CesiumMath.equalsEpsilon(e.y,t.y,r,i)},P.ZERO=Object.freeze(new P(0,0)),P.UNIT_X=Object.freeze(new P(1,0)),P.UNIT_Y=Object.freeze(new P(0,1)),P.prototype.clone=function(e){return P.clone(this,e)},P.prototype.equals=function(e){return P.equals(this,e)},P.prototype.equalsEpsilon=function(e,t,n){return P.equalsEpsilon(this,e,t,n)},P.prototype.toString=function(){return"("+this.x+", "+this.y+")"},e.Cartesian2=P,e.Cartesian3=r,e.Cartographic=p,e.Ellipsoid=z,e.Rectangle=I}));