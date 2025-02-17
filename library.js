document.addEventListener('DOMContentLoaded', () => {
    const books = [
        { title: "The Little Prince", category: "Entertainment", ageGroup: "7-9" },
        { title: "A Brief History of Time", category: "Educational", ageGroup: "16+" },
        { title: "The Very Hungry Caterpillar", category: "Entertainment", ageGroup: "3-6" },
        { title: "The Elements of Style", category: "Educational", ageGroup: "13-15" },
        { title: "Harry Potter and the Philosopher's Stone", category: "Entertainment", ageGroup: "10-12" },
        { title: "A Short History of Nearly Everything", category: "Educational", ageGroup: "16+" },
    ];

    const bookGrid = document.getElementById('bookGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const ageGroupFilter = document.getElementById('ageGroupFilter');

    function renderBooks(filteredBooks) {
        bookGrid.innerHTML = '';
        filteredBooks.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <p>Category: ${book.category}</p>
                <p>Age Group: ${book.ageGroup}</p>
                <button>Not available now</button>
            `;
            bookGrid.appendChild(bookCard);
        });
    }

    function filterBooks() {
        const selectedCategory = categoryFilter.value;
        const selectedAgeGroup = ageGroupFilter.value;

        const filteredBooks = books.filter(book => {
            const categoryMatch = selectedCategory === 'all' || book.category === selectedCategory;
            const ageGroupMatch = selectedAgeGroup === 'all' || book.ageGroup === selectedAgeGroup;
            return categoryMatch && ageGroupMatch;
        });

        renderBooks(filteredBooks);
    }

    categoryFilter.addEventListener('change', filterBooks);
    ageGroupFilter.addEventListener('change', filterBooks);

    // Initial render
    filterBooks();
});

