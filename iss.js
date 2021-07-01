// ***API CALL #1 --- GET OUR IPV4 ADDRESS***
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");



const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error,null);
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    let ipAddress = JSON.parse(body).ip;
    callback(null,ipAddress);
  });
};

// ***API CALL #2 --- USE OUR IPV4 ADDRESS TO FIND OUR LATITUDE AND LONGITUDE***

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg),null);
      return;
    }

    const latitude = JSON.parse(body).latitude.toString();
    const longitude = JSON.parse(body).longitude.toString();
    let output = {
      latitude,
      longitude
    };
  
    callback(null,output);

  });
};

// ***API CALL #3 --- USE LATITUDE AND LONGITUDE TO FIND OUT 5 UPCOMING TIMES ISS WILL FLY OVERHEAD***

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss/v1/?lat=${coords.latitude}&lon=${coords.longitude}&alt=1650`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg),null);
      return;
    }

    const flyTimes = JSON.parse(body).response;
    callback(null, flyTimes);
  });
};

// ***CHAIN THE 3 API CALLS***

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error,ip) => {
    if (error) {
      console.log(`It didn't work! :${error}`);
    } else {
      fetchCoordsByIP(ip, (error,coords) => {
        if (error) {
          console.log(`It didn't work! :${error}`);
        } else {
          fetchISSFlyOverTimes(coords, (error,passes) => {
            if (error) {
              console.log(`It didn't work! :${error}`);
            } else {
              for (let pass of passes) {
                let date = new Date(pass.risetime * 1000);
                let duration = pass.duration;
                console.log(`Next pass at ${date} for ${duration} seconds!`);
              }
            }
          });
        }
      });
    }
  });
};




module.exports = {nextISSTimesForMyLocation};