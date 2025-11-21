---
layout: default
title: Blog
permalink: /blog/
---

<section class="one dark cover">
    <div class="container">
        <header>
            <h2>My Blog</h2>
            <p>Thoughts, tutorials, and updates.</p>
        </header>

        <div class="row">
            <div class="col-12">
                <ul style="list-style: none; padding: 0; text-align: left;">
                    {% for post in site.posts %}
                        <li style="background: rgba(0,0,0,0.3); padding: 20px; margin-bottom: 20px; border-radius: 5px;">
                            <h3><a href="{{ post.url | relative_url }}" style="text-decoration: none; color: inherit;">{{ post.title }}</a></h3>
                            <span style="font-size: 0.8em; color: #aaa;">{{ post.date | date: "%B %d, %Y" }}</span>
                            <p>{{ post.excerpt }}</p>
                            <a href="{{ post.url | relative_url }}" class="button scrolly">Read More</a>
                        </li>
                    {% endfor %}
                </ul>
            </div>
        </div>
        
    </div>
</section>