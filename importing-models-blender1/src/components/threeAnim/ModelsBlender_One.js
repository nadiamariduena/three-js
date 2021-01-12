import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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
  /*
  
  
  
  */
  // 1
  sceneSetup = () => {
    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;
    //

    //
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      65, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );

    this.camera.position.z = 5; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.eleModelBlOne);

    //
    this.renderer = new THREE.WebGLRenderer({
      // set the transparency of the scene, otherwise its black
      alpha: true,
      // will make the edges smooth
      antialias: true,
    });
    this.renderer.setSize(width, height);

    this.renderer.shadowMap.enabled = true;
    // here you append it to the jsx
    this.eleModelBlOne.appendChild(this.renderer.domElement); // mount using React ref
  };
  /*
  
  
  
  */
  // 2
  addCustomSceneObjects = () => {
    // const sphereGeometry = new THREE.SphereGeometry(1.2, 42, 42);
    // const sphereMaterial = new THREE.MeshPhongMaterial({
    //   color: 0xe50042,
    //   shininess: 150,
    // });
    // this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // //  ball position
    // this.sphere.position.x = 2.6; //left - right - horizontal
    // this.sphere.position.y = 0; //top - bottom - vertical
    // this.sphere.position.z = 0; // diagonal
    // //
    // //
    // this.sphere.castShadow = true;
    // //
    // // with this you add the cube to the scene
    // this.scene.add(this.sphere);
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
    this.scene.add(this.plane);
    //
    //

    //
    //---------------------
    //   Directional Light
    //---------------------
    //
    //

    this.directionalLight = new THREE.DirectionalLight("#ffffff");
    this.directionalLight.position.set(0, 0, 0);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 512; // default
    this.directionalLight.shadow.mapSize.height = 512; // default
    this.directionalLight.shadow.camera.near = 0.5;
    this.directionalLight.shadow.camera.far = 1000;
    this.directionalLight.shadow.camera.left = -15;
    this.directionalLight.shadow.camera.right = 15;
    this.directionalLight.shadow.camera.top = 15;
    this.directionalLight.shadow.camera.bottom = -15;

    //
    this.scene.add(this.directionalLight);

    // The light points to the flat ground
    //
    //
    //
    this.directionalLight.target = this.plane;
    //
    //
    const loaderMo = new GLTFLoader();
    loaderMo.load("./images/testo_cube.gltf", (gltf) => {
      gltf.scene.traverse((model) => {
        model.castShadow = true;

        model.position.x = 0;
        model.position.y = 0;
        model.position.z = 0;
        // model.scale.set(1, 1, 1);
        // i will check it later
        // https://stackoverflow.com/questions/24723471/three-js-scale-model-with-scale-set-or-increase-model-size
      });

      this.scene.add(gltf.scene);
    });
  };
  //

  /*
  
  
  
  
  

  
  */

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
  /*
  
  
  
  
  
  
  
  
  
  */
  handleWindowResize = () => {
    const width = this.eleModelBlOne.clientWidth;
    const height = this.eleModelBlOne.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };
  //
  //

  /*
  
  
  
  
  
  
  
  
  
  */
  render() {
    return (
      <div className="modelBleOne-wrapper">
        <div
          className="modelBleOne"
          style={style}
          ref={(ref) => (this.eleModelBlOne = ref)}
        ></div>
      </div>
    );
  }
}

export default ObjsScene;
