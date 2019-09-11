import React, { Fragment, useRef, useEffect, useState } from 'react';

const ThemeSwitch = ({ preserveRasters = true, storeKey = 'ThemeSwitch' }) => {
  const cssString = `
        html { filter: invert(100%); background: #fefefe; }
        * { background-color: inherit }
      `;
  const rasterCss =
    'img:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }';

  const isDeclarationSupported = (property, value) => {
    const prop = property + ':',
      el = document.createElement('test'),
      mStyle = el.style;
    el.style.cssText = prop + value;
    return mStyle[property];
  };

  const supported = useRef(!!isDeclarationSupported('filter', 'invert(100%)'));

  const [css, setCss] = useState(cssString);
  const [active, setActive] = useState(
    localStorage.getItem(storeKey) === 'true' || (!localStorage.getItem(storeKey) && matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (preserveRasters) {
      setCss(`${cssString} ${rasterCss}`);
    }
    return () => {
      setCss(cssString);
    };
  }, [preserveRasters]);

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
          Inverted theme:{' '}
          <span aria-hidden="true">{active ? 'On' : 'Off'}</span>
        </button>
        <style media={active ? 'screen' : 'none'}>
          {active ? css.trim() : css}
        </style>
      </Fragment>
    )
  );
};

export default ThemeSwitch;