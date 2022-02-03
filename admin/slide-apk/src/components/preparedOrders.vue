<template>
  <div class="q-pa-md">
    <p class="empity_orders" v-if="data.length === 0">Gözləyən sifariş yoxdur</p>
    <q-table v-else
      title="Hazırlanan Sifarişlər"
      :data="data"
      :columns="columns"
      row-key="name"
    >
    </q-table>
  </div>
</template>
<script>
import io from 'socket.io-client'
export default {
  name: 'preparedOrders',
  data () {
    return {
      socket: io('localhost:3001'),
      columns: [
        {
          name: 'topic',
          required: true,
          label: 'Mövzu',
          align: 'center',
          field: 'topic',
          style: 'max-width: 10px;  overflow: auto',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'page', align: 'center', label: 'Səhifə sayı', field: 'page', sortable: true, style: 'max-width: 10px' },
        { name: 'number', align: 'center', label: 'Nömrə', field: 'number', sortable: true, style: 'max-width: 10px' },
        { name: 'date', align: 'center', label: 'Hazırlanma vaxtı', field: 'date', sortable: true, style: 'max-width: 10px' },
      ],
      data: []
    }
  },
  mounted () {
    this.socket.emit('fetchAllOrders')
    this.socket.on('fetchOrders', orders => {
      this.data = []
      for (let i = 0; i < orders.length; i++){
        if (orders[i].ready == 1) {
          this.data.push({
            id: orders[i].ID,
            name: orders[i].topic,
            page: orders[i].pageNumber,
            number: orders[i].number,
            date: orders[i].readyDate
          })
        }
      }
    })
  }
}
</script>
<style>
  .empity_orders{
    width: 100%;
    color: #fff;
    text-align: center;
  }
</style>
