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
const MobileNav = document.querySelector("div.MobileNav");
if (barIcon && MobileNav) {
  barIcon.addEventListener("click", () => {
    MobileNav.classList.toggle("Active");
  });
}

let loading = document.querySelector("div.loading");
let load = true;
if (loading) {
  loading.classList.add("active");
}
// Api
const api = "https://gutendex.com/books";
const Grid = document.getElementById("Grid");
const getbooks = async () => {
  try {
    const response = await fetch(api);
    if (response.ok) {
      const data = await response.json();
      load = false;
      if (loading) {
        loading.classList.remove("active");
      }
      data.results.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.innerHTML = ` <div class="cover-box bg-color1">
                    <span class="lang">${book.languages}</span>
                    <div class="cover-details">
                        <img src="${book.formats["image/jpeg"]}" alt="The Great Gatsby Cover" class="book-image">
                    </div>
                </div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p class="author">${book.authors.map((author) => author.name).join(" ")}</p>
                    <div class="card-footer">
                        <span><i class="fa-solid fa-download"></i> ${book.download_count}</span>
                        <button><a href="detail.html?id=${book.id}&topic=${book.subjects[0]}"> View Details</a></button>
                    </div>
                </div>
            `;
        Grid.appendChild(card);
      });
    } else {
      load = false;
      if (loading) {
        loading.classList.remove("active");
      }

      Grid.innerHTML = `<div style = " text-align: center; color: #7c3bed; 
     font-weight: bold; ">Error 404  (No product)</div>`;
    }
  } catch (error) {
    console.log(error.message);
  }
};

getbooks();
