<template>
  <p class="redirecting">Authorization</p>
  <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
</template>

<script>
export default {
  mounted() {
    const TOKEN = this.$route.query['access_token'];
    const PROVIDER = this.$route.params.providerName;
    fetch(`http://localhost:1337/api/auth/${PROVIDER}/callback?access_token=${TOKEN}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(res => {
        console.log(res);
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('userData', JSON.stringify(res.user));
        setTimeout(() => this.$router.push('/'), 2000);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>

<style scoped>
.redirecting {
  font-size: 28px;
  font-weight: 700;
  color: #3D3D3D;
  margin-bottom: 10px;
}
</style>