import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getOrderSpells, getOrder} from '../store'

class OrderDetail extends Component {
  componentDidMount() {
    this.props.fetchOrderSpells(this.props.match.params.id)
    //this.props.fetchCurrentOrder(this.props.match.params.id)
  }
  render() {
    if (!this.props.orderSpells) return <div>no spells.</div>
    return (
      <div>
        <h3>Order Details</h3>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Spell</th>
              <th>Description</th>
              <th>Skill Level</th>
              <th>School of Magic</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tfoot className="thead-light">
            <tr>
              <td>TOTAL: ??? </td>
            </tr>
          </tfoot>

          <tbody>
            {this.props.orderSpells.map(spell => {
              return (
                <tr key={spell.id}>
                  <td>
                    <NavLink to={`/spells/${spell.id}`}>{spell.title}</NavLink>
                  </td>
                  <td>{spell.description}</td>
                  <td>{spell.skill_level}</td>
                  <td>{spell.magic_school}</td>
                  <td>{spell.spellorders.quantity}</td>
                  <td>${spell.spellorders.price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => ({
  orderSpells: state.orderSpells,
  //orderTotal: state.orders.currentOrder.total,
})

const mapDispatch = dispatch => ({
  fetchOrderSpells: id => dispatch(getOrderSpells(id)),
  //fetchCurrentOrder: id => dispatch(getOrder(id)),
})

export default connect(mapState, mapDispatch)(OrderDetail)