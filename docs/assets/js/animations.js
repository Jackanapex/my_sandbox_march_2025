document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    // Add particle containers to each card
    cards.forEach(card => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        card.appendChild(particlesContainer);
        
        card.addEventListener('mouseenter', function() {
            card.classList.add('hover');
            createParticles(card);
        });

        card.addEventListener('mouseleave', function() {
            card.classList.remove('hover');
            // Reset transform when mouse leaves
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            
            // Clear particles
            const container = card.querySelector('.particles-container');
            if (container) {
                container.innerHTML = '';
            }
        });

        // Add cursor-aware tilt effect
        card.addEventListener('mousemove', function(e) {
            if (card.classList.contains('hover')) {
                // Get position of mouse relative to card
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.bottom + cardRect.height / 2;
                
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
                    rotateX(${percentY * tiltLimitY}deg)
                    rotateY(${percentX * tiltLimitX}deg)
                `;
                
                // Occasionally create particles when moving
                if (Math.random() < 0.1) {
                    createParticleAtPosition(card, mouseX - cardRect.left, mouseY - cardRect.bottom);
                }
            }
        });
    });
    
    function createParticles(card) {
        const container = card.querySelector('.particles-container');
        if (!container) return;
        
        const cardRect = card.getBoundingClientRect();
        const cardColor = getComputedStyle(card).getPropertyValue('--card-color') || '#ffffff';
        
        // Create initial burst of particles
        for (let i = 0; i < 20; i++) {
            createParticleAtEdge(card, cardColor);
        }
        
        // Continue creating particles while hovering
        const particleInterval = setInterval(() => {
            if (!card.classList.contains('hover')) {
                clearInterval(particleInterval);
                return;
            }
            
            createParticleAtEdge(card, cardColor);
        }, 200);
        
        // Store interval ID to clear later
        card.dataset.particleInterval = particleInterval;
    }
    
    function createParticleAtEdge(card, color) {
        const container = card.querySelector('.particles-container');
        if (!container) return;
        
        const cardRect = card.getBoundingClientRect();
        const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        let x, y, xDirection;
        
        switch(edge) {
            case 0: // top
                x = Math.random() * cardRect.width;
                y = 0;
                xDirection = (Math.random() - 0.5) * 30;
                break;
            case 1: // right
                x = cardRect.width;
                y = Math.random() * cardRect.height;
                xDirection = 15;
                break;
            case 2: // bottom
                x = Math.random() * cardRect.width;
                y = cardRect.height;
                xDirection = (Math.random() - 0.5) * 30;
                break;
            case 3: // left
                x = 0;
                y = Math.random() * cardRect.height;
                xDirection = -15;
                break;
        }
        
        createParticleAtPosition(card, x, y, xDirection, color);
    }
    
    function createParticleAtPosition(card, x, y, xDirection = 0, color) {
        const container = card.querySelector('.particles-container');
        if (!container) return;
        
        // Get card color if not provided
        if (!color) {
            color = getComputedStyle(card).getPropertyValue('--card-color') || '#ffffff';
        }
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Make particles in varying sizes
        const size = 4 + Math.random() * 6;
        
        // Apply custom properties
        particle.style.setProperty('--particle-color', color);
        particle.style.setProperty('--x-direction', `${xDirection || (Math.random() - 0.5) * 30}px`);
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Add to container
        container.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode === container) {
                container.removeChild(particle);
            }
        }, 1500);
    }
});