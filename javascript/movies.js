const movies = [
    { name: 'Aquaman'},
    { name: 'Avatar: The Way Of Water'},
    { name: 'Dasara'},
    { name: 'The Lion King'},
    { name: 'Joker'},
    { name: 'Jungle Cruise'},
    { name: 'John Wick 4'},
    { name: 'Star Wars: The rise of Skywalker'}
  ];

  const searchInput = document.querySelector('.input');
  const list = document.querySelector('.list');
  const searchBtn = document.querySelector('.search-btn');
  const clearBtn = document.querySelector('.clear-btn');

  searchBtn.addEventListener('click', () => {
    searchMovies();
  });

  clearBtn.addEventListener('click', () => {
    clearList();
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  });

  function searchMovies() {
    const value = searchInput.value.toLowerCase().trim();
    let results = [];

    if (value) {
      results = movies.filter(movie => {
        return movie.name.toLowerCase().includes(value);
      });
    }

    setList(results);
  }

  function setList(results) {
    clearList();

    if (results.length > 0) {
      for (const movie of results) {
        const resultItem = document.createElement('li');
        resultItem.classList.add('result-item');
        const text = document.createTextNode(movie.name);
        resultItem.appendChild(text);
        list.appendChild(resultItem);
      }
    } else {
      const error = document.createElement('li');
      error.classList.add('error-message');
      const text = document.createTextNode('No results found. Sorry!');
      error.appendChild(text);
      list.appendChild(error);
    }
  }

  function clearList() {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }