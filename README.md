# React Theme Switch

A small, self-contained, and accessible component for inverting the theme of React-based interfaces. Uses progressive enhancement to provide a button which flips the theme's colors only where `filter: invert(100%)` is supported. Local storage persists the mode across browsing sessions.

## Install

```sh
npm i react-theme-switch
```

## Import

```js
import ThemeSwitch from 'react-theme-switch';
```

## Include

```jsx
<ThemeSwitch />
```

## Props

Just one optional prop is provided: `preserveRasters`. By default, raster images (images without the SVG extension, as well as videos) get inverted. To preserve them (through reinversion) use the `preserveRasters` Boolean.

```
<ThemeSwitch preserveRasters />
```

## Accessibility

The switch is provided as a screen reader and keyboard accessible `<button>` element and toggles the `aria-expanded` state.
