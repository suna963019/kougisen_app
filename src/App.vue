<template>
  <v-app>
    <v-main>
      <v-app-bar class="head">
        <v-app-bar-nav-icon>
        </v-app-bar-nav-icon>
        <v-app-bar-title>
          <router-link to="/" class="normal">
            奈良県立高等技術専門校展
          </router-link>
        </v-app-bar-title>
        <div id="home-links">
          <router-link to="/" class="normal">
            <v-btn>infomation</v-btn>
          </router-link>
          <router-link to="/tetris" class="normal">
            <v-btn>Tetris</v-btn>
          </router-link>
          <router-link to="/slot" class="normal">
            <v-btn>Slot</v-btn>
          </router-link>
          <router-link to="/typing" class="normal">
            <v-btn>Typing</v-btn>
          </router-link>
          <router-link to="/ranking" class="normal">
            <v-btn>Ranking</v-btn>
          </router-link>
        </div>
      </v-app-bar>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {

}
</script>
<style scoped>
a,
p {
  color: #000;
}

.normal {
  text-decoration: none;
}

#home-links button {
  margin: 0 3vw;
}
</style>