const select = document.querySelector('#genre');
    select.addEventListener('change', filterMovies);

    function filterMovies() {
        const selectedGenre = select.value;
        const movieBoxes = document.querySelectorAll('.movies-box');

        movieBoxes.forEach(movieBox => {
            if (selectedGenre === 'all' || movieBox.querySelector('.quality').textContent.toLowerCase() === selectedGenre) {
                movieBox.style.display = 'block';
            } else {
                movieBox.style.display = 'none';
            }
        });
    }