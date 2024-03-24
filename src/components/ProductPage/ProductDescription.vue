<template>
  <div class="bottom-section__title-section">
    <h4 @click.prevent="changeActiveElement" ref="description" class="bottom-section__title description">
      Product
      description</h4>
    <h4 @click.prevent="changeActiveElement" ref="reviews" class="bottom-section__title reviews">Reviews ()</h4>
  </div>
  <transition name="description">

    <div v-if="this.activeBlock === 'description' && this.fullDescription" class="description-section">
      <div v-for="description in fullDescription" :key="description.children" class="bottom-section__description-block">
        <p v-if="description.type === 'paragraph'" class="bottom-section__description">{{ description.children[0].text
          }}
        </p>
        <p v-else class="bottom-section__title-description">{{ description.children[0].text }}</p>
      </div>
    </div>
    <div v-else class="comments-section">
      <div class="comment-element">
        <div class="comment__header-section">
          <p class="commment__user">Vlad</p>
          <div ref="comment-raiting" class="commment__raiting">
            <div v-for="star in raiting" :key="star" class="raiting-point raiting-point_active"></div>
            <div v-for="star in (5 - raiting)" :key="star" class="raiting-point"></div>
          </div>
        </div>
        <p class="comment-body">jfaslk;fjaasljfldsjflsd;fjsal;fjslkfjsdjfffffffffffffffffsalfjsadlfjsdlkafjlsdajf</p>
        <p class="comment-date">01.12.2023</p>
      </div>
      <div class="comment-input__section">
        <textarea class="comment-input__text" name="" id="" placeholder="Input your comment"></textarea>
        <div class="comment-input__stars-section commment__raiting">
          <div :ref="`comment-star-${point}`" v-for="point in 5" :key="point"
            class="raiting-point comment__raiting-point"></div>
        </div>
        <button class="comment-input__send-button">Send</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    fullDescription: Object,
  },
  data() {
    return {
      activeElement: null,
      activeBlock: 'description',
      raiting: 3,
    }
  },
  methods: {
    changeActiveElement(event) {
      if (this.activeElement) {
        this.activeElement.classList.remove('active');
        this.activeElement = null;
      }
      this.activeBlock = event.target.classList[1];
      this.activeElement = event.target;
      this.activeElement.classList.add('active');
      console.log(this.activeElement);
      setTimeout(() => {
        // this.showProductRaiting(2);
      }, 10)
    },
    // showProductRaiting(raiting) {
    //   const raitingElements = [];
    //   for (let i = 1; i <= raiting; i++) {
    //     const raitingStarElement = `<div class="raiting-point raiting-point_active"></div>`;
    //     this.$refs['comment-raiting'].insertAdjacentHTML('beforeEnd', raitingStarElement);
    //   }
    //   for (let j = 5 - raiting; j <= 5; j++) {
    //     const raitingStarElementEmpty = `<div class="raiting-point"></div>`;
    //     this.$refs['comment-raiting'].insertAdjacentHTML('beforeEnd', raitingStarElementEmpty);
    //   }
    //   return raitingElements.join('').slice(1, -1);
    // }
  },
  mounted() {
    setTimeout(() => {
      this.activeElement = this.$refs["description"];
      this.activeElement.classList.add('active');
    }, 0)
  }
}
</script>

<style scoped>
.comment-input__text {
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 16px;
  border: 2px solid #46A358;
  border-radius: 5px;
  resize: none;
}

.comment-input__text:focus {
  outline: none;
  border: 2px solid #46A358;
}

.comment__raiting-point {
  cursor: pointer;
  transition: all .2s ease-in-out;
}

.comment__raiting-point:hover {
  transform: scale(1.1);
}

.comment-input__send-button {
  font-size: 18px;
  color: #fff;
  font-weight: 700;
  background: #46A358;
  padding: 10px 20px;
  border-radius: 10px;
  transition: all .3s ease;
  cursor: pointer;
  height: 45px;
}

.comment-input__send-button:hover {
  transform: scale(1.1);
}

.comment-input__send-button::after {
  content: "→";
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  margin-left: 5px;
}

.raiting-point {
  z-index: 10;
  width: 30px;
  height: 30px;
  background-image: url("../../assets/img/cards/StarEmpty.svg");
  background-size: 30px 30px;
}

.raiting-point_active {
  z-index: 10;
  width: 30px;
  height: 30px;
  background-image: url("../../assets/img/cards/Star.svg");
  background-size: 30px 30px;
}

.comments-section {
  padding: 20px;
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  display: grid;
}

.comment-input__section {
  margin-top: 15%;
  display: grid;
  grid-template-columns: 8fr 2fr 1fr;
  grid-column-gap: 40px;
  padding: 20px;
}

.comment-element {
  background: #FBFBFB;
  border-radius: 20px;
  height: fit-content;
  padding: 20px 40px;
}

.commment__user {
  font-size: 28px;
  color: #46A358;
  font-weight: 500;
}

.comment-body {
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 30px;
}

.comment-date {
  text-align: right;
  font-size: 16px;
}

.comment__header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.commment__raiting {
  height: 30px;
  display: grid;
  grid-template-columns: repeat(5, 30px);
  grid-gap: 15px;
}

.description-enter-active {
  transition: all 0.3s ease-out;
}

.description-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.description-enter-from,
.description-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.active {
  color: #46A358;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 3px solid #46A358;
  opacity: 1;
  transition: opacity .5s ease-in-out;
}

.bottom-section__title-section {
  display: flex;
  border-bottom: .5px solid #46A358;
  margin-bottom: 10px;

}

.bottom-section__title {
  font-size: 16px;
  cursor: pointer;
  padding-bottom: 10px;
  transition: transform .5s ease;
}

.bottom-section__title:hover {
  transform: scale(1.03);
}

.bottom-section__title:not(:last-child) {
  margin-right: 30px;
}

.bottom-section__description {
  font-size: 14px;
  color: #727272;
  font-weight: 400;
  margin-bottom: 30px;
}

.bottom-section__title-description {
  font-size: 14px;
  color: #3d3d3d;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>