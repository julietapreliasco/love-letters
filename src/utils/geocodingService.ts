import axios from 'axios';

interface GeocodingResult {
  city: string | null;
  country: string | null;
}

const geocodeCache: { [key: string]: GeocodingResult } = {};

let lastRequestTime = 0;
const requestInterval = 1000;

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<GeocodingResult | null> {
  const cacheKey = `${lat},${lon}`;

  if (geocodeCache[cacheKey]) {
    return geocodeCache[cacheKey];
  }

  const now = Date.now();
  if (now - lastRequestTime < requestInterval) {
    const waitTime = requestInterval - (now - lastRequestTime);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
  lastRequestTime = Date.now();

  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Love letters (paula@dandelion.software)',
      },
    });

    const data = response.data;

    if (data && data.address) {
      const locationData = data.address;
      const city =
        locationData.city || locationData.town || locationData.village || null;
      const country = locationData.country || null;
      const result: GeocodingResult = { city, country };

      geocodeCache[cacheKey] = result;

      return result;
    }

    return { city: null, country: null };
  } catch (error) {
    console.error('Error in reverse geocoding: ', error);
    return { city: null, country: null };
  }
}
