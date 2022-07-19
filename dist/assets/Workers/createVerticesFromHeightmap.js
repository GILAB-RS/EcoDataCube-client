define(["./Cartesian2-b4b7b0b3","./AxisAlignedBoundingBox-122de82b","./Transforms-73e77b72","./when-208fe5b0","./Check-5e798bbf","./TerrainEncoding-e1b1da20","./Math-8386669c","./OrientedBoundingBox-2e9d8f93","./WebMercatorProjection-1b058022","./RuntimeError-7f634f5d","./createTaskProcessorWorker","./AttributeCompression-9711314b","./ComponentDatatype-2da3a966","./WebGLConstants-5e2a49ab","./EllipsoidTangentPlane-69cc10ff","./IntersectionTests-40db2afa","./Plane-b91bfb59"],(function(e,t,a,i,r,n,s,l,o,f,u,c,d,h,m,g,p){"use strict";var x=Object.freeze({NONE:0,LERC:1}),w={};w.DEFAULT_STRUCTURE=Object.freeze({heightScale:1,heightOffset:0,elementsPerHeight:1,stride:1,elementMultiplier:256,isBigEndian:!1});var k=new e.Cartesian3,y=new a.Matrix4,b=new e.Cartesian3,I=new e.Cartesian3;w.computeVertices=function(r){var f,u,c,d=Math.cos,h=Math.sin,m=Math.sqrt,g=Math.atan,p=Math.exp,x=s.CesiumMath.PI_OVER_TWO,U=s.CesiumMath.toRadians,v=r.heightmap,T=r.width,M=r.height,V=r.skirtHeight,A=0<V,B=i.defaultValue(r.isGeographic,!0),D=i.defaultValue(r.ellipsoid,e.Ellipsoid.WGS84),S=1/D.maximumRadius,P=e.Rectangle.clone(r.nativeRectangle),E=e.Rectangle.clone(r.rectangle),C=i.defined(E)?(f=E.west,u=E.south,c=E.east,E.north):B?(f=U(P.west),u=U(P.south),c=U(P.east),U(P.north)):(f=P.west*S,u=x-2*g(p(-P.south*S)),c=P.east*S,x-2*g(p(-P.north*S))),F=r.relativeToCenter,L=(F=(_e=i.defined(F))?F:e.Cartesian3.ZERO,i.defaultValue(r.includeWebMercatorT,!1)),O=i.defaultValue(r.exaggeration,1),N=i.defaultValue(r.exaggerationRelativeHeight,0),R=1!==O,z=(r=i.defaultValue(r.structure,w.DEFAULT_STRUCTURE),i.defaultValue(r.heightScale,w.DEFAULT_STRUCTURE.heightScale)),H=i.defaultValue(r.heightOffset,w.DEFAULT_STRUCTURE.heightOffset),_=i.defaultValue(r.elementsPerHeight,w.DEFAULT_STRUCTURE.elementsPerHeight),Y=i.defaultValue(r.stride,w.DEFAULT_STRUCTURE.stride),X=i.defaultValue(r.elementMultiplier,w.DEFAULT_STRUCTURE.elementMultiplier),W=i.defaultValue(r.isBigEndian,w.DEFAULT_STRUCTURE.isBigEndian),Z=e.Rectangle.computeWidth(P),j=e.Rectangle.computeHeight(P),G=Z/(T-1),q=j/(M-1);B||(Z*=S,j*=S);var Q,J,K=(r=D.radiiSquared).x,$=r.y,ee=r.z,te=65536,ae=-65536,ie=(r=a.Transforms.eastNorthUpToFixedFrame(F,D),a.Matrix4.inverseTransformation(r,y));L&&(Q=o.WebMercatorProjection.geodeticLatitudeToMercatorAngle(u),J=1/(o.WebMercatorProjection.geodeticLatitudeToMercatorAngle(C)-Q));var re=b;re.x=Number.POSITIVE_INFINITY,re.y=Number.POSITIVE_INFINITY,re.z=Number.POSITIVE_INFINITY;var ne=I;ne.x=Number.NEGATIVE_INFINITY,ne.y=Number.NEGATIVE_INFINITY,ne.z=Number.NEGATIVE_INFINITY;var se=Number.POSITIVE_INFINITY,le=T*M,oe=le+(0<V?2*T+2*M:0),fe=new Array(oe),ue=new Array(oe),ce=new Array(oe),de=L?new Array(oe):[],he=R?new Array(oe):[],me=0,ge=M,pe=0,xe=T;A&&(--me,++ge,--pe,++xe);for(var we=me;we<ge;++we){var ke=we;M<=(ke=ke<0?0:ke)&&(ke=M-1);var ye=P.north-q*ke,be=(ye=B?U(ye):x-2*g(p(-ye*S)),s.CesiumMath.clamp(be=(ye-u)/(C-u),0,1)),Ie=we===me,Ue=we===ge-1;0<V&&(Ie?ye+=1e-5*j:Ue&&(ye-=1e-5*j));var ve,Te=d(ye),Me=h(ye),Ve=ee*Me;L&&(ve=(o.WebMercatorProjection.geodeticLatitudeToMercatorAngle(ye)-Q)*J);for(var Ae=pe;Ae<xe;++Ae){var Be=ke*(T*Y)+(Ne=T<=(Ne=(Ne=Ae)<0?0:Ne)?T-1:Ne)*Y;if(1===_)Se=v[Be];else{var De,Se=0;if(W)for(De=0;De<_;++De)Se=Se*X+v[Be+De];else for(De=_-1;0<=De;--De)Se=Se*X+v[Be+De]}Se=Se*z+H;ae=Math.max(ae,Se),te=Math.min(te,Se);var Pe=P.west+G*Ne;B?Pe=U(Pe):Pe*=S;var Ee=s.CesiumMath.clamp(Ee=(Pe-f)/(c-f),0,1),Ce=ke*T+Ne;if(0<V){var Fe=Ae===pe,Le=Ae===xe-1,Oe=Ie||Ue||Fe||Le;if((Ie||Ue)&&(Fe||Le))continue;Oe&&(Se-=V,Fe?(Ce=M-ke-1+le,Pe-=1e-5*Z):Ue?Ce=le+M+(T-Ne-1):Le?(Ce=le+M+T+ke,Pe+=1e-5*Z):Ie&&(Ce=le+M+T+M+Ne))}var Ne,Re=Te*d(Pe);Pe=(Fe=K*Re)*(Ne=1/m(Fe*Re+(Le=$*(Oe=Te*h(Pe)))*Oe+Ve*Me)),Fe=Le*Ne,Le=Ve*Ne;(Ne=new e.Cartesian3).x=Pe+Re*Se,Ne.y=Fe+Oe*Se,Ne.z=Le+Me*Se,a.Matrix4.multiplyByPoint(ie,Ne,k),e.Cartesian3.minimumByComponent(k,re,re),e.Cartesian3.maximumByComponent(k,ne,ne),se=Math.min(se,Se),fe[Ce]=Ne,ce[Ce]=new e.Cartesian2(Ee,be),ue[Ce]=Se,L&&(de[Ce]=ve),R&&(he[Ce]=D.geodeticSurfaceNormal(Ne))}}var ze,He;A=a.BoundingSphere.fromPoints(fe);i.defined(E)&&(ze=l.OrientedBoundingBox.fromRectangle(E,te,ae,D)),_e&&(He=new n.EllipsoidalOccluder(D).computeHorizonCullingPointPossiblyUnderEllipsoid(F,fe,te));for(var _e=new t.AxisAlignedBoundingBox(re,ne,F),Ye=new n.TerrainEncoding(F,_e,se,ae,r,!1,L,R,O,N),Xe=new Float32Array(oe*Ye.stride),We=0,Ze=0;Ze<oe;++Ze)We=Ye.encode(Xe,We,fe[Ze],ce[Ze],ue[Ze],void 0,de[Ze],he[Ze]);return{vertices:Xe,maximumHeight:ae,minimumHeight:te,encoding:Ye,boundingSphere3D:A,orientedBoundingBox:ze,occludeePointInScaledSpace:He}};var U,v,T,M,V,A,B,D,S,P,E,C={};U={defaultNoDataValue:-34027999387901484e22,decode:function(e,t){var a=(t=t||{}).encodedMaskData||null===t.encodedMaskData,i=V(e,t.inputOffset||0,a);e=null!==t.noDataValue?t.noDataValue:U.defaultNoDataValue,a=v(i,t.pixelType||Float32Array,t.encodedMaskData,e,t.returnMask),e={width:i.width,height:i.height,pixelData:a.resultPixels,minValue:a.minValue,maxValue:i.pixels.maxValue,noDataValue:e};return a.resultMask&&(e.maskData=a.resultMask),t.returnEncodedMask&&i.mask&&(e.encodedMaskData=i.mask.bitset||null),t.returnFileInfo&&(e.fileInfo=T(i),t.computeUsedBitDepths&&(e.fileInfo.bitDepths=M(i))),e}},v=function(e,t,a,i,r){var n,s,l,o=0,f=e.pixels.numBlocksX,u=e.pixels.numBlocksY,c=Math.floor(e.width/f),d=Math.floor(e.height/u),h=2*e.maxZError,m=Number.MAX_VALUE;a=a||(e.mask?e.mask.bitset:null),s=new t(e.width*e.height),r&&a&&(l=new Uint8Array(e.width*e.height));for(var g,p,x=new Float32Array(c*d),w=0;w<=u;w++){var k=w!==u?d:e.height%u;if(0!==k)for(var y=0;y<=f;y++){var b=y!==f?c:e.width%f;if(0!==b){var I,U,v,T,M=w*e.width*d+y*c,V=e.width-b,B=e.pixels.blocks[o];if(B.encoding<2?(I=0===B.encoding?B.rawData:(A(B.stuffedData,B.bitsPerPixel,B.numValidPixels,B.offset,h,x,e.pixels.maxValue),x),U=0):v=2===B.encoding?0:B.offset,a)for(p=0;p<k;p++){for(7&M&&(T=a[M>>3],T<<=7&M),g=0;g<b;g++)128&(T=7&M?T:a[M>>3])?(l&&(l[M]=1),m=(n=B.encoding<2?I[U++]:v)<m?n:m,s[M++]=n):(l&&(l[M]=0),s[M++]=i),T<<=1;M+=V}else if(B.encoding<2)for(p=0;p<k;p++){for(g=0;g<b;g++)m=(n=I[U++])<m?n:m,s[M++]=n;M+=V}else for(m=v<m?v:m,p=0;p<k;p++){for(g=0;g<b;g++)s[M++]=v;M+=V}if(1===B.encoding&&U!==B.numValidPixels)throw"Block and Mask do not match";o++}}}return{resultPixels:s,resultMask:l,minValue:m}},T=function(e){return{fileIdentifierString:e.fileIdentifierString,fileVersion:e.fileVersion,imageType:e.imageType,height:e.height,width:e.width,maxZError:e.maxZError,eofOffset:e.eofOffset,mask:e.mask?{numBlocksX:e.mask.numBlocksX,numBlocksY:e.mask.numBlocksY,numBytes:e.mask.numBytes,maxValue:e.mask.maxValue}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,numBytes:e.pixels.numBytes,maxValue:e.pixels.maxValue,noDataValue:e.noDataValue}}},M=function(e){for(var t=e.pixels.numBlocksX*e.pixels.numBlocksY,a={},i=0;i<t;i++){var r=e.pixels.blocks[i];0===r.encoding?a.float32=!0:1===r.encoding?a[r.bitsPerPixel]=!0:a[0]=!0}return Object.keys(a)},V=function(e,t,a){var i={},r=new Uint8Array(e,t,10);if(i.fileIdentifierString=String.fromCharCode.apply(null,r),"CntZImage"!==i.fileIdentifierString.trim())throw"Unexpected file identifier string: "+i.fileIdentifierString;t+=10;var n=new DataView(e,t,24);if(i.fileVersion=n.getInt32(0,!0),i.imageType=n.getInt32(4,!0),i.height=n.getUint32(8,!0),i.width=n.getUint32(12,!0),i.maxZError=n.getFloat64(16,!0),t+=24,!a)if(n=new DataView(e,t,16),i.mask={},i.mask.numBlocksY=n.getUint32(0,!0),i.mask.numBlocksX=n.getUint32(4,!0),i.mask.numBytes=n.getUint32(8,!0),i.mask.maxValue=n.getFloat32(12,!0),t+=16,0<i.mask.numBytes){var s=new Uint8Array(Math.ceil(i.width*i.height/8)),l=(n=new DataView(e,t,i.mask.numBytes)).getInt16(0,!0),o=2,f=0;do{if(0<l)for(;l--;)s[f++]=n.getUint8(o++);else{var u=n.getUint8(o++);for(l=-l;l--;)s[f++]=u}}while(l=n.getInt16(o,!0),(o+=2)<i.mask.numBytes);if(-32768!==l||f<s.length)throw"Unexpected end of mask RLE encoding";i.mask.bitset=s,t+=i.mask.numBytes}else 0==(i.mask.numBytes|i.mask.numBlocksY|i.mask.maxValue)&&(i.mask.bitset=new Uint8Array(Math.ceil(i.width*i.height/8)));n=new DataView(e,t,16),i.pixels={},i.pixels.numBlocksY=n.getUint32(0,!0),i.pixels.numBlocksX=n.getUint32(4,!0),i.pixels.numBytes=n.getUint32(8,!0),i.pixels.maxValue=n.getFloat32(12,!0),t+=16;r=i.pixels.numBlocksX,a=i.pixels.numBlocksY;var c=r+(0<i.width%r?1:0),d=a+(0<i.height%a?1:0);i.pixels.blocks=new Array(c*d);for(var h=0,m=0;m<d;m++)for(var g=0;g<c;g++){var p=0,x=e.byteLength-t;n=new DataView(e,t,Math.min(10,x));var w={};i.pixels.blocks[h++]=w;var k;x=n.getUint8(0);if(p++,w.encoding=63&x,3<w.encoding)throw"Invalid block encoding ("+w.encoding+")";if(2!==w.encoding){if(0!==x&&2!==x){if(x>>=6,2===(w.offsetType=x))w.offset=n.getInt8(1),p++;else if(1===x)w.offset=n.getInt16(1,!0),p+=2;else{if(0!==x)throw"Invalid block offset type";w.offset=n.getFloat32(1,!0),p+=4}if(1===w.encoding)if(x=n.getUint8(p),p++,w.bitsPerPixel=63&x,x>>=6,2===(w.numValidPixelsType=x))w.numValidPixels=n.getUint8(p),p++;else if(1===x)w.numValidPixels=n.getUint16(p,!0),p+=2;else{if(0!==x)throw"Invalid valid pixel count type";w.numValidPixels=n.getUint32(p,!0),p+=4}}if(t+=p,3!==w.encoding)if(0===w.encoding){var y=(i.pixels.numBytes-1)/4;if(y!==Math.floor(y))throw"uncompressed block has invalid length";k=new ArrayBuffer(4*y),new Uint8Array(k).set(new Uint8Array(e,t,4*y));var b=new Float32Array(k);w.rawData=b,t+=4*y}else 1===w.encoding&&(b=Math.ceil(w.numValidPixels*w.bitsPerPixel/8),y=Math.ceil(b/4),k=new ArrayBuffer(4*y),new Uint8Array(k).set(new Uint8Array(e,t,b)),w.stuffedData=new Uint32Array(k),t+=b)}else t++}return i.eofOffset=t,i},A=function(e,t,a,i,r,n,s){var l,o,f,u,c=(1<<t)-1,d=0,h=0,m=Math.ceil((s-i)/r),g=4*e.length-Math.ceil(t*a/8);for(e[e.length-1]<<=8*g,l=0;l<a;l++)0===h&&(u=e[d++],h=32),t<=h?(f=u>>>h-t&c,h-=t):(f=(u&c)<<(o=t-h)&c,f+=(u=e[d++])>>>(h=32-o)),n[l]=f<m?i+f*r:s;return n},D=U,S=function(){var e=function(e,t,a,i,r,n,s,l){var o,f,u,c,d,h=(1<<a)-1,m=0,g=0,p=4*e.length-Math.ceil(a*i/8);if(e[e.length-1]<<=8*p,r)for(o=0;o<i;o++)0===g&&(u=e[m++],g=32),a<=g?(f=u>>>g-a&h,g-=a):(f=(u&h)<<(c=a-g)&h,f+=(u=e[m++])>>>(g=32-c)),t[o]=r[f];else for(d=Math.ceil((l-n)/s),o=0;o<i;o++)0===g&&(u=e[m++],g=32),a<=g?(f=u>>>g-a&h,g-=a):(f=(u&h)<<(c=a-g)&h,f+=(u=e[m++])>>>(g=32-c)),t[o]=f<d?n+f*s:l},t=function(e,t,a,i,r,n){var s,l,o=(1<<t)-1,f=0,u=0,c=0,d=0,h=[],m=4*e.length-Math.ceil(t*a/8);e[e.length-1]<<=8*m;var g=Math.ceil((n-i)/r);for(u=0;u<a;u++)0===c&&(l=e[f++],c=32),t<=c?(d=l>>>c-t&o,c-=t):(d=(l&o)<<(s=t-c)&o,d+=(l=e[f++])>>>(c=32-s)),h[u]=d<g?i+d*r:n;return h.unshift(i),h},a=function(e,t,a,i,r,n,s,l){var o,f,u,c=(1<<a)-1,d=0,h=0,m=0;if(r)for(p=0;p<i;p++)0===h&&(f=e[d++],h=32,m=0),a<=h?(o=f>>>m&c,h-=a,m+=a):(o=f>>>m&c,h=32-(u=a-h),o|=((f=e[d++])&(1<<u)-1)<<a-u,m=u),t[p]=r[o];else for(var g=Math.ceil((l-n)/s),p=0;p<i;p++)0===h&&(f=e[d++],h=32,m=0),a<=h?(o=f>>>m&c,h-=a,m+=a):(o=f>>>m&c,h=32-(u=a-h),o|=((f=e[d++])&(1<<u)-1)<<a-u,m=u),t[p]=o<g?n+o*s:l;return t},i=function(e,t,a,i,r,n){var s,l,o=(1<<t)-1,f=0,u=0,c=0,d=0,h=0,m=[],g=Math.ceil((n-i)/r);for(u=0;u<a;u++)0===c&&(l=e[f++],c=32,h=0),t<=c?(d=l>>>h&o,c-=t,h+=t):(d=l>>>h&o,c=32-(s=t-c),d|=((l=e[f++])&(1<<s)-1)<<t-s,h=s),m[u]=d<g?i+d*r:n;return m.unshift(i),m},r={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(e){for(var t=65535,a=65535,i=e.length,r=Math.floor(i/2),n=0;r;){var s=359<=r?359:r;for(r-=s;t+=e[n++]<<8,a+=t+=e[n++],--s;);t=(65535&t)+(t>>>16),a=(65535&a)+(a>>>16)}return 1&i&&(a+=t+=e[n]<<8),((a=(65535&a)+(a>>>16))<<16|(t=(65535&t)+(t>>>16)))>>>0},readHeaderInfo:function(e,t){var a=t.ptr,i=new Uint8Array(e,a,6),r={};if(r.fileIdentifierString=String.fromCharCode.apply(null,i),0!==r.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+r.fileIdentifierString;a+=6;var n=new DataView(e,a,8);i=n.getInt32(0,!0);if(a+=4,3<=(r.fileVersion=i)&&(r.checksum=n.getUint32(4,!0),a+=4),n=new DataView(e,a,12),r.height=n.getUint32(0,!0),r.width=n.getUint32(4,!0),a+=8,4<=i?(r.numDims=n.getUint32(8,!0),a+=4):r.numDims=1,n=new DataView(e,a,40),r.numValidPixel=n.getUint32(0,!0),r.microBlockSize=n.getInt32(4,!0),r.blobSize=n.getInt32(8,!0),r.imageType=n.getInt32(12,!0),r.maxZError=n.getFloat64(16,!0),r.zMin=n.getFloat64(24,!0),r.zMax=n.getFloat64(32,!0),a+=40,t.headerInfo=r,t.ptr=a,3<=i&&this.computeChecksumFletcher32(new Uint8Array(e,a-(4<=i?52:48),r.blobSize-14))!==r.checksum)throw"Checksum failed.";return!0},checkMinMaxRanges:function(e,t){var a=t.headerInfo,i=this.getDataTypeArray(a.imageType),r=a.numDims*this.getDataTypeSize(a.imageType),n=this.readSubArray(e,t.ptr,i,r),s=this.readSubArray(e,t.ptr+r,i,r);t.ptr+=2*r;for(var l=!0,o=0;o<a.numDims;o++)if(n[o]!==s[o]){l=!1;break}return a.minValues=n,a.maxValues=s,l},readSubArray:function(e,t,a,i){var r=a===Uint8Array?new Uint8Array(e,t,i):(r=new ArrayBuffer(i),new Uint8Array(r).set(new Uint8Array(e,t,i)),new a(r));return r},readMask:function(e,t){var a=t.ptr,i=(r=t.headerInfo).width*r.height,r=r.numValidPixel,n=new DataView(e,a,4),s={};if(s.numBytes=n.getUint32(0,!0),a+=4,(0===r||i===r)&&0!==s.numBytes)throw"invalid mask";if(0===r)o=new Uint8Array(Math.ceil(i/8)),s.bitset=o,d=new Uint8Array(i),t.pixels.resultMask=d,a+=s.numBytes;else if(0<s.numBytes){var l,o=new Uint8Array(Math.ceil(i/8)),f=(n=new DataView(e,a,s.numBytes)).getInt16(0,!0),u=2,c=0;do{if(0<f)for(;f--;)o[c++]=n.getUint8(u++);else for(l=n.getUint8(u++),f=-f;f--;)o[c++]=l}while(f=n.getInt16(u,!0),(u+=2)<s.numBytes);if(-32768!==f||c<o.length)throw"Unexpected end of mask RLE encoding";var d=new Uint8Array(i),h=0,m=0;for(m=0;m<i;m++)7&m?(h=o[m>>3],h<<=7&m):h=o[m>>3],128&h&&(d[m]=1);t.pixels.resultMask=d,s.bitset=o,a+=s.numBytes}return t.ptr=a,t.mask=s,!0},readDataOneSweep:function(e,t,a){var i=t.ptr,n=(o=t.headerInfo).numDims,s=o.width*o.height,l=o.imageType,o=o.numValidPixel*r.getDataTypeSize(l)*n,f=t.pixels.resultMask,u=a===Uint8Array?new Uint8Array(e,i,o):(l=new ArrayBuffer(o),new Uint8Array(l).set(new Uint8Array(e,i,o)),new a(l));if(u.length===s*n)t.pixels.resultPixels=u;else{t.pixels.resultPixels=new a(s*n);var c,d=0,h=0,m=0;if(1<n)for(m=0;m<n;m++)for(c=m*s,h=0;h<s;h++)f[h]&&(t.pixels.resultPixels[c+h]=u[d++]);else for(h=0;h<s;h++)f[h]&&(t.pixels.resultPixels[h]=u[d++])}return t.ptr=i+=o,!0},readHuffmanTree:function(e,t){var a=this.HUFFMAN_LUT_BITS_MAX,i=new DataView(e,t.ptr,16);if(t.ptr+=16,i.getInt32(0,!0)<2)throw"unsupported Huffman version";var s=i.getInt32(4,!0),l=i.getInt32(8,!0),o=i.getInt32(12,!0);if(o<=l)return!1;var f=new Uint32Array(o-l);r.decodeBits(e,t,f);for(var u,c,d,h=[],m=l;m<o;m++)h[u=m-(m<s?0:s)]={first:f[m-l],second:null};var g=e.byteLength-t.ptr;i=Math.ceil(g/4),i=new ArrayBuffer(4*i);new Uint8Array(i).set(new Uint8Array(e,t.ptr,g));var p=new Uint32Array(i),x=0,w=0,k=p[0];for(m=l;m<o;m++)0<(d=h[u=m-(m<s?0:s)].first)&&(h[u].second=k<<x>>>32-d,d<=32-x?32===(x+=d)&&(x=0,k=p[++w]):(k=p[++w],h[u].second|=k>>>32-(x+=d-32)));var y,b=0,I=new n;for(m=0;m<h.length;m++)void 0!==h[m]&&(b=Math.max(b,h[m].first));y=a<=b?a:b;var U,v,T,M,V,A=[];for(m=l;m<o;m++)if(0<(d=h[u=m-(m<s?0:s)].first))if(U=[d,u],d<=y)for(v=h[u].second<<y-d,T=1<<y-d,c=0;c<T;c++)A[v|c]=U;else for(v=h[u].second,V=I,M=d-1;0<=M;M--)V=v>>>M&1?(V.right||(V.right=new n),V.right):(V.left||(V.left=new n),V.left),0!==M||V.val||(V.val=U[1]);return{decodeLut:A,numBitsLUTQick:y,numBitsLUT:b,tree:I,stuffedData:p,srcPtr:w,bitPos:x}},readHuffman:function(e,t,a){var i,r,n,s,l,o,f,u,c,d=t.headerInfo,h=d.numDims,m=t.headerInfo.height,g=t.headerInfo.width,p=g*m,x=(e=this.readHuffmanTree(e,t)).decodeLut,w=e.tree,k=e.stuffedData,y=e.srcPtr,b=e.bitPos,I=e.numBitsLUTQick,U=e.numBitsLUT,v=0===t.headerInfo.imageType?128:0,T=t.pixels.resultMask,M=0;0<b&&(y++,b=0);for(var V=k[y],A=1===t.encodeMode,B=new a(p*h),D=B,S=0;S<d.numDims;S++){if(1<h&&(D=new a(B.buffer,p*S,p),M=0),t.headerInfo.numValidPixel===g*m)for(o=u=0;o<m;o++)for(f=0;f<g;f++,u++){if(r=0,l=s=V<<b>>>32-I,x[l=32-b<I?s|=k[y+1]>>>64-b-I:l])r=x[l][1],b+=x[l][0];else for(l=s=V<<b>>>32-U,32-b<U&&(l=s|=k[y+1]>>>64-b-U),i=w,c=0;c<U;c++)if(!(i=s>>>U-c-1&1?i.right:i.left).left&&!i.right){r=i.val,b=b+c+1;break}32<=b&&(b-=32,V=k[++y]),n=r-v,A?(n+=!(0<f)&&0<o?D[u-g]:M,n&=255,M=D[u]=n):D[u]=n}else for(o=u=0;o<m;o++)for(f=0;f<g;f++,u++)if(T[u]){if(r=0,l=s=V<<b>>>32-I,x[l=32-b<I?s|=k[y+1]>>>64-b-I:l])r=x[l][1],b+=x[l][0];else for(l=s=V<<b>>>32-U,32-b<U&&(l=s|=k[y+1]>>>64-b-U),i=w,c=0;c<U;c++)if(!(i=s>>>U-c-1&1?i.right:i.left).left&&!i.right){r=i.val,b=b+c+1;break}32<=b&&(b-=32,V=k[++y]),n=r-v,A?(!(0<f&&T[u-1])&&0<o&&T[u-g]?n+=D[u-g]:n+=M,n&=255,M=D[u]=n):D[u]=n}t.ptr=t.ptr+4*(y+1)+(0<b?4:0)}t.pixels.resultPixels=B},decodeBits:function(r,n,s,l,o){var f=(U=n.headerInfo).fileVersion,u=0,c=5<=r.byteLength-n.ptr?5:r.byteLength-n.ptr,d=new DataView(r,n.ptr,c);u++;var h=0==(m=(g=d.getUint8(0))>>6)?4:3-m,m=(c=0<(32&g),31&g),g=0;if(1==h)g=d.getUint8(u),u++;else if(2==h)g=d.getUint16(u,!0),u+=2;else{if(4!=h)throw"Invalid valid pixel count type";g=d.getUint32(u,!0),u+=4}h=2*U.maxZError;var p,x,w,k,y,b,I,U=1<U.numDims?U.maxValues[o]:U.zMax;if(c){for(n.counter.lut++,b=d.getUint8(u),u++,k=Math.ceil((b-1)*m/8),y=Math.ceil(k/4),x=new ArrayBuffer(4*y),w=new Uint8Array(x),n.ptr+=u,w.set(new Uint8Array(r,n.ptr,k)),d=new Uint32Array(x),n.ptr+=k,I=0;b-1>>>I;)I++;k=Math.ceil(g*I/8),y=Math.ceil(k/4),x=new ArrayBuffer(4*y),(w=new Uint8Array(x)).set(new Uint8Array(r,n.ptr,k)),p=new Uint32Array(x),n.ptr+=k,d=(3<=f?i:t)(d,m,b-1,l,h,U),(3<=f?a:e)(p,s,I,g,d)}else n.counter.bitstuffer++,I=m,n.ptr+=u,0<I&&(k=Math.ceil(g*I/8),y=Math.ceil(k/4),x=new ArrayBuffer(4*y),(w=new Uint8Array(x)).set(new Uint8Array(r,n.ptr,k)),p=new Uint32Array(x),n.ptr+=k,3<=f?null===l?function(e,t,a,i){for(var r,n,s,l=(1<<a)-1,o=0,f=0,u=0,c=0;c<i;c++)0===f&&(n=e[o++],f=32,u=0),a<=f?(r=n>>>u&l,f-=a,u+=a):(r=n>>>u&l,f=32-(s=a-f),r|=((n=e[o++])&(1<<s)-1)<<a-s,u=s),t[c]=r}(p,s,I,g):a(p,s,I,g,!1,l,h,U):null===l?function(e,t,a,i){var r,n,s,l,o=(1<<a)-1,f=0,u=0,c=4*e.length-Math.ceil(a*i/8);for(e[e.length-1]<<=8*c,r=0;r<i;r++)0===u&&(s=e[f++],u=32),a<=u?(n=s>>>u-a&o,u-=a):(n=(s&o)<<(l=a-u)&o,n+=(s=e[f++])>>>(u=32-l)),t[r]=n}(p,s,I,g):e(p,s,I,g,!1,l,h,U))},readTiles:function(e,t,a){var i=t.headerInfo,n=i.width,s=i.height,l=i.microBlockSize,o=i.imageType,f=r.getDataTypeSize(o),u=Math.ceil(n/l),c=Math.ceil(s/l);t.pixels.numBlocksY=c,t.pixels.numBlocksX=u;var d,h,m,g,p,x,w,k,y,b,I,U,v,T,M=t.pixels.ptr=0,V=0,A=0,B=0,D=0,S=0,P=0,E=0,C=new a(l*l),F=s%l||l,L=n%l||l,O=i.numDims,N=t.pixels.resultMask,R=t.pixels.resultPixels;for(A=0;A<c;A++)for(d=A!==c-1?l:F,B=0;B<u;B++)for(D=A*n*l+B*l,x=n-(h=B!==u-1?l:L),T=0;T<O;T++){if(1<O&&(R=new a(t.pixels.resultPixels.buffer,n*s*T*f,n*s)),m=e.byteLength-t.ptr,y={},E=0,E++,p=(g=(k=new DataView(e,t.ptr,Math.min(10,m))).getUint8(0))>>6&255,(g>>2&15)!=(B*l>>3&15))throw"integrity issue";if(3<(I=3&g))throw t.ptr+=E,"Invalid block encoding ("+I+")";if(2!=I)if(0==I){if(t.counter.uncompressed++,t.ptr+=E,S=(S=d*h*f)<(w=e.byteLength-t.ptr)?S:w,U=new ArrayBuffer(S%f==0?S:S+f-S%f),new Uint8Array(U).set(new Uint8Array(e,t.ptr,S)),b=new a(U),P=0,N)for(M=0;M<d;M++){for(V=0;V<h;V++)N[D]&&(R[D]=b[P++]),D++;D+=x}else for(M=0;M<d;M++){for(V=0;V<h;V++)R[D++]=b[P++];D+=x}t.ptr+=P*f}else if(U=r.getDataTypeUsed(o,p),v=r.getOnePixel(y,E,U,k),E+=r.getDataTypeSize(U),3==I)if(t.ptr+=E,t.counter.constantoffset++,N)for(M=0;M<d;M++){for(V=0;V<h;V++)N[D]&&(R[D]=v),D++;D+=x}else for(M=0;M<d;M++){for(V=0;V<h;V++)R[D++]=v;D+=x}else if(t.ptr+=E,r.decodeBits(e,t,C,v,T),E=0,N)for(M=0;M<d;M++){for(V=0;V<h;V++)N[D]&&(R[D]=C[E++]),D++;D+=x}else for(M=0;M<d;M++){for(V=0;V<h;V++)R[D++]=C[E++];D+=x}else t.counter.constant++,t.ptr+=E}},formatFileInfo:function(e){return{fileIdentifierString:e.headerInfo.fileIdentifierString,fileVersion:e.headerInfo.fileVersion,imageType:e.headerInfo.imageType,height:e.headerInfo.height,width:e.headerInfo.width,numValidPixel:e.headerInfo.numValidPixel,microBlockSize:e.headerInfo.microBlockSize,blobSize:e.headerInfo.blobSize,maxZError:e.headerInfo.maxZError,pixelType:r.getPixelType(e.headerInfo.imageType),eofOffset:e.eofOffset,mask:e.mask?{numBytes:e.mask.numBytes}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,maxValue:e.headerInfo.zMax,minValue:e.headerInfo.zMin,noDataValue:e.noDataValue}}},constructConstantSurface:function(e){var t,a=e.headerInfo.zMax,i=e.headerInfo.numDims,r=e.headerInfo.height*e.headerInfo.width,n=r*i,s=0,l=0,o=e.pixels.resultMask;if(o)if(1<i)for(s=0;s<i;s++)for(t=s*r,l=0;l<r;l++)o[l]&&(e.pixels.resultPixels[t+l]=a);else for(l=0;l<r;l++)o[l]&&(e.pixels.resultPixels[l]=a);else if(e.pixels.resultPixels.fill)e.pixels.resultPixels.fill(a);else for(l=0;l<n;l++)e.pixels.resultPixels[l]=a},getDataTypeArray:function(e){var t;switch(e){case 0:t=Int8Array;break;case 1:t=Uint8Array;break;case 2:t=Int16Array;break;case 3:t=Uint16Array;break;case 4:t=Int32Array;break;case 5:t=Uint32Array;break;case 6:t=Float32Array;break;case 7:t=Float64Array;break;default:t=Float32Array}return t},getPixelType:function(e){var t;switch(e){case 0:t="S8";break;case 1:t="U8";break;case 2:t="S16";break;case 3:t="U16";break;case 4:t="S32";break;case 5:t="U32";break;case 6:t="F32";break;case 7:t="F64";break;default:t="F32"}return t},isValidPixelValue:function(e,t){if(null===t)return!1;var a;switch(e){case 0:a=-128<=t&&t<=127;break;case 1:a=0<=t&&t<=255;break;case 2:a=-32768<=t&&t<=32767;break;case 3:a=0<=t&&t<=65536;break;case 4:a=-2147483648<=t&&t<=2147483647;break;case 5:a=0<=t&&t<=4294967296;break;case 6:a=-34027999387901484e22<=t&&t<=34027999387901484e22;break;case 7:a=5e-324<=t&&t<=17976931348623157e292;break;default:a=!1}return a},getDataTypeSize:function(e){var t=0;switch(e){case 0:case 1:t=1;break;case 2:case 3:t=2;break;case 4:case 5:case 6:t=4;break;case 7:t=8;break;default:t=e}return t},getDataTypeUsed:function(e,t){var a=e;switch(e){case 2:case 4:a=e-t;break;case 3:case 5:a=e-2*t;break;case 6:a=0===t?e:1===t?2:1;break;case 7:a=0===t?e:e-2*t+1;break;default:a=e}return a},getOnePixel:function(e,t,a,i){var r=0;switch(a){case 0:r=i.getInt8(t);break;case 1:r=i.getUint8(t);break;case 2:r=i.getInt16(t,!0);break;case 3:r=i.getUint16(t,!0);break;case 4:r=i.getInt32(t,!0);break;case 5:r=i.getUInt32(t,!0);break;case 6:r=i.getFloat32(t,!0);break;case 7:r=i.getFloat64(t,!0);break;default:throw"the decoder does not understand this pixel type"}return r}},n=function(e,t,a){this.val=e,this.left=t,this.right=a};return{decode:function(e,t){var a=(t=t||{}).noDataValue,i=0,n={};n.ptr=t.inputOffset||0,n.pixels={},r.readHeaderInfo(e,n);var s=n.headerInfo,l=s.fileVersion,o=r.getDataTypeArray(s.imageType);r.readMask(e,n),s.numValidPixel===s.width*s.height||n.pixels.resultMask||(n.pixels.resultMask=t.maskData);var f,u=s.width*s.height;if(n.pixels.resultPixels=new o(u*s.numDims),n.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0},0!==s.numValidPixel)if(s.zMax===s.zMin)r.constructConstantSurface(n);else if(4<=l&&r.checkMinMaxRanges(e,n))r.constructConstantSurface(n);else{var c=new DataView(e,n.ptr,2),d=c.getUint8(0);if(n.ptr++,d)r.readDataOneSweep(e,n,o);else if(1<l&&s.imageType<=1&&Math.abs(s.maxZError-.5)<1e-5){if(c=c.getUint8(1),n.ptr++,2<(n.encodeMode=c)||l<4&&1<c)throw"Invalid Huffman flag "+c;c?r.readHuffman(e,n,o):r.readTiles(e,n,o)}else r.readTiles(e,n,o)}n.eofOffset=n.ptr,t.inputOffset?(f=n.headerInfo.blobSize+t.inputOffset-n.ptr,1<=Math.abs(f)&&(n.eofOffset=t.inputOffset+n.headerInfo.blobSize)):(f=n.headerInfo.blobSize-n.ptr,1<=Math.abs(f)&&(n.eofOffset=n.headerInfo.blobSize));var h={width:s.width,height:s.height,pixelData:n.pixels.resultPixels,minValue:s.zMin,maxValue:s.zMax,validPixelCount:s.numValidPixel,dimCount:s.numDims,dimStats:{minValues:s.minValues,maxValues:s.maxValues},maskData:n.pixels.resultMask};if(n.pixels.resultMask&&r.isValidPixelValue(s.imageType,a)){var m=n.pixels.resultMask;for(i=0;i<u;i++)m[i]||(h.pixelData[i]=a);h.noDataValue=a}return n.noDataValue=a,t.returnFileInfo&&(h.fileInfo=r.formatFileInfo(n)),h},getBandCount:function(e){for(var t=0,a=0,i={ptr:0,pixels:{}};a<e.byteLength-58;)r.readHeaderInfo(e,i),a+=i.headerInfo.blobSize,t++,i.ptr=a;return t}}}(),B=new ArrayBuffer(4),E=new Uint8Array(B),P=(new Uint32Array(B)[0]=1)===E[0],E={decode:function(e,t){if(!P)throw"Big endian system is not supported.";var a,i,r=(t=t||{}).inputOffset||0,n=new Uint8Array(e,r,10);if("CntZImage"===(n=String.fromCharCode.apply(null,n)).trim())a=D,i=1;else{if("Lerc2"!==n.substring(0,5))throw"Unexpected file identifier string: "+n;a=S,i=2}for(var s,l,o,f,u,c,d=0,h=e.byteLength-10,m=[],g={width:0,height:0,pixels:[],pixelType:t.pixelType,mask:null,statistics:[]};r<h;){var p=a.decode(e,{inputOffset:r,encodedMaskData:s,maskData:o,returnMask:0===d,returnEncodedMask:0===d,returnFileInfo:!0,pixelType:t.pixelType||null,noDataValue:t.noDataValue||null});r=p.fileInfo.eofOffset;0===d&&(s=p.encodedMaskData,o=p.maskData,g.width=p.width,g.height=p.height,g.dimCount=p.dimCount||1,g.pixelType=p.pixelType||p.fileInfo.pixelType,g.mask=p.maskData),1<i&&p.fileInfo.mask&&0<p.fileInfo.mask.numBytes&&m.push(p.maskData),d++,g.pixels.push(p.pixelData),g.statistics.push({minValue:p.minValue,maxValue:p.maxValue,noDataValue:p.noDataValue,dimStats:p.dimStats})}if(1<i&&1<m.length){for(c=g.width*g.height,g.bandMasks=m,(o=new Uint8Array(c)).set(m[0]),f=1;f<m.length;f++)for(l=m[f],u=0;u<c;u++)o[u]=o[u]&l[u];g.maskData=o}return g}},C.Lerc=E;var F=C.Lerc;return u((function(t,a){if(t.encoding===x.LERC){try{r=F.decode(t.heightmap)}catch(t){throw new f.RuntimeError(t)}if(r.statistics[0].minValue===Number.MAX_VALUE)throw new f.RuntimeError("Invalid tile data");t.heightmap=r.pixels[0],t.width=r.width,t.height=r.height}t.ellipsoid=e.Ellipsoid.clone(t.ellipsoid),t.rectangle=e.Rectangle.clone(t.rectangle);var i=w.computeVertices(t),r=i.vertices;return a.push(r.buffer),{vertices:r.buffer,numberOfAttributes:i.encoding.stride,minimumHeight:i.minimumHeight,maximumHeight:i.maximumHeight,gridWidth:t.width,gridHeight:t.height,boundingSphere3D:i.boundingSphere3D,orientedBoundingBox:i.orientedBoundingBox,occludeePointInScaledSpace:i.occludeePointInScaledSpace,encoding:i.encoding,westIndicesSouthToNorth:i.westIndicesSouthToNorth,southIndicesEastToWest:i.southIndicesEastToWest,eastIndicesNorthToSouth:i.eastIndicesNorthToSouth,northIndicesWestToEast:i.northIndicesWestToEast}}))}));