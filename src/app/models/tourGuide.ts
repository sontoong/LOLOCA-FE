export type TourGuide = {
  accountStatus: number;
  email?: string;
  tourGuideId?: string;
  cityId: string;
  cityName: string;
  firstName: string;
  lastName: string;
  description: string;
  dateOfBirth: string; // ISO 8601 date format
  gender: number;
  phoneNumber?: string;
  address?: string;
  zaloLink: string;
  facebookLink: string;
  instagramLink: string;
  pricePerDay: number;
  avatar?: string;
  avatarUploadedTime?: string;
  cover?: string;
  coverUploadedTime?: string;
  status: number;
};

export type TourGuideList = {
  tourGuides: {
    tourGuideId: number;
    accountStatus: number;
    cityId: number;
    cityName: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // ISO 8601 date string
    gender: number;
    description: string;
    zaloLink: string;
    facebookLink: string;
    instagramLink: string;
    pricePerDay: number;
    avatar?: string;
    avatarUploadedTime?: string; // ISO 8601 date string or null
    cover?: string;
    coverUploadedTime?: string; // ISO 8601 date string or null
  }[];
  totalPage: number;
};
