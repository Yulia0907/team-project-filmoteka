// let visiblePages = 5;
// const mediaQueryMobile = window.matchMedia('(max-width: 768px)');
// const mediaQueryTablet = window.matchMedia('(min-width: 769px) and (max-width: 1279px)');
// const mediaQueryDesktop = window.matchMedia('(min-width: 1280px)');

// if (mediaQueryMobile.matches) {
//   visiblePages = 3;
// }

// if (mediaQueryTablet.matches) {
//   visiblePages = 5;
// }

// if (mediaQueryDesktop.matches) {
//   visiblePages = 6;
// }

/**
 * Function returns pagination options
 * @param {number} totalResults
 * @returns {options}
 */
function paginationOptions(totalResults) {
  const options = {
    totalItems: totalResults,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: false,
  };

  return options;
}

export { paginationOptions };
