import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51RLTeoGdZXshIjxRiGPAd0ygJF7s8zafVDuIZE6CHgcVccz1GrkxFFgkKw6DHfaSPCajjHfN5EC0SHNDoA64Wc7s005C5B9IoL');

import { ReactNode } from 'react';

export const StripeWrapper = ({ children }: { children: ReactNode }) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);
