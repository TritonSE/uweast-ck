// 1. Set up your server to make calls to PayPal

// 1a. Import the SDK package
const paypal = require('@paypal/checkout-server-sdk');

// 1b. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
/**
 *
 * PayPal HTTP client dependency
 */
const payPalClient = require('../payPalClient');

function calculateSubtotal(array) {
  let subtotal = 0.0;
  for (const element in array.cart) {
    const item = array.cart[element];
    subtotal += item.quantity * item.price;
  }
  return subtotal;
}

function calculateTax(subtotal) {
  return parseFloat((0.08 * subtotal).toFixed(2)); // CA tax is 8%
}

function calculateTotal(subtotal) {
  return (subtotal + parseFloat(calculateTax(subtotal))).toFixed(2); // CA tax is 8%
}


// 2. Set up your server to receive a call from the client
module.exports = async function handleRequest(req, res) {
  // 3. Call PayPal to set up a transaction
  const subtotal = calculateSubtotal(req.cookies);
  const total = calculateTotal(subtotal);
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: total,
      },
    }],
  });

  let order;
  try {
    order = await payPalClient.client().execute(request);
  } catch (err) {
    // 4. Handle any errors from the call
    console.error(err);
    return res.send(500);
  }
  // 5. Return a successful response to the client with the order ID
  res.status(200).json({
    orderID: order.result.id,
    items: req.cookies,
    subtotal,
    tax: calculateTax(subtotal),
    total,
  });
};
