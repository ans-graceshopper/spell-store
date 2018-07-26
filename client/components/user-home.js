import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */

const OrderDetails = props => {
  const {spells} = props.order
  if (!spells) return <div />
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Spell</th>
            <th>Spell Description</th>
            <th>Spell Skill Level</th>
            <th>School of Magic</th>
          </tr>
          {spells.map(spell => {
            return (
              <tr key={spell.id}>
                <td>{spell.name}</td>
                <td>{spell.description}</td>
                <td>skill</td>
                <td>school</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const OrderList = props => {
  const {orders} = props
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Order #</th>
            <th>Order Status</th>
            <th>Order Detail</th>
          </tr>

          {props.orders.map(order => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>Order Detail (tbd)</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export const UserHome = props => {
  const {user} = props
  const {orders} = user

  return (
    <div>
      <h3>Welcome, {user.email}!!!!!!</h3>
      <h3>Orders</h3>
      {orders ? (
        <div>
          <OrderList user={user} orders={orders} />
          <OrderDetails order={orders[0]} />
        </div>
      ) : (
        <h3>no orders.</h3>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
