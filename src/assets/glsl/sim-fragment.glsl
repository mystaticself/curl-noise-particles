#pragma glslify: curl = require(glsl-curl-noise/curl)

uniform sampler2D tOriginalPositions;
uniform sampler2D tPositions;
uniform sampler2D tData;
uniform float curlScale;
uniform float amplitude;
uniform float time;

varying vec2 vUv;

void main() {

    vec4 oPos = texture2D(tOriginalPositions, vUv);
    vec4 pos = texture2D(tPositions, vUv);

    float dist = distance(oPos.xyz, pos.xyz);

    if(dist > 150.0)
    {
        pos = oPos;
        pos.a = 0.0;
    }
    else
    {
        pos.xyz += curl(pos.xyz / amplitude) * curlScale;

        if(pos.a < 0.1)
        {
            pos.a += 0.001;
        }
    }

    gl_FragColor = pos;
}