import React from 'react'

import OrderLineItem from './user-order-lineitem'

const OrderList = props => {
  const userOrders = props.userOrders
  if (userOrders.length === 0) return <h2>You have no previous orders.</h2>
  return (
    <div>
      <h2>Order History</h2>
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
          {userOrders.map(order => {
            return <OrderLineItem key={order.id} order={order} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList
