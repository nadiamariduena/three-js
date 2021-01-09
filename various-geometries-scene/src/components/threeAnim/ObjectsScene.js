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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // basic scene setup --------------------
    //
    //
    //
  };
  // 2
  addCustomSceneObjects = () => {};
  // 3
  startAnimationLoop = () => {};
  //
  //

  /*
  
  
  
  
  
  
  
  
  */
  render() {
    return <h1></h1>;
  }
}

export default ObjsScene;
