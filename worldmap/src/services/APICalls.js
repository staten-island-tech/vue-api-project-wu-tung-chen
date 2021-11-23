const mapQuestKey = process.env.VUE_APP_MAPQUEST_API_KEY;

export default {
  async getMap() {
    try {
      const response = await fetch(
        `http://www.mapquestapi.com/staticmap/v4/getmap?key=${mapQuestKey}&bestfit=51.8,-126.27,21.48,-64.42&size=880,540`,
        {
          method: "GET",
        }
      ); // This returns an image/jpeg

      console.log(response);

      const imageBlob = await response.blob();

      if (imageBlob.size != 0) {
        // Generates URL and returns it as a promise (since it's inside async function)
        return URL.createObjectURL(imageBlob);
      } else {
        console.log(`No image returned!`);
      }
    } catch (error) {
      // error
      console.log(`An error has occured: ${error}`);
    }
  },
};
