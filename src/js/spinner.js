const main = document.querySelector('main');

export function showSpinner () {
  main.classList.add('loading');
}

export function hideSpinner () {
  main.classList.remove('loading');
}


// import { showSpinner, hideSpinner } from "./spinner";

// try {
//   showSpinner()               <========!
//   const data = await fetch(
//     `https://api.themoviedb.org/3/search/movie?${searchParams}`
//   );
  
//   const response = await data.json();
//   const { results } = response;
//   localStorage.setItem('movies', JSON.stringify(results));
  
//   return response;
// } catch (error) {
//   console.log(error.statusText);
// } finally {                    <========!
//   hideSpinner()                <========!
// }