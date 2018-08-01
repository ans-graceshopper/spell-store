import React from 'react'
import {NavLink} from 'react-router-dom'

const AdminOrderLineItem = props => {
  const {order} = props
  if (!order) return <div />
  const user = order.user
  console.log(order)
  if (order.length === 0) return <div>no orders.</div>

  return (
    <tr>
      <th scope="row">{order.id}</th>
      <td>{order.status === 'open' ? 'In Cart' : order.status}</td>
      <td>{order.user.email}</td>
      <td>{order.createdAt}</td>
      <td>${order.total / 100}</td>

      <td>
        <NavLink
          className="btn btn-light"
          to={`/orders/${order.id}`}
          order={order}
        >
          Details
        </NavLink>
      </td>
      {/* price will be fixed later :)*/}
    </tr>
  )
}

export default AdminOrderLineItem
