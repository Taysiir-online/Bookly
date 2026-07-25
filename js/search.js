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

const grid = document.querySelector("main.books-grid");

const params = new URLSearchParams(window.location.search);
const result = params.get("q");

const SearchPram = document.querySelector("p.pram");
if (result) {
  SearchPram.innerHTML = `Showing results for "${result}"`;
} else if (!result) {
  SearchPram.innerHTML = "Showing results for 1-12 search term";
  grid.innerHTML = `<div style = "text-align: center; color:  red; 
         font-weight: bold; padding: 50px; ">Please enter a search term !</div>`;
}

// Loading
let loading = document.querySelector("div.loading");
let load = true;
if (loading) {
  loading.classList.add("active");
}
async function searchBooks() {
  try {
    const response = await fetch(`https://gutendex.com/books?search=${result}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      load = false;
      if (loading) {
        loading.classList.remove("active");
      }

      grid.innerHTML = "";
      if (data.results.length === 0) {
        grid.innerHTML = "<p>No results found.</p>";
      } else {
        data.results.forEach((bookSearch) => {
          const bookCard = document.createElement("div");
          bookCard.classList.add("book-card");
          bookCard.innerHTML = `<div class="book-img">
              <img
                src="${bookSearch.formats["image/jpeg"]}"
                alt="Book-img"
                class="book-cover"
              />
              <button class="book-btn">
                <i class="fa-regular fa-bookmark"></i>
              </button>
            </div>
            <div class="book-info">
              <h3 class="book-title">${bookSearch.title}</h3>
              <p class="book-author">${bookSearch.authors.map((a) => a.name).join(", ")}</p>
              <div class="book-meta">
                <span class="border lng">${bookSearch.languages[0]}</span>
                <span class="downloads"
                  ><i class="fa-solid fa-download"></i> ${bookSearch.download_count}</span
                >
              </div>
              <button class="view-btn">
                <i class="fa-regular fa-eye"></i>
              <a href="detail.html?id=${bookSearch.id}&topic=${bookSearch.subjects[0]}"> View Details</a>
              </button>
            </div>
          </div>
          `;
          grid.appendChild(bookCard);
        });
      }
    } else {
      load = false;
      if (loading) {
        loading.classList.remove("active");
      }
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}
if (result) {
  searchBooks();
}
