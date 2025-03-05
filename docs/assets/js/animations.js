document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            card.classList.add('hover');
        });

        card.addEventListener('mouseleave', function() {
            card.classList.remove('hover');
        });
    });
});