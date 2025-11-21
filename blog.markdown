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

    <section class="posts">
        {% for post in site.categories.blog %}
        <article>
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
    function checkPassword() {
        // The answer to the riddle
        const correctPassword = "death"; 

        // Get input and normalize it (trim whitespace, convert to lowercase)
        const input = document.getElementById("password-input").value.trim().toLowerCase();
        
        const gate = document.getElementById("password-gate");
        const content = document.getElementById("protected-content");
        const error = document.getElementById("error-message");

        if (input === correctPassword) {
            // Hide gate, show content
            gate.style.display = "none";
            content.style.display = "block";
            
            // SESSION STORAGE: Only keeps them logged in while this tab is open.
            // Closing the tab resets the lock.
            sessionStorage.setItem("blogUnlocked", "true");
        } else {
            // Show error and shake animation effect (optional polish)
            error.style.display = "block";
            const inputField = document.getElementById("password-input");
            inputField.style.borderColor = "#ff6b6b";
        }
    }

    // Check sessionStorage on load (so refreshing the page doesn't lock them out immediately)
    if (sessionStorage.getItem("blogUnlocked") === "true") {
        document.getElementById("password-gate").style.display = "none";
        document.getElementById("protected-content").style.display = "block";
    }
</script>