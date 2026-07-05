---
layout: default
title: Home
description: "Duy-Kiet (Keir) Bui - Aspiring I/O Psychologist & Research Enthusiast. Studying human sexuality, DEI, and psychometrics using Data Science tools."
---

<!-- Hero Intro Section -->
<section id="intro">
    <div class="avatar">
        <img src="{{ '/images/avatar.jpg' | relative_url }}" alt="Duy-Kiet (Keir) Bui" />
    </div>
    <h1>Duy-Kiet (Keir) Bui</h1>
    <p>Aspiring I/O Psychologist &bull; Research Enthusiast &bull; Data Science Explorer</p>
    <div class="button-group">
        <a href="#about" class="button primary">Learn More</a>
        <a href="{{ '/blog/' | relative_url }}" class="button">Visit the Blog</a>
    </div>
</section>

<!-- Research Interests Section -->
<section id="about">
    <h2 class="section-title">Core Research Focus</h2>
    <div class="grid-cards">
        <div class="grid-card">
            <span class="icon-wrapper">🧬</span>
            <h3>Psychometrics &amp; Quantitative Analysis</h3>
            <p>Leveraging statistical programming in R and Python to model human traits, scale validations, and explore complex behavioral patterns.</p>
        </div>
        <div class="grid-card">
            <span class="icon-wrapper">🕯️</span>
            <h3>Human Sexuality</h3>
            <p>Exploring intimacy, adult attachment styles, and development from a developmental and quantitative psychological perspective.</p>
        </div>
        <div class="grid-card">
            <span class="icon-wrapper">👥</span>
            <h3>Diversity, Equity &amp; Inclusion (DEI)</h3>
            <p>Investigating systemic inequality, regional barriers, and marginalization in academic, professional, and societal structures.</p>
        </div>
    </div>
</section>

<!-- Interactive Resume Section -->
<section id="resume">
    <h2 class="section-title">Academic &amp; Professional Profile</h2>
    <div class="resume-container">
        <div class="resume-grid">
            <div class="resume-column">
                <h3>Education</h3>
                <div class="resume-item">
                    <h4>BSc in Psychology (Honours)</h4>
                    <div class="meta">Minor in Data Science</div>
                    <p>Rigorous training in quantitative research methodologies, data analysis, and advanced psychological principles.</p>
                </div>
                <div class="resume-item">
                    <h4>Directed Studies &amp; Research</h4>
                    <div class="meta">I/O Psychology &amp; Behavioral Science</div>
                    <p>Focusing on statistical modeling, survey design, and practical interventions to address income and knowledge disparities.</p>
                </div>
            </div>
            <div class="resume-column">
                <h3>Technical Toolbox</h3>
                <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 15px;">
                    Combining psychological theories with data analysis methods to unlock data-driven insights.
                </p>
                <div class="skills-tags">
                    <span class="skill-tag">R Programming</span>
                    <span class="skill-tag">Python</span>
                    <span class="skill-tag">Data Visualization</span>
                    <span class="skill-tag">Survey Design</span>
                    <span class="skill-tag">Psychometrics</span>
                    <span class="skill-tag">Statistical Modeling</span>
                    <span class="skill-tag">Experimental Design</span>
                    <span class="skill-tag">Git Version Control</span>
                </div>
            </div>
        </div>
        
        <div class="resume-actions">
            <a href="{{ '/assets/pdf/cv.pdf' | relative_url }}" class="button primary" download>Download Full CV (PDF)</a>
        </div>
    </div>
</section>

<!-- Public Posts Section -->
<section class="posts">
    <h2 class="section-title">Public Insights &amp; Notes</h2>
    <div class="posts-grid">
        {% assign public_posts = site.posts | where_exp: "item", "item.path contains 'public/'" %}
        {% if public_posts.size > 0 %}
            {% for post in public_posts %}
            <article class="blog-post-item">
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
        {% else %}
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
                <p>No public notes available at the moment. Keep an eye out for updates!</p>
            </div>
        {% endif %}
    </div>
</section>