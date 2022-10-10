const renderArray = fetchData => {
  console.log('fetchData.results: ', fetchData.results);
  const forHTML = markupFormSearch(fetchData.results);
  renderSearch(forHTML);
};

const renderSearch = dataRender => {
  formInputResultSearch.innerHTML = dataRender;
};

export { renderArray };
