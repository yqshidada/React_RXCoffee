import { Component } from 'react'

import './AsideMenuItem.css'

export default class AsideMenuItem extends Component {

  toggleMenuItem() {
    this.props.toggleMenuItem();
  }

  render() {
    return (
      <div onClick={this.toggleMenuItem.bind(this)} className={`aside-menu-item ${this.props.active ? 'active' : ''}`}>{this.props.children}</div>
    )
  }
}
