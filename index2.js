const {nextISSTimesForMyLocation} = require('./iss_promised')

nextISSTimesForMyLocation()
  .then((passTimes) => {
    // Could refactor this as a function
    for (let pass of passTimes) {
      let date = new Date(pass.risetime * 1000);
      let duration = pass.duration;
      console.log(`Next pass at ${date} for ${duration} seconds!`);
    }
  })
  .catch((error) => console.log(`It didn't work: ${error.message}`))