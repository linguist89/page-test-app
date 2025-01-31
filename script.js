function searchContent() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const factCards = document.querySelectorAll('.fact-card');
    let found = false;

    factCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(searchInput)) {
            card.style.display = 'block';
            card.style.backgroundColor = '#e8f4fc';
            setTimeout(() => {
                card.style.backgroundColor = 'white';
            }, 2000);
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (!found && searchInput !== '') {
        alert('No matching duck facts found!');
        factCards.forEach(card => {
            card.style.display = 'block';
        });
    }

    if (searchInput === '') {
        factCards.forEach(card => {
            card.style.display = 'block';
        });
    }
} 