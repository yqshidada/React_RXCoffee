import { Component } from 'react'

import './Search.css'

export default class Search extends Component {

  render() {
    return (
      <div className={`search ${this.props.sticky === true ? 'sticky' : ''}`}>
        <div className="search-box">
          <input className="search-ipt" type="text" placeholder="输入商品关键字" />
        </div>
      </div>
    )
  }
}
