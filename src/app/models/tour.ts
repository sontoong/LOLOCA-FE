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
  tourImgViewList: string[] | null;
  tourExcludeDTOs:
    | {
        excludeDetail: string;
      }[]
    | null;
  tourHighlightDTOs:
    | {
        highlightDetail: string;
      }[]
    | null;
  tourIncludeDTOs:
    | {
        includeDetail: string;
      }[]
    | null;
  tourItineraryDTOs:
    | {
        name: string;
        description: string;
      }[]
    | null;
  tourTypeDTOs:
    | {
        typeDetail: string;
      }[]
    | null;
  tourPriceDTOs:
    | {
        totalTouristFrom: number;
        totalTouristTo: number;
        adultPrice: number;
        childPrice: number;
      }[]
    | null;
} | null;

export type TourList = {
  tours:
    | {
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
      }[]
    | null;
  totalPage: number;
};
