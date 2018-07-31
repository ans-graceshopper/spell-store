import React, {Component} from 'react'
import {connect} from 'react-redux'
import AdminOrderList from './admin-order-list'
import {getAllOrders} from '../store'

const initialState = {
  orders: [],
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
  fetchAllOrders: () => dispatch(getAllOrders()),
})

export default connect(mapState, mapDispatch)(AllOrders)
