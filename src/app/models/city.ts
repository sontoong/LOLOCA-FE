export type City = {
  cityId: number;
  name: string;
  cityDescription: string;
  cityThumbnail: string | null;
  cityBanner: string;
  cityBannerUploadDate: string;
  cityThumbnailUploadDate: string;
  status: boolean;
} | null;

export type CityList = City[];
