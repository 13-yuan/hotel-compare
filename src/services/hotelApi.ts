import type { Hotel } from '../types/hotel';

const BAIDU_AK = 'WuS1saKwejItwQe1N95oTDiX6n02JaSq';

export async function fetchHotelsNearby(latitude: number, longitude: number, page = 0): Promise<Hotel[]> {
  const loc = `${latitude},${longitude}`;
  const url = `https://api.map.baidu.com/place/v2/search?query=酒店&location=${loc}&radius=5000&output=json&ak=${BAIDU_AK}&page_size=20&page_num=${page}&scope=2`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== 0) {
    throw new Error(data.message || '搜索失败');
  }

  return (data.results || []).map((r: any, i: number) => {
    const detail = r.detail_info || {};
    return {
    id: `bd_${r.uid || i}`,
    name: String(r.name || '未知酒店'),
    address: String(r.address || ''),
    city: String(r.city || r.area || ''),
    latitude: r.location?.lat ?? latitude,
    longitude: r.location?.lng ?? longitude,
    starRating: Number(detail.overall_rating) || 3,
    coverImage: detail.image_list?.[0] || `https://picsum.photos/seed/${r.uid || i}/400/300`,
    images: (detail.image_list || []).slice(0, 5),
    tags: (detail.tag || []).slice(0, 4),
    minPrice: undefined,
    minPricePlatform: undefined,
  };});
}

export async function reverseGeocode(latitude: number, longitude: number): Promise<{ city: string; address: string }> {
  const url = `https://api.map.baidu.com/reverse_geocoding/v3/?ak=${BAIDU_AK}&output=json&coordtype=wgs84ll&location=${latitude},${longitude}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== 0) {
    throw new Error(data.message || '逆地理编码失败');
  }

  const comp = data.result?.addressComponent || {};
  const city = comp.city || comp.province || '';
  return {
    city: city.replace(/市$/, ''),
    address: data.result?.formatted_address || '',
  };
}
