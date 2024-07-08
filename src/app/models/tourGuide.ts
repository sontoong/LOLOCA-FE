export type TourGuide = {
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
  avatar?: string;
  avatarUploadedTime?: string;
  cover?: string;
  coverUploadedTime?: string;
  phoneNumber?: string;
  address?: string;
  status: number;
};

export type TourGuideList = {
  tourGuides: {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    dateOfBirth: Date;
    gender: number;
    pricePerDay: number;
    avatar?: string;
    avatarUploadedTime?: Date;
  }[];
  totalPage: number;
};
