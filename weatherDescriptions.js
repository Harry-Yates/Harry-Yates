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
		"dust devils with swirling sand and dust",
	fog: "foggy conditions with significantly reduced visibility",
	sand: "sandstorm conditions with airborne particles",
	dust: "dusty conditions affecting air quality",
	"volcanic ash":
		"volcanic ash present in the atmosphere",
	squalls: "squalls with sudden strong winds",
	tornado:
		"tornado warning – seek immediate shelter",

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

const getWeatherMessage = (temperature, feelsLike, description, cityName, details) => {
	const weatherDesc =
		weatherDescriptions[description.toLowerCase()] ||
		"unusual weather conditions";
	
	// Get weather emoji based on conditions
	const getWeatherEmoji = (desc) => {
		const d = desc.toLowerCase();
		if (d.includes('clear')) return '☀️';
		if (d.includes('cloud')) return '☁️';
		if (d.includes('rain') || d.includes('drizzle')) return '🌧️';
		if (d.includes('thunder')) return '⛈️';
		if (d.includes('snow')) return '❄️';
		if (d.includes('mist') || d.includes('fog')) return '🌫️';
		return '🌤️';
	};
	
	// Format temperature with color hint
	const formatTemp = (temp) => {
		if (temp <= 0) return `${temp}°`;
		if (temp <= 10) return `${temp}°`;
		if (temp <= 20) return `${temp}°`;
		if (temp <= 30) return `${temp}°`;
		return `${temp}°`;
	};
	
	// Build cleaner weather report
	// Location with forecast teaser
	let message = `Based in ${cityName}`;
	if (details.dailySummary) {
		message += ` · *${details.dailySummary.charAt(0).toUpperCase() + details.dailySummary.slice(1)}*`;
	}
	message += `\n\n`;
	
	// Main temperature as the hero element
	message += `# ${temperature}°\n`;
	
	// Current condition with emoji
	message += `${getWeatherEmoji(description)} **${weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}**\n\n`;
	
	// Key metrics in a clean grid-like format
	let metrics = [];
	
	// Temperature range
	metrics.push(`**↑** ${details.tempMax}° **↓** ${details.tempMin}°`);
	
	// Add feels like only if significantly different
	if (Math.abs(temperature - feelsLike) >= 3) {
		metrics.push(`**Feels** ${feelsLike}°`);
	}
	
	// Wind
	metrics.push(`**Wind** ${details.windSpeed} km/h ${details.windDirection}`);
	
	// Humidity
	metrics.push(`**Humidity** ${details.humidity}%`);
	
	// Rain probability if significant
	if (details.precipProbability > 20) {
		metrics.push(`**Rain** ${details.precipProbability}%`);
	}
	
	// UV if moderate or higher
	if (details.uvi >= 3) {
		const uviWarning = details.uvi >= 6 ? ' ⚠️' : '';
		metrics.push(`**UV** ${details.uvi.toFixed(0)}${uviWarning}`);
	}
	
	// Add visibility only if poor
	if (details.visibility < 5000) {
		metrics.push(`**Visibility** ${(details.visibility/1000).toFixed(1)} km`);
	}
	
	message += metrics.join('  \n');
	
	message += `\n\n---`;
	
	return message;
};

module.exports = getWeatherMessage;
