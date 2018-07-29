import React from 'react'

import OrderLineItem from './user-order-lineitem'
//import {showOrder} from '../store'

const OrderList = props => {
  const handleClick = props.handleClick

  const orders = props.orders
  if (!orders) return <div>You have no previous orders.</div>
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Order Number</th>
            <th>Status</th>
            <th>Date</th>
            <th>Detail</th>
            <th>Price</th>
          </tr>

          {orders.map(order => {
            return (
              <OrderLineItem
                key={order.id}
                order={order}
                handleClick={handleClick}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList
