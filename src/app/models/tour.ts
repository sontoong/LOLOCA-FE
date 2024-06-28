export type Tour = {
  tourId: number;
  cityId: number;
  tourGuideId: number;
  name: string;
  description: string;
  category: string | null;
  activity: string | null;
  duration: number;
  status: number;
  tourImgViewList: string[];
  tourExcludeDTOs: {
    excludeDetail: string;
  }[];
  tourHighlightDTOs: {
    highlightDetail: string;
  }[];
  tourIncludeDTOs: {
    includeDetail: string;
  }[];
  tourItineraryDTOs: {
    name: string;
    description: string;
  }[];
  tourTypeDTOs: {
    typeDetail: string;
  }[];
  tourPriceDTOs: {
    totalTouristFrom: number;
    totalTouristTo: number;
    adultPrice: number;
    childPrice: number;
  }[];
} | null;

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
    thumbnailTourImage: string;
  }[];
  totalPage: number;
};
