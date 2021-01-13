class Forecast{
	constructor(){
		this.key = "iYGVh6fay118K3miPn4HmSQQUeYh2bGL";
		this.weatherAPI = "http://dataservice.accuweather.com/currentconditions/v1/";
		this.cityAPI = "http://dataservice.accuweather.com/locations/v1/cities/search";
	};
	//get city details
	async getCity(city){
		const query = `?apikey=${this.key}&q=${city}`;
		const response = await fetch(this.cityAPI + query);
		const data = await response.json();

		return data[0];
	};
	//get weather details
	async getWeather(location_id){
		const query =  `${location_id}?apikey=${this.key}`;
		const response = await fetch(this.weatherAPI + query);
		const data = await response.json(); //returns response object, responseText is a property that stores the JSON string returned by the API
		//so we use .json() method on the response object to parse the JSON string into an array of objects we can use in our code.

		return data[0];
	};
	async updateCity(city){
		const cityDetails = await this.getCity(city);
		const weather = await this.getWeather(cityDetails.Key);
		return { //when you need to return more than one thing, you can return an object
			//whose properties are those. Now the syntax below is returnin an object alright
			//but we are using Object Shorthand Notation(which can be used when the property and value of an object have the same name, in which case we remove the property name, including the ':', remaining only the value name)
			cityDetails, weather };
	};
	
}
