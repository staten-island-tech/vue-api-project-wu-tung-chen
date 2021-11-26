const mapQuestKey = process.env.VUE_APP_MAPQUEST_API_KEY;
const positionstackKey = process.env.VUE_APP_POSITIONSTACK_API_KEY;

let previousMapURL = null;

export default {
  async getMap(latTop, longLeft, latBot, longRight) {
    try {
      const response = await fetch(
        `http://www.mapquestapi.com/staticmap/v5/map?key=${mapQuestKey}&boundingBox=${latTop},${longLeft},${latBot},${longRight}&size=1000,600`,
        {
          method: "GET",
        }
      ); // This returns an image/jpeg

      if (!response.ok) {
        console.log("Reponse not ok:");
        console.log(response);
      } else {
        const imageBlob = await response.blob();

        // Removes link to previous image (in order to keep memory usage down)

        URL.revokeObjectURL(previousMapURL);

        // Generates a URL and returns as a promise since it's an async function
        previousMapURL = URL.createObjectURL(imageBlob);
        return previousMapURL;
      }
    } catch (error) {
      // error
      console.log(`An MapQuestAPI error has occured: ${error}`);
    }
  },
  async getPlaceData(latitude, longitude) {
    try {
      const response = await fetch(
        `http://api.positionstack.com/v1/reverse?access_key=${positionstackKey}&query=${latitude},${longitude}&limit=1`,
        {
          method: "GET",
        }
      );

      const DataJSON = await response.json();

      return DataJSON.data[0];
    } catch (error) {
      // error
      console.log(`An PositionstackAPI error has occured: ${error}`);
    }
  },
};
