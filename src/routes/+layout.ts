// THIS IS FOR GITHUB PAGES
export const prerender = true;

// Render in the browser only. The recipes come from localStorage, which the server
// (and the build step) can't see, so rendering there would show an empty book first.
export const ssr = false;
