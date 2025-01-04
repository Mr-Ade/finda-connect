interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options: string;
  redirect_url: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  callback: (response: any) => void;
  onclose: () => void;
}

interface Window {
  FlutterwaveCheckout: {
    (config: FlutterwaveConfig): void;
    close: () => void;
  };
  PaystackPop: {
    setup: (config: any) => void;
  };
}