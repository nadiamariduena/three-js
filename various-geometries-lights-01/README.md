## Various Geometries (Lights 1 part)

#### Find the first project related to this:

[Various Geometries (Lights 0 part)](https://github.com/nadiamariduena/three-js/tree/master/various-geomatries-lights)

<br>

[<img src="./src/images/preview_lights_part0.gif"/>]()
<br>
<br>

👾
👾 👾

- The author of this tutorial is
  [Three.js tutorial (5): light source](https://www.kai666666.top/2020/01/30/Three.js%E6%95%99%E7%A8%8B%EF%BC%885%EF%BC%89%EF%BC%9A%E5%85%89%E6%BA%90/)

👾 👾 👾

<br>
<hr>
<br>
<br>
<br>

## PointLight

- PointLight is a point light source. Just listen to the name. **It is a light source that emits light in all directions**. Point light cannot produce shadows .

We added a point light source in the previous example:

```javascript
// replace the original code
var pointLight = new THREE.PointLight("#ffd200");
scene.add(pointLight);
//
// for this:
//
//---------------------*
//    PointLight
//---------------------*
//
//
this.pointLight = new THREE.PointLight("#ffd200");
this.pointLight.position.y = 200;
this.scene.add(this.pointLight);
```

#### The tutorial I am following is really basic in lights, so i had to do a short research

- I found out you can add different lights (like you do in 3ds max for example) for different angles, also you can handle the intensity and the distance. Unfortunately i didn't find something concrete about the topic.

- This is what i found

```javascript
    //
    //
    //
    this.light = new THREE.PointLight(0xff0000);
    this.light.position.y = 4.5;
    this.scene.add(this.light);
    //
    //
    //---------------------*
    //     spotLight FF5733
    //---------------------*
    //
    //
    // With the light you can see the colors you added to each geometry in the materials
    this.spotLight = new THREE.SpotLight(0xffffff);
    // spotLight.position.set( 0 , 10 , 0 );  original
    this.spotLight.position.set(5, -50, 0); //x, y , z
    // (2, 32, 32); with this settings the light will be on the front
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);
    //
    //
    //
    //---------------------*
    //    PointLight
    //---------------------*
    //
    //
    this.pointLight = new THREE.PointLight(
      "#D100E5",
      (this.intensity = 1.2),
      (this.distance = 500)
    );
    this.pointLight.position.y = 200;
    this.scene.add(this.pointLight);
  };
```

[<img src="./src/images/spotlight_poinlight_light.gif"/>](https://dnassler.wordpress.com/2016/03/22/threejs-with-pointlight-shadows-and-star-sphere/)
