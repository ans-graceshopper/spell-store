import React from 'react'

import AdminOrderLineItem from './admin-order-lineitem'

const AdminOrderList = props => {
  const {allOrders} = props || []
  return (
    <div>
      <h2>All Orders</h2>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order Status</th>
            <th scope="col">User</th>
            <th scope="col">Date Placed</th>
            <th scope="col">Order Detail</th>
            <th scope="col">Order Price</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {allOrders.map(order => {
            return <AdminOrderLineItem key={order.id} order={order} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminOrderList
