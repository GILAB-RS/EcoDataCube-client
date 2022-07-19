define(["./Cartesian2-b4b7b0b3","./Check-5e798bbf","./when-208fe5b0","./EllipseGeometry-be322b26","./VertexFormat-7e57a3bd","./Math-8386669c","./GeometryOffsetAttribute-3497d4dd","./Transforms-73e77b72","./RuntimeError-7f634f5d","./ComponentDatatype-2da3a966","./WebGLConstants-5e2a49ab","./EllipseGeometryLibrary-c8749cb9","./GeometryAttribute-b541caa6","./GeometryAttributes-b0b294d8","./GeometryInstance-411ead1b","./GeometryPipeline-86615bad","./AttributeCompression-9711314b","./EncodedCartesian3-21af0f3b","./IndexDatatype-3bc916b1","./IntersectionTests-40db2afa","./Plane-b91bfb59"],(function(e,t,i,r,o,a,n,s,l,d,m,u,p,c,y,_,h,G,b,x,f){"use strict";function g(e){var t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).radius;e={center:e.center,semiMajorAxis:t,semiMinorAxis:t,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new r.EllipseGeometry(e),this._workerName="createCircleGeometry"}g.packedLength=r.EllipseGeometry.packedLength,g.pack=function(e,t,i){return r.EllipseGeometry.pack(e._ellipseGeometry,t,i)};var E=new r.EllipseGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),v={center:new e.Cartesian3,radius:void 0,ellipsoid:e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new o.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return g.unpack=function(t,a,n){return a=r.EllipseGeometry.unpack(t,a,E),v.center=e.Cartesian3.clone(a._center,v.center),v.ellipsoid=e.Ellipsoid.clone(a._ellipsoid,v.ellipsoid),v.height=a._height,v.extrudedHeight=a._extrudedHeight,v.granularity=a._granularity,v.vertexFormat=o.VertexFormat.clone(a._vertexFormat,v.vertexFormat),v.stRotation=a._stRotation,v.shadowVolume=a._shadowVolume,i.defined(n)?(v.semiMajorAxis=a._semiMajorAxis,v.semiMinorAxis=a._semiMinorAxis,n._ellipseGeometry=new r.EllipseGeometry(v),n):(v.radius=a._semiMajorAxis,new g(v))},g.createGeometry=function(e){return r.EllipseGeometry.createGeometry(e._ellipseGeometry)},g.createShadowVolume=function(e,t,i){var r=e._ellipseGeometry._granularity,a=e._ellipseGeometry._ellipsoid;t=t(r,a),i=i(r,a);return new g({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:a,stRotation:e._ellipseGeometry._stRotation,granularity:r,extrudedHeight:t,height:i,vertexFormat:o.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(g.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(t,r){return(t=i.defined(r)?g.unpack(t,r):t)._ellipseGeometry._center=e.Cartesian3.clone(t._ellipseGeometry._center),t._ellipseGeometry._ellipsoid=e.Ellipsoid.clone(t._ellipseGeometry._ellipsoid),g.createGeometry(t)}}));