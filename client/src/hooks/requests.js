const API_URL = "http://localhost:8000";

async function httpGetPlanets() {
   const response = await fetch(`${API_URL}/planets`);
   return await response.json();
}

async function httpGetLaunches() {
   const response = await fetch(`${API_URL}/launches`);
   const fetchedLaunches = await response.json();

   return fetchedLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber;
   });
   // Load launches, sort by flight number, and return as JSON.
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
   try {
      return await fetch(`${API_URL}/launches`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(launch),
      });
   } catch (error) {
      return { ok: false };
   }
}

async function httpAbortLaunch(id) {
   // TODO: Once API is ready.
   // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
