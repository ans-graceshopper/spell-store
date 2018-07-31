import React, {Component} from 'react'
import {connect} from 'react-redux'
import OrderList from './user-order-list'
import {getUserOrders} from '../store'

const initialState = {
  orders: [],
}

class UserOrders extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  componentDidMount() {
    this.props.fetchUserOrders(this.props.user.id)
  }

  render() {
    const orders = this.props.orders
    if (!orders) return <div>no orders.</div>
    return (
      <div>
        <OrderList orders={orders} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {user: state.user, orders: state.orders}
}

const mapDispatch = dispatch => ({
  fetchUserOrders: id => dispatch(getUserOrders(id)),
})

export default connect(mapState, mapDispatch)(UserOrders)
