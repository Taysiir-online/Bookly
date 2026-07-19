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

const getStorageKey = () => {
  const LoginStatus = islogin();
  const CurrentUser = LoginStatus.name;
  return `favorites_${CurrentUser}`;
};

const LibraryGrid = document.getElementById("Grid");
const DisplayLibraryBooks = () => {
  const StorageKey = getStorageKey();
  let favorites = JSON.parse(localStorage.getItem(StorageKey)) || [];
  if (favorites.length === 0) {
    LibraryGrid.innerHTML = `<div style = "text-align: center; color: red; 
         font-weight: bold; padding: 20px; ">No books in your library</div>`;
  }
  LibraryGrid.innerHTML = "";
  favorites.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.innerHTML = ` <div class="cover-box bg-color1">
                    <span class="lang">${book.language}</span>
                    <div class="cover-details">
                        <img src="${book.image}" alt="The Great Gatsby Cover" class="book-image">
                    </div>
                </div>
                <div class="book-info">
                    <h3>${book.title.substring(0, 30)}</h3>
                    <p class="author">${book.author}</p>
                    <div class="card-footer">
                        <span><i class="fa-solid fa-download"></i> ${book.download}</span>
                        <button><a href="detail.html?id=${book.id}&topic=${book.topic}"> View Details</a></button>
                    </div>
                    <button class="remove-btn" data-id="${book.id}"><i class="fa-solid fa-trash-can"></i></button>
                </div>`;

    LibraryGrid.appendChild(card);
  });
  removeFromLibrary();
};

const removeFromLibrary = () => {
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookId = parseInt(e.currentTarget.getAttribute("data-id"));
      const StorageKey = getStorageKey();
      let favorites = JSON.parse(localStorage.getItem(StorageKey)) || [];
      favorites = favorites.filter((book) => book.id !== bookId);
      localStorage.setItem(StorageKey, JSON.stringify(favorites));
      DisplayLibraryBooks();
    });
  });
};
DisplayLibraryBooks();
