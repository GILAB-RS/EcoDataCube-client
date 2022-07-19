define(["./when-208fe5b0","./Cartesian2-b4b7b0b3","./GeometryOffsetAttribute-3497d4dd","./Transforms-73e77b72","./Check-5e798bbf","./ComponentDatatype-2da3a966","./GeometryAttribute-b541caa6","./GeometryAttributes-b0b294d8","./GeometryInstance-411ead1b","./GeometryPipeline-86615bad","./IndexDatatype-3bc916b1","./Math-8386669c","./PolygonPipeline-b445e3f3","./RectangleGeometryLibrary-8704e860","./VertexFormat-7e57a3bd","./RuntimeError-7f634f5d","./WebGLConstants-5e2a49ab","./AttributeCompression-9711314b","./EncodedCartesian3-21af0f3b","./IntersectionTests-40db2afa","./Plane-b91bfb59","./EllipsoidRhumbLine-73a4e3eb"],(function(t,e,a,r,n,i,o,s,l,u,c,m,p,d,g,y,f,b,h,v,_,A){"use strict";var x=new e.Cartesian3,w=new e.Cartesian3,C=new e.Cartesian3,R=new e.Cartesian3,E=new e.Rectangle,F=new e.Cartesian2,G=new r.BoundingSphere,P=new r.BoundingSphere;function V(t,e){var a=new o.Geometry({attributes:new s.GeometryAttributes,primitiveType:o.PrimitiveType.TRIANGLES});return a.attributes.position=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e.positions}),t.normal&&(a.attributes.normal=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.normals})),t.tangent&&(a.attributes.tangent=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.tangents})),t.bitangent&&(a.attributes.bitangent=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.bitangents})),a}var L=new e.Cartesian3,D=new e.Cartesian3;function M(t,a){var n=t._vertexFormat,s=t._ellipsoid,l=a.height,u=a.width,m=a.northCap,p=a.southCap,g=0,y=l,f=l;t=0;m&&(--f,t+=g=1),p&&(--y,--f,t+=1),t+=u*f;for(var b=n.position?new Float64Array(3*t):void 0,h=n.st?new Float32Array(2*t):void 0,v=0,_=0,A=x,E=F,G=Number.MAX_VALUE,P=Number.MAX_VALUE,L=-Number.MAX_VALUE,D=-Number.MAX_VALUE,M=g;M<y;++M)for(var T=0;T<u;++T)d.RectangleGeometryLibrary.computePosition(a,s,n.st,M,T,A,E),b[v++]=A.x,b[v++]=A.y,b[v++]=A.z,n.st&&(h[_++]=E.x,h[_++]=E.y,G=Math.min(G,E.x),P=Math.min(P,E.y),L=Math.max(L,E.x),D=Math.max(D,E.y));if(m&&(d.RectangleGeometryLibrary.computePosition(a,s,n.st,0,0,A,E),b[v++]=A.x,b[v++]=A.y,b[v++]=A.z,n.st&&(h[_++]=E.x,h[_++]=E.y,G=E.x,P=E.y,L=E.x,D=E.y)),p&&(d.RectangleGeometryLibrary.computePosition(a,s,n.st,l-1,0,A,E),b[v++]=A.x,b[v++]=A.y,b[v]=A.z,n.st&&(h[_++]=E.x,h[_]=E.y,G=Math.min(G,E.x),P=Math.min(P,E.y),L=Math.max(L,E.x),D=Math.max(D,E.y))),n.st&&(G<0||P<0||1<L||1<D))for(var O=0;O<h.length;O+=2)h[O]=(h[O]-G)/(L-G),h[O+1]=(h[O+1]-P)/(D-P);g=function(t,a,n,i){var o=t.length,s=a.normal?new Float32Array(o):void 0,l=a.tangent?new Float32Array(o):void 0,u=a.bitangent?new Float32Array(o):void 0,c=0,m=R,p=C,d=w;if(a.normal||a.tangent||a.bitangent)for(var g=0;g<o;g+=3){var y=e.Cartesian3.fromArray(t,g,x),f=c+1,b=c+2;d=n.geodeticSurfaceNormal(y,d);(a.tangent||a.bitangent)&&(e.Cartesian3.cross(e.Cartesian3.UNIT_Z,d,p),r.Matrix3.multiplyByVector(i,p,p),e.Cartesian3.normalize(p,p),a.bitangent&&e.Cartesian3.normalize(e.Cartesian3.cross(d,p,m),m)),a.normal&&(s[c]=d.x,s[f]=d.y,s[b]=d.z),a.tangent&&(l[c]=p.x,l[f]=p.y,l[b]=p.z),a.bitangent&&(u[c]=m.x,u[f]=m.y,u[b]=m.z),c+=3}return V(a,{positions:t,normals:s,tangents:l,bitangents:u})}(b,n,s,a.tangentRotationMatrix),l=6*(u-1)*(f-1),m&&(l+=3*(u-1)),p&&(l+=3*(u-1));for(var N=c.IndexDatatype.createTypedArray(t,l),S=0,I=0,k=0;k<f-1;++k){for(var H=0;H<u-1;++H){var z=S,B=z+u,U=B+1,Y=z+1;N[I++]=z,N[I++]=B,N[I++]=Y,N[I++]=Y,N[I++]=B,N[I++]=U,++S}++S}if(m||p){var q,X,Q=t-1,W=t-1;if(m&&p&&(Q=t-2),S=0,m)for(k=0;k<u-1;k++)X=(q=S)+1,N[I++]=Q,N[I++]=q,N[I++]=X,++S;if(p)for(S=(f-1)*u,k=0;k<u-1;k++)X=(q=S)+1,N[I++]=q,N[I++]=W,N[I++]=X,++S}return g.indices=N,n.st&&(g.attributes.st=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:h})),g}function T(t,e,a,r,n){return t[e++]=r[a],t[e++]=r[a+1],t[e++]=r[a+2],t[e++]=n[a],t[e++]=n[a+1],t[e]=n[a+2],t}function O(t,e,a,r){return t[e++]=r[a],t[e++]=r[a+1],t[e++]=r[a],t[e]=r[a+1],t}var N=new g.VertexFormat;var S=[new e.Cartesian3,new e.Cartesian3,new e.Cartesian3,new e.Cartesian3],I=new e.Cartographic,k=new e.Cartographic;function H(t,a,r,n,i){if(0===r)return e.Rectangle.clone(t,i);var o=d.RectangleGeometryLibrary.computeOptions(t,a,r,0,E,I);t=o.height,a=o.width,r=S;return d.RectangleGeometryLibrary.computePosition(o,n,!1,0,0,r[0]),d.RectangleGeometryLibrary.computePosition(o,n,!1,0,a-1,r[1]),d.RectangleGeometryLibrary.computePosition(o,n,!1,t-1,0,r[2]),d.RectangleGeometryLibrary.computePosition(o,n,!1,t-1,a-1,r[3]),e.Rectangle.fromCartesianArray(r,n,i)}function z(a){var r=(a=t.defaultValue(a,t.defaultValue.EMPTY_OBJECT)).rectangle,n=t.defaultValue(a.height,0),i=t.defaultValue(a.extrudedHeight,n);this._rectangle=e.Rectangle.clone(r),this._granularity=t.defaultValue(a.granularity,m.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=e.Ellipsoid.clone(t.defaultValue(a.ellipsoid,e.Ellipsoid.WGS84)),this._surfaceHeight=Math.max(n,i),this._rotation=t.defaultValue(a.rotation,0),this._stRotation=t.defaultValue(a.stRotation,0),this._vertexFormat=g.VertexFormat.clone(t.defaultValue(a.vertexFormat,g.VertexFormat.DEFAULT)),this._extrudedHeight=Math.min(n,i),this._shadowVolume=t.defaultValue(a.shadowVolume,!1),this._workerName="createRectangleGeometry",this._offsetAttribute=a.offsetAttribute,this._rotatedRectangle=void 0,this._textureCoordinateRotationPoints=void 0}z.packedLength=e.Rectangle.packedLength+e.Ellipsoid.packedLength+g.VertexFormat.packedLength+7,z.pack=function(a,r,n){return n=t.defaultValue(n,0),e.Rectangle.pack(a._rectangle,r,n),n+=e.Rectangle.packedLength,e.Ellipsoid.pack(a._ellipsoid,r,n),n+=e.Ellipsoid.packedLength,g.VertexFormat.pack(a._vertexFormat,r,n),n+=g.VertexFormat.packedLength,r[n++]=a._granularity,r[n++]=a._surfaceHeight,r[n++]=a._rotation,r[n++]=a._stRotation,r[n++]=a._extrudedHeight,r[n++]=a._shadowVolume?1:0,r[n]=t.defaultValue(a._offsetAttribute,-1),r};var B=new e.Rectangle,U=e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),Y={rectangle:B,ellipsoid:U,vertexFormat:N,granularity:void 0,height:void 0,rotation:void 0,stRotation:void 0,extrudedHeight:void 0,shadowVolume:void 0,offsetAttribute:void 0};z.unpack=function(a,r,n){r=t.defaultValue(r,0);var i=e.Rectangle.unpack(a,r,B);r+=e.Rectangle.packedLength;var o=e.Ellipsoid.unpack(a,r,U);r+=e.Ellipsoid.packedLength;var s=g.VertexFormat.unpack(a,r,N);r+=g.VertexFormat.packedLength;var l=a[r++],u=a[r++],c=a[r++],m=a[r++],p=a[r++],d=1===a[r++];r=a[r];return t.defined(n)?(n._rectangle=e.Rectangle.clone(i,n._rectangle),n._ellipsoid=e.Ellipsoid.clone(o,n._ellipsoid),n._vertexFormat=g.VertexFormat.clone(s,n._vertexFormat),n._granularity=l,n._surfaceHeight=u,n._rotation=c,n._stRotation=m,n._extrudedHeight=p,n._shadowVolume=d,n._offsetAttribute=-1===r?void 0:r,n):(Y.granularity=l,Y.height=u,Y.rotation=c,Y.stRotation=m,Y.extrudedHeight=p,Y.shadowVolume=d,Y.offsetAttribute=-1===r?void 0:r,new z(Y))},z.computeRectangle=function(a,r){var n=(a=t.defaultValue(a,t.defaultValue.EMPTY_OBJECT)).rectangle,i=t.defaultValue(a.granularity,m.CesiumMath.RADIANS_PER_DEGREE),o=t.defaultValue(a.ellipsoid,e.Ellipsoid.WGS84);return H(n,i,t.defaultValue(a.rotation,0),o,r)};var q=new r.Matrix3,X=new r.Quaternion,Q=new e.Cartographic;z.createGeometry=function(n){if(!m.CesiumMath.equalsEpsilon(n._rectangle.north,n._rectangle.south,m.CesiumMath.EPSILON10)&&!m.CesiumMath.equalsEpsilon(n._rectangle.east,n._rectangle.west,m.CesiumMath.EPSILON10)){var s=n._rectangle,y=n._ellipsoid,f=n._rotation,b=n._stRotation,h=n._vertexFormat,v=d.RectangleGeometryLibrary.computeOptions(s,n._granularity,f,b,E,I,k),_=q;0!==b||0!==f?(S=e.Rectangle.center(s,Q),H=y.geodeticSurfaceNormalCartographic(S,L),r.Quaternion.fromAxisAngle(H,-b,X),r.Matrix3.fromQuaternion(X,_)):r.Matrix3.clone(r.Matrix3.IDENTITY,_);var A,F,S=n._surfaceHeight,H=n._extrudedHeight;b=!m.CesiumMath.equalsEpsilon(S,H,0,m.CesiumMath.EPSILON2);return v.lonScalar=1/n._rectangle.width,v.latScalar=1/n._rectangle.height,v.tangentRotationMatrix=_,s=n._rectangle,S=b?(A=function(r,n){var s=r._shadowVolume,d=r._offsetAttribute,y=r._vertexFormat,f=r._extrudedHeight,b=r._surfaceHeight,h=r._ellipsoid,v=n.height,_=n.width;s&&((H=g.VertexFormat.clone(y,N)).normal=!0,r._vertexFormat=H);var A=M(r,n);s&&(r._vertexFormat=y);var E=p.PolygonPipeline.scaleToGeodeticHeight(A.attributes.position.values,b,h,!1),F=2*(ut=(E=new Float64Array(E)).length),G=new Float64Array(F);G.set(E);var P=p.PolygonPipeline.scaleToGeodeticHeight(A.attributes.position.values,f,h);G.set(P,ut),A.attributes.position.values=G;var S,I,k,H=y.normal?new Float32Array(F):void 0;if(r=y.tangent?new Float32Array(F):void 0,b=y.bitangent?new Float32Array(F):void 0,f=y.st?new Float32Array(F/3*2):void 0,y.normal){for(I=A.attributes.normal.values,H.set(I),B=0;B<ut;B++)I[B]=-I[B];H.set(I,ut),A.attributes.normal.values=H}if(s){I=A.attributes.normal.values,y.normal||(A.attributes.normal=void 0);for(var z=new Float32Array(F),B=0;B<ut;B++)I[B]=-I[B];z.set(I,ut),A.attributes.extrudeDirection=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:z})}if((G=t.defined(d))&&(H=ut/3*2,z=new Uint8Array(H),z=d===a.GeometryOffsetAttribute.TOP?a.arrayFill(z,1,0,H/2):(k=d===a.GeometryOffsetAttribute.NONE?0:1,a.arrayFill(z,k)),A.attributes.applyOffset=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:z})),y.tangent){var U=A.attributes.tangent.values;for(r.set(U),B=0;B<ut;B++)U[B]=-U[B];r.set(U,ut),A.attributes.tangent.values=r}y.bitangent&&(W=A.attributes.bitangent.values,b.set(W),b.set(W,ut),A.attributes.bitangent.values=b),y.st&&(S=A.attributes.st.values,f.set(S),f.set(S,ut/3*2),A.attributes.st.values=f);var Y=A.indices,q=Y.length,X=ut/3,Q=c.IndexDatatype.createTypedArray(F/3,2*q);for(Q.set(Y),B=0;B<q;B+=3)Q[B+q]=Y[B+2]+X,Q[B+1+q]=Y[B+1]+X,Q[B+2+q]=Y[B]+X;A.indices=Q,r=n.northCap;var W=n.southCap;b=v,f=2,F=0,n=4,v=4,r&&(--f,--b,F+=1,n-=2,--v),W&&(--f,--b,F+=1,n-=2,--v),v=2*((F+=f*_+2*b-n)+v);var J=new Float64Array(3*v),j=s?new Float32Array(3*v):void 0,Z=G?new Uint8Array(v):void 0,K=y.st?new Float32Array(2*v):void 0,$=d===a.GeometryOffsetAttribute.TOP;G&&!$&&(k=d===a.GeometryOffsetAttribute.ALL?1:0,Z=a.arrayFill(Z,k));var tt=0,et=0,at=0,rt=0,nt=_*b;for(B=0;B<nt;B+=_)J=T(J,tt,ot=3*B,E,P),tt+=6,y.st&&(K=O(K,et,2*B,S),et+=4),s&&(at+=3,j[at++]=I[ot],j[at++]=I[ot+1],j[at++]=I[ot+2]),$&&(Z[rt++]=1,rt+=1);if(W){var it=r?1+nt:nt,ot=3*it;for(B=0;B<2;B++)J=T(J,tt,ot,E,P),tt+=6,y.st&&(K=O(K,et,2*it,S),et+=4),s&&(at+=3,j[at++]=I[ot],j[at++]=I[ot+1],j[at++]=I[ot+2]),$&&(Z[rt++]=1,rt+=1)}else for(B=nt-_;B<nt;B++)J=T(J,tt,ot=3*B,E,P),tt+=6,y.st&&(K=O(K,et,2*B,S),et+=4),s&&(at+=3,j[at++]=I[ot],j[at++]=I[ot+1],j[at++]=I[ot+2]),$&&(Z[rt++]=1,rt+=1);for(B=nt-1;0<B;B-=_)J=T(J,tt,ot=3*B,E,P),tt+=6,y.st&&(K=O(K,et,2*B,S),et+=4),s&&(at+=3,j[at++]=I[ot],j[at++]=I[ot+1],j[at++]=I[ot+2]),$&&(Z[rt++]=1,rt+=1);if(r){var st=nt;for(ot=3*st,B=0;B<2;B++)J=T(J,tt,ot,E,P),tt+=6,y.st&&(K=O(K,et,2*st,S),et+=4),s&&(at+=3,j[at++]=I[ot],j[at++]=I[ot+1],j[at++]=I[ot+2]),$&&(Z[rt++]=1,rt+=1)}else for(B=_-1;0<=B;B--)J=T(J,tt,ot=3*B,E,P),tt+=6,y.st&&(K=O(K,et,2*B,S),et+=4),s&&(at+=3,j[at++]=I[ot],j[at++]=I[ot+1],j[at++]=I[ot+2]),$&&(Z[rt++]=1,rt+=1);h=function(t,a,r){var n=t.length,i=a.normal?new Float32Array(n):void 0,o=a.tangent?new Float32Array(n):void 0,s=a.bitangent?new Float32Array(n):void 0,l=0,u=0,c=0,p=!0,d=R,g=C,y=w;if(a.normal||a.tangent||a.bitangent)for(var f=0;f<n;f+=6){var b,h=e.Cartesian3.fromArray(t,f,x),v=e.Cartesian3.fromArray(t,(f+6)%n,L);p&&(b=e.Cartesian3.fromArray(t,(f+3)%n,D),e.Cartesian3.subtract(v,h,v),e.Cartesian3.subtract(b,h,b),y=e.Cartesian3.normalize(e.Cartesian3.cross(b,v,y),y),p=!1),e.Cartesian3.equalsEpsilon(v,h,m.CesiumMath.EPSILON10)&&(p=!0),(a.tangent||a.bitangent)&&(d=r.geodeticSurfaceNormal(h,d),a.tangent&&(g=e.Cartesian3.normalize(e.Cartesian3.cross(d,y,g),g))),a.normal&&(i[l++]=y.x,i[l++]=y.y,i[l++]=y.z,i[l++]=y.x,i[l++]=y.y,i[l++]=y.z),a.tangent&&(o[u++]=g.x,o[u++]=g.y,o[u++]=g.z,o[u++]=g.x,o[u++]=g.y,o[u++]=g.z),a.bitangent&&(s[c++]=d.x,s[c++]=d.y,s[c++]=d.z,s[c++]=d.x,s[c++]=d.y,s[c++]=d.z)}return V(a,{positions:t,normals:i,tangents:o,bitangents:s})}(J,y,h),y.st&&(h.attributes.st=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:K})),s&&(h.attributes.extrudeDirection=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:j})),G&&(h.attributes.applyOffset=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:Z}));var lt=c.IndexDatatype.createTypedArray(v,6*F),ut=J.length/3,ct=0;for(B=0;B<ut-1;B+=2){var mt,pt=((mt=B)+2)%ut,dt=e.Cartesian3.fromArray(J,3*mt,L),gt=e.Cartesian3.fromArray(J,3*pt,D);e.Cartesian3.equalsEpsilon(dt,gt,m.CesiumMath.EPSILON10)||(gt=(2+(dt=(mt+1)%ut))%ut,lt[ct++]=mt,lt[ct++]=dt,lt[ct++]=pt,lt[ct++]=pt,lt[ct++]=dt,lt[ct++]=gt)}return h.indices=lt,(h=u.GeometryPipeline.combineInstances([new l.GeometryInstance({geometry:A}),new l.GeometryInstance({geometry:h})]))[0]}(n,v),b=r.BoundingSphere.fromRectangle3D(s,y,S,P),F=r.BoundingSphere.fromRectangle3D(s,y,H,G),r.BoundingSphere.union(b,F)):((A=M(n,v)).attributes.position.values=p.PolygonPipeline.scaleToGeodeticHeight(A.attributes.position.values,S,y,!1),t.defined(n._offsetAttribute)&&(F=A.attributes.position.values.length,v=new Uint8Array(F/3),F=n._offsetAttribute===a.GeometryOffsetAttribute.NONE?0:1,a.arrayFill(v,F),A.attributes.applyOffset=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:v})),r.BoundingSphere.fromRectangle3D(s,y,S)),h.position||delete A.attributes.position,new o.Geometry({attributes:A.attributes,indices:A.indices,primitiveType:A.primitiveType,boundingSphere:S,offsetAttribute:n._offsetAttribute})}},z.createShadowVolume=function(t,e,a){var r=t._granularity,n=t._ellipsoid;e=e(r,n),a=a(r,n);return new z({rectangle:t._rectangle,rotation:t._rotation,ellipsoid:n,stRotation:t._stRotation,granularity:r,extrudedHeight:a,height:e,vertexFormat:g.VertexFormat.POSITION_ONLY,shadowVolume:!0})};var W=new e.Rectangle,J=[new e.Cartesian2,new e.Cartesian2,new e.Cartesian2],j=new o.Matrix2,Z=new e.Cartographic;return Object.defineProperties(z.prototype,{rectangle:{get:function(){return t.defined(this._rotatedRectangle)||(this._rotatedRectangle=H(this._rectangle,this._granularity,this._rotation,this._ellipsoid)),this._rotatedRectangle}},textureCoordinateRotationPoints:{get:function(){return t.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(t){if(0===t._stRotation)return[0,0,0,1,1,0];var a=e.Rectangle.clone(t._rectangle,W),r=t._granularity,n=t._ellipsoid,i=(a=H(a,r,t._rotation-t._stRotation,n,W),J);i[0].x=a.west,i[0].y=a.south,i[1].x=a.west,i[1].y=a.north,i[2].x=a.east,i[2].y=a.south;for(var s=t.rectangle,l=o.Matrix2.fromRotation(t._stRotation,j),u=e.Rectangle.center(s,Z),c=0;c<3;++c){var m=i[c];m.x-=u.longitude,m.y-=u.latitude,o.Matrix2.multiplyByVector(l,m,m),m.x+=u.longitude,m.y+=u.latitude,m.x=(m.x-s.west)/s.width,m.y=(m.y-s.south)/s.height}return r=i[0],n=i[1],a=i[2],t=new Array(6),e.Cartesian2.pack(r,t),e.Cartesian2.pack(n,t,2),e.Cartesian2.pack(a,t,4),t}(this)),this._textureCoordinateRotationPoints}}}),function(a,r){return(a=t.defined(r)?z.unpack(a,r):a)._ellipsoid=e.Ellipsoid.clone(a._ellipsoid),a._rectangle=e.Rectangle.clone(a._rectangle),z.createGeometry(a)}}));