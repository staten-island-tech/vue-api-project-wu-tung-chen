<template>
  <div class="about">

    <div class="search-container">
      <div class="mag-glass"></div>
      <div class="input">
        <input type="text" placeholder="Search..." id="searchText">
      </div>
      <span class="deleteText" onclick="document.getElementById('searchText').value = ''"></span>
    </div>
    
  </div>
</template>

<script>

// import APICalls from "@/APICalls.js";

export default {
  name: "About",
  components: {

  },

  mounted: function(){

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
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  margin-bottom: -2rem;
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

</style>
