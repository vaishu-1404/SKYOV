'use client';
import { useState } from 'react';


import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../Input/Calendar";

interface ListingReservationProps {
    price: number;
    dateRange: Range,
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    onBooking: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<
    ListingReservationProps
> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    onBooking,
    disabled,
    disabledDates
}) => {
        const [showPaymentModal, setShowPaymentModal] = useState(false);
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            contactNumber: '',
            upiId: '' // New state for UPI ID
        });
        const [paymentSuccessful, setPaymentSuccessful] = useState(false);
        const [processingPayment, setProcessingPayment] = useState(false);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        }

        const Booking = async () => {
            setShowPaymentModal(true);
        }

        const handlePayment = () => {
            setProcessingPayment(true);
            setTimeout(() => {
                setProcessingPayment(false);
                setPaymentSuccessful(true);
            }, 5000); // Show spinner for 5 seconds
        }

        const closeModal = () => {
            setShowPaymentModal(false);
            // Reset form data when closing the modal
            setFormData({
                name: '',
                email: '',
                contactNumber: '',
                upiId: ''
            });
        }

        const handlePaymentClose = () => {
            setShowPaymentModal(false);
            setPaymentSuccessful(false);
            // Reset form data when closing the modal
            setFormData({
                name: '',
                email: '',
                contactNumber: '',
                upiId: ''
            });
        }

        // Function to check if all input fields are filled
        const isFormValid = () => {
            return Object.values(formData).every(value => value !== '');
        }

        return (
            <div
                className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
            >
                <div className="
      flex flex-row items-center gap-1 p-4">
                    <div className="text-2xl font-semibold">
                        Rs. {price}
                    </div>
                    <div className="font-light text-neutral-600">
                        night
                    </div>
                </div>
                <hr />
                <Calendar
                    value={dateRange}
                    disabledDates={disabledDates}
                    onChange={(value) =>
                        onChangeDate(value.selection)}
                />
                <hr />
                <div className="p-4">
                    <Button
                        disabled={disabled}
                        label="Reserve"
                        onClick={onSubmit}
                    />
                </div>
                <hr />
                <div className="p-4">
                    <Button
                        disabled={disabled}
                        label="Booking"
                        onClick={Booking}
                    />
                </div>
                <hr />
                <div
                    className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
                >
                    <div>
                        Total
                    </div>
                    <div>
                        Rs. {totalPrice}
                    </div>
                </div>
                {showPaymentModal && !processingPayment && !paymentSuccessful && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-xl">
                            <h2 className="text-center mb-4 text-sky-500 font-bold">Payment Process</h2>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border rounded-md p-2 mb-2 border-sky-500"
                                    required
                                />
                                <input
                                    type="email"
                                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border rounded-md p-2 mb-2 border-sky-500"
                                    required
                                />
                                <input
                                    type="tel"
                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                    name="contactNumber"
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    className="w-full border rounded-md p-2 mb-2 border-sky-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="upiId"
                                    pattern="^[a-zA-Z0-9.-]{2, 256}@[a-zA-Z][a-zA-Z]{2, 64}$"
                                    placeholder="Enter your UPI ID"
                                    value={formData.upiId}
                                    onChange={handleChange}
                                    className="w-full border rounded-md p-2 mb-2 border-sky-500"
                                />
                            </div>
                            <Button label="Pay" onClick={handlePayment} disabled={!isFormValid()} />
                            <Button label="Close" onClick={closeModal} />
                        </div>
                    </div>
                )}
                {processingPayment && (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="spinner"></div>
                    </div>
                )}
                {paymentSuccessful && (
                    <div className="fixed inset-0 flex items-center justify-center border-sky-500">
                        <div className="bg-white p-8 rounded-xl font-semibold text-lime-500">
                            <h2>Payment Successful!!</h2>
                            <div className="mb-4">
                                <p className='items-center'>Total amount: Rs. {totalPrice}</p>
                            </div>
                            <Button label="Close" onClick={handlePaymentClose} />
                        </div>
                    </div>
                )}
                <style jsx>{`
                .spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    border-left-color: #09f;
                    border-radius: 50%;
                    align: center;
                    width: 80px;
                    height: 80px;
                    animation: spin 1s linear infinite;
                    margin: 20px auto;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
            </div>
        );
    }

export default ListingReservation;