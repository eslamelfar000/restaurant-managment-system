export interface RestaurantSettings {
  branding: {
    appName: string;
    logo?: string;
    primaryColor: string;
    darkMode: boolean;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  legal: {
    terms: string;
    privacyPolicy: string;
  };
}
