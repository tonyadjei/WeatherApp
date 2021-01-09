const key = "ggVEgrgh4AEi7dsCPyutAdyY1HHKzbWZ";  
//we find information about API endpoints at API references page



//get weather information
const getWeather = async (location_id) => {
	const base = "http://dataservice.accuweather.com/currentconditions/v1/";
	const query =  `${location_id}?apikey=${key}`;
	const response = await fetch(base + query);
	const data = await response.json();

	return data[0];
};

//get city information
const getCity = async (city) => {
	const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
	const query = `?apikey=${key}&q=${city}`;
	const response = await fetch(base + query);
	const data = await response.json();
	
	return data[0];
};

