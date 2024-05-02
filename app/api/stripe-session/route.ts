import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
    apiVersion: "2023-10-16",
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body);
    try {
        if (body.length > 0) {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: '{{PRICE_ID}}',
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${request.headers.get("origin")}/?success=true`,
                cancel_url: `${request.headers.get("origin")}/?canceled=true`,
            });
            //NextResponse.redirect
            return NextResponse.json({ session });
        }
        else {
            return NextResponse.json({ message: "No Data Found" });
        }
    } catch (err: any) {
        console.log(err);
        return NextResponse.json(err.message);
        //res.status(err.statusCode || 500).json(err.message);
    }
} 
