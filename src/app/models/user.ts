export type User = {
  Role: string;
  Email: string;
};

export type Customer = {
  customerId: number;
  email: string | null;
  firstName: string;
  gender: number; // 0 for male, 1 for female
  lastName: string;
  dateOfBirth: string; // ISO 8601 format string
  phoneNumber: string | null;
  addressCustomer: string | null;
  avatar: string | null;
  avatarUploadTime: string | null;
  accountStatus: number;
  balance: number | null;
};

export type Tourguide = {
  accountStatus: number;
  cityName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO 8601 date format
  gender: number;
  description: string;
  zaloLink: string;
  facebookLink: string;
  instagramLink: string;
  pricePerDay: number;
  avatar: string | null;
  avatarUploadedTime: string | null;
  cover: string | null;
  coverUploadedTime: string | null;
};
