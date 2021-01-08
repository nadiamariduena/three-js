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
    const width = this.element.clientWidth;
    const height = this.element.clientHeight;
    //
    //
    //
    //
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      85, // fov = field of view
      width / height, // aspect ratio
      0.2, // near plane
      1000 // far plane
    );
    //
    //
    // 6  ******
    //
    this.camera.position.z = 4; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.element);
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
    this.element.appendChild(this.renderer.domElement); // mount using React ref
  };
  /*
 
                3
 
 
 */
  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    const geometry = new THREE.PlaneGeometry(8, 4, 50, 20);
    //-- extra , related to material
    const loader = new THREE.TextureLoader();
    // const material = new THREE.MeshPhongMaterial({
    //   //   color: 0x156289,
    //   emissive: 0x072534,
    //   side: THREE.DoubleSide,
    //   flatShading: true,
    //   // color: 0x00ff00,

    //   // KEEP IN MIND that its grabbing images from the public/images folder not the src
    // });

    //
    const material = new THREE.MeshBasicMaterial({
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,

      //   color: 0x00ff00,
      map: loader.load("/images/po1_meyokosite.jpg"),
      // KEEP IN MIND that its grabbing images from the public/images folder not the src

      //  antialias, this will smooth the edges of the cube
    });
    //
    //
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 50);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);

    // so that i can use it everywhere than just this scope
    this.clock = new THREE.Clock();
    this.cube.rotation.set(-0.2, -0.6, -0.1);
  };

  /*
 
                4
 
 
 */

  startAnimationLoop = () => {
    this.t_timeClock = this.clock.getElapsedTime();
    //
    //
    this.cube.geometry.vertices.forEach((dots_vertices) => {
      const waveX1 = 0.1 * Math.sin(dots_vertices.x * 2 + this.t_timeClock);
      const waveX2 =
        0.15 * Math.sin(dots_vertices.x * 3 + this.t_timeClock * 2);
      dots_vertices.z = waveX1 + waveX2;
    });
    // // its going to wave the flag smoothly
    this.cube.geometry.verticesNeedUpdate = true;
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

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
    const width = this.element.clientWidth;
    const height = this.element.clientHeight;

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
      <div className="flagZoom-wrapper">
        <div className="flagZoom-child">
          <div
            className="flagZoomBox"
            style={style}
            ref={(ref) => (this.element = ref)}
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
