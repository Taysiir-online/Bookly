// imports
import { islogin, setupAuthNav, handleSearch, FooterYear } from "/js/main.js";
const logIn = document.querySelector("div.btn_log");
const logOut = document.querySelector("div.logout > button");
const UserProfile = document.querySelector("div.profile");
const year = document.querySelector("p.copy > span");
FooterYear(year);
setupAuthNav(logIn, logOut, UserProfile);
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

// Menu-bar activate
const barIcon = document.querySelector("div.bar-icon");
const mobileNav = document.querySelector("div.MobileNav");
barIcon.addEventListener("click", () => {
  mobileNav.classList.toggle("Active");
});
