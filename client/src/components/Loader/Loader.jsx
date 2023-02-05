import React from "react";
import ColorRing from "react-loader-spinner/dist/loader/ColorRing";

const Loader = ({ render = true, height = "100", width = "100", colors = ["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"], wrapperClass = "blocks-wrapper", inLineStyle = {} }) => {
  return (
    <div className="text-center">
      <ColorRing
        visible={render}
        height={height}
        width={width}
        ariaLabel="blocks-loading"
        wrapperStyle={ typeof inLineStyle === 'object' ? inLineStyle : {}}
        wrapperClass={wrapperClass}
        colors={colors}
      />
    </div>
  );
};

export default Loader;
