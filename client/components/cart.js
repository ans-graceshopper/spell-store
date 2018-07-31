import React, {Component} from 'react'
import Checkout from './Checkout'
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux'
import {getCart} from '../store'
import LineItem from './lineItem'

class Cart extends Component {
  constructor() {
    super()
    this.state = {showCheckout: false}
  }
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const cart = this.props.cart
    let subtotal, displaySubtotal
    if (cart.spells && cart.spells[0] && cart.spells[0].spellorders) {
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
              {this.state.showCheckout ? (
                <div>
                  <button onClick={() => this.setState({showCheckout: false})}>
                    Cancel
                  </button>
                  {this.props.user.id ? (
                    <Checkout
                      name="Purchase your spells"
                      description={`Buy ${
                        cart.spells.length
                      } spell(s) for ${displaySubtotal} USD`}
                      amount={subtotal}
                      metadata={{id: cart.id}}
                    />
                  ) : (
                    <NavLink to="/signup">
                      Please sign up to complete your purchase.
                    </NavLink>
                  )}
                </div>
              ) : (
                <button onClick={() => this.setState({showCheckout: true})}>
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
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(getCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
