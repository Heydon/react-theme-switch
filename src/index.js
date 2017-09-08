import React, { Component } from 'react';

class ThemeSwitch extends Component {
  constructor(props) {
    super(props);

    this.store = typeof localStorage === 'undefined' ? null : localStorage;

    this.css = `
      html { filter: invert(100%); background: #fefefe; }
      * { background-color: inherit }
      ${this.props.preserveRasters === 'true' ? `img:not([src*=".svg"]), [style*="url("] { filter: invert(100%) }` : ``}`;

    this.state = {
      active: 'false',
      supported: true
    };

    this.toggle = this.toggle.bind(this);
  }

  invertSupported (property, value) {
    var prop = property + ':',
        el = document.createElement('test'),
        mStyle = el.style;
    el.style.cssText = prop + value;
    return mStyle[property];
  }

  isActive() {
    return this.state.active === 'true';
  }

  toggle() {
    this.setState({
      active: this.isActive() ? 'false' : 'true'
    });
  }

  componentDidMount() {
    if (this.store) {
      this.setState({
        supported: this.invertSupported('filter', 'invert(100%)'),
        active: this.store.getItem('ThemeSwitch') || 'false'
      });
    }
  }

  componentDidUpdate() {
    if (this.store) {
      this.store.setItem('ThemeSwitch', this.state.active);
    }
  }

  render() {
    return (
      <div>
        {
          (this.state.supported)
          ? <div>
              <button aria-pressed={this.isActive() ? 'true' : 'false'} onClick={this.toggle}>
                inverted theme: <span aria-hidden="true">{this.isActive() ? 'on' : 'off'}</span>
              </button>
              <style media={this.isActive() ? 'screen' : 'none'}>
                {this.isActive() ? this.css.trim() : this.css}
              </style>
            </div>
          : ''
        }
      </div>
    );
  }
}

ThemeSwitch.defaultProps = { preserveRasters: 'true' }

export default ThemeSwitch;
