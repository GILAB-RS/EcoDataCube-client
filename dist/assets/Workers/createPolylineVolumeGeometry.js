define(["./when-208fe5b0","./Cartesian2-b4b7b0b3","./arrayRemoveDuplicates-3a9a9480","./BoundingRectangle-67be6fe0","./Transforms-73e77b72","./ComponentDatatype-2da3a966","./PolylineVolumeGeometryLibrary-2b7ba2ef","./Check-5e798bbf","./GeometryAttribute-b541caa6","./GeometryAttributes-b0b294d8","./GeometryPipeline-86615bad","./IndexDatatype-3bc916b1","./Math-8386669c","./PolygonPipeline-b445e3f3","./VertexFormat-7e57a3bd","./RuntimeError-7f634f5d","./WebGLConstants-5e2a49ab","./EllipsoidTangentPlane-69cc10ff","./AxisAlignedBoundingBox-122de82b","./IntersectionTests-40db2afa","./Plane-b91bfb59","./PolylinePipeline-b7eedbaf","./EllipsoidGeodesic-92f0d3cc","./EllipsoidRhumbLine-73a4e3eb","./AttributeCompression-9711314b","./EncodedCartesian3-21af0f3b"],(function(e,t,n,i,r,a,o,l,s,p,d,u,c,g,y,m,h,b,f,v,E,P,x,_,k,C){"use strict";var L={};function V(t,n){e.defined(L[t])||(L[t]=!0)}function F(n){var i=(n=e.defaultValue(n,e.defaultValue.EMPTY_OBJECT)).polylinePositions,r=n.shapePositions;this._positions=i,this._shape=r,this._ellipsoid=t.Ellipsoid.clone(e.defaultValue(n.ellipsoid,t.Ellipsoid.WGS84)),this._cornerType=e.defaultValue(n.cornerType,o.CornerType.ROUNDED),this._vertexFormat=y.VertexFormat.clone(e.defaultValue(n.vertexFormat,y.VertexFormat.DEFAULT)),this._granularity=e.defaultValue(n.granularity,c.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeGeometry",i=1+i.length*t.Cartesian3.packedLength,i+=1+r.length*t.Cartesian2.packedLength,this.packedLength=i+t.Ellipsoid.packedLength+y.VertexFormat.packedLength+2}V.geometryOutlines="Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.",V.geometryZIndex="Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored",V.geometryHeightReference="Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored",V.geometryExtrudedHeightReference="Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored",F.pack=function(n,i,r){var a;r=e.defaultValue(r,0);var o=n._positions,l=o.length;for(i[r++]=l,a=0;a<l;++a,r+=t.Cartesian3.packedLength)t.Cartesian3.pack(o[a],i,r);var s=n._shape;l=s.length;for(i[r++]=l,a=0;a<l;++a,r+=t.Cartesian2.packedLength)t.Cartesian2.pack(s[a],i,r);return t.Ellipsoid.pack(n._ellipsoid,i,r),r+=t.Ellipsoid.packedLength,y.VertexFormat.pack(n._vertexFormat,i,r),r+=y.VertexFormat.packedLength,i[r++]=n._cornerType,i[r]=n._granularity,i};var w=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),A=new y.VertexFormat,T={polylinePositions:void 0,shapePositions:void 0,ellipsoid:w,vertexFormat:A,cornerType:void 0,granularity:void 0};F.unpack=function(n,i,r){i=e.defaultValue(i,0);for(var a=n[i++],o=new Array(a),l=0;l<a;++l,i+=t.Cartesian3.packedLength)o[l]=t.Cartesian3.unpack(n,i);a=n[i++];var s=new Array(a);for(l=0;l<a;++l,i+=t.Cartesian2.packedLength)s[l]=t.Cartesian2.unpack(n,i);var p=t.Ellipsoid.unpack(n,i,w);i+=t.Ellipsoid.packedLength;var d=y.VertexFormat.unpack(n,i,A);i+=y.VertexFormat.packedLength;var u=n[i++],c=n[i];return e.defined(r)?(r._positions=o,r._shape=s,r._ellipsoid=t.Ellipsoid.clone(p,r._ellipsoid),r._vertexFormat=y.VertexFormat.clone(d,r._vertexFormat),r._cornerType=u,r._granularity=c,r):(T.polylinePositions=o,T.shapePositions=s,T.cornerType=u,T.granularity=c,new F(T))};var G=new i.BoundingRectangle;return F.createGeometry=function(e){var l=e._positions,c=n.arrayRemoveDuplicates(l,t.Cartesian3.equalsEpsilon),y=e._shape;y=o.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y);if(!(c.length<2||y.length<3))return g.PolygonPipeline.computeWindingOrder2D(y)===g.WindingOrder.CLOCKWISE&&y.reverse(),l=i.BoundingRectangle.fromPoints(y,G),function(e,t,n,i){var o=new p.GeometryAttributes;i.position&&(o.position=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e}));var l,c,y,m,h,b=t.length,f=e.length/3,v=(f-2*b)/(2*b),E=g.PolygonPipeline.triangulate(t),P=(v-1)*b*6+2*E.length,x=u.IndexDatatype.createTypedArray(f,P),_=2*b,k=0;for(R=0;R<v-1;R++){for(l=0;l<b-1;l++)h=(c=2*l+R*b*2)+_,m=(y=c+1)+_,x[k++]=y,x[k++]=c,x[k++]=m,x[k++]=m,x[k++]=c,x[k++]=h;m=(y=1+(c=2*b-2+R*b*2))+_,h=c+_,x[k++]=y,x[k++]=c,x[k++]=m,x[k++]=m,x[k++]=c,x[k++]=h}if(i.st||i.tangent||i.bitangent){for(var C,L,F=new Float32Array(2*f),w=1/(v-1),A=1/n.height,T=n.height/2,G=0,R=0;R<v;R++){for(L=A*(t[0].y+T),F[G++]=C=R*w,F[G++]=L,l=1;l<b;l++)L=A*(t[l].y+T),F[G++]=C,F[G++]=L,F[G++]=C,F[G++]=L;L=A*(t[0].y+T),F[G++]=C,F[G++]=L}for(l=0;l<b;l++)L=A*(t[l].y+T),F[G++]=C=0,F[G++]=L;for(l=0;l<b;l++)L=A*(t[l].y+T),F[G++]=C=(v-1)*w,F[G++]=L;o.st=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:new Float32Array(F)})}var D=f-2*b;for(R=0;R<E.length;R+=3){var I=E[R]+D,B=E[R+1]+D,O=E[R+2]+D;x[k++]=I,x[k++]=B,x[k++]=O,x[k++]=O+b,x[k++]=B+b,x[k++]=I+b}if(e=new s.Geometry({attributes:o,indices:x,boundingSphere:r.BoundingSphere.fromVertices(e),primitiveType:s.PrimitiveType.TRIANGLES}),i.normal&&(e=d.GeometryPipeline.computeNormal(e)),i.tangent||i.bitangent){try{e=d.GeometryPipeline.computeTangentAndBitangent(e)}catch(e){V("polyline-volume-tangent-bitangent")}i.tangent||(e.attributes.tangent=void 0),i.bitangent||(e.attributes.bitangent=void 0),i.st||(e.attributes.st=void 0)}return e}(o.PolylineVolumeGeometryLibrary.computePositions(c,y,l,e,!0),y,l,e._vertexFormat)},function(n,i){return(n=e.defined(i)?F.unpack(n,i):n)._ellipsoid=t.Ellipsoid.clone(n._ellipsoid),F.createGeometry(n)}}));