import React, {Component} from 'react'
import {connect} from 'react-redux'
import AdminOrderList from './user-order-list'
import {getOrders} from '../store'

const initialState = {
  ordersrders: [],
}

class AllOrders extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    const orders = this.props.orders
    if (!orders) return <div>no orders.</div>
    return (
      <div>
        <AdminOrderList orders={orders} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {orders: state.orders}
}

const mapDispatch = dispatch => ({
  fetchOrders: () => dispatch(getOrders()),
})

export default connect(mapState, mapDispatch)(AllOrders)
