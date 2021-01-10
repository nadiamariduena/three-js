import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//
//
const style = {
  height: 550, // we can control scene size by setting container dimensions
};

//
class ObjsScene extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();

    window.addEventListener("resize", this.handleWindowResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }
  // 1
  sceneSetup = () => {
    const width = this.elo.clientWidth;
    const height = this.elo.clientHeight;
    //
    //
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      65, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    //
    //
    //
    //
    this.camera.position.z = 5; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.elo);

    //
    //
    //
    //
    //

    this.renderer = new THREE.WebGLRenderer({
      // set the transparency of the scene, otherwise its black
      alpha: true,
      // will make the edges smooth
      antialias: true,
    });
    this.renderer.setSize(width, height);
    // here you append it to the jsx
    this.renderer.shadowMap.enabled = true;
    this.elo.appendChild(this.renderer.domElement); // mount using React ref
  };
  // 2
  addCustomSceneObjects = () => {
    // Add CUBE
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.cube.position.x = -2; //left - right - horizontal
    this.cube.position.y = 0; //top - bottom - vertical
    this.cube.position.z = -1; // diagonal
    //
    //
    //
    this.cube.castShadow = true;
    //
    this.scene.add(this.cube);
    // HIDE 1
    // const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshPhongMaterial({
    //   emissive: 0x072534,
    //   side: THREE.DoubleSide,
    //   flatShading: true,
    // });
    // this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);
    // Add SPHERE
    const sphereGeometry = new THREE.SphereGeometry(1.2, 42, 42);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xff5733 });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    //  ball position
    this.sphere.position.x = 2.6; //left - right - horizontal
    this.sphere.position.y = 0; //top - bottom - vertical
    this.sphere.position.z = 0; // diagonal
    //
    //
    this.sphere.castShadow = true;
    //
    // with this you add the cube to the scene
    this.scene.add(this.sphere);
    //
    //
    //
    //
    //
    //
    // Add PLANE  w , h , segments
    const planeGeometry = new THREE.PlaneGeometry(15, 15, 55, 15);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xdddddd,
      wireframe: true,
    });
    // var planeMaterial = new THREE.MeshLambertMaterial((color: 0xff0000));
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
    //
    this.plane.rotation.x = -0.5 * Math.PI;
    this.plane.position.y = -2;
    //
    //
    // *** RECEIVE SHADOW
    // related to the light and the shadow
    this.plane.receiveShadow = true;
    //
    //
    this.scene.add(this.plane);

    //
    //
    //
    //
    //
    // LIGHTS FF5733
    // With the light you can see the colors you added to each geometry in the materials
    this.spotLight = new THREE.SpotLight(0xffffff);
    // spotLight.position.set( 0 , 10 , 0 );  original
    this.spotLight.position.set(2, 20, 6); //x, y , z
    // (2, 32, 32); with this settings the light will be on the front
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);
    //
  };
  // 3
  startAnimationLoop = () => {
    // HIDE 2
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    // DONT HIDE
    this.renderer.render(this.scene, this.camera);
    //
    // HIDE 3 this is what makes the cube rotate
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };
  //
  //
  handleWindowResize = () => {
    const width = this.elo.clientWidth;
    const height = this.elo.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };
  //
  //
  render() {
    return (
      <div className="cubeLight-wrapper">
        <div
          className="CubeLight"
          style={style}
          ref={(ref) => (this.elo = ref)}
        ></div>
      </div>
    );
  }
}

export default ObjsScene;
