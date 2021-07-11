import { Component } from 'react'

import './ActionBar.css'

export default class ActionBar extends Component {

  constructor() {
    super();

    this.state = {
      //控制徽章的抖动效果
      isAdd: false
    };
  }

  //收藏
  like() {
    typeof this.props.like === 'function' && this.props.like();
  }

  //加入购物袋
  add() {
    
    typeof this.props.add === 'function' && this.props.add();

    this.setState({
      isAdd: true
    })

    setTimeout(() => {
      this.setState({
        isAdd: false
      })
    }, 400)
  }

  render() {
    return (
      <div className="action-bar">
        <div className="action-bar-btn">
          <div className="action-bat-btn-item">
            <div className="action-bar-icon"></div>
            <div className="action-bar-text">购物袋</div>
            <div className={`badge ${this.props.badge <= 0 ? 'none': ''} ${this.state.isAdd ? 'shake' : ''}`}>{this.props.badge > 99 ? '99+' : this.props.badge}</div>
          </div>
          <div className={`action-bat-btn-item ${this.props.isLike === true ? 'active' : ''}`} onClick={this.like.bind(this)}>
            <div className="action-bar-icon"></div>
            <div className="action-bar-text">收藏</div>
          </div>
        </div>
        <div className="btns-box">
          <div className="btn-box add-shopbag" onClick={this.add.bind(this)}>加入购物袋</div>
          <div className="btn-box buy">立即购买</div>
        </div>
      </div>
    )
  }
}
