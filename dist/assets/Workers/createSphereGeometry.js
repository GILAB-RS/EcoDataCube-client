define(["./when-208fe5b0","./Cartesian2-b4b7b0b3","./Check-5e798bbf","./EllipsoidGeometry-fc6173aa","./VertexFormat-7e57a3bd","./Math-8386669c","./GeometryOffsetAttribute-3497d4dd","./Transforms-73e77b72","./RuntimeError-7f634f5d","./ComponentDatatype-2da3a966","./WebGLConstants-5e2a49ab","./GeometryAttribute-b541caa6","./GeometryAttributes-b0b294d8","./IndexDatatype-3bc916b1"],(function(e,t,r,i,a,o,n,s,d,c,l,m,u,p){"use strict";function y(r){var a=e.defaultValue(r.radius,1);r={radii:new t.Cartesian3(a,a,a),stackPartitions:r.stackPartitions,slicePartitions:r.slicePartitions,vertexFormat:r.vertexFormat};this._ellipsoidGeometry=new i.EllipsoidGeometry(r),this._workerName="createSphereGeometry"}y.packedLength=i.EllipsoidGeometry.packedLength,y.pack=function(e,t,r){return i.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,r)};var G=new i.EllipsoidGeometry,b={radius:void 0,radii:new t.Cartesian3,vertexFormat:new a.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return y.unpack=function(r,o,n){return o=i.EllipsoidGeometry.unpack(r,o,G),b.vertexFormat=a.VertexFormat.clone(o._vertexFormat,b.vertexFormat),b.stackPartitions=o._stackPartitions,b.slicePartitions=o._slicePartitions,e.defined(n)?(t.Cartesian3.clone(o._radii,b.radii),n._ellipsoidGeometry=new i.EllipsoidGeometry(b),n):(b.radius=o._radii.x,new y(b))},y.createGeometry=function(e){return i.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(t,r){return e.defined(r)&&(t=y.unpack(t,r)),y.createGeometry(t)}}));