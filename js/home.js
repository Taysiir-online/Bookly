// imports
import { islogin, logout, handleSearch } from "/js/main.js";
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
      console.log(data);
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

// // get search input
// const searchInput = document.querySelector('input[type="search"]');

// function handleSearch() {
//   const searchValue = searchInput.value.trim();
//   if (searchValue.length == 0) {
//     alert("please enter a search term.");
//     return;
//   }
//   window.location.href = `search.html?q=${searchValue}`;
// }
// searchInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     handleSearch();
//   }
// });
