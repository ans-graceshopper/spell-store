import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeFromCart, addToCart} from '../store'

class LineItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.spell.spellorders.quantity,
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addSpellToCart(this.props.spell, this.state.quantity)
  }

  render() {
    const {spell, removeSpell} = this.props

    return (
      <div>
        <h3>{spell.title}</h3>
        <p>Quantity: {spell.spellorders.quantity}</p>
        <p>Price: ${spell.spellorders.price / 100}</p>
        <button onClick={() => removeSpell(spell)}>Remove</button>
        <form onSubmit={this.handleSubmit}>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
          <select
            onChange={this.handleChange}
            name="quantity"
            value={this.state.quantity}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removeSpell: spell => dispatch(removeFromCart(spell)),
  addSpellToCart: (spell, quantity) => dispatch(addToCart(spell, quantity)),
})

export default connect(null, mapDispatchToProps)(LineItem)
