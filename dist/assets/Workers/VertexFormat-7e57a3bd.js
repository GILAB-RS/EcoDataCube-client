define(["exports","./when-208fe5b0","./Check-5e798bbf"],(function(e,t,n){"use strict";function o(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),this.position=t.defaultValue(e.position,!1),this.normal=t.defaultValue(e.normal,!1),this.st=t.defaultValue(e.st,!1),this.bitangent=t.defaultValue(e.bitangent,!1),this.tangent=t.defaultValue(e.tangent,!1),this.color=t.defaultValue(e.color,!1)}o.POSITION_ONLY=Object.freeze(new o({position:!0})),o.POSITION_AND_NORMAL=Object.freeze(new o({position:!0,normal:!0})),o.POSITION_NORMAL_AND_ST=Object.freeze(new o({position:!0,normal:!0,st:!0})),o.POSITION_AND_ST=Object.freeze(new o({position:!0,st:!0})),o.POSITION_AND_COLOR=Object.freeze(new o({position:!0,color:!0})),o.ALL=Object.freeze(new o({position:!0,normal:!0,st:!0,tangent:!0,bitangent:!0})),o.DEFAULT=o.POSITION_NORMAL_AND_ST,o.packedLength=6,o.pack=function(e,n,o){return o=t.defaultValue(o,0),n[o++]=e.position?1:0,n[o++]=e.normal?1:0,n[o++]=e.st?1:0,n[o++]=e.tangent?1:0,n[o++]=e.bitangent?1:0,n[o]=e.color?1:0,n},o.unpack=function(e,n,i){return n=t.defaultValue(n,0),(i=t.defined(i)?i:new o).position=1===e[n++],i.normal=1===e[n++],i.st=1===e[n++],i.tangent=1===e[n++],i.bitangent=1===e[n++],i.color=1===e[n],i},o.clone=function(e,n){if(t.defined(e))return(n=t.defined(n)?n:new o).position=e.position,n.normal=e.normal,n.st=e.st,n.tangent=e.tangent,n.bitangent=e.bitangent,n.color=e.color,n},e.VertexFormat=o}));