import React, { Component } from 'react';

class ThemeSwitch extends Component {
  constructor(props) {
    super(props);

    this.store = typeof localStorage === 'undefined' ? null : localStorage;

    this.css = `
      html { filter: invert(100%); background: #fefefe; }
      * { background-color: inherit }
    `;

    if (this.props.preserveRasters) {
      this.css += 'img:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }';
    }

    this.supported = this.invertSupported('filter', 'invert(100%)');

    this.state = {
      active: false
    };

    this.toggle = this.toggle.bind(this);
  }

  isDeclarationSupported (property, value) {
    var prop = property + ':',
        el = document.createElement('test'),
        mStyle = el.style;
    el.style.cssText = prop + value;
    return mStyle[property];
  }

  toggle() {
    this.setState({
      active: !this.state.active
    });
  }

  componentDidMount() {
    if (this.store) {
      this.setState({
        supported: this.isDeclarationSupported('filter', 'invert(100%)'),
        active: this.store.getItem('ThemeSwitch') || false
      });
    }
  }

  componentDidUpdate() {
    if (this.store) {
      this.store.setItem(this.props.storeKey, this.state.active);
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

ThemeSwitch.defaultProps = { preserveRasters: true }

export default ThemeSwitch;
