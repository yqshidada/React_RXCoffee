import { Component } from 'react'

import './Stepper.css'

export default class Stepper extends Component {
  constructor() {
    super();
    this.state = {
      count: 1
    }
  }

  //点击修改数量
  clickUpdateValue(e) {
    let value = Number(e.target.dataset.value);
    let count = this.state.count + value;
    if (count <= 0) {
      return;
    }

    this.setState({
      count
    })

    typeof this.props.sendCount === 'function' && this.props.sendCount(count);
  }

  //修改数量
  updateValue(e) {
    let value = parseInt(e.target.value);
    // console.log('value ==> ', value);
    if (Number.isNaN(value) || value === 0) {
      value = 1;
    }

    this.setState({
      count: value
    })

    typeof this.props.sendCount === 'function' && this.props.sendCount(value);
  }

  render() {
    return (
      <div className="stepper">
        <div className="stepper-btn" data-value="-1" onClick={this.clickUpdateValue.bind(this)}></div>
        <div className="stepper-count">
          <input className="stepper-ipt" type="text" value={this.state.count} onChange={this.updateValue.bind(this)} />
        </div>
        <div className="stepper-btn" data-value="1" onClick={this.clickUpdateValue.bind(this)}></div>
      </div>
    )
  }
}
