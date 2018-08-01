import React from 'react'

import OrderLineItem from './user-order-lineitem'

const OrderList = props => {
  const orders = props.orders.filter(order => !order.isCart)
  if (!orders) return <div>Loading...</div>
  if (orders.length === 0) return <h3>You have no previous orders.</h3>
  return (
    <div>
      <h2>Your Order History</h2>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order Status</th>
            <th scope="col">Date Placed</th>
            <th scope="col">Order Price</th>
            <th scope="col">Order Details</th>
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
