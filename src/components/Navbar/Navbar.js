import { Component } from 'react'

import './Navbar.css'

export default class Navbar extends Component {

  //点击左边
  clickLeft() {
    typeof this.props.clickLeft === 'function' && this.props.clickLeft();
  }

  //点击右边
  clickRight() {
    typeof this.props.clickRight === 'function' && this.props.clickRight();
  }

  render() {
    return (
      <div className={`navbar ${this.props.sticky === true ? 'sticky' : ''}`}>
        <div className="navbar-back" onClick={this.clickLeft.bind(this)}>{this.props.leftTitle}</div>
        <div className="navbar-title">{this.props.title}</div>
        <div className="navbar-back" onClick={this.clickRight.bind(this)}>{this.props.rightTitle}</div>
      </div>
    )
  }
}
