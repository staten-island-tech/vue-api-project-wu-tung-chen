const mapQuestKey = process.env.VUE_APP_MAPQUEST_API_KEY;

export default {
  async getMapRefactored() {
    try {
      const responsePromise = fetch(
        `http://www.mapquestapi.com/staticmap/v4/getmap?key=${mapQuestKey}&bestfit=51.8,-126.27,21.48,-64.42&size=880,540`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const response = responsePromise.then((response) =>
        console.log(response)
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  /* async getMap() {
    return fetch(
      `http://www.mapquestapi.com/staticmap/v4/getmap?key=${mapQuestKey}&bestfit=51.8,-126.27,21.48,-64.42&size=880,540`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((response) => {
        console.log(response);
        response.Blob();
      })
      .then((blob) => console.log(blob))
      .catch((error) => console.log(error));
  }, */
  async getMap() {
    const response = await fetch(
      `http://www.mapquestapi.com/staticmap/v4/getmap?key=${mapQuestKey}&bestfit=51.8,-126.27,21.48,-64.42&size=880,540`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const image = await response.blob();
    console.log(image);
    const imageObjectURL = URL.createObjectURL(image);
    console.log(imageObjectURL);
  },
};
