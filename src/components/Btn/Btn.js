import { Component } from 'react'

import './Btn.css'

export default class Btn extends Component {

  click() {
    typeof this.props.click === 'function' && this.props.click();
  }

  render() {
    return (
      <button onClick={this.click.bind(this)} className={`rx-btn ${this.props.block === true ? 'block' : ''} ${this.props.round === true ? 'round' : ''} ${this.props.disabled === true ? 'disabled' : ''} ${this.props.outline === true ? 'outline' : ''}`} style={{backgroundColor: this.props.bgColor, color: this.props.color}} disabled={this.props.disabled}>{this.props.children || '按钮'}</button>
    )
  }
}
