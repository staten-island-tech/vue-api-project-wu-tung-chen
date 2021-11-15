const mapQuestKey = process.env.VUE_APP_MAPQUEST_API_KEY;

export default {
  /* async getMapRefactored() {
    try {
      const response = fetch(
        `http://www.mapquestapi.com/staticmap/v4/getmap?key=${mapQuestKey}&bestfit=51.8,-126.27,21.48,-64.42&size=880,540`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "image/jpeg",
          },
        }
      );
      const mapImage = await response.json;
      console.log(mapImage);
    } catch (error) {
      console.log(error);
    }
  }, */
  async getMap() {
    return fetch(
      `http://www.mapquestapi.com/staticmap/v4/getmap?key=${mapQuestKey}&bestfit=51.8,-126.27,21.48,-64.42&size=880,540`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "image/jpeg",
        },
      }
    )
      .then((response) => {
        console.log(response);
        response.blob();
      })
      .then((blob) => console.log(blob))
      .catch((error) => console.log(error));
  },
};

/* fetch(`http://www.mapquestapi.com/staticmap/v4/getmap?key=${process.env.VUE_APP_MAPQUEST_API_KEY}&bestfit=51.8,-126.27,21.48,-64.42&size=880,540`)
      .then(response => console.log(JSON.stringify(response.data)))
      .catch(error => console.log(error)); */
