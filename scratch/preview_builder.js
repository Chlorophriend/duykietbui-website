const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Helper to resolve layouts
function compilePage(pagePath, outputPath, isHome = false, isAbout = false, isBlog = false) {
    console.log(`Compiling ${pagePath}...`);
    
    // Read raw page
    let pageContent = fs.readFileSync(path.join(rootDir, pagePath), 'utf-8');
    
    // Extract front matter and body
    const fmMatch = pageContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    let title = '';
    let body = '';
    if (fmMatch) {
        const fm = fmMatch[1];
        body = fmMatch[2];
        const titleMatch = fm.match(/title:\s*(.*)/);
        if (titleMatch) title = titleMatch[1].trim();
    } else {
        body = pageContent;
    }

    // Read default layout
    let layout = fs.readFileSync(path.join(rootDir, '_layouts', 'default.html'), 'utf-8');
    
    // Replace content
    layout = layout.replace('{{ content }}', body);
    
    // Mock basic Jekyll variables & tags
    layout = layout.replace(/\{\{\s*site\.title\s*\}\}/g, 'Duy-Kiet (Keir) Bui');
    layout = layout.replace(/\{\{\s*page\.title\s*\}\}/g, title);
    
    // Replace relative_url filter
    layout = layout.replace(/\{\{\s*['"](.*?)['"]\s*\|\s*relative_url\s*\}\}/g, (match, p1) => {
        // Map paths for local preview
        if (p1 === '/') return 'index.html';
        if (p1 === '/about/') return 'about.html';
        if (p1 === '/blog/') return 'blog.html';
        // Strip leading slash
        return p1.startsWith('/') ? p1.substring(1) : p1;
    });

    // Replace absolute_url filter
    layout = layout.replace(/\{\{\s*['"](.*?)['"]\s*\|\s*absolute_url\s*\}\}/g, (match, p1) => {
        return p1.startsWith('/') ? p1.substring(1) : p1;
    });

    // Handle site.posts display logic for index.markdown preview (mock)
    if (isHome) {
        const mockPost = `
        <article class="blog-post-item">
            <a href="welcome-post.html" class="image-fit">
                <img src="images/bg.jpg" alt="Welcome Post" />
            </a>
            <div class="post-content">
                <span class="date">05 Jul 2026</span>
                <h3><a href="welcome-post.html">Welcome to My Renovated Portfolio!</a></h3>
                <p>Hello and welcome! If you have visited this site in the past, you will notice that things look quite different now...</p>
                <div class="actions">
                    <a href="welcome-post.html" class="button">Read Entry</a>
                </div>
            </div>
        </article>`;
        layout = layout.replace(/\{%\s*assign\s*public_posts[\s\S]*?\{%\s*endfor\s*%\}/, mockPost);
    }

    // Handle blog posts display logic for blog.markdown preview (mock)
    if (isBlog) {
        const mockPosts = `
        <article class="blog-post-item serious">
            <a href="welcome-post.html" class="image-fit">
                <img src="images/bg.jpg" alt="Welcome Post" />
            </a>
            <div class="post-content">
                <span class="date">05 Jul 2026</span>
                <h3><a href="welcome-post.html">Welcome to My Renovated Portfolio!</a></h3>
                <p>Hello and welcome! If you have visited this site in the past, you will notice that things look quite different now...</p>
                <div class="actions">
                    <a href="welcome-post.html" class="button">Read Entry</a>
                </div>
            </div>
        </article>
        <article class="blog-post-item serious">
            <div class="post-content">
                <span class="date">06 Dec 2025</span>
                <h3><a href="#">Modern human and greed</a></h3>
                <p>Random reflections while studying for human adulthood development. Modern humans are all greedy...</p>
                <div class="actions">
                    <a href="#" class="button">Read Entry</a>
                </div>
            </div>
        </article>
        <article class="blog-post-item daily">
            <div class="post-content">
                <span class="date">24 Nov 2025</span>
                <h3><a href="#">First odd experience with professor</a></h3>
                <p>I talked to one of my prof for a chance to do directed studies. Weirded me out a little bit...</p>
                <div class="actions">
                    <a href="#" class="button">Read Entry</a>
                </div>
            </div>
        </article>`;
        layout = layout.replace(/\{%\s*assign\s*blog_posts[\s\S]*?\{%\s*endfor\s*%\}/, mockPosts);
    }

    // Handle navigation active states
    if (isHome) {
        layout = layout.replace('class="{% if page.url == \'/\' %}active{% endif %}"', 'class="active"');
        layout = layout.replace('class="{% if page.url contains \'/about/\' %}active{% endif %}"', '');
        layout = layout.replace('class="{% if page.url contains \'/blog/\' %}active{% endif %}"', '');
    } else if (isAbout) {
        layout = layout.replace('class="{% if page.url == \'/\' %}active{% endif %}"', '');
        layout = layout.replace('class="{% if page.url contains \'/about/\' %}active{% endif %}"', 'class="active"');
        layout = layout.replace('class="{% if page.url contains \'/blog/\' %}active{% endif %}"', '');
    } else if (isBlog) {
        layout = layout.replace('class="{% if page.url == \'/\' %}active{% endif %}"', '');
        layout = layout.replace('class="{% if page.url contains \'/about/\' %}active{% endif %}"', '');
        layout = layout.replace('class="{% if page.url contains \'/blog/\' %}active{% endif %}"', 'class="active"');
    }

    // Clean remaining template tags
    layout = layout.replace(/\{%[\s\S]*?%\}/g, '');

    fs.writeFileSync(path.join(rootDir, outputPath), layout, 'utf-8');
    console.log(`Compiled page saved to ${outputPath}`);
}

// Compile Pages
compilePage('index.markdown', 'index.html', true, false, false);
compilePage('about.markdown', 'about.html', false, true, false);
compilePage('blog.markdown', 'blog.html', false, false, true);

// Create a mock compiled post detail page
console.log('Compiling mock post detail page...');
let postLayout = fs.readFileSync(path.join(rootDir, '_layouts', 'post.html'), 'utf-8');
let defaultLayout = fs.readFileSync(path.join(rootDir, '_layouts', 'default.html'), 'utf-8');
let postContent = `
<p>Hello and welcome! If you have visited this site in the past, you will notice that things look quite different now.</p>
<p>After leaving this portfolio untouched for a while, I decided it was time for a complete visual and structural renovation. The old, heavy HTML5 UP theme has been replaced with a custom, high-performance, dark-mode-first aesthetic designed to load quickly and adapt beautifully to any screen size.</p>
<blockquote>Science is not just an academic pursuit, but a vehicle for social equity.</blockquote>
<p>Feel free to check out my work and connect with me!</p>
`;
postLayout = postLayout.replace('{{ content }}', postContent);
postLayout = postLayout.replace('{{ page.title }}', 'Welcome to My Renovated Portfolio!');
postLayout = postLayout.replace('{{ page.date | date_to_string }}', '05 Jul 2026');
postLayout = postLayout.replace('{{ page.description }}', 'A brand new look for my academic and professional research showcase.');
postLayout = postLayout.replace(/\{%[\s\S]*?%\}/g, '');

defaultLayout = defaultLayout.replace('{{ content }}', postLayout);
defaultLayout = defaultLayout.replace(/\{\{\s*site\.title\s*\}\}/g, 'Duy-Kiet (Keir) Bui');
defaultLayout = defaultLayout.replace(/\{\{\s*page\.title\s*\}\}/g, 'Welcome Post');
defaultLayout = defaultLayout.replace(/\{\{\s*['"](.*?)['"]\s*\|\s*relative_url\s*\}\}/g, (match, p1) => {
    if (p1 === '/') return 'index.html';
    if (p1 === '/about/') return 'about.html';
    if (p1 === '/blog/') return 'blog.html';
    return p1.startsWith('/') ? p1.substring(1) : p1;
});
defaultLayout = defaultLayout.replace(/\{%[\s\S]*?%\}/g, '');

fs.writeFileSync(path.join(rootDir, 'welcome-post.html'), defaultLayout, 'utf-8');
console.log('Compiled mock post detail page saved to welcome-post.html');
console.log('All previews compiled successfully.');
