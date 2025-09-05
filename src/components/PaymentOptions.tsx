import { useCart } from '../context/CartContext';

export default function PaymentOptions() {
  const { paymentMethod, setPaymentMethod } = useCart();

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Payment Method</h3>
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="radio"
            id="mobile-money"
            name="payment"
            checked={paymentMethod === 'mobile-money'}
            onChange={() => setPaymentMethod('mobile-money')}
            className="h-4 w-4 text-primary focus:ring-primary"
          />
          <label htmlFor="mobile-money" className="ml-2 block text-sm">
            Mobile Money
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="cash-on-delivery"
            name="payment"
            checked={paymentMethod === 'cash-on-delivery'}
            onChange={() => setPaymentMethod('cash-on-delivery')}
            className="h-4 w-4 text-primary focus:ring-primary"
          />
          <label htmlFor="cash-on-delivery" className="ml-2 block text-sm">
            Cash on Delivery
          </label>
        </div>
        {!paymentMethod && (
          <p className="text-sm text-red-600">Please select a payment method</p>
        )}
      </div>
    </div>
  );
}
