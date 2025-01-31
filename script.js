let currentPage = 1;
const factsPerPage = 6;

// Add event listener for Enter key on search input
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchContent();
            }
        });
    }

    // Initialize pagination on facts page
    if (document.querySelector('.fact-cards')) {
        showPage(1);
    }
});

function searchContent() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    // If we're not on the facts page, redirect to facts page with search query
    if (!window.location.href.includes('facts.html')) {
        window.location.href = `facts.html?search=${encodeURIComponent(searchInput)}`;
        return;
    }

    const factCards = document.querySelectorAll('.fact-card');
    let found = false;
    let visibleCards = [];

    factCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(searchInput)) {
            card.style.display = 'block';
            card.style.backgroundColor = '#e8f4fc';
            setTimeout(() => {
                card.style.backgroundColor = 'white';
            }, 2000);
            found = true;
            visibleCards.push(card);
        } else {
            card.style.display = 'none';
        }
    });

    if (!found && searchInput !== '') {
        alert('No matching duck facts found!');
        factCards.forEach(card => {
            card.style.display = 'block';
        });
        showPage(1);
    } else if (found) {
        // Update pagination for filtered results
        const totalPages = Math.ceil(visibleCards.length / factsPerPage);
        updatePaginationButtons(totalPages);
        showFilteredPage(1, visibleCards);
    }

    if (searchInput === '') {
        factCards.forEach(card => {
            card.style.display = 'block';
        });
        showPage(1);
    }
}

function showFilteredPage(pageNumber, visibleCards) {
    const totalPages = Math.ceil(visibleCards.length / factsPerPage);
    currentPage = pageNumber;

    // Hide all visible cards first
    visibleCards.forEach(card => {
        card.style.display = 'none';
    });

    // Show cards for current page
    const start = (pageNumber - 1) * factsPerPage;
    const end = start + factsPerPage;
    
    for (let i = start; i < end && i < visibleCards.length; i++) {
        visibleCards[i].style.display = 'block';
    }

    updatePaginationButtons(totalPages);
}

function showPage(pageNumber) {
    const factCards = document.querySelectorAll('.fact-card');
    const totalPages = Math.ceil(factCards.length / factsPerPage);
    
    currentPage = pageNumber;

    factCards.forEach(card => {
        card.style.display = 'none';
    });

    const start = (pageNumber - 1) * factsPerPage;
    const end = start + factsPerPage;
    
    for (let i = start; i < end && i < factCards.length; i++) {
        factCards[i].style.display = 'block';
    }

    updatePaginationButtons(totalPages);
}

function updatePaginationButtons(totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    let paginationHTML = '';
    
    paginationHTML += `<button onclick="showPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button onclick="showPage(${i})" class="${currentPage === i ? 'active' : ''}">${i}</button>`;
    }
    
    paginationHTML += `<button onclick="showPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Check for search parameter when page loads
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = searchQuery;
            searchContent();
        }
    }
}); 