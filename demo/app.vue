<template>
  <div>
    <v-icon name="right" />
    <v-svg-icon name="right" />
    <v-svg-icon name="zhongguo" style="font-size: 100px;" />
    <v-icon name="right" style="color: red; font-size: 2em;" />
    <v-svg-icon name="right" style="color: blue; font-size: 14px;" />
    <fab-icon name="github" />
    <ion-icon name="finger-print" />
    <ion-logo-icon name="javascript" />
    <md-icon>description</md-icon>
  </div>
</template>

<script>
export default {
  data() {
    return {
      add: require('ionicons/dist/svg/ios-add.svg')
    }
  }
}
</script>
