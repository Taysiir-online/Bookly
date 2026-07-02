// imports
import { logout } from "./main.js";
const log_out = document.querySelector("div.logout > button");
logout(log_out);

// Api
const api = "https://gutendex.com/books";
const Grid = document.getElementById("Grid");
const getbooks = async () => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);
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
                        <button><a href="detail.html?id=${book.id}"> View Details</a></button>
                    </div>
                </div>
            `;
      Grid.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
};
getbooks();


fetch("https://gutendex.com/books").then((response) => {
console.log(response);
});