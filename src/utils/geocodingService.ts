import axios from 'axios';

const OPEN_CAGE_API_KEY = process.env.OPEN_CAGE_API_KEY;

interface GeocodingResult {
  city: string | null;
  country: string | null;
}

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<GeocodingResult | null> {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPEN_CAGE_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data && data.results.length > 0) {
      const locationData = data.results[0].components;
      const city =
        locationData.city || locationData.town || locationData.village || null;
      const country = locationData.country || null;
      return { city, country };
    }

    return { city: null, country: null };
  } catch (error) {
    console.error('Error in reverse geocoding: ', error);
    return { city: null, country: null };
  }
}
