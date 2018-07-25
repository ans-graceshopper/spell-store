import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getCart } from '../store';
import LineItem from './lineItem'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const cart = this.props.cart

    return (
      <div>
        <h2>My Cart</h2>
        {
          cart ? cart.map(spell => <LineItem key={spell.id} spell={spell} />) : <h3>Your cart is empty</h3>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
