// imports
import { islogin, setupAuthNav, handleSearch } from "/js/main.js";
const logIn = document.querySelector("div.btn_log");
const logOut = document.querySelector("div.logout > button");
const UserProfile = document.querySelector("div.profile");
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

// protect the page from unauthorized access
if (islogin().login === false) {
  window.location.href = "/login.html";
}

let loading = document.querySelector("div.loading");
let load = true;
if (loading) {
  loading.classList.add("active");
}
const container = document.querySelector("section.book-container");
const About = document.querySelector("div.About");
const prams = new URLSearchParams(window.location.search);
const id = prams.get("id");
// Related book Function
const relatedTopic = prams.get("topic");
// Api
const api = `https://gutendex.com/books/${id}/`;
const getDetail = async () => {
  try {
    const response = await fetch(api);
    if (response.ok) {
      const data = await response.json();
      const detail = data;
      console.log(detail);
      load = false;
      if (loading) {
        loading.classList.remove("active");
      }
      container.innerHTML = `<div class="book-cover">
        <img src="${detail.formats["image/jpeg"]}" alt="img-book" />
      </div>
      <div class="book-details">
        <nav class="library">
          Books <i class="fa-solid fa-chevron-right"></i> ${detail.title.substring(0, 50)}
        </nav>
        <h1 class="title">${detail.title.substring(0, 50)}...</h1>
        <h3 class="author">${detail.authors.map((author) => author.name).join(" ")}</h3>

        <div class="book-meta">
          <span class="meta"><i class="fa-solid fa-globe"></i>${detail.languages}</span>
          <span class="meta"
            ><i class="fa-solid fa-download"></i> ${detail.download_count}</span
          >
            <span class="meta" id="fav-btn"><i class="fa-solid fa-heart"></i>favorite</span>
        </div>

        <div class="book-subject">
          <span class="sub-title">SUBJECTS</span>
          <div class="sub-tags">
             ${detail.subjects.map((subject) => `<span>${subject}</span>`).join("")}
            </div>
        </div>

        <div class="book-actions">
          <a href="${detail.formats["text/html"]}" class="btn primary">
            <i class="fa-solid fa-book-open"></i> Read Online</a
          >
          <a href="${detail.formats["application/pdf" || "#"]}" class="btn secondary"
            style="display: ${detail.formats["application/pdf"] ? "flex" : "none"};">
            <i class="fa-regular fa-file-pdf"></i> Download PDF</a
          >
            <a href="${detail.formats["application/epub+zip"]}" class="btn secondary">
            <i class="fa-regular fa-file"></i> Download EPUB</a
          >
          <a href="${detail.formats["text/plain; charset=utf-8"]}" class="btn secondary">
            <i class="fa-regular fa-file-lines"></i> Download TXT</a
          >
        </div>
      </div>
            `;
      const favBtn = document.getElementById("fav-btn");
      favBtn.addEventListener("click", () => {
        addToFavorites(detail);
      });

      About.innerHTML = `<h2>${detail.title}</h2>
      <p>
        ${detail.summaries}
      </p>
            `;
    } else {
      load = false;
      if (loading) {
        loading.classList.remove("active");
      }

      About.innerHTML = `<div style = "text-align: center; color: red; 
         font-weight: bold; padding: 20px; ">Error 404  (No product)</div>`;
    }
  } catch (Error) {
    console.log(Error.message);
  }
};

getDetail();

// Api
const Api = `https://gutendex.com/books/?topic=${relatedTopic}`;
const RelatedBooks = document.querySelector("div.books-grid");
const getRelated = async () => {
  try {
    const response = await fetch(Api);
    if (response.ok) {
      const data = await response.json();
      const Results = data.results.slice(0, 5);
      load = false;
      if (loading) {
        loading.classList.remove("active");
      }
      Results.forEach((classics) => {
        const cards = document.createElement("div");
        cards.classList.add("book-card");
        cards.innerHTML = `<div class="card-img">
            <img src="${classics.formats["image/jpeg"]}" alt="Book" />
          </div>
          <h4>${classics.title.substr(0, 30)}...</h4>
          <span>${classics.authors.map((author) => author.name).join(" ")}</span>
          <span class="span">${classics.languages}</span>
           <a href="detail.html?id=${classics.id}?topic=${classics.subjects[0]}" 
           style="text-decoration: none; 
           background-color: var(--primary-color); padding: 12px; 
           width: 100%; color: var(--surface-white); 
           border: none; border-radius: 8px; font-size: 14px; 
           font-weight: 500; cursor: pointer; display: flex; 
           justify-content: center; align-items: center;" > View Details</a>
             `;
        RelatedBooks.appendChild(cards);
      });
    } else {
      load = false;
      if (loading) {
        loading.classList.remove("active");
      }

      RelatedBooks.innerHTML = `<div style = " text-align: center; color: #7c3bed; 
     font-weight: bold; ">Error 404  (No product)</div>`;
    }
  } catch (error) {
    console.log(error.message);
  }
};
getRelated();

//  favorite function
const addToFavorites = (FavBook) => {
  // protect the page from unauthorized access
  const LoginStatus = islogin();
  if (LoginStatus.login === false) {
    window.location.href = "/login.html";
  }
  const CurrentUser = LoginStatus.name;
  const StorageKey = `favorites_${CurrentUser}`;
  let favorites = JSON.parse(localStorage.getItem(StorageKey)) || [];
  const isExist = favorites.some((fav) => fav.id === FavBook.id);
  if (isExist) {
    swal("This book is already in your favorites.");
  } else {
    const favoriteBook = {
      id: FavBook.id,
      title: FavBook.title,
      author: FavBook.authors.map((author) => author.name).join(" "),
      image: FavBook.formats["image/jpeg"],
      language: FavBook.languages,
      download: FavBook.download_count,
      topic: FavBook.subjects[0],
    };
    favorites.push(favoriteBook);
    localStorage.setItem(StorageKey, JSON.stringify(favorites));
    swal("Book added to your Library!");
  }
};
