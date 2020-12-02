const express = require("express");
const app = express();
const midtransClient = require("midtrans-client");
const { DateTime } = require("luxon");
require("dotenv/config");
const { response } = require("../helpers");
const { payBooking } = require('../models/booking')
const admin = require('firebase-admin')
const { createNotification } = require('../models/notification')

module.exports = {
  pay: async function (req, res) {
    const { id, name, email, phone, device_token } = req.token;
    const { amount, book_id} = req.body;

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVERKEY,
    });
    let parameter = {
      transaction_details: {
        order_id: `ankas-${id}-${DateTime.local()}`,
        gross_amount: amount,
        // order_id: `ankas-${id}-${DateTime.local()}`,
        // gross_amount: 10000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: name,
        email: email,
        phone: phone,
      },
    };
    snap.createTransaction(parameter).then(async(transaction) => {
      let transactionToken = transaction.token;
      if (transactionToken) {
        response(res, 200, transaction);
        await payBooking(book_id)
        admin.messaging().sendToDevice(device_token, {
          notification: {
            title: 'Payment Success',
            description: `Order has been successfull with booking id ${book_id}`
          }
        })
        await createNotification({
          tittle: 'Payment Success',
          description: `Order has been successfull with booking id ${book_id}`,
          user_id: id,
          isRead: false
        })
      } else {
        response(res, 400, { message: "payment failed" });
      }
      // console.log("transactionToken:", transactionToken);
      // console.log(transaction);
    });
  },
};
