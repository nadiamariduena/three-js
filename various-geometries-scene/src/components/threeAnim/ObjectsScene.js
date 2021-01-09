import React, { Component } from "react";
import * as THREE from "three";
//
//
//
class ObjsScene extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
  }
  // 1
  sceneSetup = () => {
    //
    // basic scene setup --------------------
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.elObj.appendChild(this.renderer.domElement); // mount using React ref
    // basic scene setup --------------------
    //
    //
    //
  };
  // 2
  addCustomSceneObjects = () => {
    //
    // Add CUBE
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshNormalMaterial();
    // you need to add these 2 inside the this.cube() below
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    //  cube position
    this.cube.position.x = -6;
    this.cube.position.y = -6;
    this.cube.position.z = 0;

    // with this you add the cube to the scene
    this.scene.add(this.cube);

    //
    //--------------------------
    // Add SPHERE
    const sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
    const sphereMaterial = new THREE.MeshNormalMaterial();
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    //  ball position
    this.sphere.position.x = 6;
    this.sphere.position.y = -6;
    this.sphere.position.z = 0;
    // with this you add the cube to the scene
    this.scene.add(this.sphere);
  };

  //
  //
  // 3
  startAnimationLoop = () => {
    this.renderer.render(this.scene, this.camera);
  };
  //
  //

  render() {
    return <div ref={(ref) => (this.elObj = ref)}></div>;
  }
}

export default ObjsScene;
