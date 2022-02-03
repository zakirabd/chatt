<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title class="title">
          Z Presentation
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated>
        <q-toolbar>
          <q-tabs  color="teal-8" class="footer-btns">
            <q-tab name="new" label="Yeni" @click="reoute('/')" />
            <q-tab name="waiting" label="Gözləyən" @click="reoute('/waiting')" />
            <q-tab name="prepared" label="Hazırlanan" @click="reoute('/prepared')" />
            <q-tab name="removed" label="Silinən" @click="reoute('/removed')" />
          </q-tabs>
        </q-toolbar>
      </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  methods: {
    reoute (rout) {
      if (window.location.hash.substring(1) !== rout)
      {
        this.$router.push({ path: rout })
        
      }
    }
  }
}
</script>
<style>
  .title {
    text-align: center;
    width: 100%;
  }
  .footer-btns{
    width: 100%;
    align-items: center;
  }
</style>
