const stripe = require('stripe')('sk_test_51PQNMC08tfQw2xpz6mB0cZvupTCEqCYn4XXqopbjmyjQV8iD6hen6OZgkgIPRcLS3iUjBbwidifa8U1NtHelTIm700bYkiO9C2');

const makePayment = async (req, res) => {
    const { amount, email, token } = req.body;
    if (!token || !token.id || !email || !amount) {
        return res.status(400).send({ error: "Missing required parameters" });
    }
    try {
        const customer = await stripe.customers.create({
            email: email,
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseFloat(amount) * 100,
            currency: 'usd',
            customer: customer.id,
            payment_method_data: {
                type: 'card',
                card: {
                    token: token.id,
                },
            },
            off_session: true,
            confirm: true,
        });

        res.status(200).send('Payment successfully processed');
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

module.exports = {
    makePayment
};
