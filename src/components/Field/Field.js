import { Component } from 'react'

import './Field.css'

export default class Field extends Component {

  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    if (this.props.value !== undefined) {
      this.setState({
        value: this.props.value
      })
    }
    
  }

  updateValue(e) {
    this.setState({
      value: e.target.value
    })

    this.props.changeValue(e.target.value);
  }

  render() {
    return (
      <div className="field">
        <div className="field-title">{this.props.title}</div>
        <div className="field-ipt">
          <input className="field-input" type={this.props.type || 'text'} placeholder={this.props.placeholder} value={this.state.value} onChange={this.updateValue.bind(this)} />
        </div>
        <div className="field-btn">
          {this.props.rightIcon && <div className="eye" onClick={() => {this.props.clickRightIcon()}}>
              <img className="auto-img" src={this.props.rightIcon} alt=""/>
            </div>}
          {this.props.children}
        </div>
      </div>
    )
  }
}
