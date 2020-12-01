const express = require("express");
const app = express();
const midtransClient = require("midtrans-client");
const { DateTime } = require("luxon");
require("dotenv/config");
const { response } = require("../helpers");

module.exports = {
  pay: async function (req, res) {
    const { id, name, email, phone } = req.token;
    const amount = req.body.amount;

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
        // first_name: "budi",
        // email: "budi.pra@example.com",
        // phone: "08111222333",
      },
    };
    snap.createTransaction(parameter).then((transaction) => {
      let transactionToken = transaction.token;
      if (transactionToken) {
        response(res, 200, transaction);
      } else {
        response(res, 400, { message: "payment failed" });
      }
      // console.log("transactionToken:", transactionToken);
      // console.log(transaction);
    });
  },
};
