import React, { Component } from "react";
import * as THREE from "three";

class FlagOne extends Component {
  componentDidMount() {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector(".diagramFlag canvas"),
    });
    //
    //
    // good
    const camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
    // good
    camera.position.z = 3.5;
    // good
    const scene = new THREE.Scene();
    // good
    const geometry = new THREE.PlaneGeometry(7, 3, 50, 30);
    //-- extra , related to material
    const loader = new THREE.TextureLoader();
    //
    // good
    const material = new THREE.MeshBasicMaterial({
      // color: 0x00ff00,
      map: loader.load("/images/po1_meyokosite.jpg"),
      // KEEP IN MIND that its grabbing images from the public/images folder not the src
    });
    // cube / mesh good
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    //
    // new rotation
    cube.rotation.set(-0.1, -0.4, 0);
    // x direction y direction and z

    //
    function resizeCanvasToDisplaySize() {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        // you must pass false here or three.js sadly fights the browser
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // set render target sizes here
      }
    }
    //
    const clock = new THREE.Clock();
    //
    function animate() {
      const t_timeClock = clock.getElapsedTime();

      resizeCanvasToDisplaySize();

      cube.geometry.vertices.forEach((dots_vertices) => {
        const waveX1 = 0.1 * Math.sin(dots_vertices.x * 2 + t_timeClock);
        const waveX2 = 0.15 * Math.sin(dots_vertices.x * 3 + t_timeClock * 2);
        dots_vertices.z = waveX1 + waveX2;
      });
      // // its going to wave the flag smoothly
      cube.geometry.verticesNeedUpdate = true;
      //
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  render() {
    return (
      <div className="box-animationFlag">
        <div className="diagramFlag">
          <canvas></canvas>
        </div>
      </div>
    );
  }
}

export default FlagOne;

// https://medium.com/@hiteshkrsahu/three-js-scene-as-a-react-component-c83cc00f8a4a
