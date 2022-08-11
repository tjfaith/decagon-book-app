// const axios = require('axios')
// import {axios} from ('axios')

if (localStorage.getItem("loggedIn") === "loggedIn") {
  document.getElementById("dashboardLink").style.display = "block";
  document.getElementById("signUpLink").style.display = "none";
  document.getElementById("loginLink").style.display = "none";
} else {
  document.getElementById("signUpLink").style.display = "flex";
  document.getElementById("loginLink").style.display = "block";
  document.getElementById("dashboardLink").style.display = "none";
}

// Log out author
document.getElementById("logout").addEventListener("click", () => {
  fetch("/author/logout", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if ((data.message = "successful")) {
        localStorage.removeItem("loggedIn");
        window.location.href = "/";
      }
    })
    .catch((error) => {
      alert(error);
    });
});
