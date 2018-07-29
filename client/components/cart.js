import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store'
import LineItem from './lineItem'
import {totalmem} from 'os'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  // add to re-render when cart is updated?
  // shouldComponentUpdate(nextProps) {
  // console.log('NEXT PROPS', nextProps.cart)
  // console.log('CURRENT PROPS', this.props.cart)
  // return nextProps.cart !== this.props.cart
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.cart !== this.props.cart) {
  //     this.props.fetchCart()
  //   }
  // }

  render() {
    const cart = this.props.cart
    return (
      <div>
        <h2>My Cart</h2>
        <div>
          {cart.spells.length ? (
            <div>
              {cart.spells.map(spell => (
                <LineItem key={spell.id} spell={spell} />
              ))}
              <h3>
                Subtotal: $
                {cart.spells.reduce((total, sp) => {
                  return total + sp.spellorders.quantity * sp.spellorders.price
                }, 0)}
              </h3>
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
