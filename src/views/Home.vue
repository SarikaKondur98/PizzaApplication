<template>
  <div>
    <v-img src="/Static/Pizza.jpg">
      <v-container text-xs-center>
        <v-layout>
          <v-flex xs12 sm6 md12>
            <h1 class="display-3 my-5">Welcome to Our Pizza Place</h1>
            <v-btn color="white" outline @click.native="$router.push('/Orders')"
              >Order a Pizza</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h1 {
  font-family: "Potta One", cursive;
  padding-top: 100px;
  color: azure;
}
</style>