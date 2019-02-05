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
    this.setState({
      active: localStorage.getItem(this.props.storeKey) === 'true'
    })
  }

  render() {
    const { active } = this.state
    return (
      <div>
        <button
          aria-pressed={this.state.active}
          onClick={this.toggle}
        >
          inverted theme:{" "}
          <span aria-hidden="true">{this.state.active ? "on" : "off"}</span>
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
