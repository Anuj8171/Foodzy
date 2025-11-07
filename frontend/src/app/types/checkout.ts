export interface CheckoutFormData {
  email: string;
  otp: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postCode: string;
  country: string;
  regionState: string;
  paymentMethod: string;
}

export interface DeliveryMethodProps {
  shipping: "free" | "flat";
  setShipping: (value: "free" | "flat") => void;
}

export interface PaymentMethodProps {
  payment: "cod" | "upi" | "bank";
  setPayment: (value: "cod" | "upi" | "bank") => void;
}

export interface CustomerVerificationProps {
  formData: CheckoutFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  otpSent: boolean;
  verified: boolean;
  emailLoading: boolean;
  handleSendOtp: () => void;
  handleVerifyOtp: () => void;
}

export interface BillingDetailsProps {
  formData: CheckoutFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  handlePlaceOrder: () => void;
}
