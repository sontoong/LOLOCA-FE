export type City = {
  cityId: number;
  name: string;
  cityDescription: string;
  cityThumbnail: string;
  cityBanner: string;
  cityBannerUploadDate: string;
  cityThumbnailUploadDate: string;
  status: boolean;
};

export type CityList = City[] | null;
