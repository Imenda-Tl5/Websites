import React, { useState } from 'react'

const StripePayment = () => {
      const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div>
      <Elements stripe={stripePromise}>

<CardElement />

</Elements>
    </div>
  )
}

export default StripePayment
