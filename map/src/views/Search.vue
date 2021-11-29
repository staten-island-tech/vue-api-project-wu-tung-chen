<template>
  <div class="about">

    <div class="search-container">
      <div class="mag-glass"></div>
        <form class="search-bar" @submit.prevent="getSearchData(searchQuery)">
          <div class="input">
            <!-- <input type="text" placeholder="Search..." id="searchText"> -->
            <input
              type="text"
              class="search-area"
              placeholder="Search Place"
              v-model="searchQuery"
            />
          </div>
          <span class="deleteText" @click="searchQuery = ''"></span>
        </form>
    </div>

    <table class="table">
      <thead class="table-head">
        <tr>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>County</th>
          <th>Region</th>
          <th>Country</th>
          <th>Delete Row</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="(location, index) in locations"
          :key="index">
          <td>{{ location.lat }}</td>
          <td>{{ location.long }}</td>
          <td>{{ location.county }}</td>
          <td>{{ location.region ? location.region : location.name}}</td>
          <td>{{ location.country }}</td>
          <td @click="locations.splice(index, 1)" class="delete-place">✖</td>
        </tr>

        <!-- <tr>
          <td>36.97</td>
          <td>-92.29</td>
          <td>Douglass County</td>
          <td>Missouri</td>
          <td>United States</td>
          <td class="delete-place">✖</td>
        </tr> -->

      </tbody>

    </table>
  
  </div>
</template>

<script>
import APICalls from "@/APICalls.js";

export default {
  name: "About",
  components: {
  },
  data() {
    return {
      searchQuery: "",
      locations: [
        {
          lat: 36.97,
          long: -92.30,

          clickedLat: 36.96,
          clickedLong: -92.29,

          county: "Douglas",
          region: "MO",
          country: "US",
        }
      ],
    }
  },

  methods: {
    getSearchData(query) {
      APICalls.getRealCoordsData(query).then((locationData) => {
        if (locationData) {
          this.locations.push({
            lat: Number(locationData.locations[0].latLng.lat.toFixed(2)),
            long: Number(locationData.locations[0].latLng.lng.toFixed(2)),

            county: locationData.locations[0].adminArea4,
            region: locationData.locations[0].adminArea3,
            country: locationData.locations[0].adminArea1,
          })
          // Clears the search query
          this.searchQuery = "";
        } else {
          window.alert(`No location found with query: ${query}`);
        }
      });
    }
  },

  watch: {
    locations(value) {
      // Updates locations in session storage
      sessionStorage.setItem("locations", JSON.stringify(value));
    },
  },
  
  mounted: function(){

    const previousLocations = JSON.parse(sessionStorage.getItem("locations"));

    if (previousLocations) {
      this.locations = previousLocations;
    } else {
      sessionStorage.setItem("locations", JSON.stringify(this.locations))
    }

    const glass = document.querySelector('.mag-glass');
    const search = document.querySelector('.search-container');

    glass.onclick = function(){
      search.classList.toggle('active')
    } 

  }
}


</script>


<style scoped>

.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -9999rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  cursor: url(../assets/genshin_pointer.png), auto;
}

.search-container {
  position: relative;
  width: 3.75rem;
  height: 3.75rem;
  margin: 0.4rem 0rem;

  background: #fff;
  /* background: linear-gradient(rgba(248, 246, 255, 0.85), rgba(248, 246, 255, 0.85)), url(../assets/cherryblossoms.jpg) no-repeat; */
  border-radius: 3.75rem;
  transition: 0.5s;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.search-container.active {
  width: 35.45rem;
}

.search-container .mag-glass {
  position: absolute;
  top: 0;
  left: 0;
  width: 3.75rem;
  height: 3.75rem;
  background: #fff;
  /* background: linear-gradient(rgba(248, 246, 255, 0.85), rgba(248, 246, 255, 0.85)), url(../assets/cherryblossoms.jpg) no-repeat; */
  border-radius: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.search-container .mag-glass::before {
  content: '';
  position: absolute;
  width: 0.94rem;
  height: 0.94rem;
  border: 0.19rem solid #000000;
  border-radius: 50%;
  transform: translate(-3px, -3px);
}

.search-container .mag-glass::after {
  content: '';
  position: absolute;
  width:  0.19rem;
  height: 0.75rem;
  background: #000000;
  transform: translate(8px, 8px) rotate(315deg);
}

.search-container .input {
  position: relative;
  width: 29rem;
  height: 3.75rem;
  left: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-container .input input {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1.125rem;
  padding: 10px 0;
  background: #fff;
  /* background: linear-gradient(rgba(248, 246, 255, 0.85), rgba(248, 246, 255, 0.85)), url(../assets/cherryblossoms.jpg) no-repeat; */
}

.deleteText {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0.94rem;
  height: 0.94rem;
  right: 0.94rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.deleteText::before{
  position: absolute;
  content: '';
  width: 0.063rem;
  height: 0.94rem;
  background: #999;
  transform: rotate(45deg);
}

.deleteText::after{
  position: absolute;
  content: '';
  width: 0.063rem;
  height: 0.94rem;
  background: #999;
  transform: rotate(315deg);
}

/* Table Code */

.table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 0.5rem;
  box-shadow: 0 0 1rem #D3D3D3;
}

.table thead tr {
  background: linear-gradient(rgba(52, 110, 163, 0.85), rgba(92, 74, 158, 0.85)), url(../assets/cherryblossoms.jpg) no-repeat top right; 
  color: white;
  text-align: left;
}

.table th,
.table td {
  padding: 1.2rem 1.5rem;

  font-size: 1rem;
  text-align: center;
}

.table tbody tr {
  border-bottom: 0.1rem solid #dddddd;
  background: linear-gradient(rgb(252, 251, 255, 0.95), rgb(252, 251, 255, 0.95)), url(../assets/cherryblossoms.jpg) no-repeat left;
  cursor: pointer;
}

.table tbody tr:nth-last-of-type(even) {
  background: linear-gradient(rgba(248, 246, 255, 0.9), rgba(248, 246, 255, 0.9)), url(../assets/cherryblossoms.jpg) no-repeat bottom left;
}

.table tbody tr:last-of-type {
  border-bottom: 0.2rem solid rgba(92, 74, 158, 0.85);
}

/* .table tbody tr:hover {
  background-color: cyan;
} */

.table .delete-place{
  transition: all 0.5s;
}

.table .delete-place:hover {
  background: linear-gradient(rgba(214, 31, 31, 0.85), rgba(214, 31, 31, 0.85)), url(../assets/cherryblossoms.jpg) no-repeat;
}

</style>
