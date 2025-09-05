import { useState } from 'react';
import { useCart } from '../context/CartContext';
import PaymentOptions from './PaymentOptions';

export default function CheckoutForm() {
  const { 
    customerInfo, 
    updateCustomerInfo, 
    paymentMethod,
    completeOrder 
  } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCustomerInfo({ ...customerInfo, [name]: value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!customerInfo.name) newErrors.name = 'Name is required';
    if (!customerInfo.email) newErrors.email = 'Email is required';
    if (!customerInfo.phone) newErrors.phone = 'Phone is required';
    if (!customerInfo.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && paymentMethod) {
      completeOrder();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={customerInfo.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={customerInfo.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={customerInfo.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium">
          Delivery Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={customerInfo.address}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>

      <PaymentOptions />

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded hover:bg-primary-dark transition"
      >
        Confirm Order
      </button>
    </form>
  );
}
