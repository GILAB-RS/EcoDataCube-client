define(["./AttributeCompression-9711314b","./Transforms-73e77b72","./Cartesian2-b4b7b0b3","./when-208fe5b0","./TerrainEncoding-e1b1da20","./IndexDatatype-3bc916b1","./Check-5e798bbf","./Math-8386669c","./OrientedBoundingBox-2e9d8f93","./createTaskProcessorWorker","./RuntimeError-7f634f5d","./ComponentDatatype-2da3a966","./WebGLConstants-5e2a49ab","./EllipsoidTangentPlane-69cc10ff","./AxisAlignedBoundingBox-122de82b","./IntersectionTests-40db2afa","./Plane-b91bfb59"],(function(e,t,i,n,s,r,h,u,o,p,a,d,f,l,g,c,m){"use strict";var x=function(e,t,i,s,r,h){var u,o;n.defined(h)?h.length=0:h=[];var p,a,d,f,l,g,c=t?(u=i<e,o=s<e,r<e):(u=e<i,o=e<s,e<r);return 1===(t=u+o+c)?u?(p=(e-i)/(s-i),a=(e-i)/(r-i),h.push(1),h.push(2),1!==a&&(h.push(-1),h.push(0),h.push(2),h.push(a)),1!==p&&(h.push(-1),h.push(0),h.push(1),h.push(p))):o?(d=(e-s)/(r-s),f=(e-s)/(i-s),h.push(2),h.push(0),1!==f&&(h.push(-1),h.push(1),h.push(0),h.push(f)),1!==d&&(h.push(-1),h.push(1),h.push(2),h.push(d))):c&&(l=(e-r)/(i-r),g=(e-r)/(s-r),h.push(0),h.push(1),1!==g&&(h.push(-1),h.push(2),h.push(1),h.push(g)),1!==l&&(h.push(-1),h.push(2),h.push(0),h.push(l))):2===t?u||i===e?o||s===e?c||r===e||(a=(e-i)/(r-i),d=(e-s)/(r-s),h.push(2),h.push(-1),h.push(0),h.push(2),h.push(a),h.push(-1),h.push(1),h.push(2),h.push(d)):(g=(e-r)/(s-r),p=(e-i)/(s-i),h.push(1),h.push(-1),h.push(2),h.push(1),h.push(g),h.push(-1),h.push(0),h.push(1),h.push(p)):(f=(e-s)/(i-s),l=(e-r)/(i-r),h.push(0),h.push(-1),h.push(1),h.push(0),h.push(f),h.push(-1),h.push(2),h.push(0),h.push(l)):3!==t&&(h.push(0),h.push(1),h.push(2)),h},w=32767,C=16383,v=[],b=[],B=[],y=new i.Cartographic,I=new i.Cartesian3,A=[],z=[],M=[],N=[],V=[],E=new i.Cartesian3,R=new t.BoundingSphere,H=new o.OrientedBoundingBox,T=new i.Cartesian2,O=new i.Cartesian3;function U(){this.vertexBuffer=void 0,this.index=void 0,this.first=void 0,this.second=void 0,this.ratio=void 0}U.prototype.clone=function(e){return(e=n.defined(e)?e:new U).uBuffer=this.uBuffer,e.vBuffer=this.vBuffer,e.heightBuffer=this.heightBuffer,e.normalBuffer=this.normalBuffer,e.index=this.index,e.first=this.first,e.second=this.second,e.ratio=this.ratio,e},U.prototype.initializeIndexed=function(e,t,i,n,s){this.uBuffer=e,this.vBuffer=t,this.heightBuffer=i,this.normalBuffer=n,this.index=s,this.first=void 0,this.second=void 0,this.ratio=void 0},U.prototype.initializeFromClipResult=function(e,t,i){var n=t+1;return-1!==e[t]?i[e[t]].clone(this):(this.vertexBuffer=void 0,this.index=void 0,this.first=i[e[n]],this.second=i[e[++n]],this.ratio=e[++n],++n),n},U.prototype.getKey=function(){return this.isIndexed()?this.index:JSON.stringify({first:this.first.getKey(),second:this.second.getKey(),ratio:this.ratio})},U.prototype.isIndexed=function(){return n.defined(this.index)},U.prototype.getH=function(){return n.defined(this.index)?this.heightBuffer[this.index]:u.CesiumMath.lerp(this.first.getH(),this.second.getH(),this.ratio)},U.prototype.getU=function(){return n.defined(this.index)?this.uBuffer[this.index]:u.CesiumMath.lerp(this.first.getU(),this.second.getU(),this.ratio)},U.prototype.getV=function(){return n.defined(this.index)?this.vBuffer[this.index]:u.CesiumMath.lerp(this.first.getV(),this.second.getV(),this.ratio)};var F=new i.Cartesian2,P=-1,S=[new i.Cartesian3,new i.Cartesian3],k=[new i.Cartesian3,new i.Cartesian3];function D(t,n){var s=S[++P],r=k[P];s=e.AttributeCompression.octDecode(t.first.getNormalX(),t.first.getNormalY(),s),r=e.AttributeCompression.octDecode(t.second.getNormalX(),t.second.getNormalY(),r);return I=i.Cartesian3.lerp(s,r,t.ratio,I),i.Cartesian3.normalize(I,I),e.AttributeCompression.octEncode(I,n),--P,n}U.prototype.getNormalX=function(){return n.defined(this.index)?this.normalBuffer[2*this.index]:(F=D(this,F)).x},U.prototype.getNormalY=function(){return n.defined(this.index)?this.normalBuffer[2*this.index+1]:(F=D(this,F)).y};var W=[];function X(e,t,i,s,r,h,u,o,p){if(0!==u.length){for(var a=0,d=0;d<u.length;)d=W[a++].initializeFromClipResult(u,d,o);for(var f=0;f<a;++f){var l,g,c=W[f];c.isIndexed()?(c.newIndex=h[c.index],c.uBuffer=e,c.vBuffer=t,c.heightBuffer=i,p&&(c.normalBuffer=s)):(l=c.getKey(),n.defined(h[l])?c.newIndex=h[l]:(g=e.length,e.push(c.getU()),t.push(c.getV()),i.push(c.getH()),p&&(s.push(c.getNormalX()),s.push(c.getNormalY())),c.newIndex=g,h[l]=g))}3===a?(r.push(W[0].newIndex),r.push(W[1].newIndex),r.push(W[2].newIndex)):4===a&&(r.push(W[0].newIndex),r.push(W[1].newIndex),r.push(W[2].newIndex),r.push(W[0].newIndex),r.push(W[2].newIndex),r.push(W[3].newIndex))}}return W.push(new U),W.push(new U),W.push(new U),W.push(new U),p((function(e,n){var h=e.isEastChild,p=e.isNorthChild,a=h?C:0,d=h?w:C,f=p?C:0,l=p?w:C,g=A,c=z,m=M,F=V;g.length=0,c.length=0,m.length=0,F.length=0;var P=N;P.length=0;for(var S={},k=e.vertices,D=(D=e.indices).subarray(0,e.indexCountWithoutSkirts),W=s.TerrainEncoding.clone(e.encoding),K=W.hasVertexNormals,Y=0,L=e.vertexCountWithoutSkirts,_=e.minimumHeight,G=e.maximumHeight,J=new Array(L),Z=new Array(L),j=new Array(L),q=K?new Array(2*L):void 0,Q=0,$=0;Q<L;++Q,$+=2){var ee=W.decodeTextureCoordinates(k,Q,T),te=W.decodeHeight(k,Q),ie=u.CesiumMath.clamp(ee.x*w|0,0,w),ne=u.CesiumMath.clamp(ee.y*w|0,0,w);j[Q]=u.CesiumMath.clamp((te-_)/(G-_)*w|0,0,w),w-(ie=ie<20?0:ie)<20&&(ie=w),w-(ne=ne<20?0:ne)<20&&(ne=w),J[Q]=ie,Z[Q]=ne,K&&(ee=W.getOctEncodedNormal(k,Q,O),q[$]=ee.x,q[$+1]=ee.y),(h&&C<=ie||!h&&ie<=C)&&(p&&C<=ne||!p&&ne<=C)&&(S[Q]=Y,g.push(ie),c.push(ne),m.push(j[Q]),K&&(F.push(q[$]),F.push(q[$+1])),++Y)}var se=[];se.push(new U),se.push(new U),se.push(new U);var re=[];for(re.push(new U),re.push(new U),re.push(new U),Q=0;Q<D.length;Q+=3){var he=D[Q],ue=D[Q+1],oe=D[Q+2],pe=J[he],ae=J[ue],de=J[oe];se[0].initializeIndexed(J,Z,j,q,he),se[1].initializeIndexed(J,Z,j,q,ue),se[2].initializeIndexed(J,Z,j,q,oe),(ae=x(C,h,pe,ae,de,v)).length<=0||(de=re[0].initializeFromClipResult(ae,0,se))>=ae.length||(de=re[1].initializeFromClipResult(ae,de,se))>=ae.length||(de=re[2].initializeFromClipResult(ae,de,se),X(g,c,m,F,P,S,x(C,p,re[0].getV(),re[1].getV(),re[2].getV(),b),re,K),de<ae.length&&(re[2].clone(re[1]),re[2].initializeFromClipResult(ae,de,se),X(g,c,m,F,P,S,x(C,p,re[0].getV(),re[1].getV(),re[2].getV(),b),re,K)))}var fe=h?-w:0,le=p?-w:0,ge=[],ce=[],me=[],xe=[],we=Number.MAX_VALUE,Ce=-we,ve=B;ve.length=0;var be=i.Ellipsoid.clone(e.ellipsoid),Be=(He=i.Rectangle.clone(e.childRectangle)).north,ye=He.south,Ie=He.east,Ae=He.west;for(Ie<Ae&&(Ie+=u.CesiumMath.TWO_PI),Q=0;Q<g.length;++Q)ie=(ie=Math.round(g[Q]))<=a?(ge.push(Q),0):d<=ie?(me.push(Q),w):2*ie+fe,g[Q]=ie,ne=(ne=Math.round(c[Q]))<=f?(ce.push(Q),0):l<=ne?(xe.push(Q),w):2*ne+le,c[Q]=ne,(te=u.CesiumMath.lerp(_,G,m[Q]/w))<we&&(we=te),Ce<te&&(Ce=te),m[Q]=te,y.longitude=u.CesiumMath.lerp(Ae,Ie,ie/w),y.latitude=u.CesiumMath.lerp(ye,Be,ne/w),y.height=te,be.cartographicToCartesian(y,I),ve.push(I.x),ve.push(I.y),ve.push(I.z);var ze=t.BoundingSphere.fromVertices(ve,i.Cartesian3.ZERO,3,R),Me=o.OrientedBoundingBox.fromRectangle(He,we,Ce,be,H),Ne=(e=new s.EllipsoidalOccluder(be).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(ze.center,ve,3,ze.center,we,E),Ce-we),Ve=new Uint16Array(g.length+c.length+m.length);for(Q=0;Q<g.length;++Q)Ve[Q]=g[Q];var Ee=g.length;for(Q=0;Q<c.length;++Q)Ve[Ee+Q]=c[Q];for(Ee+=c.length,Q=0;Q<m.length;++Q)Ve[Ee+Q]=w*(m[Q]-we)/Ne;var Re,He=r.IndexDatatype.createTypedArray(g.length,P);return K?(Re=new Uint8Array(F),n.push(Ve.buffer,He.buffer,Re.buffer),Re=Re.buffer):n.push(Ve.buffer,He.buffer),{vertices:Ve.buffer,encodedNormals:Re,indices:He.buffer,minimumHeight:we,maximumHeight:Ce,westIndices:ge,southIndices:ce,eastIndices:me,northIndices:xe,boundingSphere:ze,orientedBoundingBox:Me,horizonOcclusionPoint:e}}))}));