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
        return total + +sp.spellorders.quantity * sp.spellorders.price
      }, 0)
      displaySubtotal = subtotal / 100
    }
    return (
      <div>
        <h2>My Cart</h2>
        <div>
          {cart.spells && cart.spells.length ? (
            <div>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Spell Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Update</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.spells.map(spell => (
                    <LineItem key={spell.id} spell={spell} />
                  ))}
                </tbody>
              </table>
              <div>
                <p>Subtotal: ${displaySubtotal}</p>
                {this.state.showCheckout ? (
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.setState({showCheckout: false})}
                    >
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
                  <button
                    className="btn btn-success"
                    onClick={() => this.setState({showCheckout: true})}
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p>Your cart is empty</p>
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
