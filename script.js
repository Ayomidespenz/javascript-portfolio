// Theme Toggle System
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing theme toggle...');
    
    let themeToggle = document.getElementById('themeToggle');
    
    // Create toggle button if it doesn't exist
    if (!themeToggle) {
        console.log('Creating theme toggle button...');
        themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.id = 'themeToggle';
        themeToggle.innerHTML = `
            <span class="icon">🌙</span>
        `;
        document.body.appendChild(themeToggle);
        console.log('Theme toggle button created and added to DOM');
    }
    
    console.log('Theme toggle button found:', themeToggle);
    
    const themeIcon = themeToggle.querySelector('.icon');
    
    if (!themeIcon) {
        console.error('Theme toggle icon not found!');
        return;
    }
    
    // Get saved theme from localStorage or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    console.log('Current theme from localStorage:', currentTheme);
    
    // Apply the saved theme
    applyTheme(currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        console.log('Theme toggle clicked!');
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        console.log('Switching from', currentTheme, 'to', newTheme);
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    function applyTheme(theme) {
        console.log('Applying theme:', theme);
        document.documentElement.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
        
        console.log('Theme applied successfully');
    }
});

// Typing Animation
function initTypingAnimation() {
    console.log('DOM loaded, starting typing animation...');
    
    const phrases = [
        "Hi !! I'm Quadri Yusuff",
        "Full Stack Developer ",
        " Web 3 Enthusiast",
        "Crafting Digital Experiences",
        "Turning Ideas Into Reality",
        "Building Modern Web Solutions",
        "Passionate About Clean Code"
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseTime = 2000;
    
    const typingElement = document.querySelector('.typing-text');
    
    console.log('Typing element found:', typingElement); // Debug log
    
    if (!typingElement) {
        console.error('Typing element not found!');
        return;
    }
    
    // Clear any existing content and add blinking cursor
    typingElement.textContent = '';
    typingElement.style.borderRight = '3px solid var(--text-primary)';
    typingElement.style.animation = 'blink 0.75s step-end infinite';
    
    // Test: Set some initial text to verify the element works
    typingElement.textContent = 'Testing...';
    console.log('Test text set:', typingElement.textContent);
    
    console.log('Starting with phrase:', phrases[0]);
    
    function typeText() {
        const currentPhrase = phrases[currentPhraseIndex];
        console.log('Current phrase:', currentPhrase, 'Index:', currentCharIndex, 'Deleting:', isDeleting);
        
        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = deletingSpeed;
        } else {
            // Typing text
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }
        
        console.log('Text content:', typingElement.textContent);
        
        // Handle transitions
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            // Finished typing, pause then start deleting
            console.log('Finished typing, starting to delete...');
            typingSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            // Finished deleting, move to next phrase
            console.log('Finished deleting, moving to next phrase...');
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting next phrase
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start the typing animation after a delay
    console.log('Starting animation in 1 second...');
    setTimeout(typeText, 1000);
}

// Try multiple ways to ensure the animation starts
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypingAnimation);
} else {
    initTypingAnimation();
}

// Fallback
window.addEventListener('load', function() {
    if (!document.querySelector('.typing-text').textContent || document.querySelector('.typing-text').textContent === '') {
        console.log('Fallback: Starting animation on window load');
        initTypingAnimation();
    }
});
