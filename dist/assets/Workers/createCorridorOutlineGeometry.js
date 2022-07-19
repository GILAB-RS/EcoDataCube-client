define(["./GeometryOffsetAttribute-3497d4dd","./arrayRemoveDuplicates-3a9a9480","./Transforms-73e77b72","./Cartesian2-b4b7b0b3","./Check-5e798bbf","./ComponentDatatype-2da3a966","./PolylineVolumeGeometryLibrary-2b7ba2ef","./CorridorGeometryLibrary-60e7cc1b","./when-208fe5b0","./GeometryAttribute-b541caa6","./GeometryAttributes-b0b294d8","./IndexDatatype-3bc916b1","./Math-8386669c","./PolygonPipeline-b445e3f3","./RuntimeError-7f634f5d","./WebGLConstants-5e2a49ab","./EllipsoidTangentPlane-69cc10ff","./AxisAlignedBoundingBox-122de82b","./IntersectionTests-40db2afa","./Plane-b91bfb59","./PolylinePipeline-b7eedbaf","./EllipsoidGeodesic-92f0d3cc","./EllipsoidRhumbLine-73a4e3eb"],(function(e,t,i,r,o,a,n,s,l,d,u,p,f,h,y,c,b,g,m,A,v,_,E){"use strict";var C=new r.Cartesian3,G=new r.Cartesian3,T=new r.Cartesian3;function P(e,t){var i,o=[],f=e.positions,h=e.corners,y=e.endPositions,c=new u.GeometryAttributes,b=0,g=0,m=0;for(M=0;M<f.length;M+=2)b+=i=f[M].length-3,m+=i/3*4,g+=f[M+1].length-3;for(b+=3,g+=3,M=0;M<h.length;M++){var A=h[M],v=h[M].leftPositions;l.defined(v)?b+=i=v.length:g+=i=h[M].rightPositions.length,m+=i/3*2}var _,E=l.defined(y);E&&(b+=_=y[0].length-3,g+=_,m+=4*(_/=3));e=b+g;var P,w,L,D,k=new Float64Array(e),x=0,N=e-1,O=_/2,V=p.IndexDatatype.createTypedArray(e/3,m+4),H=0;if(V[H++]=x/3,V[H++]=(N-2)/3,E){o.push(x/3);for(var I=C,S=G,B=y[0],M=0;M<O;M++)I=r.Cartesian3.fromArray(B,3*(O-1-M),I),S=r.Cartesian3.fromArray(B,3*(O+M),S),s.CorridorGeometryLibrary.addAttribute(k,S,x),s.CorridorGeometryLibrary.addAttribute(k,I,void 0,N),D=1+(w=x/3),L=(P=(N-2)/3)-1,V[H++]=P,V[H++]=L,V[H++]=w,V[H++]=D,x+=3,N-=3}var R=0,U=f[R++],F=f[R++];for(k.set(U,x),k.set(F,N-F.length+1),i=F.length-3,o.push(x/3,(N-2)/3),M=0;M<i;M+=3)D=1+(w=x/3),L=(P=(N-2)/3)-1,V[H++]=P,V[H++]=L,V[H++]=w,V[H++]=D,x+=3,N-=3;for(M=0;M<h.length;M++){var Y,q,W=(A=h[M]).leftPositions,J=A.rightPositions,j=T;if(l.defined(W)){for(N-=3,q=L,o.push(D),Y=0;Y<W.length/3;Y++)j=r.Cartesian3.fromArray(W,3*Y,j),V[H++]=q-Y-1,V[H++]=q-Y,s.CorridorGeometryLibrary.addAttribute(k,j,void 0,N),N-=3;o.push(q-Math.floor(W.length/6)),t===n.CornerType.BEVELED&&o.push((N-2)/3+1),x+=3}else{for(x+=3,q=D,o.push(L),Y=0;Y<J.length/3;Y++)j=r.Cartesian3.fromArray(J,3*Y,j),V[H++]=q+Y,V[H++]=q+Y+1,s.CorridorGeometryLibrary.addAttribute(k,j,x),x+=3;o.push(q+Math.floor(J.length/6)),t===n.CornerType.BEVELED&&o.push(x/3-1),N-=3}for(U=f[R++],F=f[R++],U.splice(0,3),F.splice(F.length-3,3),k.set(U,x),k.set(F,N-F.length+1),i=F.length-3,Y=0;Y<F.length;Y+=3)w=(D=x/3)-1,V[H++]=P=1+(L=(N-2)/3),V[H++]=L,V[H++]=w,V[H++]=D,x+=3,N-=3;x-=3,N+=3,o.push(x/3,(N-2)/3)}if(E){x+=3,N-=3,I=C,S=G;var z=y[1];for(M=0;M<O;M++)I=r.Cartesian3.fromArray(z,3*(_-M-1),I),S=r.Cartesian3.fromArray(z,3*M,S),s.CorridorGeometryLibrary.addAttribute(k,I,void 0,N),s.CorridorGeometryLibrary.addAttribute(k,S,x),w=(D=x/3)-1,V[H++]=P=1+(L=(N-2)/3),V[H++]=L,V[H++]=w,V[H++]=D,x+=3,N-=3;o.push(x/3)}else o.push(x/3,(N-2)/3);return V[H++]=x/3,V[H++]=(N-2)/3,c.position=new d.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:k}),{attributes:c,indices:V,wallIndices:o}}function w(e){var t=(e=l.defaultValue(e,l.defaultValue.EMPTY_OBJECT)).positions,i=e.width,o=l.defaultValue(e.height,0),a=l.defaultValue(e.extrudedHeight,o);this._positions=t,this._ellipsoid=r.Ellipsoid.clone(l.defaultValue(e.ellipsoid,r.Ellipsoid.WGS84)),this._width=i,this._height=Math.max(o,a),this._extrudedHeight=Math.min(o,a),this._cornerType=l.defaultValue(e.cornerType,n.CornerType.ROUNDED),this._granularity=l.defaultValue(e.granularity,f.CesiumMath.RADIANS_PER_DEGREE),this._offsetAttribute=e.offsetAttribute,this._workerName="createCorridorOutlineGeometry",this.packedLength=1+t.length*r.Cartesian3.packedLength+r.Ellipsoid.packedLength+6}w.pack=function(e,t,i){i=l.defaultValue(i,0);var o=e._positions,a=o.length;t[i++]=a;for(var n=0;n<a;++n,i+=r.Cartesian3.packedLength)r.Cartesian3.pack(o[n],t,i);return r.Ellipsoid.pack(e._ellipsoid,t,i),i+=r.Ellipsoid.packedLength,t[i++]=e._width,t[i++]=e._height,t[i++]=e._extrudedHeight,t[i++]=e._cornerType,t[i++]=e._granularity,t[i]=l.defaultValue(e._offsetAttribute,-1),t};var L=r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),D={positions:void 0,ellipsoid:L,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,offsetAttribute:void 0};return w.unpack=function(e,t,i){t=l.defaultValue(t,0);for(var o=e[t++],a=new Array(o),n=0;n<o;++n,t+=r.Cartesian3.packedLength)a[n]=r.Cartesian3.unpack(e,t);var s=r.Ellipsoid.unpack(e,t,L);t+=r.Ellipsoid.packedLength;var d=e[t++],u=e[t++],p=e[t++],f=e[t++],h=e[t++],y=e[t];return l.defined(i)?(i._positions=a,i._ellipsoid=r.Ellipsoid.clone(s,i._ellipsoid),i._width=d,i._height=u,i._extrudedHeight=p,i._cornerType=f,i._granularity=h,i._offsetAttribute=-1===y?void 0:y,i):(D.positions=a,D.width=d,D.height=u,D.extrudedHeight=p,D.cornerType=f,D.granularity=h,D.offsetAttribute=-1===y?void 0:y,new w(D))},w.createGeometry=function(o){var n=o._positions,u=o._width,y=o._ellipsoid,c=(n=function(e,t){for(var i=0;i<e.length;i++)e[i]=t.scaleToGeodeticSurface(e[i],e[i]);return e}(n,y),t.arrayRemoveDuplicates(n,r.Cartesian3.equalsEpsilon));if(!(c.length<2||u<=0)){var b,g=o._height,m=o._extrudedHeight;n=!f.CesiumMath.equalsEpsilon(g,m,0,f.CesiumMath.EPSILON2),u={ellipsoid:y,positions:c,width:u,cornerType:o._cornerType,granularity:o._granularity,saveAttributes:!1};n?(u.height=g,u.extrudedHeight=m,u.offsetAttribute=o._offsetAttribute,b=function(t){var i=t.ellipsoid,r=(c=P(s.CorridorGeometryLibrary.computePositions(t),t.cornerType)).wallIndices,o=t.height,n=t.extrudedHeight,u=c.attributes,f=c.indices,y=(b=u.position.values).length;(g=new Float64Array(y)).set(b);var c=new Float64Array(2*y),b=h.PolygonPipeline.scaleToGeodeticHeight(b,o,i),g=h.PolygonPipeline.scaleToGeodeticHeight(g,n,i);c.set(b),c.set(g,y),u.position.values=c,y/=3,l.defined(t.offsetAttribute)&&(g=new Uint8Array(2*y),g=t.offsetAttribute===e.GeometryOffsetAttribute.TOP?e.arrayFill(g,1,0,y):(t=t.offsetAttribute===e.GeometryOffsetAttribute.NONE?0:1,e.arrayFill(g,t)),u.applyOffset=new d.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:g}));var m=f.length,A=p.IndexDatatype.createTypedArray(c.length/3,2*(m+r.length));A.set(f);for(var v,_,E=m,C=0;C<m;C+=2){var G=f[C],T=f[C+1];A[E++]=G+y,A[E++]=T+y}for(C=0;C<r.length;C++)_=(v=r[C])+y,A[E++]=v,A[E++]=_;return{attributes:u,indices:A}}(u)):((b=P(s.CorridorGeometryLibrary.computePositions(u),u.cornerType)).attributes.position.values=h.PolygonPipeline.scaleToGeodeticHeight(b.attributes.position.values,g,y),l.defined(o._offsetAttribute)&&(A=b.attributes.position.values.length,v=new Uint8Array(A/3),A=o._offsetAttribute===e.GeometryOffsetAttribute.NONE?0:1,e.arrayFill(v,A),b.attributes.applyOffset=new d.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:v})));var A=b.attributes,v=i.BoundingSphere.fromVertices(A.position.values,void 0,3);return new d.Geometry({attributes:A,indices:b.indices,primitiveType:d.PrimitiveType.LINES,boundingSphere:v,offsetAttribute:o._offsetAttribute})}},function(e,t){return(e=l.defined(t)?w.unpack(e,t):e)._ellipsoid=r.Ellipsoid.clone(e._ellipsoid),w.createGeometry(e)}}));