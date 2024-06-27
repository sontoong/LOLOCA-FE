export type TourGuideList = {
  tourGuides: {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    dateOfBirth: Date;
    gender: number;
    pricePerDay: number;
    avatar: string | null;
    avatarUploadedTime: Date | null;
  }[];
  totalPage: number;
};
