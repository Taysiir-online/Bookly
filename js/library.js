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

const getStorageKey = () => {
  const LoginStatus = islogin();
  const CurrentUser = LoginStatus.name;
  return `favorites_${CurrentUser}`;
};

const LibraryGrid = document.getElementById("Grid");
const DisplayLibraryBooks = () => {
  const LoginStatus = islogin();
  if (LoginStatus.login === false) {
    window.location.href = "/login.html";
  }
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
