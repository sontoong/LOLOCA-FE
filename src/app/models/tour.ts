export type Tour = {
  tourId: number;
  cityId: number;
  tourGuideId: string;
  name: string;
  description: string;
  category?: string;
  activity?: string;
  duration: number;
  status: number;
  tourImgViewList?: string[];
  tourExcludeDTOs?: {
    excludeDetail: string;
  }[];
  tourHighlightDTOs?: {
    highlightDetail: string;
  }[];
  tourIncludeDTOs?: {
    includeDetail: string;
  }[];
  tourItineraryDTOs?: {
    name: string;
    description: string;
  }[];
  tourTypeDTOs?: {
    typeDetail: string;
  }[];
  tourPriceDTOs?: {
    totalTouristFrom: number;
    totalTouristTo: number;
    adultPrice: number;
    childPrice: number;
  }[];
};

export type TourList = {
  tours: {
    tourId: number;
    cityId: number;
    tourGuideId: number;
    name: string;
    description: string;
    duration: number;
    price?: number;
    cityName: string;
    tourGuideName: string;
    thumbnailTourImage: string;
  }[];
  totalPage: number;
};
