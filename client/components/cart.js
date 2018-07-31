import React, {Component} from 'react'
import Checkout from './Checkout'

import {connect} from 'react-redux'
import {getCart} from '../store'
import LineItem from './lineItem'

class Cart extends Component {
  constructor() {
    super()
    this.state = {checkout: false}
  }
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const cart = this.props.cart
    let subtotal, displaySubtotal
    if (cart.spells) {
      subtotal = cart.spells.reduce((total, sp) => {
        return total + sp.spellorders.quantity * sp.spellorders.price
      }, 0)
      displaySubtotal = subtotal / 100
    }
    return (
      <div>
        <h2>My Cart</h2>
        <div>
          {cart.spells && cart.spells.length ? (
            <div>
              {cart.spells.map(spell => (
                <LineItem key={spell.id} spell={spell} />
              ))}
              <h3>Subtotal: ${displaySubtotal}</h3>
              {this.state.checkout ? (
                <div>
                  <button onClick={() => this.setState({checkout: false})}>
                    Cancel
                  </button>
                  <Checkout
                    name="Purchase your spells"
                    description={`Buy ${
                      cart.spells.length
                    } spell(s) for ${displaySubtotal} USD`}
                    amount={subtotal}
                    metadata={{id: cart.id}}
                  />
                </div>
              ) : (
                <button onClick={() => this.setState({checkout: true})}>
                  Checkout
                </button>
              )}
            </div>
          ) : (
            <h3>Your cart is empty</h3>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
})

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(getCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
