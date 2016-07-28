'use strict';

let scene,
    camera,
    simMesh,
    rtt1,
    rtt2,
    flip = false,
    debugImage,
    mesh;

export default class FBO
{
    constructor({renderer, simulationMaterial, renderMaterial, size = 128, format = THREE.RGBFormat})
    {
        const gl = renderer.getContext();

        if(!gl.getExtension('OES_texture_float'))
        {
            alert('No OES_texture_float support for float textures!');
            return;
        }

        if(gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) === 0)
        {
            alert('No support for vertex shader textures!');
            return;
        }

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);

        const options = {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: format,
            type: THREE.FloatType,
            depth: false,
            stencil: false
        };
        rtt1 = new THREE.WebGLRenderTarget(size, size, options);
        rtt2 = rtt1.clone();

        simMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), simulationMaterial);
        scene.add(simMesh);

        // particles
        const len = size * size;
        const vertices = new Float32Array(len * 3);
        for(let i = 0; i < len; i++)
        {
            vertices[i * 3 + 0] = (i % size) / size;
            vertices[i * 3 + 1] = Math.floor(i / size) / size;
        }

        let geo = new THREE.BufferGeometry();
        geo.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

        mesh = new THREE.Points(geo, renderMaterial);

        this.renderer = renderer;
    }

    update()
    {
        if(flip)
        {
            mesh.material.uniforms.tPositions.value = rtt2.texture;
            this.renderer.render(scene, camera, rtt1, true);
        }
        else
        {
            mesh.material.uniforms.tPositions.value = rtt1.texture;
            this.renderer.render(scene, camera, rtt2, true);
        }

        flip = !flip;
    }

    get mesh()
    {
        return mesh;
    }
}