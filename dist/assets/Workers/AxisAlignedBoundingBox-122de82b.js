define(["exports","./Cartesian2-b4b7b0b3","./Check-5e798bbf","./when-208fe5b0","./Transforms-73e77b72"],(function(e,n,i,t,a){"use strict";function m(e,i,a){this.minimum=n.Cartesian3.clone(t.defaultValue(e,n.Cartesian3.ZERO)),this.maximum=n.Cartesian3.clone(t.defaultValue(i,n.Cartesian3.ZERO)),a=t.defined(a)?n.Cartesian3.clone(a):n.Cartesian3.midpoint(this.minimum,this.maximum,new n.Cartesian3),this.center=a}m.fromPoints=function(e,i){if(t.defined(i)||(i=new m),!t.defined(e)||0===e.length)return i.minimum=n.Cartesian3.clone(n.Cartesian3.ZERO,i.minimum),i.maximum=n.Cartesian3.clone(n.Cartesian3.ZERO,i.maximum),i.center=n.Cartesian3.clone(n.Cartesian3.ZERO,i.center),i;for(var a=e[0].x,r=e[0].y,s=e[0].z,u=e[0].x,c=e[0].y,o=e[0].z,l=e.length,C=1;C<l;C++){var f=(d=e[C]).x,x=d.y,d=d.z;a=Math.min(f,a),u=Math.max(f,u),r=Math.min(x,r),c=Math.max(x,c),s=Math.min(d,s),o=Math.max(d,o)}var h=i.minimum;h.x=a,h.y=r,h.z=s;var b=i.maximum;return b.x=u,b.y=c,b.z=o,i.center=n.Cartesian3.midpoint(h,b,i.center),i},m.clone=function(e,i){if(t.defined(e))return t.defined(i)?(i.minimum=n.Cartesian3.clone(e.minimum,i.minimum),i.maximum=n.Cartesian3.clone(e.maximum,i.maximum),i.center=n.Cartesian3.clone(e.center,i.center),i):new m(e.minimum,e.maximum,e.center)},m.equals=function(e,i){return e===i||t.defined(e)&&t.defined(i)&&n.Cartesian3.equals(e.center,i.center)&&n.Cartesian3.equals(e.minimum,i.minimum)&&n.Cartesian3.equals(e.maximum,i.maximum)};var r=new n.Cartesian3;m.intersectPlane=function(e,i){r=n.Cartesian3.subtract(e.maximum,e.minimum,r);var t=n.Cartesian3.multiplyByScalar(r,.5,r),m=i.normal;t=t.x*Math.abs(m.x)+t.y*Math.abs(m.y)+t.z*Math.abs(m.z);return 0<(i=n.Cartesian3.dot(e.center,m)+i.distance)-t?a.Intersect.INSIDE:i+t<0?a.Intersect.OUTSIDE:a.Intersect.INTERSECTING},m.prototype.clone=function(e){return m.clone(this,e)},m.prototype.intersectPlane=function(e){return m.intersectPlane(this,e)},m.prototype.equals=function(e){return m.equals(this,e)},e.AxisAlignedBoundingBox=m}));