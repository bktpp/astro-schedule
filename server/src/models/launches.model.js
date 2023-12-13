const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

const launch = {
   flightNumber: 100,
   mission: "Kepler Exploration X",
   rocket: "Explorer IS1",
   launchDate: new Date("December 27, 2050"),
   target: "Kepler-442 b",
   customer: ["NASA", "Bktp"],
   upcoming: true,
   success: true,
};

saveLaunch(launch);

async function existsLaunchWithId(launchId) {
   return await launchesDatabase.findOne({
      flightNumber: launchId,
   });
}

async function getLatestFlightNumber() {
   const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

   if (!latestLaunch) {
      return DEFAULT_FLIGHT_NUMBER;
   }

   return latestLaunch.flightNumber;
}

async function getAllLaunches() {
   return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
   const planet = await planets.findOne({
      keplerName: launch.target,
   });
   if (!planet) {
      throw new Error("No matching planets found.");
   }

   await launchesDatabase.findOneAndUpdate(
      {
         flightNumber: launch.flightNumber,
      },
      launch,
      {
         upsert: true,
      }
   );
}

async function scheduleNewLaunch(launch) {
   const newFlightNumber = (await getLatestFlightNumber()) + 1;

   const newLaunch = Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["ZTM", "NASA"],
      flightNumber: newFlightNumber,
   });

   await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
   const aborted = await launchesDatabase.updateOne(
      {
         flightNumber: launchId,
      },
      {
         upcoming: false,
         success: false,
      }
   );
   console.log(aborted);

   return aborted.matchedCount === 1;
}

module.exports = {
   existsLaunchWithId,
   getAllLaunches,
   scheduleNewLaunch,
   abortLaunchById,
};
