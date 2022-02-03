<template>
  <q-page class=" flex-center container">
    <preparedOrders />
  </q-page>
</template>

<script>
import preparedOrders from '../components/preparedOrders.vue'
export default {
  name: 'PageNewOrder',
  components: {
    preparedOrders
  }
}
</script>
<style>
  .container {
    background-color: #0c271a;
  }
</style>
