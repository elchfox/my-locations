import Geocode from "react-geocode";
Geocode.setApiKey(global.apiKey);
const proxyurl = "https://cors-anywhere.herokuapp.com/";

class General {

  currentLocation = async () => {

    const data = await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    })
    console.log(data,'hhhhhh');

    return data
  }

   // get Current Country
   getCurrentCountry = async (lat, lng) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${global.apiKey}&latlng=${lat},${lng}&sensor=true`
    const result = await fetch(apiUrl);
    const json = await result.json();
    const res = await json.results[0].address_components.filter(val => val.types[0] === 'country')
    let nameAddress = json.results[0].formatted_address;
    let placeId = json.results[0].place_id;
    let address = res.length > 0 ? res : [{ dial_code: '+1', short_name: 'US' }]
    return  {country:address[0],nameAddress,placeId}
  }

  async searchPlace(location) {
  
    console.log(location);
    let apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=${global.apiKey}`;

    const result = await fetch(apiUrl)

    const json = await result.json()
    return json
  }

  async selectLocations(location) {
    let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${global.apiKey}&address=${location}&fields=formatted_address,name`
    // &`+
    // `location=37.785834,-122.406417`
    // //&redius=2000`;

    const result = await fetch(apiUrl);

    const json = await result.json()
    console.log(json)

    return json

  }
  async selectLocations(address) {
    let res = await  Geocode.fromAddress(address);
    console.log(res)
      return  {location:res.results[0].geometry.location,
        place_id:res.results[0].place_id,
        types:res.results[0].types,
               address: res.results[0].formatted_address};
    }

  async searchByType(location,types = []) {
  //  &sensor=true&key=AIzaSyAVH0qHD6BPxRlnck3rIqcxC5TTwOTyfds&types=gas_station||shopping_mall
    let apiUrl = `https://maps.googleapis.com/maps/api/place/search/json?key=${global.apiKey}&types=${types.toString()}`
    // &`+
    // `location=37.785834,-122.406417`
    // //&redius=2000`;

    const result = await fetch(apiUrl);

    const json = await result.json()
    console.log(json)

    return json

  }

  }
  
  export default new General();