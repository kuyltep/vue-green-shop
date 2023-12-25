<template>
  <h4 class="details-title">Personal Information</h4>
  <div class="details">
    <form enctype="multipart/form-data" method="post">
      <div class="personal-information">
        <div class="firstname-div input-block">
          <label class="label-for-input" for="firstname">First Name <span class="required-symbol">*</span></label>
          <input class="personal-input" type="text" name="firstname" id="firstname">
        </div>
        <div class="lastname-div input-block">
          <label class="label-for-input" for="lastname">Last Name <span class="required-symbol">*</span></label>
          <input class="personal-input" type="text" name="lastname" id="lastname">
        </div>
        <div class="email-div input-block">
          <label class="label-for-input" for="email">Email address <span class="required-symbol">*</span></label>
          <input class="personal-input" type="text" name="email" id="email">
        </div>
        <div class="phone-div input-block">
          <label class="label-for-input" for="phone">Phone number <span class="required-symbol">*</span></label>
          <input class="personal-input" type="text" name="phone" id="phone">
        </div>
        <div class="username-div input-block">
          <label class="label-for-input" for="username">Username <span class="required-symbol">*</span> </label>
          <input class="personal-input" type="text" name="username" id="username">
        </div>
        <div class="photo-div">
          <h4 class="label-for-input">Photo</h4>
          <div class="photo-div-grid">
            <label for="photo">
              <div class="circle-for-image">
                <img src="../../assets/img/profile/photo.svg" class="photo-image" alt="">
              </div>
              <input class="photo-input" type="file" name="photo" id="photo" accept="image/*">
            </label>
            <button type="submit" class="change-button">Change</button>
            <button class="remove-button">Remove</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.details-title {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
}

.required-symbol {
  color: #F03800;
  font-size: 22px;
  font-weight: 400;
}

.input-block {
  display: flex;
  flex-direction: column;
}

.label-for-input {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  margin-bottom: 10px;
}

.personal-information {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 60px);
  grid-gap: 30px;
}

.personal-input {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  padding: 8px 0 8px 10px;
}

.personal-input:focus {
  outline: 1px solid #46A358;
}

.photo-div-grid {
  display: flex;
}

.photo {
  display: inline-block;
}

.photo-input {
  display: none;
}

.circle-for-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #EAEAEA;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.change-button {
  margin-right: 20px;
  margin-left: 25px;
  border-radius: 3px;
  background: #46A358;
  padding: 12px 24px;
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.remove-button {
  cursor: pointer;
  color: #3D3D3D;
  font-size: 14px;
  font-weight: 400;
}
</style>