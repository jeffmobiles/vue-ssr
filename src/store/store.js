
import Vue from 'vue'
import Vuex from 'vuex'
import api from "./../api/data";
Vue.use(Vuex)
export function createStore () {
  return new Vuex.Store({
    state: {
      hots: [],
      news: []
    },
    actions: {
      fetchHots ({ commit }) {
        return api.mallHome().then(function (data) {
          if (data.status == 200) {
            var result = data && data.data && data.data.value;
            commit('setHots',result.content);
          }
        }, function (err) {
          //console.log("err",err);
        })
      }
    },
    mutations: {
      setHots (state, { id, item }) {
        Vue.set(state.hots, id, item)
      }
    }
  })
}
