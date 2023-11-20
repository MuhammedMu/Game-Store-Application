# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!-- Packages -->

1. React Router Dom
   https://www.npmjs.com/package/react-router-dom
2. axios
   https://www.npmjs.com/package/axios
3. dotenv
   https://www.npmjs.com/package/dotenv
4. Firebase
   https://www.npmjs.com/package/firebase
5. Tailwind
   https://tailwindcss.com/docs/installation
6. React Router DOM
   https://www.npmjs.com/package/react-router-dom
   npm i react-router-dom
7. react-toastify
   https://www.npmjs.com/package/react-toastify
   npm i react-toastify
8. Stripe.js ES Module
   https://www.npmjs.com/package/@stripe/stripe-js
   npm i @stripe/stripe-js
9. React Stripe.js
   https://www.npmjs.com/package/@stripe/react-stripe-js
   npm i @stripe/react-stripe-js
10. Stripe Node.js Library
    https://www.npmjs.com/package/stripe
    npm i stripe
11. cors
    https://www.npmjs.com/package/cors
    npm i cors
12. express
    https://www.npmjs.com/package/express
    npm i express
13. nodemon
    https://www.npmjs.com/package/nodemon
    npm i nodemon

npm i @stripe/stripe-js @stripe/react-stripe-js

npm i nodemon cors express stripe

<!-- Stripe payment integration steps  -->

1.  Inastall packages
    npm i @stripe/stripe-js
    npm i @stripe/react-stripe-js

2.  Import loadStripe and Elements in App.js/jsx
    import {loadStripe} from @stripe/stripe-js
    import {Elements} from @stripe/react-stripe-js

3.  Import CardElement, useStripe and useElements in your payment component and initialize on variable
    import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
    const stripe = useStripe();
    const elements = useElements();

4.  use your CardElement oinside the form tag
<form><CardElement />
<button>Pay now</button>
</form>

<!-- Srtipe supported card list -->

https://stripe.com/docs/payments/cards/supported-card-brands
