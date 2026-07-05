const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const siteDir = path.join(rootDir, '_site');

// Helper to ensure directories exist
function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

// Compile a page using the default layout and resolving Jekyll variables
function compilePage(sourcePath, destSubPath, isHome = false, isAbout = false, isBlog = false, isPost = false, postMeta = {}) {
    const fullSourcePath = path.join(rootDir, sourcePath);
    if (!fs.existsSync(fullSourcePath)) {
        console.warn(`Source path does not exist: ${sourcePath}`);
        return;
    }

    let rawContent = fs.readFileSync(fullSourcePath, 'utf-8');
    
    // Extract front matter and body
    const fmMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    let title = postMeta.title || '';
    let description = postMeta.description || '';
    let body = '';
    
    if (fmMatch) {
        body = fmMatch[2];
        const fm = fmMatch[1];
        const titleMatch = fm.match(/title:\s*(.*)/);
        if (titleMatch) title = titleMatch[1].trim().replace(/['"]/g, '');
        const descMatch = fm.match(/description:\s*(.*)/);
        if (descMatch) description = descMatch[1].trim().replace(/['"]/g, '');
    } else {
        body = rawContent;
    }

    // Determine layout: default or post
    const layoutName = isPost ? 'post.html' : 'default.html';
    let layoutContent = fs.readFileSync(path.join(rootDir, '_layouts', layoutName), 'utf-8');
    
    if (isPost) {
        // Post layout has parent layout 'default'
        layoutContent = layoutContent.replace('{{ content }}', body);
        layoutContent = layoutContent.replace('{{ page.title }}', title);
        layoutContent = layoutContent.replace('{{ page.description }}', description);
        layoutContent = layoutContent.replace('{{ page.date | date_to_string }}', postMeta.date || '05 Jul 2026');
        
        let parentLayout = fs.readFileSync(path.join(rootDir, '_layouts', 'default.html'), 'utf-8');
        layoutContent = parentLayout.replace('{{ content }}', layoutContent);
    } else if (isAbout) {
        // About uses page layout which has parent 'default'
        let pageLayout = fs.readFileSync(path.join(rootDir, '_layouts', 'page.html'), 'utf-8');
        layoutContent = pageLayout.replace('{{ content }}', body);
        layoutContent = layoutContent.replace('{{ page.title }}', title);
        layoutContent = layoutContent.replace('{{ page.description }}', description);
        
        let parentLayout = fs.readFileSync(path.join(rootDir, '_layouts', 'default.html'), 'utf-8');
        layoutContent = parentLayout.replace('{{ content }}', layoutContent);
    } else {
        // Standard default layout
        layoutContent = layoutContent.replace('{{ content }}', body);
    }

    // Replace basic site/page variables
    layoutContent = layoutContent.replace(/\{\{\s*site\.title\s*\}\}/g, 'Duy-Kiet (Keir) Bui');
    layoutContent = layoutContent.replace(/\{\{\s*page\.title\s*\}\}/g, title);
    layoutContent = layoutContent.replace(/\{\{\s*page\.description\s*\}\}/g, description);
    layoutContent = layoutContent.replace(/\{\{\s*site\.description\s*\}\}/g, 'Duy-Kiet (Keir) Bui - Aspiring I/O Psychologist & Research Enthusiast.');

    // Replace relative_url filter
    layoutContent = layoutContent.replace(/\{\{\s*['"](.*?)['"]\s*\|\s*relative_url\s*\}\}/g, (match, p1) => {
        return p1;
    });

    // Replace absolute_url filter
    layoutContent = layoutContent.replace(/\{\{\s*['"](.*?)['"]\s*\|\s*absolute_url\s*\}\}/g, (match, p1) => {
        return p1;
    });

    // Mock index post list
    if (isHome) {
        const indexPostListHtml = `
        <article class="blog-post-item">
            <a href="/2026/07/05/welcome-to-my-portfolio.html" class="image-fit">
                <img src="/images/bg.jpg" alt="Welcome to My Renovated Portfolio!" />
            </a>
            <div class="post-content">
                <span class="date">05 Jul 2026</span>
                <h3><a href="/2026/07/05/welcome-to-my-portfolio.html">Welcome to My Renovated Portfolio!</a></h3>
                <p>Hello and welcome! If you have visited this site in the past, you will notice that things look quite different now...</p>
                <div class="actions">
                    <a href="/2026/07/05/welcome-to-my-portfolio.html" class="button">Read Entry</a>
                </div>
            </div>
        </article>`;
        layoutContent = layoutContent.replace(/\{%\s*assign\s*public_posts[\s\S]*?\{%\s*endfor\s*%\}/, indexPostListHtml);
    }

    // Mock blog post list (with both serious and daily)
    if (isBlog) {
        const blogPostListHtml = `
        <article class="blog-post-item serious">
            <a href="/2026/07/05/welcome-to-my-portfolio.html" class="image-fit">
                <img src="/images/bg.jpg" alt="Welcome to My Renovated Portfolio!" />
            </a>
            <div class="post-content">
                <span class="date">05 Jul 2026</span>
                <h3><a href="/2026/07/05/welcome-to-my-portfolio.html">Welcome to My Renovated Portfolio!</a></h3>
                <p>Hello and welcome! If you have visited this site in the past, you will notice that things look quite different now...</p>
                <div class="actions">
                    <a href="/2026/07/05/welcome-to-my-portfolio.html" class="button">Read Entry</a>
                </div>
            </div>
        </article>
        <article class="blog-post-item serious">
            <div class="post-content">
                <span class="date">06 Dec 2025</span>
                <h3><a href="/2025/12/06/Modern-human-and-greed.html">Modern human and greed</a></h3>
                <p>Random reflections while studying for human adulthood development. Modern humans are all greedy...</p>
                <div class="actions">
                    <a href="/2025/12/06/Modern-human-and-greed.html" class="button">Read Entry</a>
                </div>
            </div>
        </article>
        <article class="blog-post-item serious">
            <div class="post-content">
                <span class="date">21 Nov 2025</span>
                <h3><a href="/2025/11/21/My-first-post.html">My first blog post</a></h3>
                <p>This is my first post ever on my own website yay! I'm trying to make the front page a bit more dynamic...</p>
                <div class="actions">
                    <a href="/2025/11/21/My-first-post.html" class="button">Read Entry</a>
                </div>
            </div>
        </article>
        <article class="blog-post-item daily">
            <div class="post-content">
                <span class="date">09 Dec 2025</span>
                <h3><a href="/2025/12/09/Perfume.html">Perfume</a></h3>
                <p>I bought myself a bottle of perfume today. It smells like wood and pine. It feels good...</p>
                <div class="actions">
                    <a href="/2025/12/09/Perfume.html" class="button">Read Entry</a>
                </div>
            </div>
        </article>
        <article class="blog-post-item daily">
            <div class="post-content">
                <span class="date">24 Nov 2025</span>
                <h3><a href="/2025/11/24/Odd-day.html">First odd experience with professor</a></h3>
                <p>I talked to one of my prof for a chance to do directed studies in the next semester. Weirded me out a bit...</p>
                <div class="actions">
                    <a href="/2025/11/24/Odd-day.html" class="button">Read Entry</a>
                </div>
            </div>
        </article>
        <article class="blog-post-item daily">
            <div class="post-content">
                <span class="date">19 Jan 2026</span>
                <h3><a href="/2026/01/19/Thơ-1.html">Thơ 1</a></h3>
                <p>Một bài thơ nhỏ về cuộc đời và những chuyến đi qua thời gian dài...</p>
                <div class="actions">
                    <a href="/2026/01/19/Thơ-1.html" class="button">Read Entry</a>
                </div>
            </div>
        </article>
        `;
        layoutContent = layoutContent.replace(/\{%\s*assign\s*blog_posts[\s\S]*?\{%\s*endfor\s*%\}/, blogPostListHtml);
    }

    // Set active nav link
    if (isHome) {
        layoutContent = layoutContent.replace('class="{% if page.url == \'/\' %}active{% endif %}"', 'class="active"');
        layoutContent = layoutContent.replace('class="{% if page.url contains \'/about/\' %}active{% endif %}"', '');
        layoutContent = layoutContent.replace('class="{% if page.url contains \'/blog/\' %}active{% endif %}"', '');
    } else if (isAbout) {
        layoutContent = layoutContent.replace('class="{% if page.url == \'/\' %}active{% endif %}"', '');
        layoutContent = layoutContent.replace('class="{% if page.url contains \'/about/\' %}active{% endif %}"', 'class="active"');
        layoutContent = layoutContent.replace('class="{% if page.url contains \'/blog/\' %}active{% endif %}"', '');
    } else if (isBlog) {
        layoutContent = layoutContent.replace('class="{% if page.url == \'/\' %}active{% endif %}"', '');
        layoutContent = layoutContent.replace('class="{% if page.url contains \'/about/\' %}active{% endif %}"', '');
        layoutContent = layoutContent.replace('class="{% if page.url contains \'/blog/\' %}active{% endif %}"', 'class="active"');
    } else {
        layoutContent = layoutContent.replace('class="{% if page.url == \'/\' %}active{% endif %}"', '');
        layoutContent = layoutContent.replace('class="{% if page.url contains \'/about/\' %}active{% endif %}"', '');
        layoutContent = layoutContent.replace('class="{% if page.url contains \'/blog/\' %}active{% endif %}"', '');
    }

    // Clean remaining template tags
    layoutContent = layoutContent.replace(/\{%[\s\S]*?%\}/g, '');
    layoutContent = layoutContent.replace(/\{\{[\s\S]*?\}\}/g, ''); // fallbacks

    // Write file to _site
    const finalDest = path.join(siteDir, destSubPath);
    ensureDirectoryExistence(finalDest);
    fs.writeFileSync(finalDest, layoutContent, 'utf-8');
    console.log(`Successfully compiled: ${destSubPath}`);
}

// 1. Build Pages
compilePage('index.markdown', 'index.html', true, false, false);
compilePage('about.markdown', 'about/index.html', false, true, false);
compilePage('blog.markdown', 'blog/index.html', false, false, true);

// 2. Build Welcome Post
compilePage(
    '_posts/public/2026-07-05-welcome-to-my-portfolio.md', 
    '2026/07/05/welcome-to-my-portfolio.html', 
    false, false, false, true, 
    { 
        title: "Welcome to My Renovated Portfolio!", 
        date: "05 Jul 2026", 
        description: "A brand new look for my academic and professional research showcase." 
    }
);

// 3. Build Mock blog posts just in case they are opened
compilePage(
    '_posts/blog/serious/2025-11-21-My-first-post.md', 
    '2025/11/21/My-first-post.html', 
    false, false, false, true, 
    { title: "My first blog post", date: "21 Nov 2025" }
);
compilePage(
    '_posts/blog/serious/2025-12-06-Modern-human-and-greed.md', 
    '2025/12/06/Modern-human-and-greed.html', 
    false, false, false, true, 
    { title: "Modern human and greed", date: "06 Dec 2025" }
);
compilePage(
    '_posts/blog/daily/2025-11-24-Odd-day.md', 
    '2025/11/24/Odd-day.html', 
    false, false, false, true, 
    { title: "First odd experience with professor", date: "24 Nov 2025" }
);

// 4. Copy current css and js to _site/assets/css and _site/assets/js
function copyFile(src, dest) {
    const fullSrc = path.join(rootDir, src);
    const fullDest = path.join(rootDir, dest);
    ensureDirectoryExistence(fullDest);
    fs.copyFileSync(fullSrc, fullDest);
    console.log(`Copied ${src} -> ${dest}`);
}

copyFile('assets/css/main.css', '_site/assets/css/main.css');
copyFile('assets/js/main.js', '_site/assets/js/main.js');

// Delete legacy JS in _site/assets/js to prevent any script caching
const legacyJsFiles = [
    '_site/assets/js/jquery.min.js',
    '_site/assets/js/jquery.scrollex.min.js',
    '_site/assets/js/jquery.scrolly.min.js',
    '_site/assets/js/browser.min.js',
    '_site/assets/js/breakpoints.min.js',
    '_site/assets/js/util.js'
];
legacyJsFiles.forEach(file => {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log(`Deleted legacy file from site assets: ${file}`);
    }
});

console.log('Site build successful.');
