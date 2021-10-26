<template>
  <div class="login">
    <div class="title">
      <svg viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M33 0C14.775 0 0 14.775 0 33c0 18.226 14.775 33 33 33 18.227 0 33-14.774 33-33C66 14.776 51.227.002 33 .002V0zm15.133 47.596a2.056 2.056 0 01-2.83.682c-7.747-4.733-17.5-5.805-28.988-3.18a2.058 2.058 0 01-.915-4.012c12.57-2.873 23.353-1.636 32.052 3.68.969.595 1.276 1.86.681 2.83zm4.04-8.987a2.572 2.572 0 01-3.54.85c-8.87-5.454-22.39-7.033-32.883-3.849a2.576 2.576 0 01-3.21-1.714 2.577 2.577 0 011.715-3.209c11.985-3.636 26.884-1.875 37.07 4.385a2.572 2.572 0 01.847 3.537zm.346-9.357c-10.636-6.317-28.183-6.898-38.338-3.816a3.086 3.086 0 11-1.791-5.907c11.656-3.539 31.034-2.855 43.28 4.414a3.083 3.083 0 011.079 4.23 3.084 3.084 0 01-4.228 1.08h-.002z"
          fill="#fff"
        />
      </svg>
      <h1 class="title-inner">Spotify AINT</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {},
};
</script>

<style scoped lang="scss">
.login {
  padding-top: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
  .title-inner {
    margin-left: 20px;
    font-size: 60px;
    font-weight: 700;
    margin-bottom: 0;
    margin-top: 0;
  }

  svg {
    max-width: 66px;
  }
}

.text {
  margin-bottom: 70px;
  font-size: 30px;
}
</style>
