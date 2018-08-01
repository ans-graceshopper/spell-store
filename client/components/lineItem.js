import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {removeFromCart, editCart} from '../store'

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
    this.props.updateSpell(this.props.spell, this.state.quantity)
  }

  render() {
    const {spell, removeSpell} = this.props
    if (!spell || !spell.spellorders) return <div>Loading...</div>
    return (
      <tr>
        <th scope="row">
          <NavLink to={`/spells/${spell.id}`}>{spell.title}</NavLink>
        </th>
        <td>{spell.spellorders.quantity}</td>
        <td>${spell.spellorders.price / 100}</td>
        <td>
          <form onSubmit={this.handleSubmit}>
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
            <button className="btn btn-primary btn-sm" type="submit">
              Update
            </button>
          </form>
        </td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => removeSpell(spell)}
          >
            X
          </button>
        </td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removeSpell: spell => dispatch(removeFromCart(spell)),
  updateSpell: (spell, quantity) => dispatch(editCart(spell, quantity)),
})

export default connect(null, mapDispatchToProps)(LineItem)
