import React from 'react'

const OrderLineItem = props => {
  const {order} = props

  return (
    <tr
      onClick={() => {
        console.log('user order line-item order: ', order)
        props.handleClick(order)
      }}
    >
      <td>{order.id}</td>
      <td>{order.status}</td>
      <td>{order.createdAt}</td>
      <td>{`${order.spells.length} spells`}</td>
      <td>"$999"</td>
      {/* price will be fixed later :)*/}
      <td>Order total "Over $9000"</td>
    </tr>
  )
}

export default OrderLineItem
