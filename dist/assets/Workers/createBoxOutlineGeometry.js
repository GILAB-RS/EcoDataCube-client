define(["./GeometryOffsetAttribute-3497d4dd","./Transforms-73e77b72","./Cartesian2-b4b7b0b3","./Check-5e798bbf","./ComponentDatatype-2da3a966","./when-208fe5b0","./GeometryAttribute-b541caa6","./GeometryAttributes-b0b294d8","./Math-8386669c","./RuntimeError-7f634f5d","./WebGLConstants-5e2a49ab"],(function(e,t,a,n,i,r,u,m,o,s,f){"use strict";var c=new a.Cartesian3;function b(e){var t=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).minimum,n=e.maximum;this._min=a.Cartesian3.clone(t),this._max=a.Cartesian3.clone(n),this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxOutlineGeometry"}b.fromDimensions=function(e){var t=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).dimensions;t=a.Cartesian3.multiplyByScalar(t,.5,new a.Cartesian3);return new b({minimum:a.Cartesian3.negate(t,new a.Cartesian3),maximum:t,offsetAttribute:e.offsetAttribute})},b.fromAxisAlignedBoundingBox=function(e){return new b({minimum:e.minimum,maximum:e.maximum})},b.packedLength=2*a.Cartesian3.packedLength+1,b.pack=function(e,t,n){return n=r.defaultValue(n,0),a.Cartesian3.pack(e._min,t,n),a.Cartesian3.pack(e._max,t,n+a.Cartesian3.packedLength),t[n+2*a.Cartesian3.packedLength]=r.defaultValue(e._offsetAttribute,-1),t};var d=new a.Cartesian3,p=new a.Cartesian3,y={minimum:d,maximum:p,offsetAttribute:void 0};return b.unpack=function(e,t,n){t=r.defaultValue(t,0);var i=a.Cartesian3.unpack(e,t,d),u=a.Cartesian3.unpack(e,t+a.Cartesian3.packedLength,p);t=e[t+2*a.Cartesian3.packedLength];return r.defined(n)?(n._min=a.Cartesian3.clone(i,n._min),n._max=a.Cartesian3.clone(u,n._max),n._offsetAttribute=-1===t?void 0:t,n):(y.offsetAttribute=-1===t?void 0:t,new b(y))},b.createGeometry=function(n){var o=n._min,s=n._max;if(!a.Cartesian3.equals(o,s)){var f=new m.GeometryAttributes,b=new Uint16Array(24),d=new Float64Array(24);return d[0]=o.x,d[1]=o.y,d[2]=o.z,d[3]=s.x,d[4]=o.y,d[5]=o.z,d[6]=s.x,d[7]=s.y,d[8]=o.z,d[9]=o.x,d[10]=s.y,d[11]=o.z,d[12]=o.x,d[13]=o.y,d[14]=s.z,d[15]=s.x,d[16]=o.y,d[17]=s.z,d[18]=s.x,d[19]=s.y,d[20]=s.z,d[21]=o.x,d[22]=s.y,d[23]=s.z,f.position=new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:d}),b[0]=4,b[1]=5,b[2]=5,b[3]=6,b[4]=6,b[5]=7,b[6]=7,b[7]=4,b[8]=0,b[9]=1,b[10]=1,b[11]=2,b[12]=2,b[13]=3,b[14]=3,b[15]=0,b[16]=0,b[17]=4,b[18]=1,b[19]=5,b[20]=2,b[21]=6,b[22]=3,b[23]=7,s=a.Cartesian3.subtract(s,o,c),o=.5*a.Cartesian3.magnitude(s),r.defined(n._offsetAttribute)&&(s=d.length,d=new Uint8Array(s/3),s=n._offsetAttribute===e.GeometryOffsetAttribute.NONE?0:1,e.arrayFill(d,s),f.applyOffset=new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:d})),new u.Geometry({attributes:f,indices:b,primitiveType:u.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(a.Cartesian3.ZERO,o),offsetAttribute:n._offsetAttribute})}},function(e,t){return r.defined(t)&&(e=b.unpack(e,t)),b.createGeometry(e)}}));