import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const STRIPE_PUBLISHABLE = 'pk_test_jd726hj2UYFG6Wi07cGYVVcz'
const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://spell-binnder.herokuapp.com'
    : 'http://localhost:8080'

const successPayment = data => {
  console.log(data)
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = (amount, description, metadata) => token =>
  axios
    .post('/api/stripe', {
      description,
      source: token.id,
      currency: 'USD',
      amount,
      metadata,
    })
    .then(data => successPayment(data))
    .catch(errorPayment)

const Checkout = ({name, description, amount, metadata}) => (
  <StripeCheckout
    allowRememberMe
    shippingAddress
    billingAddress
    name={name}
    description={description}
    amount={amount}
    token={onToken(amount, description, metadata)}
    currency="USD"
    stripeKey={STRIPE_PUBLISHABLE}
  />
)

export default Checkout
