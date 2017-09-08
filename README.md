# React Theme Switch

A small, self-contained, and accessible component for inverting the theme of React-based interfaces. Uses progressive enhancement to provide a button which flips the theme's colors only where `filter: invert(100%)` is supported. Local storage persists the mode across browsing sessions.

## Install

```
npm i react-theme-switch
```

## Import

```
import ThemeSwitch from 'react-theme-switch';
```

## Include

```
<ThemeSwitch></ThemeSwitch>
```

## Props

Just one optional prop is provided: `preserveRasters`. By default, raster images (images without the SVG extension) are double inverted so they do not become negatives. If you should wish to turn this option off, include the prop with a "false" value like so:

```
<ThemeSwitch preserveRasters="false"></ThemeSwitch>
```

## Accessibility

The switch is provided as a screen reader and keyboard accessible `<button>` element and toggles the `aria-expanded` state.
