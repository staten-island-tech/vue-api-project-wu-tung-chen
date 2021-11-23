const mapQuestKey = process.env.VUE_APP_MAPQUEST_API_KEY;

export default {
  async getMap(latTop, longLeft, latBot, longRight) {
    try {
      const response = await fetch(
        `http://www.mapquestapi.com/staticmap/v4/getmap?key=${mapQuestKey}&bestfit=${latTop},${longLeft},${latBot},${longRight}&size=880,540`,
        {
          method: "GET",
        }
      ); // This returns an image/jpeg

      if (!response.ok) {
        console.log("Reponse not ok:");
        console.log(response);
      } else {
        const imageBlob = await response.blob();

        // Generates a URL and returns as a promise since it's an async function
        return URL.createObjectURL(imageBlob);
      }
    } catch (error) {
      // error
      console.log(`An error has occured: ${error}`);
    }
  },
};
