const weatherDescriptions = {
	//THUNDERSTORM
	"thunderstorm with light rain":
		"thunderstorm conditions with light rain",
	"thunderstorm with rain":
		"thunderstorm with moderate rainfall",
	"thunderstorm with heavy rain":
		"severe thunderstorm with heavy precipitation",
	"light thunderstorm": "mild thunderstorm activity",
	thunderstorm: "active thunderstorm conditions",
	"heavy thunderstorm":
		"severe thunderstorm with intense electrical activity",
	"ragged thunderstorm":
		"irregular thunderstorm patterns moving through the area",
	"thunderstorm with light drizzle":
		"thunderstorm accompanied by light drizzle",
	"thunderstorm with drizzle":
		"thunderstorm conditions with steady drizzle",
	"thunderstorm with heavy drizzle":
		"thunderstorm with persistent heavy drizzle",

	//DRIZZLE
	"light intensity drizzle":
		"light drizzle with minimal accumulation",
	drizzle: "steady drizzle conditions",
	"heavy intensity drizzle": "heavy drizzle with increased moisture",
	"light intensity drizzle rain": "light drizzle transitioning to rain",
	"drizzle rain": "mixed drizzle and rain conditions",
	"heavy intensity drizzle rain":
		"heavy drizzle with rain periods",
	"shower rain and drizzle":
		"intermittent showers with drizzle",
	"heavy shower rain and drizzle":
		"heavy shower activity with persistent drizzle",
	"shower drizzle":
		"brief shower drizzle passing through",

	//RAIN
	"light rain":
		"light rain with minimal accumulation",
	"moderate rain":
		"moderate rainfall with steady precipitation",
	"heavy intensity rain": "heavy rain with significant accumulation",
	"very heavy rain":
		"very heavy rainfall affecting visibility",
	"extreme rain":
		"extreme rainfall conditions with potential flooding",
	"freezing rain":
		"freezing rain creating hazardous surface conditions",
	"light intensity shower rain": "light shower activity",
	"shower rain": "shower conditions with variable intensity",
	"heavy intensity shower rain":
		"heavy showers with significant rainfall",
	"ragged shower rain":
		"irregular shower patterns moving through",

	//SNOW
	"light snow": "light snowfall with minimal accumulation",
	snow: "steady snowfall conditions",
	"heavy snow":
		"heavy snowfall with rapid accumulation",
	sleet: "mixed rain and snow creating sleet conditions",
	"light shower sleet":
		"light sleet showers passing through",
	"shower sleet":
		"moderate sleet shower activity",
	"light rain and snow":
		"light mix of rain and snow",
	"rain and snow":
		"mixed precipitation with rain and snow",
	"light shower snow": "light snow showers",
	"shower snow":
		"moderate snow shower activity",
	"heavy shower snow":
		"heavy snow showers with rapid accumulation",

	//ATMOSPHERE
	mist: "misty conditions with reduced visibility",
	smoke: "smoke affecting air quality and visibility",
	haze: "hazy conditions limiting distant visibility",
	"sand/dust whirls":
		"dust devil activity with swirling sand and dust",
	fog: "foggy conditions with significantly reduced visibility",
	sand: "sandstorm conditions with airborne particles",
	dust: "dusty conditions affecting air quality",
	"volcanic ash":
		"volcanic ash present in the atmosphere",
	squalls: "squally conditions with sudden strong winds",
	tornado:
		"tornado warning - seek immediate shelter",

	//CLEAR
	"clear sky":
		"clear skies with excellent visibility",

	//CLOUDS
	"few clouds":
		"mostly clear with a few clouds",
	"scattered clouds":
		"partly cloudy with scattered cloud cover",
	"broken clouds":
		"mostly cloudy with broken cloud formations",
	"overcast clouds":
		"overcast conditions with complete cloud cover",
};

const getWeatherMessage = (temperature, description, cityName) => {
	const message =
		weatherDescriptions[description.toLowerCase()] ||
		"it's an unusual weather day.";
	return `Based in ${cityName}, where the temperature is ${temperature}°C, right now ${message}`;
};

module.exports = getWeatherMessage;
