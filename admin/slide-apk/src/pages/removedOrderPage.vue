<template>
  <q-page class=" flex-center container">
    <removedOrders />
  </q-page>
</template>

<script>
import removedOrders from '../components/removedOrders.vue'
export default {
  name: 'PageRemovedOrders',
  components: {
    removedOrders
  }
}
</script>
<style>
  .container {
    background-color: #0c271a;
  }
</style>
