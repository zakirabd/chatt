<template>
  <q-page class=" flex-center container">
    <waitingOrders />
  </q-page>
</template>

<script>
import waitingOrders from '../components/waitingOrders.vue'
export default {
  name: 'PageWaitingOrder',
  components: {
    waitingOrders
  }
}
</script>
<style>
  .container {
    background-color: #0c271a;
  }
</style>
