## VARIOUS GEOMETRIES (inside a scene) 🌵

#### In this project I am going to add different objects on a PLANE geometry, to make some sort of basic landscape.

- IF YOU HAVE BEEN LEARNING reactVR or React lately, adding a scene from scratch can be confusing.
  <br>

- The scene is the black stuff where you are going to add the geometries(cubes etc)

<br>

[<img src="/src/images/the-scene.png"/>]()

<br>
<br>

## STARTING FROM SCRATCH 🏖️

### Basic sceneSetup()

```javascript
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

  render() {
    return <h1></h1>;
  }
}

export default ObjsScene;
```

<br>

### WHERE the code will be shown ⬇️

##### JSX

```javascript
  render() {
    //           **   HERE   **
    return <h1>hello scene</h1>;
    //           **   HERE   **
    /*
    I DELETED THE H1 just to see if it would work without it, but i got an error. */
  }
}

export default ObjsScene;

```

[<img   src="/src/images/air-fifth-element-broken.gif"/>]()

<br>

- if you dont add a h1 inside what would be the scene, it will launch an error

<br>

##### THE ERROR I GOT ⚠️

```javascript
Error: ObjsScene(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.
▶ 19 stack frames were collapsed.
```

##### OBVIOUSLY you cannot create a "scene" out of thin air, you need to "return" at least something to contain it, can be an empty div,h1,span etc...i will add a div

[<img src="/src/images/air-fifth-element.gif"/>]()

#### SOME CHANGES

- Change the following:

```javascript
// From this
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// To this

this.renderer = new THREE.WebGLRenderer();
this.renderer.setSize(window.innerWidth, window.innerHeight);
this.elObj.appendChild(this.renderer.domElement);
/* then after changing that,go to the JSX and add the "Ref"


//
this.elObj *** IMPORTANT!!!
If you have several projects, try to custom the ref , dont use an this.el for all because you will have some issues, try to add this.elObjCube etc etc


*/
//  if you dont add the ref here below, there will not be connection to the DOM and you will not see anything.
  render() {
    return <div ref={(ref) => (this.elObj = ref)}></div>;
  }
}
```

<br>

#### TO VISUALIZE THE OBJECT we are creating 🌵

##### ADD the following

- 1\_ Add this to the "sceneSetup":

  > **this.camera.position.z = 5;**

- 2\_ Add this to the "startAnimationLoop":

  > **this.renderer.render(this.scene, this.camera);**

- 3\_ Add the CUBE to the "addCustomSceneObjects":

###### ADD THE **CUBE** to have something to visualize 🔲

```javascript
// 2

addCustomSceneObjects = () => {
  // ------- the cube ---------
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshNormalMaterial();
  // you need to add these 2 inside the this.cube() below
  this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // with this you add the cube to the scene
  this.scene.add(this.cube);
  // ----------- the cube -------
};
//
//
// 3
startAnimationLoop = () => {
  /*without this you cannot visualize the cubes, 
     planes or whatever you create, even if they are added to the scene */
  this.renderer.render(this.scene, this.camera);
};
```

<br>

#### ADD THE SPHERE 🌞

```javascript
addCustomSceneObjects = () => {
  //
  // Add CUBE
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshNormalMaterial();
  // you need to add these 2 inside the this.cube() below
  this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // with this you add the cube to the scene
  this.scene.add(this.cube);

  //
  //--------------------------
  // Add SPHERE
  const sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
  const sphereMaterial = new THREE.MeshNormalMaterial();
  this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // with this you add the cube to the scene
  this.scene.add(this.sphere);
};
```

#### AT this point you will not see anything because the cube is on top of the sphere, and that is because we didn't add the "position" to the 2 objects.

[<img src="/src/images/cube_sphere-scene-integration.gif"/>]()
