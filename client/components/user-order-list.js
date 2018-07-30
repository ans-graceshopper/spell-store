import React from 'react'

import OrderLineItem from './user-order-lineitem'
//import {showOrder} from '../store'

const OrderList = props => {
  const orders = props.orders
  if (!orders) return <h2>You have no previous orders.</h2>
  return (
    <div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order Status</th>
            <th scope="col">Date Placed</th>
            <th scope="col">Order Detail</th>
            <th scope="col">Order Price</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            return <OrderLineItem key={order.id} order={order} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList
