---
layout: default
title: Secret Blog
permalink: /blog/
description: "A private journal of reflections, thoughts, and daily notes. Solve the Gatekeeper's Riddle to unlock."
---

<!-- The Gatekeeper's Riddle Password Gate -->
<div id="password-gate">
    <!-- Pulsing Keyhole SVG Icon -->
    <div style="margin-bottom: 25px;">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="animation: pulse 2s infinite ease-in-out;">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
            <path d="M12 12v4"></path>
            <path d="M11 16h2"></path>
        </svg>
    </div>
    
    <h2>The Gatekeeper's Riddle</h2>

    <div class="riddle-text">
        <p>
            "The Fool must overcome their fear of triskaidekaphobia for the seed to sow.<br />
            I harvest the old so the new may grow.<br />
            I am not the end, but the transformation of the soul.<br />
            <strong>What am I?</strong>"
        </p>
    </div>

    <form id="password-form">
        <input type="text" id="password-input" autocomplete="off" placeholder="Type your answer..." aria-label="Passcode Input">
        <div style="margin-top: 20px;">
            <button type="submit" class="button primary">Unlock Archive</button>
        </div>
    </form>
    
    <p id="error-message" style="display: none;">
        That is incorrect. The gate remains locked.
    </p>
</div>

<!-- Protected Blog Archive -->
<div id="protected-content" style="display: none; opacity: 0;">
    <header style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 2.5rem; margin-bottom: 10px;">The Secret Archive</h1>
        <p style="color: var(--text-secondary); font-style: italic;">Transformation complete. Welcome inside.</p>
    </header>

    <!-- Filter and Sorting Bar -->
    <div class="filter-sorting-bar">
        <div class="button-group">
            <button class="button active" onclick="filterPosts('all', this)">All</button>
            <button class="button" onclick="filterPosts('serious', this)">Serious</button>
            <button class="button" onclick="filterPosts('daily', this)">Daily</button>
        </div>
        
        <button id="sort-btn" class="button" onclick="toggleSortOrder()">Sort: Oldest First</button>
    </div>

    <!-- Posts Grid -->
    <section class="posts-grid" id="blog-posts-container">
        {% assign blog_posts = site.posts | where_exp: "item", "item.path contains 'blog/'" %}
        
        {% for post in blog_posts %}
            {% assign post_category = "uncategorized" %}
            {% if post.path contains 'blog/serious' %}
                {% assign post_category = "serious" %}
            {% elsif post.path contains 'blog/daily' %}
                {% assign post_category = "daily" %}
            {% endif %}

            <article class="blog-post-item {{ post_category }}">
                {% if post.image %}
                <a href="{{ post.url | relative_url }}" class="image-fit">
                    <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" />
                </a>
                {% endif %}
                
                <div class="post-content">
                    <span class="date">{{ post.date | date_to_string }}</span>
                    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
                    <p>{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
                    <div class="actions">
                        <a href="{{ post.url | relative_url }}" class="button">Read Entry</a>
                    </div>
                </div>
            </article>
        {% endfor %}
    </section>
</div>

<!-- Inline keyframe styling for keyhole pulsing -->
<style>
@keyframes pulse {
    0%, 100% { opacity: 0.6; transform: scale(1); filter: drop-shadow(0 0 2px rgba(139, 92, 246, 0.2)); }
    50% { opacity: 1; transform: scale(1.08); filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.6)); }
}
</style>