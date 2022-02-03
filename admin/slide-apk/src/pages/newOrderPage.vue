<template>
  <q-page class=" flex-center container">
    <newOrders />
  </q-page>
</template>

<script>
import newOrders from '../components/newOrders.vue'
export default {
  name: 'PageNewOrder',
  components: {
    newOrders
  }
}
</script>
<style>
  .container {
    background-color: #0c271a;
  }
</style>
