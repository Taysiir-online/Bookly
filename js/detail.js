// imports
import { logout } from "./main.js";
const log_out = document.querySelector("div.logout > button");
logout(log_out);

let loading = document.querySelector("div.loading");
let load = true
if (loading) {
  loading.classList.add("active");
}
const container = document.querySelector("section.book-container");
const About = document.querySelector("div.About");
const id = window.location.search.split("=")[1];
// Api
const api = `https://gutendex.com/books/${id}/`;
const getDetail = async () => {
  try {
    const response = await fetch(api);
    if(response.ok){
      const data = await response.json();  
      const detail = data;
       load = false;
         if (loading) {
              loading.classList.remove("active");
          }
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

    About.innerHTML = `<h2>${detail.title}</h2>
      <p>
        ${detail.summaries}
      </p>
            `;
        }else{
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

setTimeout(()=> {
getDetail(); 
}, 2000 );



  // Related book Function
  const RelatedBooks = document.querySelector("div.books-grid");
  const relatedId = window.location.search.split("=")[2];
  console.log(relatedId);

  // Api
const Api = `https://gutendex.com/books/${id}/${relatedId}`;
const getRelated = async () => {
  try {
    const response = await fetch(Api);
    if(response.ok){
      const data = await response.json();  
      console.log(data);
      const classics = data;
       load = false;
         if (loading) {
              loading.classList.remove("active");
          }
          RelatedBooks.innerHTML = `
          <div class="book-card">
          <div class="card-img">
            <img src="${classics.formats["image/jpeg"]}" alt="Book" />
          </div>
          <h4>${classics.title}</h4>
          <span>${classics.authors.map((author) => author.name).join(" ")}</span>
          <span class="span">${classics.languages}</span>
        </div>
            `;
        }else{
        load = false;
        if (loading) {
        loading.classList.remove("active");
      }
         
         RelatedBooks.innerHTML = `<div style = "text-align: center; color: red; 
         font-weight: bold; padding: 20px; ">Error 404  (No product)</div>`;
        
      }
  } catch (Error) {
    console.log(Error.message);
  }
  
};

setTimeout(()=> {
getRelated(); 
}, 2000 );