// domain/.netlify/functions/create-payment-intent
//this is node land
require('dotenv').config() //it the env file is in the root no path is needed, if you have it somewhere else include the path inside config()
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET);

exports.handler = async function(event, context) {

  if(event.body) {
    // console.log(event) add items to cart to have data and check the body section, 
    //in StripeCheckout we stringify the data and now we need to parse it to process it
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body)

    const calculateOrderAmount = () => {
      return shipping_fee + total_amount
    }

    try { //this is important is stripe API so respect amount, currency, etc
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(), //payment processor uses cents not dollars
        currency: 'usd'
      })
      return { //this is what I'm sending back to stripe checkout
        statusCode: 200,
        body: JSON.stringify({clientSecret: paymentIntent.client_secret})
      }
    } catch(error) {
      // console.log(error.response) //in axios we need the .response to display the error only for development purposes
    }
  } 

  return {
    statusCode: 200,
    body:'Create Payment Intent',
  }
}