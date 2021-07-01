const request = require('request-promise-native');

// *** API 1 -- FETCH IP ***
const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');
}

// *** API 2 -- FETCH COORDS BY IP ***
const fetchCoordsByIP= function (body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
}

// *** API 3 -- FETCH PASS BY LONGITUDE AND LATITUDE ***
const fetchISSFlyOverTimes= function (body) {
  const latitude = JSON.parse(body).latitude.toString();
  const longitude = JSON.parse(body).longitude.toString();
  return request(`http://api.open-notify.org/iss/v1/?lat=${latitude}&lon=${longitude}&alt=1650`);
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP() //Returns IP as a JSON String
    .then(fetchCoordsByIP) // Returns JSON String containing latitude and longitude in addition to other info
    .then(fetchISSFlyOverTimes) // Parses Latitude and Longitude, then returns JSON String containing passTimes.
    .then(body => {
      const {response} = JSON.parse(body);
      return response;
    })
    .catch((err) => console.log(`Error: ${err.message}`))
}

module.exports = {nextISSTimesForMyLocation}