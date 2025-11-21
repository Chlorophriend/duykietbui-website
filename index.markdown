---
layout: default
title: Home
---

<div id="intro">
    <span class="image avatar"><img src="{{ '/images/avatar.jpg' | relative_url }}" alt="" style="width: 150px; border-radius: 50%;" /></span>
    
    <h1>Duy-Kiet's<br />
    Portfolio</h1>
    <p>Aspiring I/O Psychologist | Pixel Art Enthusiast<br />
    <a href="https://github.com/yourusername">@yourusername</a></p>
    <ul class="actions">
        <li><a href="#header" class="button icon solid solo fa-arrow-down scrolly">Continue</a></li>
    </ul>
</div>

<section class="post featured">
    <header class="major">
        <span class="date">{{ site.posts.first.date | date_to_string }}</span>
        <h2><a href="{{ site.posts.first.url | relative_url }}">{{ site.posts.first.title }}</a></h2>
        <p>{{ site.posts.first.excerpt }}</p>
    </header>
    {% if site.posts.first.image %}
    <a href="{{ site.posts.first.url | relative_url }}" class="image main"><img src="{{ site.posts.first.image | relative_url }}" alt="" /></a>
    {% endif %}
    <ul class="actions special">
        <li><a href="{{ site.posts.first.url | relative_url }}" class="button large">Full Story</a></li>
    </ul>
</section>

<section class="posts">
    {% for post in site.posts offset:1 %}
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