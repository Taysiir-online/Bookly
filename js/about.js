// imports
import { islogin, logout, handleSearch } from "./main.js";
const log_out = document.querySelector("div.logout > button");
logout(log_out);
// get search input
const searchInput = document.querySelector('input[type="search"]');
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSearch(searchInput);
  }
});
