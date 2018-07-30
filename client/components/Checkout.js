import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const STRIPE_PUBLISHABLE = 'pk_test_jd726hj2UYFG6Wi07cGYVVcz'
const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://spell-binnder.herokuapp.com'
    : 'http://localhost:8080'

const CURRENCY = 'USD'

const fromDollarToCent = amount => amount * 100

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount),
    })
    .then(successPayment)
    .catch(errorPayment)

const Checkout = ({name, description, amount}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
)

export default Checkout
