// imports
import { islogin, setupAuthNav, handleSearch } from "/js/main.js";
const logIn = document.querySelector("div.btn_log");
const logOut = document.querySelector("div.logout > button");
setupAuthNav(logIn, logOut);
// get search input
const searchInput = document.querySelectorAll('input[type="search"]');
searchInput.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(input);
    }
  });
});
