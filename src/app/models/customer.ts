export type Customer = {
  customerId: number;
  email: string;
  firstName: string;
  gender: number; // 0 for male, 1 for female
  lastName: string;
  dateOfBirth: string; // ISO 8601 format string
  phoneNumber?: string;
  addressCustomer?: string;
  avatar?: string;
  avatarUploadTime?: string;
  accountStatus: number;
  balance?: number;
};
