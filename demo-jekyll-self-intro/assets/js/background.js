/* filepath: /home/jackw/my_sandbox_march_2025/demo-jekyll-self-intro/assets/js/background.js */
document.addEventListener('DOMContentLoaded', function() {
    // Create the background container
    const background = document.createElement('div');
    background.className = 'pixel-background';
    document.body.appendChild(background);
    
    // Define number of text elements
    const textCount = 30;
    const text = "my dearests";
    
    // Create multiple text elements at random positions
    for (let i = 0; i < textCount; i++) {
        const textElement = document.createElement('div');
        textElement.className = 'pixel-text';
        textElement.innerText = text;
        
        // Randomize starting position
        const topPos = Math.random() * 100;
        const leftPos = Math.random() * 100;
        
        // Set position
        textElement.style.top = `${topPos}%`;
        textElement.style.left = `${leftPos}%`;
        
        // Randomize animation delay and duration for more natural flow
        const delay = Math.random() * -20;
        const duration = 15 + Math.random() * 10;
        textElement.style.animationDelay = `${delay}s`;
        textElement.style.animationDuration = `${duration}s`;
        
        // Add some size variation
        const size = 16 + Math.random() * 16;
        textElement.style.fontSize = `${size}px`;
        
        // Add some opacity variation
        const opacity = 0.1 + Math.random() * 0.15;
        textElement.style.opacity = opacity;
        
        // Append to background
        background.appendChild(textElement);
    }
});