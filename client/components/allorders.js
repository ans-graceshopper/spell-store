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
    const allOrders = this.props.allOrders
    if (!allOrders) return <div>loading...</div>
    if (allOrders.length === 0) return <div>no orders.</div>
    return (
      <div>
        <AdminOrderList allOrders={allOrders} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {allOrders: state.allOrders}
}

const mapDispatch = dispatch => ({
  fetchAllOrders: () => dispatch(getAllOrders()),
})

export default connect(mapState, mapDispatch)(AllOrders)
