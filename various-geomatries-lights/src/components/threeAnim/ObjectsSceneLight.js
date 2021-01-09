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
      75, // fov = field of view
      window.innerWidth / window.innerHeight, // aspect ratio
      1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 6;

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
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff4b00 });
    // you need to add these 2 inside the this.cube() below
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    //  cube position
    this.cube.position.x = -6;
    this.cube.position.y = 2;
    this.cube.position.z = -6;

    // with this you add the cube to the scene
    this.scene.add(this.cube);

    //
    //--------------------------
    // Add SPHERE
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x006bff });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    //  ball position
    this.sphere.position.x = 2; //left - right - horizontal
    this.sphere.position.y = 0; //top - bottom - vertical
    this.sphere.position.z = -5; // diagonal
    // with this you add the cube to the scene
    this.scene.add(this.sphere);
    //
    //
    //
    //
    // Add PLANE
    const planeGeometry = new THREE.PlaneGeometry(25, 20, 50, 50);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffc79a });
    // var planeMaterial = new THREE.MeshLambertMaterial((color: 0xff0000));
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
    //
    // Since the flat ground is added to the front by default, it needs to be rotated
    this.plane.rotation.x = -0.5 * Math.PI;
    //
    this.plane.position.y = -2;

    //
    //
    this.scene.add(this.plane);

    // LIGHTS
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 10, 0);
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);
  };

  //
  //
  // 3
  startAnimationLoop = () => {
    this.renderer.render(this.scene, this.camera);
  };
  //
  //

  //
  //
  //
  //
  render() {
    return <div ref={(ref) => (this.elObj = ref)}></div>;
  }
}

export default ObjsScene;
