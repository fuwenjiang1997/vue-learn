import Vue from './lib/main'

var theVue = new Vue({
  el: '#app',
  data: () => ({
    userName: '付文江',
    age: 333
  })
})

window.theVue = theVue

setTimeout(() => {
  theVue._data.userName = '解放军技术'
  console.log(theVue);
}, 1000)
