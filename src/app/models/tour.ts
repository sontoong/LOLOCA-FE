export type Tour = {
  tourId: number;
  cityId: number;
  tourGuideId: number;
  name: string;
  description: string;
  duration: number;
  status: number;
  price: number | null;
  tourImgViewList: string[];
};

export type TourList = {
  tours: {
    tourId: number;
    cityId: number;
    tourGuideId: number;
    name: string;
    description: string;
    duration: number;
    price: number | null;
    cityName: string;
    tourGuideName: string;
    thumbnailTourImage: string | null;
  }[];
  totalPage: number;
} | null;
