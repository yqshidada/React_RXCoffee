import { Component } from 'react'

import './Product.css'

export default class Product extends Component {

  render() {
    return (
      <div className="product">
        <div className="product-img">
          <img className="auto-img" src={this.props.data.smallImg} alt=""/>
        </div>
        <div className="product-zhname one-text">{this.props.data.name}</div>
        <div className="product-enname one-text">{this.props.data.enname}</div>
        <div className="product-price">&yen;{this.props.data.price}</div>
      </div>
    )
  }
}
