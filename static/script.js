document.addEventListener('DOMContentLoaded', (event) => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        let theme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
        localStorage.setItem('theme', theme);
    });

    // Show/hide company guidelines textarea
    const guidelinesType = document.getElementById('guidelinesType');
    const companyGuidelines = document.getElementById('companyGuidelines');
    guidelinesType.addEventListener('change', () => {
        companyGuidelines.style.display = guidelinesType.value === 'Company Guidelines' ? 'block' : 'none';
    });
});

function showLoader(loaderId) {
    document.getElementById(loaderId).style.display = 'block';
}

function hideLoader(loaderId) {
    document.getElementById(loaderId).style.display = 'none';
}

function formatContent(content) {
    // Remove any asterisks
    content = content.replace(/\*/g, '');
    
    // Split content into paragraphs
    let paragraphs = content.split('\n\n');
    
    // Create HTML structure
    let formattedContent = '';
    paragraphs.forEach(paragraph => {
        if (paragraph.trim().startsWith('#')) {
            // Treat as header
            let headerLevel = paragraph.trim().split(' ')[0].length;
            let headerText = paragraph.trim().substring(headerLevel).trim();
            formattedContent += `<h${headerLevel}>${headerText}</h${headerLevel}>`;
        } else {
            // Treat as paragraph
            formattedContent += `<p>${paragraph.trim()}</p>`;
        }
    });
    
    return formattedContent;
}

function displayResult(resultId, content) {
    const resultElement = document.getElementById(resultId);
    resultElement.innerHTML = content; // Content is already formatted as HTML
    resultElement.style.display = 'block';
}


async function generateContent() {
    showLoader('generationLoader');
    const guidelinesType = document.getElementById('guidelinesType').value;
    const companyGuidelines = document.getElementById('companyGuidelines').value;
    const targetAudience = document.getElementById('targetAudience').value;
    const emotion = document.getElementById('emotion').value;
    const topic = document.getElementById('topic').value;

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                guidelinesType,
                companyGuidelines,
                targetAudience,
                emotion,
                topic
            }),
        });
        const data = await response.json();
        displayResult('generatedContent', data.generated_content);
    } catch (error) {
        console.error('Error:', error);
        displayResult('generatedContent', 'An error occurred while generating content.');
    } finally {
        hideLoader('generationLoader');
    }
}

async function moderateContent() {
    showLoader('moderationLoader');
    const content = document.getElementById('contentToModerate').value;
    const guidelinesType = document.getElementById('guidelinesType').value;
    const companyGuidelines = document.getElementById('companyGuidelines').value;

    try {
        const response = await fetch('/moderate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
                guidelinesType,
                companyGuidelines
            }),
        });
        const data = await response.json();
        displayResult('moderationResult', data.moderation_result);
    } catch (error) {
        console.error('Error:', error);
        displayResult('moderationResult', 'An error occurred while moderating content.');
    } finally {
        hideLoader('moderationLoader');
    }
}

async function generateMultiplePosts() {
    showLoader('multiplePostsLoader');
    const idea = document.getElementById('idea').value;
    const numPosts = document.getElementById('numPosts').value;

    try {
        const response = await fetch('/multiple_posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idea,
                numPosts
            }),
        });
        const data = await response.json();
        displayResult('multiplePosts', data.multiple_posts);
    } catch (error) {
        console.error('Error:', error);
        displayResult('multiplePosts', 'An error occurred while generating multiple posts.');
    } finally {
        hideLoader('multiplePostsLoader');
    }
}

async function generatePersonalBrandContent() {
    showLoader('personalBrandLoader');
    const platform = document.getElementById('platform').value;
    const niche = document.getElementById('niche').value;

    try {
        const response = await fetch('/personal_brand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                platform,
                niche
            }),
        });
        const data = await response.json();
        displayResult('personalBrandContent', data.personal_brand_content);
    } catch (error) {
        console.error('Error:', error);
        displayResult('personalBrandContent', 'An error occurred while generating personal brand content.');
    } finally {
        hideLoader('personalBrandLoader');
    }
}