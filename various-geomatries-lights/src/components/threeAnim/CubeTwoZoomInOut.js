import React, { Component } from "react";
import * as THREE from "three";
//
//
// 5 ***
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const style = {
  height: 550, // we can control scene size by setting container dimensions
};

// const style = {
//   height: 250, // we can control scene size by setting container dimensions
// };

class CubeTwoZoomInOut extends Component {
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
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;
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
    this.camera.position.z = 2.6; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.el);
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
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };
  /*
 
                3
 
 
 */
  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);

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
    const material = new THREE.MeshFaceMaterial([
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("/images/pol.svg"),
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
      }),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("/images/9.jpg"),
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
      }),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("/images/meyoko_img_welcomehome.jpg"),
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
      }),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("/images/city-camera.jpg"),
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
      }),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("/images/pol.svg"),
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
      }),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("/images/9.jpg"),
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
      }),
    ]);
    //
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
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return (
      <div style={style} className="flagTwo" ref={(ref) => (this.el = ref)} />
    );
  }
}

export default CubeTwoZoomInOut;
//
//
// END OF THE APP COMPONENT

/*



                        **
                        NOTICE

                        in the component below, you have the container,
                        inside of this container you will import the App component
                        that you have in the above code... LOOK UP!

                        The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.


*/

// class Container extends React.Component {
//   state = { isMounted: true };

//   render() {
//     const { isMounted = true } = this.state;
//     return (
//       <>
//         <button
//           onClick={() =>
//             this.setState((state) => ({ isMounted: !state.isMounted }))
//           }
//         >
//           {isMounted ? "Unmount" : "Mount"}
//         </button>
//         {isMounted && <CubeTwoZoomInOut />}
//         {isMounted && <div>Scroll to zoom, drag to rotate</div>}
//       </>
//     );
//   }
// }

// export default Container;

/*

ORIGINAL FROM THIS WEBSITE


https://codeburst.io/react-16-three-js-integration-tips-2019-b6afe19c0b83





import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const style = {
  height: 250 // we can control scene size by setting container dimensions
};

class App extends Component {
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

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 5; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.el);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
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

  startAnimationLoop = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div style={style} ref={ref => (this.el = ref)} />;
  }
}

class Container extends React.Component {
  state = { isMounted: true };

  render() {
    const { isMounted = true } = this.state;
    return (
      <>
        <button
          onClick={() =>
            this.setState(state => ({ isMounted: !state.isMounted }))
          }
        >
          {isMounted ? "Unmount" : "Mount"}
        </button>
        {isMounted && <App />}
        {isMounted && <div>Scroll to zoom, drag to rotate</div>}
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);


*/
