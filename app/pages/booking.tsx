import { useState } from 'react';
import RootLayout from '../layout';

export default function Booking() {
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        email: '',
        checkInDate: '',
        checkOutDate: '',
        guests: 1,
        paymentMethod: 'creditCard'
    });

    const [paymentStatus, setPaymentStatus] = useState<boolean | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setBookingDetails({ ...bookingDetails, [name]: value });
    };

    const handleBooking = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here you can perform actions like sending booking details to a server, processing payment, etc.
        // For demonstration purposes, we'll just display a success message.
        setPaymentStatus(true);
    };

    return (
        <RootLayout>
            <div style={{ backgroundColor: 'skyblue', padding: '20px', minHeight: '100vh' }}>
                <h1>Hotel Room Booking</h1>
                <form onSubmit={handleBooking}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={bookingDetails.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={bookingDetails.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Check-in Date:
                        <input
                            type="date"
                            name="checkInDate"
                            value={bookingDetails.checkInDate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Check-out Date:
                        <input
                            type="date"
                            name="checkOutDate"
                            value={bookingDetails.checkOutDate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Guests:
                        <input
                            type="number"
                            name="guests"
                            value={bookingDetails.guests}
                            onChange={handleInputChange}
                            required
                            min="1"
                        />
                    </label>
                    <br />
                    <label>
                        Payment Method:
                        <select
                            name="paymentMethod"
                            value={bookingDetails.paymentMethod}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="creditCard">Credit Card</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">Pay</button>
                </form>
                {paymentStatus && <p>Payment successful! Your room has been booked.</p>}
            </div>
        </RootLayout>
    );
}
