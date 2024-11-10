// Initialize EmailJS
(function() {
    emailjs.init("Du3lYdEFe4AAaU540");
})();

// Array of fashion-related emojis
const fashionEmojis = ['👕', '👗', '👚', '👔', '👜', '👠', '🧢', '🎽', '🩱', '🥻'];
let currentEmojiIndex = 0;

// Function to rotate emojis in header
function rotateEmoji() {
    const emojiHeader = document.getElementById('emojiHeader');
    currentEmojiIndex = (currentEmojiIndex + 1) % fashionEmojis.length;
    emojiHeader.textContent = fashionEmojis[currentEmojiIndex];
}

// Rotate emoji every 2 seconds
setInterval(rotateEmoji, 2000);

// Add this countdown function
function updateCountdown() {
    const targetDate = new Date('November 20, 2024 23:59:59').getTime();
    
    function update() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-container').innerHTML = '<h2>Launch Time!</h2>';
        }
    }

    update();
    const countdownInterval = setInterval(update, 1000);
}

// Call the countdown function
updateCountdown();

// Update the form submission handler
document.getElementById('waitlist-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email');
    const submitButton = this.querySelector('button');
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="button-text">Sending</span><span class="emoji">⏳</span>';
    
    try {
        const templateParams = {
            to_email: emailInput.value,
            reply_to: emailInput.value,
            from_name: 'Sazy Shop',
            to_name: 'Valued Customer'
        };

        await emailjs.send('service_jpmpjhn', 'template_8279m3r', templateParams);

        // Show success dialog
        showDialog('success');
        emailInput.value = '';
        
    } catch (error) {
        console.error('EmailJS Error:', error);
        // Show error dialog
        showDialog('error');
    }
    
    // Reset button state
    submitButton.disabled = false;
    submitButton.innerHTML = '<span class="button-text">Join Waitlist</span><span class="emoji">✨</span>';
});

// Add these functions to handle the dialog
function showDialog(type) {
    const dialogOverlay = document.getElementById('dialogOverlay');
    const dialogContent = document.querySelector('.dialog-content');
    
    if (type === 'success') {
        dialogContent.innerHTML = `
            <div class="dialog-icon">🛍️</div>
            <h2>Success!</h2>
            <p>You're on the list! Check your email</p>
            <button class="dialog-button" onclick="closeDialog()">Got it!</button>
        `;
    } else {
        dialogContent.innerHTML = `
            <div class="dialog-icon">🛍️</div>
            <h2>Oops!</h2>
            <p>Something went wrong. Please try again.</p>
            <button class="dialog-button" onclick="closeDialog()">Close</button>
        `;
    }
    
    dialogOverlay.style.display = 'flex';
}

function closeDialog() {
    const dialogOverlay = document.getElementById('dialogOverlay');
    dialogOverlay.style.display = 'none';
}

// Close dialog when clicking outside
document.getElementById('dialogOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeDialog();
    }
});

// Add this function to restart typing animation when visible
function handleTypingAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'none';
                entry.target.offsetHeight; // Trigger reflow
                entry.target.style.animation = 'typing 4s steps(40) 1s 1 normal both, blink 500ms steps(40) infinite normal';
            }
        });
    }, { threshold: 0.5 });

    const typingText = document.querySelector('.typing-text');
    observer.observe(typingText);
}

// Call the function
handleTypingAnimation();

// Add this to handle placeholder animation better
document.querySelector('input[type="email"]').addEventListener('input', function() {
    const placeholder = document.querySelector('.placeholder-text');
    if (this.value.length > 0) {
        placeholder.classList.add('moved');
    } else {
        placeholder.classList.remove('moved');
    }
});

// Add this to remove the cursor after animation
document.querySelector('.typing-text').addEventListener('animationend', function(e) {
    if (e.animationName === 'typing') {
        this.classList.add('finished');
    }
});
