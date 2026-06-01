# Project Documentation & API Integration Guide

## 1. Project Overview
**Project Name:** Landing Page (Homepage)  
**Project ID:** `1070614420859277571`

### 1.1 Design Specifications
The application adheres to the following design system parameters:

* **Typography:** 
  * Primary Font: `Inter`
* **Color Palette:**
  * **Primary Accent:** `#7c3bed` (Vibrant Purple - Used for buttons, active links, and highlights)
  * **Backgrounds:**
    * `#ffffff` (Pure White - Main background)
    * `#f9fcff` (Soft Blue/Gray Hash - Alternate background for sections)
  * **Text Colors:**
    * `#111827` (Dark Charcoal - Main headings and text)
    * `#4b5563` (Muted Gray - Sub-headings, paragraphs, and descriptions)
  * **Borders & Dividers:**
    * `#e5e7eb` (Light Gray - Used for cards and line dividers)
  * **Color Mode:** Light Theme
* **Application Scope:**
  * Total Pages/Screens: `5` individual screen instances

### 1.2 Project Screens (Pages Details)
The 5 application pages/screens are structured as follows:

1. **Landing Page (Homepage)**
   - **Purpose:** The main entry point of the website. Showcases featured books, latest additions, and call-to-action sections to engage users immediately.
2. **Search Results Page**
   - **Purpose:** Displays the output of a user's search query or category filter. Contains a grid/list of books matching the specific topic, language, or author searched.
3. **Book Details Page**
   - **Purpose:** The dedicated page for a single book. Shows comprehensive details including the book cover, synopsis, author info, publication year, subjects, and download links/buttons.
4. **Login Page**
   - **Purpose:** Allows existing users to sign into their accounts using their credentials (email/username and password).
5. **Register Page**
   - **Purpose:** The sign-up page for new users to create an account on the platform.

### 1.3 Media & Images
* **Hero Image:**
  * [View Hero Image (Homepage Cover)](https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop) *(Placeholder representing a book reading visual for the main landing page)*

---

## 2. API Integration: Gutendex (Project Gutenberg API)
Gutendex is a powerful, JSON-based Web API for Project Gutenberg's catalog of free electronic books.

**Base URL:** `https://gutendex.com`

### 2.1 Fetching Book Collections (`/books`)
To retrieve a paginated list of books, make a standard `GET` request. By default, results are sorted by popularity (download count).

**Endpoint:**
```http
GET /books
```

**JSON Response Structure:**
```json
{
  "count": 74533,
  "next": "https://gutendex.com/books/?page=2",
  "previous": null,
  "results": [ ... Array of 32 Book Objects ... ]
}
```

### 2.2 Retrieving a Specific Book (`/books/<id>`)
To fetch the details of a single book using its unique Project Gutenberg ID.

**Endpoint:**
```http
GET /books/{id}
```
*Example: `GET /books/84` retrieves "Frankenstein".*

### 2.3 Query Parameters (Filtering & Search)
The API supports various URL queries to filter the book catalog:

| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `search` | String | Case-insensitive search across author names and book titles. Use `%20` for spaces. | `?search=dickens%20great` |
| `languages` | String | Comma-separated two-character language codes. | `?languages=en,fr` |
| `author_year_start` | Integer | Filters books by authors alive in or after the specified year. | `?author_year_start=1800` |
| `author_year_end` | Integer | Filters books by authors alive in or before the specified year. | `?author_year_end=1899` |
| `topic` | String | Case-insensitive search on bookshelves or subjects. | `?topic=children` |
| `ids` | String | Comma-separated list of precise Project Gutenberg IDs. | `?ids=11,12,13` |
| `sort` | String | Sorting criteria: `ascending`, `descending`, or `popular` (default). | `?sort=ascending` |
| `mime_type` | String | Filter by formats starting with a value. | `?mime_type=text%2F` |

### 2.4 The `Book` Object Data Model
Each book in the `results` array or returned individually follows this structure:

```json
{
  "id": 84,
  "title": "Frankenstein; Or, The Modern Prometheus",
  "authors": [
    {
      "name": "Shelley, Mary Wollstonecraft",
      "birth_year": 1797,
      "death_year": 1851
    }
  ],
  "translators": [],
  "subjects": [
    "Frankenstein's monster (Fictitious character) -- Fiction",
    "Frankenstein, Victor (Fictitious character) -- Fiction",
    "Horror tales",
    "Monsters -- Fiction",
    "Science fiction"
  ],
  "bookshelves": [
    "Gothic Fiction",
    "Precursors of Science Fiction",
    "Science Fiction by Women"
  ],
  "languages": ["en"],
  "copyright": false,
  "media_type": "Text",
  "formats": {
    "text/html": "https://www.gutenberg.org/ebooks/84.html.images",
    "application/epub+zip": "https://www.gutenberg.org/ebooks/84.epub.images",
    "application/x-mobipocket-ebook": "https://www.gutenberg.org/ebooks/84.kf8.images",
    "text/plain": "https://www.gutenberg.org/ebooks/84.txt.utf-8"
  },
  "download_count": 89454
}
```
"# Bookly" 
