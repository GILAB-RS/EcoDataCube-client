define(["./when-208fe5b0","./Cartesian2-b4b7b0b3","./ArcType-dc1c5aee","./GeometryOffsetAttribute-3497d4dd","./Transforms-73e77b72","./Check-5e798bbf","./ComponentDatatype-2da3a966","./EllipsoidTangentPlane-69cc10ff","./GeometryAttribute-b541caa6","./GeometryAttributes-b0b294d8","./GeometryInstance-411ead1b","./GeometryPipeline-86615bad","./IndexDatatype-3bc916b1","./Math-8386669c","./PolygonGeometryLibrary-9fe00cbc","./PolygonPipeline-b445e3f3","./RuntimeError-7f634f5d","./WebGLConstants-5e2a49ab","./AxisAlignedBoundingBox-122de82b","./IntersectionTests-40db2afa","./Plane-b91bfb59","./AttributeCompression-9711314b","./EncodedCartesian3-21af0f3b","./arrayRemoveDuplicates-3a9a9480","./EllipsoidRhumbLine-73a4e3eb"],(function(e,t,i,r,o,n,a,l,s,y,u,p,d,g,c,f,b,h,m,P,E,A,_,v,G){"use strict";var L=[],T=[];function H(r){var o,n=r.polygonHierarchy,a=e.defaultValue(r.ellipsoid,t.Ellipsoid.WGS84),l=e.defaultValue(r.granularity,g.CesiumMath.RADIANS_PER_DEGREE),s=e.defaultValue(r.perPositionHeight,!1),y=s&&e.defined(r.extrudedHeight),u=e.defaultValue(r.arcType,i.ArcType.GEODESIC),p=e.defaultValue(r.height,0),d=e.defaultValue(r.extrudedHeight,p);y||(o=Math.max(p,d),d=Math.min(p,d),p=o),this._ellipsoid=t.Ellipsoid.clone(a),this._granularity=l,this._height=p,this._extrudedHeight=d,this._arcType=u,this._polygonHierarchy=n,this._perPositionHeight=s,this._perPositionHeightExtrude=y,this._offsetAttribute=r.offsetAttribute,this._workerName="createPolygonOutlineGeometry",this.packedLength=c.PolygonGeometryLibrary.computeHierarchyPackedLength(n)+t.Ellipsoid.packedLength+8}H.pack=function(i,r,o){return o=e.defaultValue(o,0),o=c.PolygonGeometryLibrary.packPolygonHierarchy(i._polygonHierarchy,r,o),t.Ellipsoid.pack(i._ellipsoid,r,o),o+=t.Ellipsoid.packedLength,r[o++]=i._height,r[o++]=i._extrudedHeight,r[o++]=i._granularity,r[o++]=i._perPositionHeightExtrude?1:0,r[o++]=i._perPositionHeight?1:0,r[o++]=i._arcType,r[o++]=e.defaultValue(i._offsetAttribute,-1),r[o]=i.packedLength,r};var C=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),O={polygonHierarchy:{}};return H.unpack=function(i,r,o){r=e.defaultValue(r,0);var n=c.PolygonGeometryLibrary.unpackPolygonHierarchy(i,r);r=n.startingIndex,delete n.startingIndex;var a=t.Ellipsoid.unpack(i,r,C);r+=t.Ellipsoid.packedLength;var l=i[r++],s=i[r++],y=i[r++],u=1===i[r++],p=1===i[r++],d=i[r++],g=i[r++];r=i[r];return(o=e.defined(o)?o:new H(O))._polygonHierarchy=n,o._ellipsoid=t.Ellipsoid.clone(a,o._ellipsoid),o._height=l,o._extrudedHeight=s,o._granularity=y,o._perPositionHeight=p,o._perPositionHeightExtrude=u,o._arcType=d,o._offsetAttribute=-1===g?void 0:g,o.packedLength=r,o},H.fromPositions=function(t){return new H({polygonHierarchy:{positions:(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions},height:t.height,extrudedHeight:t.extrudedHeight,ellipsoid:t.ellipsoid,granularity:t.granularity,perPositionHeight:t.perPositionHeight,arcType:t.arcType,offsetAttribute:t.offsetAttribute})},H.createGeometry=function(t){var n=t._ellipsoid,b=t._granularity,h=t._polygonHierarchy,m=t._perPositionHeight,P=t._arcType,E=c.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(h,!m,n);if(0!==E.length){var A,_,v,G,H,C,O=[],x=g.CesiumMath.chordLength(b,n.maximumRadius),D=t._height,I=t._extrudedHeight;if(t._perPositionHeightExtrude||!g.CesiumMath.equalsEpsilon(D,I,0,g.CesiumMath.EPSILON2))for(A=0;A<E.length;A++)(G=function(e,t,r,o,n){var p,g=l.EllipsoidTangentPlane.fromPoints(t,e).projectPointsOntoPlane(t,L);f.PolygonPipeline.computeWindingOrder2D(g)===f.WindingOrder.CLOCKWISE&&(g.reverse(),t=t.slice().reverse());var b=t.length,h=new Array(b),m=0;if(o)for(p=new Float64Array(2*b*3*2),O=0;O<b;++O){h[O]=m/3;var P=t[O],E=t[(O+1)%b];p[m++]=P.x,p[m++]=P.y,p[m++]=P.z,p[m++]=E.x,p[m++]=E.y,p[m++]=E.z}else{var A,_=0;if(n===i.ArcType.GEODESIC)for(O=0;O<b;O++)_+=c.PolygonGeometryLibrary.subdivideLineCount(t[O],t[(O+1)%b],r);else if(n===i.ArcType.RHUMB)for(O=0;O<b;O++)_+=c.PolygonGeometryLibrary.subdivideRhumbLineCount(e,t[O],t[(O+1)%b],r);for(p=new Float64Array(3*_*2),O=0;O<b;++O){h[O]=m/3,n===i.ArcType.GEODESIC?A=c.PolygonGeometryLibrary.subdivideLine(t[O],t[(O+1)%b],r,T):n===i.ArcType.RHUMB&&(A=c.PolygonGeometryLibrary.subdivideRhumbLine(e,t[O],t[(O+1)%b],r,T));for(var v=A.length,G=0;G<v;++G)p[m++]=A[G]}}b=p.length/6;for(var H=h.length,C=d.IndexDatatype.createTypedArray(b+H,2*(2*b+H)),O=(m=0,0);O<b;++O)C[m++]=O,C[m++]=(O+1)%b,C[m++]=O+b,C[m++]=(O+1)%b+b;for(O=0;O<H;O++){var x=h[O];C[m++]=x,C[m++]=x+b}return new u.GeometryInstance({geometry:new s.Geometry({attributes:new y.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:p})}),indices:C,primitiveType:s.PrimitiveType.LINES})})}(n,E[A],x,m,P)).geometry=c.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(G.geometry,D,I,n,m),e.defined(t._offsetAttribute)&&(_=G.geometry.attributes.position.values.length/3,v=new Uint8Array(_),v=t._offsetAttribute===r.GeometryOffsetAttribute.TOP?r.arrayFill(v,1,0,_/2):(C=t._offsetAttribute===r.GeometryOffsetAttribute.NONE?0:1,r.arrayFill(v,C)),G.geometry.attributes.applyOffset=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:v})),O.push(G);else for(A=0;A<E.length;A++)(G=function(e,t,r,o,n){var p,g=l.EllipsoidTangentPlane.fromPoints(t,e).projectPointsOntoPlane(t,L);f.PolygonPipeline.computeWindingOrder2D(g)===f.WindingOrder.CLOCKWISE&&(g.reverse(),t=t.slice().reverse());var b=t.length,h=0;if(o)for(p=new Float64Array(2*b*3),H=0;H<b;H++){var m=t[H],P=t[(H+1)%b];p[h++]=m.x,p[h++]=m.y,p[h++]=m.z,p[h++]=P.x,p[h++]=P.y,p[h++]=P.z}else{var E,A=0;if(n===i.ArcType.GEODESIC)for(H=0;H<b;H++)A+=c.PolygonGeometryLibrary.subdivideLineCount(t[H],t[(H+1)%b],r);else if(n===i.ArcType.RHUMB)for(H=0;H<b;H++)A+=c.PolygonGeometryLibrary.subdivideRhumbLineCount(e,t[H],t[(H+1)%b],r);for(p=new Float64Array(3*A),H=0;H<b;H++){n===i.ArcType.GEODESIC?E=c.PolygonGeometryLibrary.subdivideLine(t[H],t[(H+1)%b],r,T):n===i.ArcType.RHUMB&&(E=c.PolygonGeometryLibrary.subdivideRhumbLine(e,t[H],t[(H+1)%b],r,T));for(var _=E.length,v=0;v<_;++v)p[h++]=E[v]}}b=p.length/3;for(var G=d.IndexDatatype.createTypedArray(b,2*b),H=(h=0,0);H<b-1;H++)G[h++]=H,G[h++]=H+1;return G[h++]=b-1,G[h++]=0,new u.GeometryInstance({geometry:new s.Geometry({attributes:new y.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:p})}),indices:G,primitiveType:s.PrimitiveType.LINES})})}(n,E[A],x,m,P)).geometry.attributes.position.values=f.PolygonPipeline.scaleToGeodeticHeight(G.geometry.attributes.position.values,D,n,!m),e.defined(t._offsetAttribute)&&(H=G.geometry.attributes.position.values.length,H=new Uint8Array(H/3),C=t._offsetAttribute===r.GeometryOffsetAttribute.NONE?0:1,r.arrayFill(H,C),G.geometry.attributes.applyOffset=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:H})),O.push(G);return h=p.GeometryPipeline.combineInstances(O)[0],b=o.BoundingSphere.fromVertices(h.attributes.position.values),new s.Geometry({attributes:h.attributes,indices:h.indices,primitiveType:h.primitiveType,boundingSphere:b,offsetAttribute:t._offsetAttribute})}},function(i,r){return(i=e.defined(r)?H.unpack(i,r):i)._ellipsoid=t.Ellipsoid.clone(i._ellipsoid),H.createGeometry(i)}}));