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
    },
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