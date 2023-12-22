<template>
  <footer class="footer">
    <div class="first-row">
      <div class="first-card">
        <div class="card-img__block">
          <div class="ellipse"></div>
          <img src="../../assets/img/footer/cards/GarderCare.svg" alt="" class="card__img">
        </div>
        <div class="card-descr">
          <h4 class="card__title title_h4">Garden Care</h4>
          <p class="card__text text_descr">We are an online plant shop offering a wide range of cheap and trendy plants.
          </p>
        </div>
      </div>
      <div class="second-card">
        <div class="card-img__block">
          <div class="ellipse"></div>
          <img src="../../assets/img/footer/cards/PlantRenovation.svg" alt="" class="card__img">
        </div>
        <div class="card-descr">
          <h4 class="card__title title_h4">Plant Renovation</h4>
          <p class="card__text text_descr">We are an online plant shop offering a wide range of cheap and trendy plants.
          </p>
        </div>
      </div>
      <div class="third-card">
        <div class="card-img__block">
          <div class="ellipse"></div>
          <img src="../../assets/img/footer/cards/WateringGarden.svg" alt="" class="card__img">
        </div>
        <div class="card-descr">
          <h4 class="card__title title_h4">Watering Graden</h4>
          <p class="card__text text_descr">We are an online plant shop offering a wide range of cheap and trendy plants.
          </p>
        </div>
      </div>
      <div class="footer__form">
        <h4 class="footer-title form-title title_h4">Would you like to join newsletters?</h4>
        <form class="join-form">

          <input :class="{ invalid: formValidation }" v-model="email" placeholder="enter your email adress"
            class="join-form__input" type="text" name="footer-input" id="footer-input">
          <button @click.prevent="submitForm" class="join-form__btn white-text-btns" type="submit">Join</button>
        </form>
        <p class="join-form__text text_descr">We usually post offers and challenges in newsletter. We’re your online
          houseplant
          destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to
          yours! </p>
      </div>
    </div>
    <div class="second-row">
      <img src="../../assets//img/header/Logo.svg" alt="" class="footer__logo">
      <address class="footer__adress footer-links">70 West Buckingham Ave. Farmingdale, NY 11735</address>
      <a class="footer__mail-link footer-links" href="mailto:">contact@greenshop.com</a>
      <a class="footer__tel-link footer-links" href="tel:+8801911717490">+88 01911 717 490</a>
    </div>
    <div class="third-row">
      <div class="my-accounts__links">
        <h4 class="footer-links__title title_h4">My Account</h4>
        <ul class="footer__links-list">
          <li class="footer__links-item"><a href="#" class="footer__links-link">My Account</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">Our stories</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">Contact us</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">Career</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">Specials</a></li>
        </ul>
      </div>
      <div class="help-and-guide__links">
        <h4 class="footer-links__title title_h4">Help & Guide</h4>
        <ul class="footer__links-list">
          <li class="footer__links-item"><a href="#" class="footer__links-link">Help center</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">How to buy</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">Shipping & delivery</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">Product policy</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">How to return</a></li>
        </ul>
      </div>
      <div class="categories__links">
        <h4 class="footer-links__title title_h4">My Account</h4>
        <ul class="footer__links-list">
          <li class="footer__links-item"><a href="#" class="footer__links-link">My Account</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">Our stories</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">Contact us</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">Career</a></li>
          <li class="footer__links-item"><a href="#" class="footer__links-link">Specials</a></li>
        </ul>
      </div>
      <div class="social-media__links">
        <div class="social-media__block">
          <h4 class="title_h4 social-link__title">Social Media</h4>
          <ul class="social-link__list">
            <li class="social-link__item">
              <a href="#" class="social-link__link facebook"></a>
            </li>
            <li class="social-link__item">
              <a href="#" class="social-link__link instagram"></a>
            </li>
            <li class="social-link__item">
              <a href="#" class="social-link__link twitter"></a>
            </li>
            <li class="social-link__item">
              <a href="#" class="social-link__link linkedin"></a>
            </li>
            <li class="social-link__item">
              <a href="#" class="social-link__link union"></a>
            </li>
          </ul>
        </div>
        <div class="we-accept__block">
          <h4 class="title_h4 we-accept__item">We accept</h4>
          <img class="we-accept__img" src="../../assets/img/footer/PaySystems.png" alt="">
        </div>
      </div>
    </div>
    <div class="fourth-row descr">
      © 2021 GreenShop. All Rights Reserved.
    </div>
  </footer>
</template>

<script>
import errorToast from '@/toasts-plugins/error.tost';
import successToast from '@/toasts-plugins/success.tost';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
    }
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.v$.$touch();
        errorToast('Join error')
        return;
      }
      // TODO: Make a request to email join
      successToast('Join success');
    }
  },
  computed: {
    formValidation() {
      return this.v$.email.$dirty && this.v$.email.required.$invalid || this.v$.email.$dirty && this.v$.email.email.$invalid;
    }
  },
  validations() {
    return {
      email: { required, email },
    }
  }
}
</script>

<style scoped>
.footer {
  display: grid;
  grid-template-rows: 260px 90px 240px 50px;
}

.first-row {
  display: grid;
  grid-row: 1/2;
  grid-template-columns: repeat(3, minmax(250px, 1fr)) minmax(400px, 2fr);
  grid-gap: 20px;
  background: #FBFBFB;
}

.first-card {
  grid-column: 1/2;
  padding: 25px;
  border-right: 1px solid rgba(70, 163, 88, 0.10);
}

.second-card {
  grid-column: 2/3;
  padding: 25px;
  border-right: 1px solid rgba(70, 163, 88, 0.10);
}

.fourth-row {
  grid-row: 4/5;
  text-align: center;
  padding-top: 7px;
}

.third-card {
  grid-column: 3/4;
  padding: 25px;
  border-right: 1px solid rgba(70, 163, 88, 0.10);
}

.footer__form {
  grid-column: 4/5;
  padding: 25px;
}

.card-img__block {
  position: relative;
  margin-bottom: 15px;
}

.invalid {
  outline: 1px solid red;
}

.invalid-text {
  color: red;
}

.form-title {
  margin-bottom: 18px;
}

.title_h4 {
  color: #3D3D3D;
  font-size: 17px;
  font-weight: 700;
}

.card__title {
  margin-bottom: 9px;
}

.text_descr {
  color: #727272;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  /* 157.143% */
}

.ellipse {
  position: absolute;
  top: 19px;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background: rgba(70, 163, 88, 0.13);
}

.join-form {
  display: flex;
  margin-bottom: 17px;
}

.join-form__input {
  width: 270px;
  border-radius: 6px 0 0 6px;
  background: #FFF;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.06);
  padding: 12px 0 12px 12px;
  border: none;
}

.join-form__input:focus {
  outline: none;
}

.join-form__btn {
  border-radius: 0px 6px 6px 0px;
  padding: 12px 25px;
  border: none;
  cursor: pointer;
}

.white-text-btns {
  color: #FFF;
  font-size: 18px;
  font-weight: 700;
  line-height: 16px;
  background: #46A358;
}

.second-row {
  grid-row: 2/3;
  align-items: center;
  text-align: left;
  background: rgba(70, 163, 88, 0.10);
  display: grid;
  grid-template-columns: repeat(3, minmax(260px, 1fr)) minmax(400px, 2fr);
  padding: 0 25px;
}

.footer__logo {
  grid-column: 1/2;
}

.footer-links {
  color: #3D3D3D;
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
}

.footer__adress {
  grid-column: 2/3;
}

.footer__adress::before {
  content: url("../../assets/img/footer/links-icons/Location.svg");
  padding-right: 5px;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.footer__mail-link {
  grid-column: 3/4;
}

.footer__mail-link::before {
  content: url("../../assets/img/footer/links-icons/Message.svg");
  padding-right: 5px;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.footer__tel-link {
  grid-column: 4/5;
}

.footer__tel-link::before {
  content: url("../../assets/img/footer/links-icons/Calling.svg");
  padding-right: 5px;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.footer__logo {
  grid-column: 1/2;
}

.third-row {
  padding: 26px 0 0 25px;
  grid-row: 3/4;
  background: #FBFBFB;
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr)) minmax(400px, 2fr);
}

.my-accounts__links {
  grid-column: 1/2;
}

.footer-links__title {
  margin-bottom: 8px;
}

.footer__links-list {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.footer__links-item {
  margin-bottom: 14px;
}

.footer__links-link {
  text-decoration: none;
  color: #3D3D3D;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
}

.footer__links-item:last-child {
  margin-bottom: 0;
}

.help-and-guide__links {
  grid-column: 2/3;
}

.categories__links {
  grid-column: 3/4;
}

.social-media__links {
  grid-column: 4/5;
}

.social-link__list {
  list-style: none;
  display: flex;
}

.social-link__link {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid rgba(70, 163, 88, 0.20);
  margin-right: 10px;
}

.social-link__link:last-child {
  margin-right: 10px;
}

.instagram {
  background-size: 16px 16x;
  background: url("../../assets/img/footer/social-icons/Instagram.svg") center no-repeat;
}

.facebook {
  background-size: 8px 16px;
  background: url("../../assets/img/footer/social-icons/Facebook.svg") center no-repeat;
}

.twitter {
  background-size: 16px 13px;
  background: url("../../assets/img/footer/social-icons/Twitter.svg") center no-repeat;
}

.linkedin {
  background-size: 16px 16px;
  background: url("../../assets/img/footer/social-icons/Linkedin.svg") center no-repeat;
}

.union {
  background-size: 16px 16x;
  background: url("../../assets/img/footer/social-icons/Union.svg") center no-repeat;
}

.social-link__title {
  margin-bottom: 20px;
}

.social-media__block {
  margin-bottom: 33px;
}

.we-accept__block {
  margin-bottom: 13px;
}
</style>