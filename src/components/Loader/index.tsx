import React from "react";
import image from "../../assests/loader.gif";
const Loader = () => {
  return (
    <div>
      <img
        src={image}
        alt="loader"
        style={{ height: "100vh", width: "100vw" }}
      />
    </div>
  );
};

export default Loader;
