// const axios = require('axios')
// import {axios} from ('axios')


  // Log out author
  document.getElementById('logout').addEventListener('click', ()=>{
    fetch('/author/logout', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.message="successful"){
        window.location.href = '/';
      }
    }).catch(error=>{
      alert(error)
    })
  })