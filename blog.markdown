---
layout: default
title: Secret Blog
permalink: /blog/
---

<div id="password-gate" style="text-align: center; padding: 50px 20px;">
    <header class="major">
        <h2>The Gatekeeper's Riddle</h2>
    </header>

    <div style="font-style: italic; font-size: 1.2rem; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
        <p>
            "The Fool must overcome their fear of triskaidekaphobia for the seed to sow.<br />
            I harvest the old so the new may grow.<br />
            I am not the end, but the transformation of the soul.<br />
            <strong>What am I?</strong>"
        </p>
    </div>

    <form onsubmit="event.preventDefault(); checkPassword();">
        <input type="text" id="password-input" placeholder="Answer the riddle..." style="max-width: 300px; margin: 0 auto; display: block; text-align: center;">
        <br>
        <button type="submit" class="button primary large">Enter</button>
    </form>
    
    <p id="error-message" style="color: #ff6b6b; display: none; margin-top: 15px; font-weight: bold;">
        That is incorrect. The gate remains closed.
    </p>
</div>

<div id="protected-content" style="display: none;">

    <header class="major">
        <h1>The Secret Archive</h1>
        <p>Transformation complete. Welcome inside.</p>
    </header>

    <div style="text-align: center; margin-bottom: 30px;">
        <div class="button-group" style="margin-bottom: 15px;">
            <button class="button small primary" onclick="filterPosts('all', this)">All</button>
            <button class="button small" onclick="filterPosts('serious', this)">Serious</button>
            <button class="button small" onclick="filterPosts('daily', this)">Daily</button>
        </div>
        
        <button id="sort-btn" class="button small icon solid fa-sort" onclick="toggleSortOrder()">Sort: Oldest First</button>
    </div>

    <section class="posts" id="blog-posts-container">
        {% assign blog_posts = site.posts | where_exp: "item", "item.path contains 'blog/'" %}
        
        {% for post in blog_posts %}
        
        {% assign post_category = "uncategorized" %}
        {% if post.path contains 'blog/serious' %}
            {% assign post_category = "serious" %}
        {% elsif post.path contains 'blog/daily' %}
            {% assign post_category = "daily" %}
        {% endif %}

        <article class="blog-post-item {{ post_category }}">
            <header>
                <span class="date">{{ post.date | date_to_string }}</span>
                <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
            </header>
            {% if post.image %}
            <a href="{{ post.url | relative_url }}" class="image fit"><img src="{{ post.image | relative_url }}" alt="" /></a>
            {% endif %}
            <p>{{ post.excerpt }}</p>
            <ul class="actions special">
                <li><a href="{{ post.url | relative_url }}" class="button">Read Entry</a></li>
            </ul>
        </article>
        {% endfor %}
    </section>

</div>

<script>
    // --- PART 1: PASSWORD LOGIC ---
    function checkPassword() {
        const correctPassword = "death"; 
        const input = document.getElementById("password-input").value.trim().toLowerCase();
        
        if (input === correctPassword) {
            document.getElementById("password-gate").style.display = "none";
            document.getElementById("protected-content").style.display = "block";
            sessionStorage.setItem("blogUnlocked", "true");
        } else {
            document.getElementById("error-message").style.display = "block";
            document.getElementById("password-input").style.borderColor = "#ff6b6b";
        }
    }

    if (sessionStorage.getItem("blogUnlocked") === "true") {
        document.getElementById("password-gate").style.display = "none";
        document.getElementById("protected-content").style.display = "block";
    }

    // --- PART 2: FILTER LOGIC (NEW) ---
    function filterPosts(category, btn) {
        const posts = document.getElementsByClassName("blog-post-item");

        // 1. Show/Hide posts based on category
        for (let i = 0; i < posts.length; i++) {
            if (category === 'all') {
                posts[i].style.display = "block";
            } else {
                if (posts[i].classList.contains(category)) {
                    posts[i].style.display = "block";
                } else {
                    posts[i].style.display = "none";
                }
            }
        }

        // 2. Update Button Styles (Visual Feedback)
        // Reset all filter buttons to normal
        const buttons = btn.parentElement.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("primary");
        }
        // Highlight the clicked button
        btn.classList.add("primary");
    }

    // --- PART 3: SORT LOGIC ---
    function toggleSortOrder() {
        const container = document.getElementById('blog-posts-container');
        const articles = Array.from(container.getElementsByClassName('blog-post-item'));
        const btn = document.getElementById('sort-btn');

        // We use flex order or re-append to sort
        // Since we are filtering with display:none, re-appending is safest
        
        // Detach, Reverse, Re-attach
        articles.reverse().forEach(article => container.appendChild(article));

        if (btn.innerText.includes('Oldest')) {
            btn.innerText = "Sort: Newest First";
        } else {
            btn.innerText = "Sort: Oldest First";
        }
    }
</script>