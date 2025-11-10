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
	
	// Function to fix common grammar issues in forecasts
	const fixForecastGrammar = (summary) => {
		if (!summary) return '';

		// Fix common grammatical issues
		let fixed = summary
			// Fix "There will be partly cloudy today" -> "Partly cloudy conditions expected today"
			.replace(/There will be partly cloudy today/gi, 'Partly cloudy conditions expected today')
			.replace(/There will be mostly cloudy today/gi, 'Mostly cloudy conditions expected today')
			.replace(/There will be overcast today/gi, 'Overcast conditions expected today')
			.replace(/There will be clear today/gi, 'Clear skies expected today')
			// Fix other variations without "today"
			.replace(/There will be partly cloudy/gi, 'Expect partly cloudy conditions')
			.replace(/There will be mostly cloudy/gi, 'Expect mostly cloudy conditions')
			.replace(/There will be overcast/gi, 'Expect overcast conditions')
			.replace(/There will be clear/gi, 'Expect clear skies')
			// Fix missing "skies" or "conditions"
			.replace(/It will be partly cloudy today/gi, 'Partly cloudy conditions expected today')
			.replace(/It will be mostly cloudy today/gi, 'Mostly cloudy conditions expected today')
			.replace(/It will be overcast today/gi, 'Overcast conditions expected today')
			.replace(/It will be clear today/gi, 'Clear skies expected today')
			// Fix "Expect a day of X"
			.replace(/Expect a day of partly cloudy/gi, 'Expect partly cloudy conditions')
			.replace(/Expect a day of overcast/gi, 'Expect overcast conditions')
			.replace(/Expect a day of clear/gi, 'Expect clear skies')
			.replace(/Expect a day of mostly cloudy/gi, 'Expect mostly cloudy conditions')
			// Fix standalone weather terms
			.replace(/partly cloudy with/gi, 'partly cloudy conditions with')
			.replace(/overcast with/gi, 'overcast conditions with')
			.replace(/clear with/gi, 'clear skies with')
			.replace(/mostly cloudy with/gi, 'mostly cloudy conditions with')
			// General pattern fixes
			.replace(/Expect a day of (.+) with (.+)/gi, 'Expect $1 conditions with $2')
			// Fix "You can expect X" patterns
			.replace(/You can expect partly cloudy/gi, 'Expect partly cloudy conditions')
			.replace(/You can expect mostly cloudy/gi, 'Expect mostly cloudy conditions')
			.replace(/You can expect overcast/gi, 'Expect overcast conditions')
			.replace(/You can expect clear/gi, 'Expect clear skies');

		// Ensure first letter is capitalised
		return fixed.charAt(0).toUpperCase() + fixed.slice(1);
	};
	
	// Build cleaner weather report
	// Location with forecast teaser
	let message = `Based in ${cityName}`;
	if (details.dailySummary) {
		const cleanSummary = fixForecastGrammar(details.dailySummary);
		message += ` · *${cleanSummary}*`;
	}
	message += `\n\n`;
	
	// Main temperature as the hero element
	message += `# ${temperature}°\n`;

	// Current condition with emoji - make it a proper sentence with feels like if different
	let conditionSentence = `Currently ${weatherDesc}`;

	// Add feels like to the sentence if significantly different
	if (Math.abs(temperature - feelsLike) >= 2) {
		conditionSentence += `, feels like ${feelsLike}°`;
	}

	message += `${getWeatherEmoji(description)} **${conditionSentence}.**\n\n`;

	// Key metrics in a clean grid-like format
	let metrics = [];

	// Temperature range
	metrics.push(`**↑** ${details.tempMax}° **↓** ${details.tempMin}°`);
	
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
