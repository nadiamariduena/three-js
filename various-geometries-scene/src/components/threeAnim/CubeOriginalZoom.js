import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const style = {
  height: 550, // we can control scene size by setting container dimensions
};

class CubeOriginalResponsive extends Component {
  /*
 
                1
 
 
 */
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    //
    //
    //
    // 7  ******
    //
    window.addEventListener("resize", this.handleWindowResize);
  }
  /*
 
                9
 
 
 */
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }
  /*
 
                2
 
 
 */
  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.ele.clientWidth;
    const height = this.ele.clientHeight;
    //
    //
    //
    //
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    //
    //
    // 6  ******
    //
    this.camera.position.z = 5; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls

    this.controls = new OrbitControls(this.camera, this.ele);
    //
    //
    //
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    // here you append it to the jsx
    this.ele.appendChild(this.renderer.domElement); // mount using React ref
  };
  /*
 
                3
 
 
 */
  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);

    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };
  /*
 
                4
 
 
 */

  startAnimationLoop = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };
  /*
 
                8
 
 
 */
  handleWindowResize = () => {
    const width = this.ele.clientWidth;
    const height = this.ele.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    //   With the following code i will link /
    // using ref to the functions inside the component did mount
    // THE SCENE BOX, since i want the cube nested inside some containers i will do the following
    return (
      <div className="CubeOriginalZoom-box1">
        <div className="CubeOrginalZoom-child">
          <div
            className="CubeOriginal"
            style={style}
            ref={(ref) => (this.ele = ref)}
          />
        </div>
      </div>
    );
  }
}
// NOW ADD ANOTHER COMPONENT
class ContainerTwo extends Component {
  state = { isMounted: true };
  render() {
    const { isMounted = true } = this.state;
    return (
      <>
        <div className="button-cube-original-zoom">
          <button
            className="btn-zoom-original"
            onClick={() =>
              this.setState((state) => ({ isMounted: !state.isMounted }))
            }
          >
            {isMounted ? "Unmount" : "Mount"}
          </button>

          {isMounted && <CubeOriginalResponsive />}
          {isMounted && (
            <div className="scroly">
              <p>Scroll to zoom, drag to rotate</p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default ContainerTwo;
// the app here isnt app but CubeOriginalResponsive
