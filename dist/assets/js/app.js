!function e(n,t,o){function r(a,s){if(!t[a]){if(!n[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var d=t[a]={exports:{}};n[a][0].call(d.exports,function(e){var t=n[a][1][e];return r(t?t:e)},d,d.exports,e,n,t,o)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<o.length;a++)r(o[a]);return r}({1:[function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),a=e("../utils/utils"),s=e("../utils/three-utils"),u=e("../utils/loader"),l=o(u),d=e("./gpgpu"),c=o(d),f=e("../libs/stats.min"),v=void 0,p=void 0,m=void 0,x=void 0,h=void 0,y=void 0,g=void 0,E=void 0,w=void 0,M=void 0,T=void 0,R=void 0,z=function(){function e(){r(this,e),v=this,this.createBaseElements(),this.addListeners();var n=[{file:"assets/img/particle.png",id:"particle"}];this.loadAssets(n,function(e){v.createScene(e),v.handleResize(),v.update()})}return i(e,[{key:"loadAssets",value:function(e,n){var t=new l["default"];t.load(e,function(e){"function"==typeof n&&n(e)})}},{key:"createBaseElements",value:function(){var e=window.innerWidth,n=window.innerHeight;p=new THREE.Scene,m=new THREE.PerspectiveCamera(50,e/n,.1,1e3),m.position.z=350,x=new THREE.WebGLRenderer,x.setClearColor(1184274,1),x.setSize(e,n),document.body.appendChild(x.domElement)}},{key:"createScene",value:function(e){for(var n=512,t=THREE.RGBAFormat,o=t===THREE.RGBFormat?3:4,r=n*n*o,i=new Float32Array(r),u=new Float32Array(r),l=50,d=0;d<r;d+=o)i[d+0]=(0,a.randomRange)(-l,l),i[d+1]=(0,a.randomRange)(-l,l),i[d+2]=(0,a.randomRange)(-l,l),i[d+3]=0,u[d+0]=(0,a.randomRange)(.1,.9),u[d+1]=(0,a.randomInt)(1,3),u[d+2]=0,u[d+3]=0;g=(0,s.getDataTexture)(i,n,n,t),E=(0,s.getDataTexture)(i,n,n,t),w=(0,s.getDataTexture)(u,n,n,t),M=new THREE.ShaderMaterial({uniforms:{tOriginalPositions:{type:"t",value:g},tPositions:{type:"t",value:E},tData:{type:"t",value:w},curlScale:{type:"f",value:1.5},amplitude:{type:"f",value:125},time:{type:"f",value:0}},vertexShader:"#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = vec2(uv.x, 1.0 - uv.y);\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}",fragmentShader:"#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\nvec3 snoiseVec3( vec3 x ){\n\n  float s  = snoise(vec3( x ));\n  float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\n  float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\n  vec3 c = vec3( s , s1 , s2 );\n  return c;\n\n}\n\nvec3 curlNoise( vec3 p ){\n  \n  const float e = .1;\n  vec3 dx = vec3( e   , 0.0 , 0.0 );\n  vec3 dy = vec3( 0.0 , e   , 0.0 );\n  vec3 dz = vec3( 0.0 , 0.0 , e   );\n\n  vec3 p_x0 = snoiseVec3( p - dx );\n  vec3 p_x1 = snoiseVec3( p + dx );\n  vec3 p_y0 = snoiseVec3( p - dy );\n  vec3 p_y1 = snoiseVec3( p + dy );\n  vec3 p_z0 = snoiseVec3( p - dz );\n  vec3 p_z1 = snoiseVec3( p + dz );\n\n  float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\n  float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\n  float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\n\n  const float divisor = 1.0 / ( 2.0 * e );\n  return normalize( vec3( x , y , z ) * divisor );\n\n}\n\nuniform sampler2D tOriginalPositions;\nuniform sampler2D tPositions;\nuniform sampler2D tData;\nuniform float curlScale;\nuniform float amplitude;\nuniform float time;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n    vec4 oPos = texture2D(tOriginalPositions, vUv);\n    vec4 pos = texture2D(tPositions, vUv);\n\n    float dist = distance(oPos.xyz, pos.xyz);\n\n    if(dist > 150.0)\n    {\n        pos = oPos;\n        pos.a = 0.0;\n    }\n    else\n    {\n        pos.xyz += curlNoise(pos.xyz / amplitude) * curlScale;\n\n        if(pos.a < 0.1)\n        {\n            pos.a += 0.001;\n        }\n    }\n\n    gl_FragColor = pos;\n}"}),T=new THREE.ShaderMaterial({uniforms:{tOriginalPositions:{type:"t",value:g},tPositions:{type:"t",value:E},tData:{type:"t",value:w},map:{type:"t",value:e.textures.particle},pointSize:{type:"f",value:1},texSize:{type:"f",value:n}},vertexShader:"#define GLSLIFY 1\nuniform sampler2D tOriginalPositions;\nuniform sampler2D tPositions;//RenderTarget containing the transformed positions\nuniform sampler2D tData;\nuniform float pointSize;\nuniform float texSize;\n\nvarying vec4 vPos;\n// varying vec4 vOriginalPos;\n\nvoid main() {\n\n    vec2 uv = position.xy + vec2(0.5 / texSize, 0.5 / texSize);\n    vec4 pos = texture2D(tPositions, uv);\n    vPos = pos;\n\n    // vec4 oPos = texture2D(tOriginalPositions, uv);\n    // vOriginalPos = oPos;\n\n    // vec4 pos = texture2D(tPositions, position.xy);\n\n    vec4 data = texture2D(tData, uv);\n    // vec3 otherVals = texture2D(tData, position.xy).xyz;\n\n    //regular projection of our position\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);\n\n    //sets the point size\n    // gl_PointSize = pointSize;\n    // gl_PointSize = pos.a;\n    gl_PointSize = data.y;\n    // gl_PointSize = sin(pos.x) * data.y;\n    // gl_PointSize = length(pos) * 0.025;\n}",fragmentShader:"#define GLSLIFY 1\nfloat hue2rgb(float f1, float f2, float hue) {\n    if (hue < 0.0)\n        hue += 1.0;\n    else if (hue > 1.0)\n        hue -= 1.0;\n    float res;\n    if ((6.0 * hue) < 1.0)\n        res = f1 + (f2 - f1) * 6.0 * hue;\n    else if ((2.0 * hue) < 1.0)\n        res = f2;\n    else if ((3.0 * hue) < 2.0)\n        res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;\n    else\n        res = f1;\n    return res;\n}\n\nvec3 hsl2rgb(vec3 hsl) {\n    vec3 rgb;\n    \n    if (hsl.y == 0.0) {\n        rgb = vec3(hsl.z); // Luminance\n    } else {\n        float f2;\n        \n        if (hsl.z < 0.5)\n            f2 = hsl.z * (1.0 + hsl.y);\n        else\n            f2 = hsl.z + hsl.y - hsl.y * hsl.z;\n            \n        float f1 = 2.0 * hsl.z - f2;\n        \n        rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));\n        rgb.g = hue2rgb(f1, f2, hsl.x);\n        rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));\n    }   \n    return rgb;\n}\n\nvec3 hsl2rgb(float h, float s, float l) {\n    return hsl2rgb(vec3(h, s, l));\n}\n\nuniform sampler2D map;\nvarying vec4 vPos;\n// varying vec4 vOriginalPos;\n\nvoid main()\n{\n    // vec3 rgb = hsl2rgb((vPos.x + vPos.y)/360.0, 1.0, 0.5);\n    // float dist = distance(vOriginalPos.xyz, vPos.xyz) * 0.005;\n    // float opacity = smoothstep(0.0, 0.5, dist) * 0.5;\n    vec3 rgb = hsl2rgb(length(vPos)/150.0, 1.0, 0.65);\n    // vec3 rgb = hsl2rgb(1.0 - (length(vPos)/180.0), 1.0, 0.5);\n    gl_FragColor = vec4(rgb, vPos.a) * texture2D(map, gl_PointCoord);\n    // gl_FragColor = vec4(rgb, vPos.a * sin(gl_FragCoord.x / 2.0)) * texture2D(map, gl_PointCoord);\n\n    if(vPos.a < 0.05)\n    {\n        discard;\n    }\n}",transparent:!0,blending:THREE.AdditiveBlending,depthTest:!1,depthWrite:!1}),r=n*n;for(var f=new Float32Array(3*r),v=0;v<r;v++)f[3*v+0]=v%n/n,f[3*v+1]=Math.floor(v/n)/n;var m=new THREE.BufferGeometry;m.addAttribute("position",new THREE.BufferAttribute(f,3)),y=new THREE.Points(m,T),p.add(y),h=new c["default"]({renderer:x,simulationMaterial:M,renderMaterial:T,size:n,format:t})}},{key:"addListeners",value:function(){window.addEventListener("resize",this.handleResize,!1),window.addEventListener("orientationchange",this.handleResize,!1)}},{key:"removeListeners",value:function(){window.removeEventListener("resize",this.handleResize),window.removeEventListener("orientationchange",this.handleResize)}},{key:"addStats",value:function(){R=new f,R.domElement.style.position="absolute",R.domElement.style.left="0px",R.domElement.style.bottom="0px",document.body.appendChild(R.domElement)}},{key:"createEffects",value:function(){effectsManager=new EffectsManager({renderer:x,camera:m,scene:p})}},{key:"handleResize",value:function(e){var n=window.innerWidth,t=window.innerHeight;m.aspect=n/t,m.updateProjectionMatrix(),x.setSize(n,t)}},{key:"update",value:function(){M.uniforms.time.value+=.001,h.update("tPositions"),y.rotation.y+=.01,x.render(p,m),R&&R.update(),requestAnimationFrame(v.update)}},{key:"dispose",value:function(){removeListeners()}}]),e}();t["default"]=z},{"../libs/stats.min":3,"../utils/loader":5,"../utils/three-utils":6,"../utils/utils":7,"./gpgpu":2}],2:[function(e,n,t){"use strict";function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),i=void 0,a=void 0,s=void 0,u=void 0,l=void 0,d=!1,c=function(){function e(n){var t=n.renderer,r=n.simulationMaterial,d=n.renderMaterial,c=n.size,f=void 0===c?128:c,v=n.format,p=void 0===v?THREE.RGBFormat:v;o(this,e);var m=t.getContext();if(!m.getExtension("OES_texture_float"))return void alert("No OES_texture_float support for float textures!");if(0===m.getParameter(m.MAX_VERTEX_TEXTURE_IMAGE_UNITS))return void alert("No support for vertex shader textures!");a=new THREE.OrthographicCamera((-.5),.5,.5,(-.5),0,1),i=new THREE.Scene,s=new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1),r),i.add(s);var x={minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter,type:THREE.FloatType,format:p,stencil:!1};u=new THREE.WebGLRenderTarget(f,f,x),l=u.clone(),this.renderer=t,this.simulationMaterial=r,this.renderMaterial=d}return r(e,[{key:"update",value:function(e){e=e||"tPositions",d?(this.renderer.render(i,a,l,!1),this.renderMaterial.uniforms[e].value=l.texture,this.simulationMaterial.uniforms[e].value=l.texture):(this.renderer.render(i,a,u,!1),this.renderMaterial.uniforms[e].value=u.texture,this.simulationMaterial.uniforms[e].value=u.texture),d=!d}}]),e}();t["default"]=c},{}],3:[function(e,n,t){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},r=function(){function e(e,n,t){return e=document.createElement(e),e.id=n,e.style.cssText=t,e}function n(n,t,o){var r=e("div",n,"padding:0 0 3px 3px;text-align:left;background:"+o),i=e("div",n+"Text","font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:"+t);for(i.innerHTML=n.toUpperCase(),r.appendChild(i),n=e("div",n+"Graph","width:74px;height:30px;background:"+t),r.appendChild(n),t=0;74>t;t++)n.appendChild(e("span","","width:1px;height:30px;float:left;opacity:0.9;background:"+o));return r}function t(e){for(var n=l.children,t=0;t<n.length;t++)n[t].style.display=t===e?"block":"none";u=e}function o(e,n){e.appendChild(e.firstChild).style.height=Math.min(30,30-30*n)+"px"}var r=self.performance&&self.performance.now?self.performance.now.bind(performance):Date.now,i=r(),a=i,s=0,u=0,l=e("div","stats","width:80px;opacity:0.9;cursor:pointer");l.addEventListener("mousedown",function(e){e.preventDefault(),t(++u%l.children.length)},!1);var d=0,c=1/0,f=0,v=n("fps","#0ff","#002"),p=v.children[0],m=v.children[1];l.appendChild(v);var x=0,h=1/0,y=0,v=n("ms","#0f0","#020"),g=v.children[0],E=v.children[1];if(l.appendChild(v),self.performance&&self.performance.memory){var w=0,M=1/0,T=0,v=n("mb","#f08","#201"),R=v.children[0],z=v.children[1];l.appendChild(v)}return t(u),{REVISION:14,domElement:l,setMode:t,begin:function(){i=r()},end:function(){var e=r();if(x=e-i,h=Math.min(h,x),y=Math.max(y,x),g.textContent=(0|x)+" MS ("+(0|h)+"-"+(0|y)+")",o(E,x/200),s++,e>a+1e3&&(d=Math.round(1e3*s/(e-a)),c=Math.min(c,d),f=Math.max(f,d),p.textContent=d+" FPS ("+c+"-"+f+")",o(m,d/100),a=e,s=0,void 0!==w)){var n=performance.memory.usedJSHeapSize,t=performance.memory.jsHeapSizeLimit;w=Math.round(9.54e-7*n),M=Math.min(M,w),T=Math.max(T,w),R.textContent=w+" MB ("+M+"-"+T+")",o(z,n/t)}return e},update:function(){i=this.end()}}};"object"===("undefined"==typeof n?"undefined":o(n))&&(n.exports=r)},{}],4:[function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var r=e("./app/app"),i=o(r);document.addEventListener("DOMContentLoaded",function(){new i["default"]},!1)},{"./app/app":1}],5:[function(e,n,t){"use strict";function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),i=void 0,a=void 0,s=void 0,u=void 0,l=void 0,d=void 0,c=void 0,f=void 0,v=void 0,p=!1,m=function(){function e(){o(this,e),a={},s={textures:{},geometry:{},fonts:{},data:{}},f=this.checkLoaded,v=this}return r(e,[{key:"load",value:function(e,n,t){d=t,c=n,u=e.length,l=0;var o=this;e.forEach(function(e){"[object Array]"!==Object.prototype.toString.call(e.file)?e.file.indexOf(".png")>0||e.file.indexOf(".jpg")>0||e.file.indexOf(".jpeg")>0||e.file.indexOf(".gif")>0?o.loadTexture(e):e.file.indexOf(".json")>0?e.isData?o.loadDataJSON(e):e.isFont?o.loadFontJSON(e):o.loadGeometryJSON(e):e.file.indexOf(".dae")>0&&o.loadCollada(e):o.loadCubemap(e)}),i=setInterval(o.update,1e3/30)}},{key:"loadDataJSON",value:function(e){var n=new XMLHttpRequest;n.overrideMimeType("application/json"),n.open("GET",e.file,!0),n.onreadystatechange=function(){4===n.readyState&&200===n.status&&(s.data[e.id]=JSON.parse(n.responseText),l++,f())},n.send()}},{key:"loadGeometryJSON",value:function(e){var n=new THREE.JSONLoader;a[e.id]={loaded:0,total:0},n.load(e.file,function(n){a[e.id].loaded=a[e.id].total,s.geometry[e.id]=n,l++,f()},function(n){a[e.id].loaded=n.loaded,a[e.id].total=n.total})}},{key:"loadFontJSON",value:function(e){var n=new THREE.FontLoader;a[e.id]={loaded:0,total:0},n.load(e.file,function(n){a[e.id].loaded=a[e.id].total,s.fonts[e.id]=n,l++,f()},function(n){a[e.id].loaded=n.loaded,a[e.id].total=n.total})}},{key:"loadCollada",value:function(e){var n=new THREE.ColladaLoader;a[e.id]={loaded:0,total:0},n.load(e.file,function(n){a[e.id].loaded=a[e.id].total,s.geometry[e.id]=n,l++,f()},function(n){a[e.id].loaded=n.loaded,a[e.id].total=n.total})}},{key:"loadTexture",value:function(e){var n=new THREE.TextureLoader;a[e.id]={loaded:0,total:0},n.load(e.file,function(n){a[e.id].loaded=a[e.id].total,s.textures[e.id]=n,l++,f()},function(n){a[e.id].loaded=n.loaded,a[e.id].total=n.total})}},{key:"loadCubemap",value:function(e){var n=new THREE.CubeTextureLoader;a[e.id]={loaded:0,total:0},n.load(e.file,function(n){a[e.id].loaded=a[e.id].total,s.textures[e.id]=n,l++,f()},function(n){a[e.id].loaded=n.loaded,a[e.id].total=n.total})}},{key:"checkLoaded",value:function(){p||l===u&&(p=!0,clearInterval(i),v.update(),"function"==typeof c&&c(s))}},{key:"update",value:function(){if("function"==typeof d){var e=0,n=0;for(var t in a)e+=parseInt(a[t].loaded),n+=parseInt(a[t].total);d&&d(e,n)}}},{key:"dispose",value:function(){clearInterval(i),i=null,a=null,s=null,u=null,l=null,d=null,c=null,p=null}}]),e}();t["default"]=m},{}],6:[function(e,n,t){"use strict";function o(e){return e/180*Math.PI}function r(e){return 180*e/Math.PI}function a(e,n,t,o){var r=new THREE.DataTexture(e,n,t,o,THREE.FloatType);return r.minFilter=THREE.NearestFilter,r.magFilter=THREE.NearestFilter,r.generateMipmaps=!1,r.needsUpdate=!0,r}function s(e,n,t){return new THREE.Mesh(new THREE.PlaneGeometry(e||1,n||1),new THREE.MeshBasicMaterial({color:t||16777215}))}function u(e,n){return e+Math.random()*(n-e)}function l(e,n){var t=new THREE.Matrix4;t.makeRotationX(n),t.multiply(e.matrix),e.matrix=t,e.rotation.setFromRotationMatrix(e.matrix)}function d(e,n){var t=new THREE.Matrix4;t.makeRotationY(n),t.multiply(e.matrix),e.matrix=t,e.rotation.setFromRotationMatrix(e.matrix)}function c(e,n){var t=new THREE.Matrix4;t.makeRotationZ(n),t.multiply(e.matrix),e.matrix=t,e.rotation.setFromRotationMatrix(e.matrix)}function f(e,n,t){var o=new THREE.Matrix4;o.makeRotationAxis(n.normalize(),t),o.multiply(e.matrix),e.matrix=o,e.rotation.setFromRotationMatrix(e.matrix)}function v(e,n){e.scale.set(n,n,n)}function p(e){e&&(e.parent&&e.parent.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(e.material.map&&e.material.map.dispose(),e.material.dispose()))}function m(e){if(e)for(;e.length>0;)p(e[0])}function x(e){for(;e.children.length>0;)e.remove(e.children[0])}function h(e,n,t){e.position.x+=(n.x-e.position.x)*t,e.position.y+=(n.y-e.position.y)*t,e.position.z+=(n.z-e.position.z)*t}function y(e,n,t){e.x+=(n.x-e.x)*t,e.y+=(n.y-e.y)*t,e.z+=(n.z-e.z)*t}function g(e,n,t){e.rotation.x+=(n.x-e.rotation.x)*t,e.rotation.y+=(n.y-e.rotation.y)*t,e.rotation.z+=(n.z-e.rotation.z)*t}function E(e){e.updateMatrix(),e.updateMatrixWorld(),e.matrixWorldInverse.getInverse(e.matrixWorld)}function w(e,n,t){return t=t||new THREE.Frustum,E(n),e.updateMatrix(),e.updateMatrixWorld(),t.setFromMatrix((new THREE.Matrix4).multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse)),t.intersectsObject(e)}function M(e,n,t,o){o=o||new THREE.Raycaster,o.setFromCamera(e,n);var r=o.intersectObjects(t);return r.length>0?r[0]:null}function T(e,n){E(n),e.updateMatrixWorld();var t=window.innerWidth,o=window.innerHeight,r=t/2,i=o/2,a=(new THREE.Vector3).setFromMatrixPosition(e.matrixWorld);return a.project(n),{x:a.x*r+r|0,y:-(a.y*i)+i|0}}function R(e,n){E(n),e.updateMatrixWorld();var t=window.innerWidth,o=window.innerHeight,r=(new THREE.Vector3).setFromMatrixPosition(e.matrixWorld),i=new THREE.Matrix4;return i.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),r.applyMatrix4(i),{x:(r.x+1)*t/2|0,y:(-r.y+1)*o/2|0}}function z(e,n){E(n);var t=window.innerWidth,o=window.innerHeight,r=t/2,i=o/2,a=(new THREE.Vector3).copy(e);return a.project(n),{x:a.x*r+r|0,y:-(a.y*i)+i|0}}function b(e,n){E(n);var t=e.x/window.innerWidth*2-1,o=2*-(e.y/window.innerHeight)+1,r=new THREE.Vector3(t,o,.5);r.unproject(n);var i=r.sub(n.position).normalize(),a=-n.position.z/i.z;return n.position.clone().add(i.multiplyScalar(a))}function P(e,n,t){var o=e.x/window.innerWidth*2-1,r=2*-(e.y/window.innerHeight)+1,i=new THREE.Plane(new THREE.Vector3(0,0,1),n),a=new THREE.Vector3(o,r,.5),s=new THREE.Raycaster,u=void 0;return s.setFromCamera(a,t),u=s.ray.intersectPlane(i)}function S(e,n){var t=e.clone().unproject(n),o=t.sub(n.position).normalize(),r=-n.position.z/o.z;return n.position.clone().add(o.multiplyScalar(r))}function C(e,n,t){var o=new THREE.Plane(new THREE.Vector3(0,0,1),t),r=e,i=new THREE.Raycaster;i.pickingRay(r,n);var a=i.ray.intersectPlane(o);return a}function O(e){var n=[0,0],t={};keys=["a","b","c"],geometry2,thresholdDot=Math.cos(THREE.Math.degToRad(1));var o=function(e,n){return e-n};e.geometry instanceof THREE.BufferGeometry?(geometry2=new THREE.Geometry,geometry2.fromBufferGeometry(e.geometry)):geometry2=e.geometry.clone(),geometry2.mergeVertices(),geometry2.computeFaceNormals();for(var r=geometry2.vertices,i=geometry2.faces,a=e.geometry.faces,s=void 0,u=0,l=i.length;u<l;u++)for(var d=i[u],c=0;c<3;c++)n[0]=d[keys[c]],n[1]=d[keys[(c+1)%3]],n.sort(o),s=n.toString(),void 0===t[s]?t[s]={vert1:n[0],vert2:n[1],face1:u,face2:void 0}:t[s].face2=u;var f=[];for(s in t){var v=t[s];(void 0===v.face2||i[v.face1].normal.dot(i[v.face2].normal)<=thresholdDot)&&f.push({vertex1:r[v.vert1],vertex2:r[v.vert2],face1:a[v.face1],face2:a[v.face2],faceIndex1:v.face1,faceIndex2:v.face2})}return f}function _(e){for(var n=e.split("\n"),t=n.length,o=0;o<t;o++)"/*#FOG_INJECTION_1#*/"===n[o]?n[o]=THREE.ShaderChunk.fog_pars_fragment:"/*#FOG_INJECTION_2#*/"===n[o]&&(n[o]=THREE.ShaderChunk.fog_fragment);return n.join("\n")}function H(e,n,t){return{x:e*Math.cos(n)*Math.sin(t),y:e*Math.sin(n)*Math.sin(t),z:e*Math.cos(t)}}function I(e){for(var n=[],t=void 0,o=0;o<e;o++)t=H(1,Math.random()*Math.PI*2,Math.random()*Math.PI*2),n.push(new THREE.Vector3(t.x,t.y,t.z));return n}function A(e,n){for(var t=[],o=void 0,r=0;r<e;r++)o=H(Math.random()*n,Math.random()*Math.PI*2,Math.random()*Math.PI*2),t.push(new THREE.Vector3(o.x,o.y,o.z));return t}function F(e){for(var n=[],t=Math.PI*(3-Math.sqrt(5)),o=2/e,r=void 0,i=void 0,a=void 0,s=void 0,u=void 0,l=0;l<e;l++)i=l*o-1+o/2,s=Math.sqrt(1-i*i),u=l*t,r=Math.cos(u)*s,a=Math.sin(u)*s,n.push(new THREE.Vector3(r,i,a));return n}function L(e,n){return new THREE.Vector3(u(e,n),u(e,n),u(e,n))}function D(e,n,t){return L(n,t).add(e)}function N(e){var n=180/Math.PI;return new THREE.Euler(e.x*n,e.y*n,e.z*n,e.order)}function V(e,n){var t=new THREE.JSONLoader,o=e.length,r=0,i=void 0,a=void 0,s={};geometries=[];var u=function l(){i=void 0!==e[r].file?e[r].file:e[r],a=void 0!==e[r].id?e[r].id:null,t.load(i,function(e){a&&(s[a]=e),geometries.push({geometry:e,id:a}),r++,r===o?"function"==typeof n&&n(geometries,s):l()})};u()}function j(e,n){var t=e.length,o=0,r=void 0,i=void 0,a={};textures=[],loader=new THREE.TextureLoader,loader.crossOrigin="";var s=function u(){r=void 0!==e[o].file?e[o].file:e[o],i=void 0!==e[o].id?e[o].id:null,loader.load(r,function(e){i&&(a[i]=e),textures.push({texture:e,id:i}),o++,o===t?"function"==typeof n&&n(textures,a):u()})};s()}function k(e,n){for(var t=0;t<e.length;t++)e[t].wrapS=e[t].wrapT=n,e[t].needsUpdate=!0}function W(e,n){for(var t=0;t<e.length;t++)e[t].generateMipmaps=n,e[t].needsUpdate=!0}function G(e,n,t){for(var o=0;o<e.length;o++)n&&(e[o].minFilter=n),t&&(e[o].magFilter=t),e[o].needsUpdate=!0}function B(e,n,t){if("[object Array]"===Object.prototype.toString.call(t)){for(var o="",r=0;r<t.length;r++)o+=t[r]+"\n";return e.replace(n,o)}return e.replace(n,t)}function U(e){console.log(e.x,e.y,e.z)}function q(e,n){var t={attributes:[],uniforms:[],attributeCount:0,uniformCount:0};activeUniforms=e.getProgramParameter(n,e.ACTIVE_UNIFORMS),activeAttributes=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(var o={35664:"FLOAT_VEC2",35665:"FLOAT_VEC3",35666:"FLOAT_VEC4",35667:"INT_VEC2",35668:"INT_VEC3",35669:"INT_VEC4",35670:"BOOL",35671:"BOOL_VEC2",35672:"BOOL_VEC3",35673:"BOOL_VEC4",35674:"FLOAT_MAT2",35675:"FLOAT_MAT3",35676:"FLOAT_MAT4",35678:"SAMPLER_2D",35680:"SAMPLER_CUBE",5120:"BYTE",5121:"UNSIGNED_BYTE",5122:"SHORT",5123:"UNSIGNED_SHORT",5124:"INT",5125:"UNSIGNED_INT",5126:"FLOAT"},r=0;r<activeUniforms;r++){var a=e.getActiveUniform(n,r);a.typeName=o[a.type],t.uniforms.push(a),t.uniformCount+=a.size}for(i=0;i<activeAttributes;i++){var s=e.getActiveAttrib(n,i);s.typeName=o[s.type],t.attributes.push(s),t.attributeCount+=s.size}console.log(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.degreesToRads=o,t.radsToDegrees=r,t.getDataTexture=a,t.createPlane=s,t.randomRange=u,t.rotateAroundWorldAxisX=l,t.rotateAroundWorldAxisY=d,t.rotateAroundWorldAxisZ=c,t.rotateAroundWorldAxis=f,t.setScale=v,t.disposeOfMesh=p,t.disposeOfChildren=m,t.removeAllChildren=x,t.moveTowards=h,t.moveVectorTowards=y,t.rotateTowards=g,t.updateCameraMatrices=E,t.meshIsInView=w,t.getMouseIntersection=M,t.objectWorldPositionToScreen=T,t.objectWorldPositionToScreenAlt=R,t.worldToScreen=z,t.screenToWorld=b,t.screenToWorldAtZ=P,t.getMouseWorldPos=S,t.getMouseWorldPosAtZ=C,t.getEdges=O,t.addFragmentFogInjections=_,t.pointOnSphere=H,t.getPointsOnSphere=I,t.getPointsWithinSphere=A,t.getPointsOnSphereEvenly=F,t.getRandomVector3=L,t.addRandomVector3=D,t.rotationInDegrees=N,t.loadJSONGeometry=V,t.loadTextures=j,t.setTextureWrapping=k,t.setTextureMipmapping=W,t.setTextureMinMagFilters=G,t.injectShaderCode=B,t.logVector=U,t.logProgramInfo=q;t.axisUp=new THREE.Vector3(0,1,0),t.axisDown=new THREE.Vector3(0,(-1),0),t.axisLeft=new THREE.Vector3((-1),0,0),t.axisRight=new THREE.Vector3(1,0,0),t.axisForward=new THREE.Vector3(0,0,1),t.axisBackward=new THREE.Vector3(0,0,(-1))},{}],7:[function(e,n,t){"use strict";function o(e,n,t){e=e||"div";var o=document.createElement(e);return n&&n.forEach(function(e){o.classList.add(e)}),t&&(o.innerHTML=t),o}function r(e,n,t){return(e-n)/(t-n)}function i(e,n,t){return(t-n)*e+n}function a(e,n,t,o,a){return i(r(e,n,t),o,a)}function s(e,n,t){return Math.min(Math.max(e,Math.min(n,t)),Math.max(n,t))}function u(e,n){var t=n.x-e.x,o=n.y-e.y;return Math.sqrt(t*t+o*o)}function l(e,n,t,o){var r=t-e,i=o-n;return Math.sqrt(r*r+i*i)}function d(e,n){return u(e,n)<=e.radius+n.radius}function c(e,n,t){return l(e,n,t.x,t.y)<t.radius}function f(e,n,t){return v(e,t.x,t.x+t.width)&&v(n,t.y,t.y+t.height)}function v(e,n,t){return e>=Math.min(n,t)&&e<=Math.max(n,t)}function p(e,n,t,o){return Math.max(e,n)>=Math.min(t,o)&&Math.min(e,n)<=Math.max(t,o)}function m(e,n){return p(e.x,e.x+e.width,n.x,n.x+n.width)&&p(e.y,e.y+e.height,n.y,n.y+n.height)}function x(e){return e/180*Math.PI}function h(e){return 180*e/Math.PI}function y(e,n){return Math.atan2(n.y-e.y,n.x-e.x)}function g(e,n){return e+Math.random()*(n-e)}function E(e,n){return Math.floor(e+Math.random()*(n-e+1))}function w(e,n){var t=Math.pow(10,n);return Math.round(e*t)/t}function M(e,n){return Math.round(e/n)*n}function T(e,n,t,o,r){return r=r||{},r.x=Math.pow(1-o,2)*e.x+2*(1-o)*o*n.x+o*o*t.x,r.y=Math.pow(1-o,2)*e.y+2*(1-o)*o*n.y+o*o*t.y,r}function R(e,n,t,o,r,i){return i=i||{},i.x=Math.pow(1-r,3)*e.x+3*Math.pow(1-r,2)*r*n.x+3*(1-r)*r*r*t.x+r*r*r*o.x,i.y=Math.pow(1-r,3)*e.y+3*Math.pow(1-r,2)*r*n.y+3*(1-r)*r*r*t.y+r*r*r*o.y,i}function z(e,n){var t=void 0,o=void 0,r=void 0,i=void 0;n.moveTo(e[0].x,e[0].y);for(var a=1;a<e.length-2;a+=1)t=e[a],o=e[a+1],r=(t.x+o.x)/2,i=(t.y+o.y)/2,n.quadraticCurveTo(t.x,t.y,r,i);t=e[e.length-2],o=e[e.length-1],n.quadraticCurveTo(t.x,t.y,o.x,o.y)}function b(e,n,t){return{x:e*Math.cos(n)*Math.sin(t),y:e*Math.sin(n)*Math.sin(t),z:e*Math.cos(t)}}function P(e){for(var n=[],t=void 0,o=0;o<e;o++)t=b(1,Math.random()*Math.PI*2,Math.random()*Math.PI*2),n.push({x:t.x,y:t.y,z:t.z});return n}function S(e){for(var n=[],t=Math.PI*(3-Math.sqrt(5)),o=2/e,r=void 0,i=void 0,a=void 0,s=void 0,u=void 0,l=0;l<e;l++)i=l*o-1+o/2,s=Math.sqrt(1-i*i),u=l*t,r=Math.cos(u)*s,a=Math.sin(u)*s,n.push({x:r,y:i,z:a});return n}function C(e){return JSON.parse(JSON.stringify(e))}function O(e){return"[object Array]"===Object.prototype.toString.call(e)}function _(e){for(var n=e.length,t=void 0,o=void 0;0!==n;)o=Math.floor(Math.random()*n),n-=1,t=e[n],e[n]=e[o],e[o]=t;return e}function H(e,n){for(var t=[],o=e.length,r=0;r<o;r+=n)t.push(e[r]);return t}function I(e){return e[Math.random()*e.length|0]}function A(e,n,t){for(var o=[],r=e.length,i=0;i<r;i++)v(e[i].z,n,t)&&o.push(e[i]);return o}function F(e,n){for(var t=[],o=0;o<e.length;o++)t.push(e[o][n]);return t}function L(e,n,t,o,r){r=r||0;var i=0,a=function s(){setTimeout(function(){e(n),i++,i<t&&s()},o)};setTimeout(function(){a()},r)}function D(){return!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0}function N(){return"undefined"!=typeof InstallTrigger}function V(){return Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0}function j(){return!!window.chrome&&!D()}function k(){return!!document.documentMode}function W(){return navigator.platform.toLowerCase().indexOf("mac")>-1}function G(){return navigator.platform.toLowerCase().indexOf("win")>-1}function B(){if(window.WebGLRenderingContext){for(var e=document.createElement("canvas"),n=["webgl","experimental-webgl","moz-webgl","webkit-3d"],t=!1,o=0;o<4;o++)try{if(t=e.getContext(n[o]),t&&"function"==typeof t.getParameter)return!0}catch(r){}return!1}return!1}function U(e){return e.indexOf(".mp4")!==-1?"video/mp4":e.indexOf(".webm")!==-1?"video/webm":e.indexOf(".ogg")!==-1?"video/ogg":void 0}function q(e,n){n=n||null;var t=void 0;k()?(t=document.createEvent("CustomEvent"),t.initCustomEvent(e,!0,!1,n),document.dispatchEvent(t)):(t=new CustomEvent(e,{detail:n}),document.dispatchEvent(t))}function J(e,n){n=n||document.body,n.style.cursor!==e&&(n.style.cursor=e)}function Y(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n=new RegExp("[\\?&]"+e+"=([^&#]*)"),t=n.exec(location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))}Object.defineProperty(t,"__esModule",{value:!0}),t.createElement=o,t.normalize=r,t.lerp=i,t.map=a,t.clamp=s,t.distance=u,t.distanceXY=l,t.circleCollision=d,t.circlePointCollision=c,t.pointInRect=f,t.inRange=v,t.rangeIntersect=p,t.rectIntersect=m,t.degreesToRads=x,t.radsToDegrees=h,t.angleBetweenPoints=y,t.randomRange=g,t.randomInt=E,t.roundToPlaces=w,t.roundNearest=M,t.quadraticBezier=T,t.cubicBezier=R,t.multicurve=z,t.pointOnSphere=b,t.getPointsOnSphere=P,t.getPointsOnSphereEvenly=S,t.clone=C,t.isArray=O,t.shuffleArray=_,t.thinOutArray=H,t.randomItemFromArray=I,t.arrayRestrictedToRangeZ=A,t.extractKeyFromArray=F,t.repeat=L,t.isOpera=D,t.isFirefox=N,t.isSafari=V,t.isChrome=j,t.isIE=k,t.isMac=W,t.isWindows=G,t.hasWebGL=B,t.getVideoType=U,t.dispatchEvent=q,
t.setCursor=J,t.getParameterByName=Y},{}]},{},[4]);
//# sourceMappingURL=app.js.map
