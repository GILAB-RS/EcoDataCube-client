define(["./when-208fe5b0","./Transforms-73e77b72","./Cartesian2-b4b7b0b3","./Check-5e798bbf","./ComponentDatatype-2da3a966","./FrustumGeometry-65f50f2b","./GeometryAttribute-b541caa6","./GeometryAttributes-b0b294d8","./Math-8386669c","./RuntimeError-7f634f5d","./WebGLConstants-5e2a49ab","./Plane-b91bfb59","./VertexFormat-7e57a3bd"],(function(e,t,r,n,a,u,i,o,s,c,p,m,h){"use strict";function f(n){var a,i,o=n.frustum,s=n.orientation,c=n.origin;n=e.defaultValue(n._drawNearPlane,!0);o instanceof u.PerspectiveFrustum?(a=0,i=u.PerspectiveFrustum.packedLength):o instanceof u.OrthographicFrustum&&(a=1,i=u.OrthographicFrustum.packedLength),this._frustumType=a,this._frustum=o.clone(),this._origin=r.Cartesian3.clone(c),this._orientation=t.Quaternion.clone(s),this._drawNearPlane=n,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+i+r.Cartesian3.packedLength+t.Quaternion.packedLength}f.pack=function(n,a,i){i=e.defaultValue(i,0);var o=n._frustumType,s=n._frustum;return 0===(a[i++]=o)?(u.PerspectiveFrustum.pack(s,a,i),i+=u.PerspectiveFrustum.packedLength):(u.OrthographicFrustum.pack(s,a,i),i+=u.OrthographicFrustum.packedLength),r.Cartesian3.pack(n._origin,a,i),i+=r.Cartesian3.packedLength,t.Quaternion.pack(n._orientation,a,i),a[i+=t.Quaternion.packedLength]=n._drawNearPlane?1:0,a};var d=new u.PerspectiveFrustum,g=new u.OrthographicFrustum,_=new t.Quaternion,k=new r.Cartesian3;return f.unpack=function(n,a,i){a=e.defaultValue(a,0);var o,s=n[a++];0===s?(o=u.PerspectiveFrustum.unpack(n,a,d),a+=u.PerspectiveFrustum.packedLength):(o=u.OrthographicFrustum.unpack(n,a,g),a+=u.OrthographicFrustum.packedLength);var c=r.Cartesian3.unpack(n,a,k);a+=r.Cartesian3.packedLength;var p=t.Quaternion.unpack(n,a,_);n=1===n[a+=t.Quaternion.packedLength];return e.defined(i)?(a=s===i._frustumType?i._frustum:void 0,i._frustum=o.clone(a),i._frustumType=s,i._origin=r.Cartesian3.clone(c,i._origin),i._orientation=t.Quaternion.clone(p,i._orientation),i._drawNearPlane=n,i):new f({frustum:o,origin:c,orientation:p,_drawNearPlane:n})},f.createGeometry=function(e){var r=e._frustumType,n=e._frustum,s=e._origin,c=e._orientation,p=e._drawNearPlane;e=new Float64Array(24);u.FrustumGeometry._computeNearFarPlanes(s,c,r,n,e);n=new o.GeometryAttributes({position:new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e})});for(var m,h,f=p?2:1,d=new Uint16Array(8*(1+f)),g=p?0:1;g<2;++g)d[m=p?8*g:0]=h=4*g,d[m+1]=h+1,d[m+2]=h+1,d[m+3]=h+2,d[m+4]=h+2,d[m+5]=h+3,d[m+6]=h+3,d[m+7]=h;for(g=0;g<2;++g)d[m=8*(f+g)]=h=4*g,d[m+1]=h+4,d[m+2]=h+1,d[m+3]=h+5,d[m+4]=h+2,d[m+5]=h+6,d[m+6]=h+3,d[m+7]=h+7;return new i.Geometry({attributes:n,indices:d,primitiveType:i.PrimitiveType.LINES,boundingSphere:t.BoundingSphere.fromVertices(e)})},function(t,r){return e.defined(r)&&(t=f.unpack(t,r)),f.createGeometry(t)}}));