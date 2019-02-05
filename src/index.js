import React, { Component } from 'react'

class ThemeSwitch extends Component {
  constructor(props) {
    super(props)

    this.css = `
      html { filter: invert(100%); background: #fefefe; }
      * { background-color: inherit }
    `

    if (this.props.preserveRasters) {
      this.css +=
        'img:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }'
    }

    this.state = {
      active: 'false'
    }

    this.toggle = this.toggle.bind(this)
  }

  isDeclarationSupported(property, value) {
    var prop = property + ':',
      el = document.createElement('test'),
      mStyle = el.style;
    el.style.cssText = prop + value;
    return mStyle[property];
  }

  toggle() {
    this.setState(
      {
        active: !this.state.active
      },
      () => {
        localStorage.setItem(this.props.storeKey, this.state.active)
      }
    )
  }

  componentDidMount() {
    this.supported = this.isDeclarationSupported('filter', 'invert(100%)');
    this.setState({
      active: localStorage.getItem(this.props.storeKey) === 'true'
    })
  }

  render() {
    if (!this.supported) {
      return null;
    }

    const { active } = this.state
    return (
      <div>
        <button aria-pressed={this.state.active} onClick={this.toggle}>
          Inverted theme:{' '}
          <span aria-hidden='true'>{this.state.active ? 'On' : 'Off'}</span>
        </button>
        <style media={active ? 'screen' : 'none'}>
          {active ? this.css.trim() : this.css}
        </style>
      </div>
    )
  }
}

ThemeSwitch.defaultProps = {
  preserveRasters: true,
  storeKey: 'ThemeSwitch'
}

export default ThemeSwitch