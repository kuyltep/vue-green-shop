<template>
  <div class="comment-element">
    <div class="comment__header-section">
      <p class="commment__user">{{ showUserData() }}</p>
      <div ref="comment-raiting" class="commment__raiting">
        <div v-for="star in commentData.attributes.raiting" :key="star" class="raiting-point raiting-point_active">
        </div>
        <div v-for="star in (5 - commentData.attributes.raiting)" :key="star" class="raiting-point"></div>
      </div>
    </div>
    <p class="comment-body">{{ commentData.attributes.comment }}</p>
    <p class="comment-date">{{ showCommentData() }}</p>
  </div>
</template>

<script>
export default {
  props: {
    commentData: Object,
  },
  methods: {
    showUserData() {
      if (this.commentData.attributes.user.data.attributes.firstName && this.commentData.attributes.user.data.attributes.lastName) {
        return (this.commentData.attributes.user.data.attributes.firstName + " " + this.commentData.attributes.user.data.attributes.lastName);
      } else if (this.commentData.attributes.user.data.attributes.username) {
        return this.commentData.attributes.user.data.attributes.username;
      } else {
        return this.commentData.attributes.user.data.attributes.email;
      }
    },
    showCommentData() {
      return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        minute: '2-digit',
        hour: '2-digit',
      }).format(Date.parse(this.commentData.attributes.createdAt));
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.commentData);
    }, 0)
  }
}
</script>

<style scoped>
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

.comment-element {
  background: #FBFBFB;
  border-radius: 20px;
  height: fit-content;
  padding: 20px 40px;
  margin-bottom: 40px;
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
</style>