/** 酒店平台 */
export type Platform = 'ctrip' | 'meituan' | 'qunar' | 'fliggy' | 'tongcheng';

/** 平台信息 */
export interface PlatformInfo {
  key: Platform;
  name: string;
  icon: string;
  color: string;
  deepLink: (hotelName: string, city?: string) => string;
}

/** 酒店基础信息 */
export interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  starRating: number;
  coverImage: string;
  images: string[];
  tags: string[];
  distance?: number;
  minPrice?: number;
  minPricePlatform?: Platform;
}

/** 房型 */
export interface RoomType {
  id: string;
  hotelId: string;
  name: string;
  bedType: string;
  area: number;
  maxGuests: number;
  image: string;
  facilities: string[];
}

/** 平台报价 */
export interface PlatformPrice {
  platform: Platform;
  platformName: string;
  price: number;
  originalPrice: number;
  roomTypeId: string;
  bookingUrl: string;
  benefits: string[];
}

/** 酒店详情 */
export interface HotelDetail extends Hotel {
  description: string;
  facilities: string[];
  roomTypes: RoomType[];
  platformPrices: PlatformPrice[];
  checkInTime: string;
  checkOutTime: string;
}

/** 位置坐标 */
export interface Location {
  latitude: number;
  longitude: number;
}

/** 搜索筛选条件 */
export interface HotelFilter {
  keyword: string;
  starMin: number;
  starMax: number;
  radius: number;
  sortBy: 'distance' | 'price' | 'rating';
}
