import React from "react";

import CubeOne from "../threeAnim/CubeOne";
import FlagOne from "../threeAnim/FlagOne";
import CubeTwoZoomInOut from "../threeAnim/CubeTwoZoomInOut.js";
import CubeOriginal from "../threeAnim/CubeOriginalZoom";
import FlagZoom from "../threeAnim/FlagZoom";
//
const About = () => {
  return (
    <React.Fragment>
      <CubeOne />
      <FlagOne />
      <CubeTwoZoomInOut />
      <CubeOriginal />
      <FlagZoom />
      {/* <div className="about1">1</div>
      <div className="about2">2</div>
      <div className="about3">3</div>
      <div className="about4">4</div> */}
    </React.Fragment>
  );
};

export default About;
