// Cache for header content
let cachedHeader = null;

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Show loading overlay
        document.body.insertAdjacentHTML('afterbegin', `
            <div class="loading-overlay">
                <div class="typewriter">
                    <span class="typewriter-text">Loading</span>
                </div>
            </div>
        `);
        
        const loadingOverlay = document.querySelector('.loading-overlay');
        
        // Load header if not cached
        if (!cachedHeader) {
            const headerResponse = await fetch('components/header.html');
            cachedHeader = await headerResponse.text();
        }
        
        // Load footer
        const footerResponse = await fetch('components/footer.html');
        const footerContent = await footerResponse.text();

        // Insert header and footer content
        const headerContainer = document.getElementById('header-container');
        const mainContent = document.getElementById('main');
        
        headerContainer.innerHTML = cachedHeader;
        
        // Only append footer if not on the resume page
        if (mainContent && !document.body.classList.contains('resume-page')) {
            mainContent.insertAdjacentHTML('beforeend', footerContent);
        }

        // Initialize components
        initializeComponents();

        // Wait for images to load
        await Promise.all(Array.from(document.images)
            .filter(img => !img.complete)
            .map(img => new Promise(resolve => {
                img.onload = img.onerror = resolve;
            }))
        );

        // Hide loading overlay
        loadingOverlay.classList.add('fade-out');
        setTimeout(() => {
            loadingOverlay.remove();
        }, 300);

        // Add loaded class to header
        requestAnimationFrame(() => {
            const header = document.getElementById('header');
            if (header) {
                header.classList.add('loaded');
            }
            document.body.classList.add('loaded');
        });

    } catch (error) {
        console.error('Error loading components:', error);
        // Hide loading overlay even if there's an error
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => loadingOverlay.remove(), 300);
        }
    }
});

async function loadHeader() {
    try {
        const response = await fetch('components/header.html');
        const data = await response.text();
        const headerContainer = document.getElementById('header-container');
        headerContainer.innerHTML = data;
        
        // Wait for images to load
        await Promise.all(Array.from(headerContainer.getElementsByTagName('img'))
            .map(img => {
                return new Promise((resolve) => {
                    if (img.complete) resolve();
                    else img.onload = resolve;
                });
            }));
            
        // Add loaded class to header
        const header = document.getElementById('header');
        if (header) {
            setTimeout(() => {
                header.classList.add('loaded');
            }, 100); // Small delay to ensure smooth animation
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

async function loadFooter() {
    try {
        const response = await fetch('components/footer.html');
        const data = await response.text();
        document.getElementById('footer-container').innerHTML = data;
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

function initializeComponents() {
    initializeDropdown();
    // Add any other initialization needed
}

// Dropdown functionality
function initializeDropdown() {
    const dropdownContent = document.getElementById('dropdown-content');
    if (!dropdownContent) return;

    const projects = [
        { 
            href: './WavesOfDiscard.html', 
            text: 'Waves of Discard', 
            category: 'project-art'
        },
        { 
            href: './StorySpark.html', 
            text: 'StorySpark', 
            category: 'project-app'
        },
        { 
            href: './GardeningSimulator.html', 
            text: 'Gardening Simulator', 
            category: 'project-game'
        },
        { 
            href: './GnomesOnTheLoose.html', 
            text: 'Gnomes on the Loose', 
            category: 'project-game'
        },
        { 
            href: './ResManager.html', 
            text: 'ResManager', 
            category: 'project-app'
        },
        { 
            href: './CovidDataAnalysis.html', 
            text: 'Covid Data Analysis', 
            category: 'project-data'
        }
    ];

    dropdownContent.innerHTML = projects.map(project => 
        `<a href="${project.href}" class="${project.category}" data-text="${project.text}">${project.text}</a>`
    ).join('');
}

function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.classList.toggle('show');
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (const dropdown of dropdowns) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    }
} 