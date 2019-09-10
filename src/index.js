import React, { Fragment, useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

// Set the strings as global for easier reference in the component.
const cssString = `
      html { filter: invert(100%); background: #fefefe; }
      * { background-color: inherit }
    `;
const rasterCss =
  'img:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }';

// This function does not require any knowledge of the component itself and can
// better be a global or imported function.
const isDeclarationSupported = (property, value) => {
  const prop = property + ":",
    el = document.createElement("test"),
    mStyle = el.style;
  el.style.cssText = prop + value;
  return mStyle[property];
};

// Default props are given in ES6 syntax.
const ThemeSwitch = ({ preserveRasters = true, storeKey = "ThemeSwitch" }) => {
  // The supported flag is only set when the component is instantiated so can be a default value
  // on a ref.
  const supported = useRef(!!isDeclarationSupported("filter", "invert(100%)"));

  // The css value needs to be on state as the useEffect hook takes into account that the
  // preserveRasters prop may change.
  const [css, setCss] = useState(cssString);
  const [active, setActive] = useState(
    localStorage.getItem(storeKey) === "true"
  );

  // If the preserveRasters prop changes, the css state value is reset with the original
  // clean css, after which the check for preserverRasters will be applied again. React
  // will coalesce the state setter calls if required.
  useEffect(() => {
    if (preserveRasters) {
      setCss(`${cssString} ${rasterCss}`);
    }
    return () => {
      setCss(cssString);
    };
  }, [preserveRasters]);

  // This effect hook will update the localstorage value. There should probably
  // be cleanup code if the storeKey prop changes but it is omitted for simplicity.
  useEffect(() => {
    localStorage.setItem(storeKey, active);
  }, [active, storeKey]);

  const toggle = () => {
    setActive(a => !a);
  };

  return (
    supported.current && (
      <Fragment>
        <button aria-pressed={active} onClick={toggle}>
          Inverted theme:{" "}
          <span aria-hidden="true">{active ? "On" : "Off"}</span>
        </button>
        <style media={active ? "screen" : "none"}>
          {active ? css.trim() : css}
        </style>
      </Fragment>
    )
  );
};

ReactDOM.render(<ThemeSwitch />, document.getElementById("root"));
