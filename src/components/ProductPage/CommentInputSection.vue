<template>
  <div class="comment-input__section">
    <textarea v-model="createCommentData.comment" class="comment-input__text" name="" id=""
      placeholder="Input your comment"></textarea>
    <div class="comment-input__stars-section commment__raiting">
      <div @click.prevent="setActiveCommentStar(point)" :ref="`comment-star-${point}`" v-for="point in 5" :key="point"
        class="raiting-point comment__raiting-point"></div>
    </div>
    <button @click.prevent="createProductComment" class="comment-input__send-button">Send</button>
  </div>
</template>

<script>
import errorTost from '@/toasts-plugins/error.tost';
export default {
  props: {
    productId: Number,
  },
  data() {
    return {
      createCommentData: {
        comment: '',
        raiting: null,
      },
    }
  },
  methods: {
    setActiveCommentStar(star) {
      for (let j = 0; j < 5; j++) {
        this.$refs[`comment-star-${j + 1}`][0].classList.remove('raiting-point_active');
      }
      for (let i = 0; i < star; i++) {
        this.$refs[`comment-star-${i + 1}`][0].classList.add('raiting-point_active');
      }
      this.createCommentData.raiting = star;
    },
    createProductComment() {
      const haveUserComment = this.$store.getters.getProductComments.some(comment => {
        return comment.attributes.user.data.id === this.$store.getters.getUser.id;
      })
      if (haveUserComment) {
        return errorTost("The user already has a review");
      }
      if (this.createCommentData.comment.length && this.createCommentData.raiting) {
        this.createCommentData.productId = this.productId;
        this.$store.dispatch('createProductCommentToServer', this.createCommentData);
      } else {
        errorTost('Error comment data');
      }
      this.createCommentData.comment = "";
      this.createCommentData.raiting = null;
      for (let j = 0; j < 5; j++) {
        this.$refs[`comment-star-${j + 1}`][0].classList.remove('raiting-point_active');
      }
    }
  }
}
</script>

<style scoped>
.commment__raiting {
  height: 30px;
  display: grid;
  grid-template-columns: repeat(5, 30px);
  grid-gap: 15px;
}

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
  transition: all .3s ease;
}

.raiting-point_active {
  z-index: 10;
  width: 30px;
  height: 30px;
  background-image: url("../../assets/img/cards/Star.svg");
  background-size: 30px 30px;
  transition: all .3s ease;
}

.comment-input__section {
  margin-top: 10%;
  display: grid;
  grid-template-columns: 8fr 2fr 1fr;
  grid-column-gap: 40px;
  padding: 20px;
}
</style>