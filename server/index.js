require("dotenv").config();
const express = require("express");
const cors = require("cors");

// The Stripe secret key must come from the environment, never from the code.
const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  console.error("STRIPE_SECRET_KEY is not set. Copy .env.example to .env and add your key.");
  process.exit(1);
}
const stripe = require("stripe")(secretKey);

// App config
const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json());

// Checking backend functionality
app.get("/", (req, res) => res.status(200).send("Game store payment server is running"));

app.post("/payment/create", async (req, res) => {
  // amount in cents, e.g. $12.99 -> 1299
  const total = Number(req.query.total);

  // Stripe needs a whole number of cents; 50 is the USD minimum
  if (!Number.isInteger(total) || total < 50 || total > 99999999) {
    return res.status(400).json({ error: "Invalid payment amount." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred while creating the payment intent." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
