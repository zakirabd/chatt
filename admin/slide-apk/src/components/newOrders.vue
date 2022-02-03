<template>
  <div class="q-pa-md">
    <p class="empity_orders" v-if="data.length === 0">Yeni sifariş yoxdur</p>
    <div v-else>
      <q-table
        title="Yeni Sifarişlər"
        :data="data"
        :columns="columns"
        row-key="name"
      >

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="q-pa-md q-gutter-sm">
                  <q-btn color="primary" label="Qəbul et" @click="acceptOrder(props.row.id)" />
                  <q-btn color="deep-orange" glossy label="Sil" @click="removeOrder(props.row.id)" />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>
<script>

import io from 'socket.io-client'
import axios from 'axios'
import {MAIN_API} from '../APIKey.js'
export default {
  name: 'newOrders',
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
        { name: 'page', align: 'center', label: 'Səhifə sayı', field: 'page', sortable: true, style: 'width: 10px' },
        { name: 'number', align: 'center', label: 'Nömrə', field: 'number', sortable: true, style: 'width: 10px' },
        
      ],
      data: []
    }
  },
  methods: {
    fetchOrders () {
      this.socket.emit('fetchAllOrders')
      this.socket.on('fetchOrders', orders => {
        this.data = []
        for (let i = 0; i < orders.length; i++){
          if (orders[i].new == 1) {
            this.data.push({
              id: orders[i].ID,
              name: orders[i].topic,
              page: orders[i].pageNumber,
              number: orders[i].number
            })
          }
        }
      })
    },

    acceptOrder (id) { 
      axios
      .get(`${MAIN_API}newOrder=accept&id=${id}`)
      .then(response => {
        if (response.status === 200){
          this.fetchOrders()
        }
      })
      .catch(err => console.log(err));
    },
    removeOrder (id) {
      axios
      .get(`${MAIN_API}newOrder=remove&id=${id}`)
      .then(response => {
        if (response.status === 200){
          this.fetchOrders()
        }
      })
      .catch(err => console.log(err));
    }
  },
  mounted () {
    this.fetchOrders();
    this.socket.on('acceptNotification', () => {  
    //  audio.autoplay = true
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
