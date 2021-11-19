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
      const imageBlob = await response.blob(); // Returns a blob, whatever that is
      const imageURL = URL.createObjectURL(imageBlob); // Generates a url for that image
      return imageURL; // Returns a promise
    } catch (error) {
      // error
      console.log(`An error has occured: ${error}`);
    }
  },
};
