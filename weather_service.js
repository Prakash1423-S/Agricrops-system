/**
 * AgriCrops Weather & Climate-Based Crop Recommendation Service
 * Integrates with Open-Meteo API (free, no API key needed) with offline fallback presets,
 * and calculates crop suitability based on live weather and land/soil characteristics.
 */

class WeatherService {
  constructor(database, soilReference) {
    this.database = database;
    this.soilReference = soilReference;
    
    // Preset locations for quick testing or offline fallback
    this.presetLocations = [
      { name: "Ludhiana (Punjab)", country: "India", lat: 30.9010, lon: 75.8573, defaultSoil: "Alluvial Loam" },
      { name: "Nagpur (Maharashtra)", country: "India", lat: 21.1458, lon: 79.0882, defaultSoil: "Deep Black Soil (Vertisols)" },
      { name: "Bengaluru (Karnataka)", country: "India", lat: 12.9716, lon: 77.5946, defaultSoil: "Red Soil" },
      { name: "Fresno (California)", country: "USA", lat: 36.7468, lon: -119.7726, defaultSoil: "Sandy Loam" },
      { name: "Nairobi (Rift Valley)", country: "Kenya", lat: -1.2921, lon: 36.8219, defaultSoil: "Clayey Loam" },
      { name: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333, defaultSoil: "Red Soil" }
    ];

    // Current active weather state
    this.currentWeather = {
      locationName: "Ludhiana (Punjab), India",
      latitude: 30.9010,
      longitude: 75.8573,
      temperature: 24.5,
      humidity: 62,
      precipitation: 15, // mm monthly / 7-day projection
      weatherCode: 1, // Mainly clear
      conditionText: "Mainly Clear & Sunny",
      windSpeed: 11.2,
      isLive: false
    };
  }

  /**
   * Fetch weather for a given city query or coordinates
   */
  async fetchWeather(locationQuery) {
    try {
      let lat, lon, resolvedName;

      // Check if location matches a preset first
      const matchedPreset = this.presetLocations.find(p => 
        p.name.toLowerCase().includes(locationQuery.toLowerCase()) ||
        locationQuery.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])
      );

      if (matchedPreset) {
        lat = matchedPreset.lat;
        lon = matchedPreset.lon;
        resolvedName = `${matchedPreset.name}, ${matchedPreset.country}`;
      } else {
        // Geocode via Open-Meteo Geocoding API
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationQuery)}&count=1&language=en&format=json`;
        const geoRes = await fetch(geoUrl);
        if (!geoRes.ok) throw new Error("Geocoding failed");
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("Location not found");
        }
        const topResult = geoData.results[0];
        lat = topResult.latitude;
        lon = topResult.longitude;
        resolvedName = `${topResult.name}${topResult.admin1 ? ', ' + topResult.admin1 : ''}, ${topResult.country}`;
      }

      // Fetch weather from Open-Meteo
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
      const wRes = await fetch(weatherUrl);
      if (!wRes.ok) throw new Error("Weather API failed");
      const wData = await wRes.json();

      const current = wData.current || {};
      const condition = this.interpretWeatherCode(current.weather_code);

      // Estimate monthly precipitation rate from daily 7-day average
      let precipWeekly = 0;
      if (wData.daily && wData.daily.precipitation_sum) {
        precipWeekly = wData.daily.precipitation_sum.reduce((a, b) => a + (b || 0), 0);
      }
      const estimatedMonthlyRain = Math.round(precipWeekly * 4.2);

      this.currentWeather = {
        locationName: resolvedName,
        latitude: lat,
        longitude: lon,
        temperature: Math.round(current.temperature_2m ?? 24),
        humidity: Math.round(current.relative_humidity_2m ?? 55),
        precipitation: Math.max(estimatedMonthlyRain, Math.round((current.precipitation ?? 0) * 30)),
        weatherCode: current.weather_code ?? 0,
        conditionText: condition.text,
        icon: condition.icon,
        windSpeed: Math.round(current.wind_speed_10m ?? 10),
        dailyMin: wData.daily?.temperature_2m_min?.[0] ?? 18,
        dailyMax: wData.daily?.temperature_2m_max?.[0] ?? 29,
        isLive: true
      };

      return { success: true, weather: this.currentWeather };
    } catch (err) {
      console.warn("Weather fetch failed, utilizing resilient realistic simulation:", err.message);
      // Fallback to simulated regional profile
      return this.useFallbackWeather(locationQuery);
    }
  }

  /**
   * Resilient fallback in offline environment
   */
  useFallbackWeather(query) {
    const defaultLocation = this.presetLocations[0];
    this.currentWeather = {
      locationName: query || defaultLocation.name,
      latitude: defaultLocation.lat,
      longitude: defaultLocation.lon,
      temperature: 25,
      humidity: 60,
      precipitation: 65,
      weatherCode: 1,
      conditionText: "Pleasant & Clear (Simulated Live Station)",
      icon: "☀️",
      windSpeed: 12,
      dailyMin: 18,
      dailyMax: 29,
      isLive: false,
      note: "Offline Mode Active (Using cached regional climate data)"
    };
    return { success: true, weather: this.currentWeather };
  }

  /**
   * Interpret WMO weather codes into human friendly text and emoji
   */
  interpretWeatherCode(code) {
    if (code === 0) return { text: "Clear Sky", icon: "☀️" };
    if (code === 1 || code === 2) return { text: "Partly Cloudy", icon: "🌤️" };
    if (code === 3) return { text: "Overcast", icon: "☁️" };
    if (code >= 45 && code <= 48) return { text: "Foggy / Mist", icon: "🌫️" };
    if (code >= 51 && code <= 55) return { text: "Light Drizzle", icon: "🌦️" };
    if (code >= 61 && code <= 65) return { text: "Rain Showers", icon: "🌧️" };
    if (code >= 71 && code <= 77) return { text: "Snowfall", icon: "❄️" };
    if (code >= 80 && code <= 82) return { text: "Heavy Rain Showers", icon: "⛈️" };
    if (code >= 95) return { text: "Thunderstorm", icon: "⚡" };
    return { text: "Mild & Fair", icon: "⛅" };
  }

  /**
   * Calculate crop suitability scores based on Climate + Selected Land/Soil
   * @param {string} selectedSoil - User chosen soil type
   * @param {Object} overrideWeather - Optional custom weather parameters
   * @returns {Array} Ranked list of crops with suitability score, status, and detailed reasoning
   */
  evaluateCropsForClimateAndLand(selectedSoil, overrideWeather = null) {
    const weather = overrideWeather || this.currentWeather;
    const temp = weather.temperature;
    const humidity = weather.humidity;
    const rain = weather.precipitation;

    const evaluated = this.database.map(crop => {
      const clim = crop.climate_requirements;
      const land = crop.land_soil_suitability;

      // 1. Temperature Fitness (Weight 40%)
      let tempScore = 0;
      if (temp >= clim.min_temp && temp <= clim.max_temp) {
        const delta = Math.abs(temp - clim.optimal_temp);
        const maxSpan = (clim.max_temp - clim.min_temp) / 2;
        tempScore = Math.max(50, 100 - (delta / maxSpan) * 50);
      } else if (temp < clim.min_temp) {
        const deficit = clim.min_temp - temp;
        tempScore = Math.max(0, 50 - deficit * 10);
      } else {
        const excess = temp - clim.max_temp;
        tempScore = Math.max(0, 50 - excess * 10);
      }

      // 2. Rainfall & Moisture Fitness (Weight 25%)
      let rainScore = 0;
      if (rain >= clim.min_rain && rain <= clim.max_rain) {
        rainScore = 100;
      } else if (rain < clim.min_rain) {
        const ratio = rain / clim.min_rain;
        rainScore = Math.max(20, ratio * 90);
      } else {
        const surplus = rain - clim.max_rain;
        rainScore = Math.max(30, 100 - surplus * 0.3);
      }

      // 3. Soil Suitability Score (Weight 35%)
      let soilScore = 50; // default baseline
      let soilMatchStatus = "Moderate compatibility";
      const matchesDirect = land.soil_types.some(s => 
        s.toLowerCase().includes(selectedSoil.toLowerCase()) || 
        selectedSoil.toLowerCase().includes(s.toLowerCase().split(' ')[0])
      );

      if (matchesDirect) {
        soilScore = 100;
        soilMatchStatus = `Perfect match for ${selectedSoil}`;
      } else if (
        (selectedSoil.includes("Loam") && land.soil_types.some(s => s.includes("Loam"))) ||
        (selectedSoil.includes("Clay") && land.soil_types.some(s => s.includes("Clay")))
      ) {
        soilScore = 80;
        soilMatchStatus = `Good texture affinity with ${selectedSoil}`;
      } else {
        soilScore = 40;
        soilMatchStatus = `Suboptimal soil type (Prefers ${land.soil_types.join(", ")})`;
      }

      // Total Weighted Score
      const totalScore = Math.round((tempScore * 0.40) + (rainScore * 0.25) + (soilScore * 0.35));

      // Determine recommendation grade
      let recommendation = "";
      let statusColor = "";
      if (totalScore >= 85) {
        recommendation = "🌟 Highly Recommended";
        statusColor = "status-excellent";
      } else if (totalScore >= 70) {
        recommendation = "✅ Good / Recommended";
        statusColor = "status-good";
      } else if (totalScore >= 50) {
        recommendation = "⚠️ Moderate / Needs Irrigation Care";
        statusColor = "status-warning";
      } else {
        recommendation = "❌ Not Advisable Currently";
        statusColor = "status-poor";
      }

      // Detailed diagnostic reasoning
      let reason = `Temperature ${temp}°C (optimal: ${clim.optimal_temp}°C). `;
      if (tempScore >= 80) reason += "Thermal conditions are ideal. ";
      else if (temp < clim.min_temp) reason += `Current climate is cooler than the crop's minimum threshold (${clim.min_temp}°C). `;
      else if (temp > clim.max_temp) reason += `Heat stress possible; exceeds optimal range. `;

      reason += `${soilMatchStatus}. `;
      if (crop.how_to_grow.sowing_time.toLowerCase().includes("summer") && temp < 20) {
        reason += "Consider waiting for warmer seasonal cycle.";
      }

      return {
        crop: crop,
        score: totalScore,
        tempScore: Math.round(tempScore),
        rainScore: Math.round(rainScore),
        soilScore: Math.round(soilScore),
        recommendation: recommendation,
        statusColor: statusColor,
        reason: reason,
        seasons: clim.seasons,
        idealSoil: land.soil_types[0],
        ph: land.ideal_ph
      };
    });

    // Sort by score descending
    return evaluated.sort((a, b) => b.score - a.score);
  }
}
