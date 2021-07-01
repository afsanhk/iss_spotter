const {nextISSTimesForMyLocation } = require('./iss.js');

// TEST API CHAIN
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});


// TEST API CALL 1
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// TEST API CALL 2
// fetchCoordsByIP('209.195.89.171', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned coordinates:' , coordinates);
// });

// TEST API CALL 3
// let obj = { latitude: '49.27670', longitude: '-123.13000' };
// fetchISSFlyOverTimes(obj, (error, times) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned times:' , times);
// });
