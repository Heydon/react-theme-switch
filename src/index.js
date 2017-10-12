import React, { Component } from 'react';

class ThemeSwitch extends Component {
  constructor(props) {
    super(props);

    this.css = `
      html { filter: invert(100%); background: #fefefe; }
      * { background-color: inherit }
    `;

    if (this.props.preserveRasters) {
      this.css += 'img:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }';
    }

    this.supported = this.isDeclarationSupported('filter', 'invert(100%)');

    this.state = {
      active: this.getStoredValue()
    };

    this.toggle = this.toggle.bind(this);
  }

  getStoredValue() {
    try {
      return this.props.store.getItem(this.props.storeKey)
    } catch (error) {
      return false
    }
  }

  isDeclarationSupported(property, value) {
    var prop = property + ':',
        el = document.createElement('test'),
        mStyle = el.style;
    el.style.cssText = prop + value;
    return mStyle[property];
  }

  toggle() {
    this.setState({
      active: !this.state.active
    }, this.updateStore);
  }

  updateStore() {
    if (this.props.store) {
      this.props.store.setItem(this.props.storeKey, this.state.active);
    }
  }

  render() {
    if (!this.supported) {
      return null;
    }

    return (
      <div>
        <button aria-pressed={this.state.active} onClick={this.toggle}>
          inverted theme: <span aria-hidden="true">{this.state.active ? 'on' : 'off'}</span>
        </button>
        <style media={this.state.active ? 'screen' : 'none'}>
          {this.state.active ? this.css.trim() : this.css}
        </style>
      </div>
    );
  }
}

ThemeSwitch.defaultProps = {
  preserveRasters: true,
  store: localStorage,
  storeKey: 'ThemeSwitch'
}

export default ThemeSwitch;
