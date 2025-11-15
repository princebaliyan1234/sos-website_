// src/lib/cmsData.js
// This file helps your Astro pages read data from the CMS

/**
 * WHY THIS FILE EXISTS:
 * - Your CMS stores data in browser's localStorage
 * - This file provides easy functions to get that data in your Astro pages
 * - You can use these functions anywhere in your Astro site
 */

// Helper to safely get data from localStorage
function getStorageData(key) {
  if (typeof window === 'undefined') return []; // Server-side safety
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Get all blogs
export function getAllBlogs() {
  return getStorageData('blogs').sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
}

// Get single blog by ID
export function getBlogById(id) {
  const blogs = getAllBlogs();
  return blogs.find(blog => blog.id === parseInt(id));
}

// Get blogs by genre
export function getBlogsByGenre(genre) {
  return getAllBlogs().filter(blog => 
    blog.genre?.toLowerCase() === genre.toLowerCase()
  );
}

// Get blogs by tag
export function getBlogsByTag(tag) {
  return getAllBlogs().filter(blog => 
    blog.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get all books
export function getAllBooks() {
  return getStorageData('books').sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
}

// Get single book by ID
export function getBookById(id) {
  const books = getAllBooks();
  return books.find(book => book.id === parseInt(id));
}

// Get books by genre
export function getBooksByGenre(genre) {
  return getAllBooks().filter(book => 
    book.genre?.toLowerCase() === genre.toLowerCase()
  );
}

// Get all book covers
export function getAllCovers() {
  return getStorageData('covers').sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
}

// Get single cover by ID
export function getCoverById(id) {
  const covers = getAllCovers();
  return covers.find(cover => cover.id === parseInt(id));
}

// Get all products
export function getAllProducts() {
  return getStorageData('products').sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
}

// Get single product by ID
export function getProductById(id) {
  const products = getAllProducts();
  return products.find(product => product.id === parseInt(id));
}

// Get all social links
export function getAllSocialLinks() {
  return getStorageData('socialLinks');
}

// Get site logo
export function getSiteLogo() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('siteLogo') 
    ? JSON.parse(localStorage.getItem('siteLogo')) 
    : null;
}

// Search blogs by keyword
export function searchBlogs(keyword) {
  const blogs = getAllBlogs();
  const term = keyword.toLowerCase();
  return blogs.filter(blog => 
    blog.title?.toLowerCase().includes(term) ||
    blog.content?.toLowerCase().includes(term) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(term))
  );
}

// Get latest N items
export function getLatestBlogs(count = 5) {
  return getAllBlogs().slice(0, count);
}

export function getLatestBooks(count = 5) {
  return getAllBooks().slice(0, count);
}

// Get all unique genres
export function getAllBlogGenres() {
  const blogs = getAllBlogs();
  const genres = blogs.map(blog => blog.genre).filter(Boolean);
  return [...new Set(genres)];
}

export function getAllBookGenres() {
  const books = getAllBooks();
  const genres = books.map(book => book.genre).filter(Boolean);
  return [...new Set(genres)];
}

// Get all unique tags
export function getAllTags() {
  const blogs = getAllBlogs();
  const tags = blogs.flatMap(blog => blog.tags || []);
  return [...new Set(tags)];
}

/**
 * USAGE EXAMPLES IN YOUR ASTRO PAGES:
 * 
 * ---
 * import { getAllBlogs, getSiteLogo } from '../lib/cmsData.js';
 * const blogs = getAllBlogs();
 * const logo = getSiteLogo();
 * ---
 * 
 * <div>
 *   {blogs.map(blog => (
 *     <article>
 *       <h2>{blog.title}</h2>
 *       <p>{blog.content}</p>
 *     </article>
 *   ))}
 * </div>
 */
