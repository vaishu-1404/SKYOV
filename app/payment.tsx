import { loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<any> | null = null;

export async function checkout({ lineItems }: { lineItems: any[] }) {
    let getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY || '');
        }
        return stripePromise;
    }

    const stripe = await getStripe();


    // Your further code handling 'stripe'
}

export { stripePromise };
