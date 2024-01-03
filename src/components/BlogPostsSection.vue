<template>
  <div class="blog-posts">
    <h3 class="section-title">Our Blog Posts</h3>
    <p class="text-description title-description">We are an online plant shop offering a wide range of cheap and trendy
      plants.</p>
    <div class="cards-blog-posts">
      <div class="card" v-for="card in cardsInfo" :key="card.id">
        <div :style="{ background: madeBackground(card.image) }" class="image-container"></div>
        <div class="text-container">
          <p class="green-text">{{ card.date }} | Read in {{ card.minutes }} minutes</p>
          <h4 class="card-title">{{ card.title }}</h4>
          <p class="text-description">{{ card.description }}</p>
          <router-link class="card-link" to="/blogs">Read More</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      cardsInfo: [],
    }
  },
  methods: {
    madeBackground(image) {
      return `url(${image}) center no-repeat`;
    }
  },
  mounted() {
    axios.get('http://localhost:1337/api/blog-posts?populate[0]=image').then(response => {
      this.cardsInfo = response.data.data.map(item => {
        return {
          id: item.id,
          title: item.attributes.title,
          description: item.attributes.description,
          date: item.attributes.date,
          minutes: item.attributes.minutes,
          image: "http://localhost:1337" + item.attributes.image.data.attributes.url,
        }
      });
    }).catch(error => {
      console.log(error);
    })
  }
}
</script>

<style scoped>
.blog-posts {
  margin-bottom: 100px;

}

.cards-blog-posts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 45px;
}

.card {
  grid-template-rows: 1fr 1fr;
}

.image-container {
  height: 195px;
}

.text-container {
  padding: 9px 11px 13px 15px;
  background: #fbfbfb;
}

.section-title {
  color: #3D3D3D;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 15px;
}

.text-description {
  color: #727272;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 10px;
}

.title-description {
  margin-bottom: 35px;
  text-align: center;

}

.green-text {
  color: #46A358;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  margin-bottom: 4px;
}

.card-title {
  color: #3D3D3D;
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  margin-bottom: 4px;
}

.card-link {
  color: #46A358;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  text-decoration: none;
  display: inline-block;
}

.card-link::after {
  content: url("../assets/img/homepage/ArrowGreen.svg");
  vertical-align: middle;
  margin-left: 5px;
}
</style>