// 8-bit Cat Clock Script
document.addEventListener('DOMContentLoaded', function() {
    // Function to update the clock
    function updateClock() {
        // Get Melbourne time
        const options = {
            timeZone: 'Australia/Melbourne',
            hour12: false
        };
        
        const now = new Date();
        
        // Format time (HH:MM)
        const timeOptions = {
            ...options,
            hour: '2-digit',
            minute: '2-digit'
        };
        const melbourneTime = now.toLocaleTimeString('en-AU', timeOptions);
        
        // Format date (DD-MMM)
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const day = now.getDate().toString().padStart(2, '0');
        const month = months[now.getMonth()];
        const formattedDate = `${day}-${month}`;
        
        // Format day of week (MON, TUE, etc.)
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const dayOfWeek = days[now.getDay()];
        
        // Update the clock display
        document.getElementById('cat-clock').textContent = melbourneTime;
        document.getElementById('cat-date').textContent = formattedDate;
        document.getElementById('cat-day').textContent = dayOfWeek;
        
        // Get the hour to determine if the cat should sleep or walk
        const hour = parseInt(melbourneTime.split(':')[0], 10);
        
        const catOutline = document.querySelector('.cat-outline');
        
        // Cat sleeps at night (between 10 PM and 6 AM)
        if (hour >= 22 || hour < 6) {
            catOutline.classList.add('cat-sleeping');
            catOutline.classList.remove('cat-walking');
        } else {
            catOutline.classList.add('cat-walking');
            catOutline.classList.remove('cat-sleeping');
        }
    }
    
    // Update the clock immediately
    updateClock();
    
    // Then update every second
    setInterval(updateClock, 1000);
});