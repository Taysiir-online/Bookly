// imports
import { logout } from "./main.js";
const log_out = document.querySelector("div.logout > button");
logout(log_out);

// Api
const api = "https://gutendex.com/books";
const container = document.querySelector("section.book-container");
const About = document.querySelector("div.About");
const getDetail = async () => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    console.log(data.results);
    const detail = data.results[0];
    container.innerHTML = `<div class="book-cover">
        <img src="${detail.formats["image/jpeg"]}" alt="img-book" />
      </div>
      <div class="book-details">
        <nav class="library">
          Library <i class="fa-solid fa-chevron-right"></i> fiction
        </nav>
        <h1 class="title">${detail.title}</h1>
        <h3 class="author">${detail.authors.map((author) => author.name).join(" ")}</h3>

        <div class="book-meta">
          <span class="meta"><i class="fa-solid fa-globe"></i>${detail.languages}</span>
          <span class="meta"
            ><i class="fa-solid fa-download"></i> ${detail.download_count}</span
          >
        </div>

        <div class="book-subject">
          <span class="sub-title">SUBJECTS</span>
          <div class="sub-tags">
            <span>${detail.subjects}</span>
          </div>
        </div>

        <div class="book-actions">
          <a href="login.html" class="btn primary">
            <i class="fa-solid fa-book-open"></i> Read Online</a
          >
          <a href="login.html" class="btn secondary">
            <i class="fa-regular fa-file-pdf"></i> Download PDF</a
          >
          <a href="login.html" class="btn secondary">
            <i class="fa-regular fa-file"></i> Download EPUB</a
          >
          <a href="login.html" class="btn secondary">
            <i class="fa-regular fa-file-lines"></i> Download TXT</a
          >
        </div>
      </div>
            `;

    About.innerHTML = `<h2>${detail.title}</h2>
      <p>
        ${detail.summaries}
      </p>
            `;
  } catch (error) {
    console.log(error);
  }
};
getDetail();
