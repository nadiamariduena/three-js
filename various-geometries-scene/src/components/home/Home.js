import React from "react";
import { Link } from "react-router-dom";
//
import ObjsScene from "../threeAnim/ObjectsScene";
// import FlagZoom from "../threeAnim/FlagZoom";
//  you only need to import the cube here and then add it to the jsx area
//
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <ObjsScene />;
  }
}

export default Home;

/*



 render() {
    return (
      <header className="header-container">
        <nav>
          <li>
            <Link className="cube1 linnko" to="/about">
              CUBE 1
            </Link>
          </li>

          <li>
            <Link className="cube2 linnko" to="/about">
              CUBE 2
            </Link>
          </li>

          <li>
            <Link className="cube3 linnko" to="/about">
              CUBE 3
            </Link>
          </li>

          <li>
            <Link className="cube4 linnko" to="/about">
              CUBE 4
            </Link>
          </li>
        </nav>
 

        <FlagZoom />

        <h2 className="texto-dos">VOX ANON</h2>
      </header>
    );
  }





*/
