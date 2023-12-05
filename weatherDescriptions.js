const weatherDescriptions = {
  //Main
  //   clouds: "it's a cloudy day, with the sun peeking through occasionally.",
  //   "shower rain": "expect some shower rain today.",
  //   rain: "it's a rainy day, don't forget your umbrella.",
  //   thunderstorm: "a thunderstorm is occurring, stay safe indoors.",
  //   snow: "it's a snowy day, perfect for a snowman!",
  //   mist: "the mist has set in, creating a mystical atmosphere.",
  //   clear: "the sky is clear and blue, a perfect day ahead.",
  //   tornado: "a tornado is forming, seek shelter immediately!",
  //   squall: "squalls are passing through, hold onto your hat!",
  //   ash: "volcanic ash is filling the air, stay indoors if possible.",
  //   dust: "a dusty haze is hanging in the air.",
  //   sand: "sandy winds are sweeping across the area.",
  //   fog: "a thick fog is enveloping the surroundings.",
  //   haze: "a light haze is blurring the horizon.",
  //   smoke: "smoke is in the air, be cautious of reduced visibility.",
  //   drizzle: "a light drizzle is adding a touch of freshness to the day.",
  //DESCRIPTIONS
  //THUNDERSTORM
  "thunderstorm with light rain":
    "a thunderstorm is present, accompanied by light rain.",
  "thunderstorm with rain":
    "a thunderstorm is bringing steady rain along with it.",
  "thunderstorm with heavy rain":
    "heavy rain is pouring down from a fierce thunderstorm.",
  "light thunderstorm": "a light thunderstorm is crackling in the distance.",
  thunderstorm: "a thunderstorm is rumbling overhead, stay safe inside.",
  "heavy thunderstorm":
    "a heavy thunderstorm is booming, it's quite a spectacle!",
  "ragged thunderstorm":
    "a ragged thunderstorm is passing through, with unpredictable patterns.",
  "thunderstorm with light drizzle":
    "a thunderstorm is accompanied by a light, refreshing drizzle.",
  "thunderstorm with drizzle":
    "a thunderstorm with a gentle drizzle is setting the mood.",
  "thunderstorm with heavy drizzle":
    "a heavy drizzle is adding to the intensity of the thunderstorm.",
  //DRIZZLE
  "light intensity drizzle":
    "a light drizzle is gently misting the surroundings.",
  drizzle: "a steady drizzle is dampening the streets.",
  "heavy intensity drizzle": "a heavy drizzle is soaking everything in sight.",
  "light intensity drizzle rain": "light drizzle rain is gently falling.",
  "drizzle rain": "drizzle rain is creating a soothing rhythm.",
  "heavy intensity drizzle rain":
    "heavy drizzle rain is coming down persistently.",
  "shower rain and drizzle":
    "intermittent showers and drizzle are making for a wet day.",
  "heavy shower rain and drizzle":
    "heavy showers mixed with drizzle are drenching the area.",
  "shower drizzle":
    "a shower drizzle is passing through, light and refreshing.",
  //RAIN
  "light rain": "a light rain is falling, bringing a calm over the city.",
  "moderate rain":
    "moderate rain is coming down, perfect for a lazy day indoors.",
  "heavy intensity rain":
    "heavy rain is pouring, creating a rhythmic sound on the rooftops.",
  "very heavy rain":
    "very heavy rain is drenching the streets, best to stay inside.",
  "extreme rain": "extreme rain is lashing out, it's quite a downpour!",
  "freezing rain":
    "freezing rain is making the sidewalks slippery, be careful.",
  "light intensity shower rain": "light shower rain is sprinkling the area.",
  "shower rain": "shower rain is washing over the city, refreshing the air.",
  "heavy intensity shower rain":
    "heavy shower rain is soaking everything, an umbrella is a must.",
  "ragged shower rain":
    "ragged shower rain is passing through, with bursts of rain here and there.",

  //SNOW
  "light snow": "a gentle light snow is dusting the city.",
  snow: "snow is gracefully falling, blanketing the ground.",
  "heavy snow": "heavy snow is coming down, creating a winter wonderland.",
  sleet: "sleet is falling, a mix of rain and snow.",
  "light shower sleet": "light sleet showers are passing through.",
  "shower sleet": "shower sleet is falling, a chilly mix of rain and snow.",
  "light rain and snow":
    "light rain mixed with snow is making the streets glisten.",
  "rain and snow": "rain and snow are combining for a slushy mix.",
  "light shower snow": "light snow showers are adding a fresh layer of powder.",
  "shower snow":
    "snow showers are passing through, briefly covering the streets.",
  "heavy shower snow":
    "heavy snow showers are quickly piling up on the ground.",

  //ATMOSPHERE
  mist: "a gentle mist is enveloping the surroundings, creating a serene atmosphere.",
  smoke: "smoke is drifting through the air, reducing visibility.",
  haze: "a soft haze is hanging over the city, blurring distant views.",
  "sand/dust whirls":
    "sand and dust are swirling in the air, a dance of nature's elements.",
  fog: "a thick fog is blanketing the area, shrouding everything in mystery.",
  sand: "grains of sand are being whisked through the air, a reminder of the desert's presence.",
  dust: "a dusty haze is hanging in the air, covering the landscape.",
  "volcanic ash":
    "volcanic ash is filling the sky, a stark reminder of nature's power.",
  squalls: "squalls are sweeping through, bringing bursts of intense wind.",
  tornado:
    "a tornado is forming, a powerful and awe-inspiring sight. Seek shelter immediately!",

  //CLEAR
  "clear sky":
    "the sky is crystal clear, offering a perfect view of the stars at night and a bright blue canvas during the day.",

  //CLOUDS
  "few clouds":
    "the sky is mostly clear with just a few clouds here and there.",
  "scattered clouds":
    "scattered clouds are strewn across the sky, making for a picturesque day.",
  "broken clouds":
    "the sky is covered with broken clouds, creating a dramatic and ever-changing landscape.",
  "overcast clouds":
    "the sky is completely overcast, blanketing the area in a uniform cloud cover.",
};

const getWeatherMessage = (temperature, description, cityName) => {
  const message =
    weatherDescriptions[description.toLowerCase()] ||
    "it's an unusual weather day.";
  return `Based in ${cityName} where the temperature is ${temperature}°C, ${message}`;
};

module.exports = getWeatherMessage;
