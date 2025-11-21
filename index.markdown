---
layout: default
title: Home
intro:
  title: "Duy-Kiet's<br />Portfolio"
  text: "Aspiring I/O Psychologist | Pixel Art Enthusiast"
---

<section class="post featured">
    <header class="major">
        <h2>My CV</h2>
        <p>Aspiring I/O Psychologist &amp; Data Science Minor</p>
    </header>
    
    <div class="image main">
        <object data="{{ '/assets/documents/CV_KeirBui_Grad-app_2025 v3.pdf' | relative_url }}" type="application/pdf" width="100%" height="800px">
            <p>Unable to display PDF file. <a href="{{ '/assets/pdf/cv.pdf' | relative_url }}">Download</a> instead.</p>
        </object>
    </div>

    <ul class="actions special">
        <li><a href="{{ '/assets/pdf/cv.pdf' | relative_url }}" class="button large icon solid fa-download">Download CV</a></li>
    </ul>
</section>

<section class="posts">
    {% assign public_posts = site.posts | where_exp: "item", "item.path contains 'public/'" %}
    
    {% for post in public_posts %}
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
            <li><a href="{{ post.url | relative_url }}" class="button">Full Story</a></li>
        </ul>
    </article>
    {% endfor %}
</section>