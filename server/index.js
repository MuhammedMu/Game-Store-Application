const express = require("express");
const cors = require("cors");
// const stripe = require("stripe")(
//   "sk_test_51NslULH42Ru23ju23iL5EnV0CnZpE6PfgKG9nhJ39s6TggkHdepAeqFqoxQShOJ0PFRTkYge5cs4JFu8Aal3gJJx00wNvvG2CB"
// );
const stripe = require("stripe")(
  "sk_test_51NslULH42Ru23ju23iL5EnV0CnZpE6PfgKG9nhJ39s6TggkHdepAeqFqoxQShOJ0PFRTkYge5cs4JFu8Aal3gJJx00wNvvG2CB"
);
// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Checking backend functionality
app.get("/", (req, res) =>
  res.status(200).send("Server is listening on port 3001")
);

app.post("/payment/create", async (req, res) => {
  const { total } = req.query;

  console.log("Total Payment amount: " + total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the payment intent." });
  }
});

// Listening on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // Listening on port 3001
// const PORT = process.env.PORT || 3001; // Use process.env.PORT for flexibility
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
