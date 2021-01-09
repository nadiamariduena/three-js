## VARIOUS GEOMETRIES (inside a scene) 🌵

##### In this project I am going to add different objects on a PLANE geometry, to make some sort of basic landscape.

<br>
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

##### OBVIOUSLY you cannot create a "scene" out of thin air, you need to "return" at least something to contain it, can be an empty div,h1,span etc...

[<img src="/src/images/air-fifth-element.gif"/>]()
