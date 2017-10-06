<template>
  <div class='home'>
    <div>{{name}}</div>
    <div>{{title}}</div>
    <ul>
      <li v-for='item in list'>
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'home',
  data: function () {
    return {
      name: '',
      title: '',
      list: []
    }
  },

  created: function () {
    this.name = 'createdabc'
    this.title = 'createdaasdf'
    this.list = [
      {id: 1, name: 'createditem22'},
      {id: 2, name: 'createditem3'}
    ]
  },
  mounted: function () {
    this.name = 'abc'
    this.title = 'aasdf'
    this.list = [
      {id: 1, name: 'item22'},
      {id: 2, name: 'item3'}
    ]
  }
}
</script>
