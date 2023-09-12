import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';
const orderRouter = express.Router();
import stripe from 'stripe';
const stripeInstance = stripe('sk_test_51No358SBlqRBJ50EkS4Mliw5OPsiOzdapFb0Ib9WdRIaSGbUHqSVGDRpdfSkTJlcUKFTYGDHTCjDsOQYilbJQhqH004R23FAes');


orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);


orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body.orderItems);
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    
    const order = await newOrder.save();
    
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

  orderRouter.put(
    '/:id/:payId',
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.params.payId,
          status: 'success',
          update_time: Date.now(),
        };
  
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );
  

  orderRouter.post('/create-intent/:id', expressAsyncHandler(async (req, res) => {
    console.log("heeeeee");
    const order = await Order.findById(req.params.id);
    console.log(order.shippingAddress.fullName);
    console.log(order.shippingAddress.address);
    console.log(order.shippingAddress.postalCode);
    console.log(order.shippingAddress.city);
    console.log(order.shippingAddress.country);
    try {
      // Create a PaymentIntent using the Stripe API
      const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: order.totalPrice, // The amount in cents
        currency: 'usd',
        description: 'ho ho ho',
        shipping: {
          name: order.shippingAddress.fullName,
          address: {
            line1: order.shippingAddress.address,
            postal_code: order.shippingAddress.postalCode,
            city: order.shippingAddress.city,
            state: order.shippingAddress.city,
            country: order.shippingAddress.country,
          },
        },
        // Add any other required parameters
      });
  
      // Send the PaymentIntent client_secret as a JSON response
      res.json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the PaymentIntent.' });
    }
  }));

  orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      console.log(req.body.orderItems);
      const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      
      const order = await newOrder.save();
      
      res.status(201).send({ message: 'New Order Created', order });
    })
  );

export default orderRouter;