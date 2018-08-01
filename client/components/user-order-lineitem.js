import React from 'react'
import {NavLink} from 'react-router-dom'

const OrderLineItem = props => {
  const {order} = props

  return (
    <tr>
      <th scope="row">{order.id}</th>
      <td>{order.status}</td>
      <td>{order.createdAt}</td>
      <td>${order.total / 100}</td>
      <td>
        <NavLink
          className="btn btn-light"
          to={`orders/${order.id}`}
          order={order}
        >
          Details
        </NavLink>
      </td>
      {/* price will be fixed later :)*/}
    </tr>
  )
}

export default OrderLineItem
