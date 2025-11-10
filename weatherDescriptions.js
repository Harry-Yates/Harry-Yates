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
	
	// Format time for the location
	const formatLocalTime = (currentTime, timezoneOffset) => {
		const localTime = new Date((currentTime + timezoneOffset) * 1000);
		const hours = localTime.getUTCHours();
		const minutes = localTime.getUTCMinutes();
		const period = hours >= 12 ? 'PM' : 'AM';
		const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
		return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
	};

	// Format sunrise/sunset time
	const formatSunTime = (timestamp, timezoneOffset) => {
		const time = new Date((timestamp + timezoneOffset) * 1000);
		const hours = time.getUTCHours();
		const minutes = time.getUTCMinutes();
		const period = hours >= 12 ? 'PM' : 'AM';
		const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
		return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
	};

	// Build cleaner weather report
	// Start directly with temperature - location is in main header
	let message = `# ${temperature}°\n`;

	// Current condition with emoji - make it a proper sentence with feels like and sunset/sunrise
	let conditionSentence = `Currently ${weatherDesc}`;

	// Add feels like to the sentence if significantly different
	if (Math.abs(temperature - feelsLike) >= 2) {
		conditionSentence += `, feels like ${feelsLike}°`;
	}

	// Add sunset or sunrise to the sentence
	if (details.sunrise && details.sunset && details.currentTime && details.timezoneOffset !== undefined) {
		const isDay = details.currentTime > details.sunrise && details.currentTime < details.sunset;
		if (isDay) {
			const sunsetTime = formatSunTime(details.sunset, details.timezoneOffset);
			conditionSentence += `, sunset at ${sunsetTime}`;
		} else {
			const sunriseTime = formatSunTime(details.sunrise, details.timezoneOffset);
			conditionSentence += `, sunrise at ${sunriseTime}`;
		}
	}

	conditionSentence += '.';

	message += `${getWeatherEmoji(description)} **${conditionSentence}**\n\n`;

	// Key metrics in a clean grid-like format
	let metrics = [];

	// Temperature range with UV if moderate or higher
	let tempLine = `**↑** ${details.tempMax}° **↓** ${details.tempMin}°`;
	if (details.uvi >= 3) {
		tempLine += `, **UV** ${Math.round(details.uvi)}`;
	}
	metrics.push(tempLine);

	// Add wind if notable (>15 km/h)
	if (details.windSpeed >= 15) {
		metrics.push(`**Wind** ${details.windSpeed} km/h ${details.windDirection}`);
	}

	// Rain probability if significant
	if (details.precipProbability > 20) {
		metrics.push(`**Rain** ${details.precipProbability}%`);
	}
	
	message += metrics.join('  \n');
	
	message += `\n\n---`;
	
	return message;
};

module.exports = getWeatherMessage;
