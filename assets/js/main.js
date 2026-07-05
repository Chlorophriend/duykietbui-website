/**
 * Duy-Kiet (Keir) Bui - Portfolio Website Javascript
 * Custom Vanilla JS implementation for theme toggle, mobile navigation,
 * password gate, and blog filtering/sorting.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initPasswordGate();
    initBlogFilters();
});

/* ==========================================
   1. Theme Management (Light / Dark Mode)
   ========================================== */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme (default to dark mode if nothing is saved)
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '🌙'; // Moon icon for switching to dark
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '☀️'; // Sun icon for switching to light
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '☀️';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '🌙';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    });
}

/* ==========================================
   2. Mobile Navigation Toggle
   ========================================== */
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('#nav .links');
    
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
        }
    });
}

/* ==========================================
   3. Password Gate (Secret Blog)
   ========================================== */
function initPasswordGate() {
    const gate = document.getElementById('password-gate');
    const content = document.getElementById('protected-content');
    const form = document.getElementById('password-form');
    const input = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-message');

    if (!gate || !content) return;

    // Check if session already unlocked
    if (sessionStorage.getItem('blogUnlocked') === 'true') {
        gate.style.display = 'none';
        content.style.display = 'block';
        content.style.opacity = '1';
        return;
    }

    if (form && input) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const correctPassword = 'death';
            const val = input.value.trim().toLowerCase();

            if (val === correctPassword) {
                // Success animation
                errorMsg.style.display = 'none';
                input.style.borderColor = 'var(--accent-color)';
                
                // Set unlock in session
                sessionStorage.setItem('blogUnlocked', 'true');

                // Smooth CSS transition
                gate.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                gate.style.opacity = '0';
                gate.style.transform = 'translateY(-20px)';

                setTimeout(() => {
                    gate.style.display = 'none';
                    content.style.display = 'block';
                    content.style.opacity = '0';
                    // Trigger reflow to start fade-in
                    content.offsetHeight; 
                    content.style.transition = 'opacity 0.5s ease';
                    content.style.opacity = '1';
                }, 500);
            } else {
                // Error display
                errorMsg.style.display = 'block';
                input.style.borderColor = '#ff4a4a';
                input.classList.add('shake');
                setTimeout(() => input.classList.remove('shake'), 500);
            }
        });
    }
}

/* ==========================================
   4. Blog Filtering & Sorting
   ========================================== */
let currentFilter = 'all';

function initBlogFilters() {
    window.filterPosts = function(category, btn) {
        currentFilter = category;
        const posts = document.querySelectorAll('.blog-post-item');
        
        // Hide/Show based on category
        posts.forEach(post => {
            if (category === 'all') {
                post.style.display = 'flex';
            } else {
                if (post.classList.contains(category)) {
                    post.style.display = 'flex';
                } else {
                    post.style.display = 'none';
                }
            }
        });

        // Toggle active button style
        if (btn && btn.parentElement) {
            const buttons = btn.parentElement.querySelectorAll('button');
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    };

    window.toggleSortOrder = function() {
        const container = document.getElementById('blog-posts-container');
        if (!container) return;

        const articles = Array.from(container.getElementsByClassName('blog-post-item'));
        const btn = document.getElementById('sort-btn');

        // Reverse the order of articles
        articles.reverse().forEach(article => container.appendChild(article));

        if (btn) {
            if (btn.textContent.includes('Oldest')) {
                btn.textContent = 'Sort: Newest First';
            } else {
                btn.textContent = 'Sort: Oldest First';
            }
        }
    };
}