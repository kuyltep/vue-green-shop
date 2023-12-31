<template>
  <div class="banner">
    <div class="left-banner">
      <div :style="{ background: leftBannerImage }" class="banner-left-image"></div>
      <div class="banner-text">
        <h4 class="banner-title">Summer cactus
          & succulents</h4>
        <p class="banner-descr">We are an online plant shop offering a wide range of cheap and trendy plants</p>
        <router-link class="banner-link" to="/blogs">Find More</router-link>
      </div>
    </div>
    <div class="right-banner">
      <div :style="{ background: rightBannerImage }" class="banner-right-image"></div>
      <div class="banner-text">
        <h4 class="banner-title">Styling Trends
          & much more</h4>
        <p class="banner-descr">We are an online plant shop offering a wide range of cheap and trendy plants</p>
        <router-link class="banner-link" to="/blogs">Find More</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      leftBannerImage: "",
      rightBannerImage: "",
    }
  },
  created() {
    axios.get('http://localhost:1337/api/banners?populate[0]=image').then((response) => {
      console.log(response.data.data);
      this.leftBannerImage = `url(http://localhost:1337${response.data.data[0].attributes.image.data[0].attributes.url}) center/cover no-repeat`;
      this.rightBannerImage = `url(http://localhost:1337${response.data.data[1].attributes.image.data[0].attributes.url}) center/cover no-repeat`;

    }).catch((error) => {
      console.log(error);
    })
  }
}
</script>

<style scoped>
.banner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  padding: 100px 0 150px 0;

}

.left-banner {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  background: #FBFBFB;
}

.right-banner {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  background: #FBFBFB;
}

.banner-link {
  text-decoration: none;
  color: #FFF;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  border-radius: 6px;
  background: #46A358;
  padding: 10px 25px;
}

.banner-link::after {
  content: url("../assets/img/homepage/Arrow.svg");
  width: 20px;
  height: 10px;
  vertical-align: middle;
  margin-left: 5px;
}

.banner-text {
  text-align: right;
  padding: 20px 25px 40px 0;
}

.banner-title {
  color: #3D3D3D;
  text-align: right;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.banner-descr {
  color: #727272;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 20px;
}

.banner-left-image {
  z-index: 2;
  width: 100%;
  height: 100%;
}

.banner-right-image {
  z-index: 2;
  width: 100%;
  height: 100%;
}
</style>