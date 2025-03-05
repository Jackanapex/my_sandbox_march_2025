document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            card.classList.add('hover');
        });

        card.addEventListener('mouseleave', function() {
            card.classList.remove('hover');
            // Reset transform when mouse leaves
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });

        // Add cursor-aware tilt effect
        card.addEventListener('mousemove', function(e) {
            if (card.classList.contains('hover')) {
                // Get position of mouse relative to card
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                // Calculate rotation based on mouse position
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                // Calculate distance from center (in percentage)
                const percentX = (mouseX - cardCenterX) / (cardRect.width / 2);
                const percentY = (mouseY - cardCenterY) / (cardRect.height / 2);
                
                // Limit tilt effect (maximum 15 degrees)
                const tiltLimitX = 15;
                const tiltLimitY = 10;
                
                // Apply transform - rotate in opposite direction of mouse position
                card.style.transform = `
                    translateY(-10px)
                    rotateX(${-percentY * tiltLimitY}deg)
                    rotateY(${percentX * tiltLimitX}deg)
                `;
            }
        });
    });
});