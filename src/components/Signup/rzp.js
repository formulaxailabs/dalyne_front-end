import React, { useEffect } from 'react';

const PayByRazorPay = () => {
    const options = {
        key: 'rzp_test_K0gzlzKwqjtNBh',
        amount: '100', //  = INR 1
        name: 'Plan name',
        description: 'Plan description',
        image: '/images/rzp-logo.png',
        handler: function(response) {
            console.log(response.razorpay_payment_id);
        },
        prefill: {
            name: 'Banty',
            contact: '9563735364',
            email: 'bantyshaw@gmail.com'
        },
        notes: {
            address: 'some address'
        },
        theme: {
            color: 'blue',
            hide_topbar: false
        }
    };

    const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <button onClick={openPayModal}>Pay with Razorpay</button>
        </>
    );
};

export default PayByRazorPay;