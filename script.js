// Advanced Custom Cursor System
const cursor = document.querySelector('.cursor');
const dot = document.querySelector('.cursor-dot');

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    createTrail(mouseX, mouseY);
});

function animateCursor() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;

    cursor.style.left = posX + 'px';
    cursor.style.top = posY + 'px';

    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.classList.add('trail');
    document.body.appendChild(trail);

    trail.style.left = x + 'px';
    trail.style.top = y + 'px';

    setTimeout(() => {
        trail.remove();
    }, 400);
}

// Magnetic Button Effect
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
    });
});

// Animated Holographic Background (Canvas)
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

let time = 0;

function drawBackground() {
    ctx.clearRect(0, 0, w, h);

    for (let y = 0; y < h; y += 20) {
        ctx.beginPath();

        for (let x = 0; x < w; x += 10) {
            let wave = Math.sin(x * 0.01 + time) * 20 + Math.cos(y * 0.02 + time) * 10;
            ctx.lineTo(x, y + wave);
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'; // Subtle holographic lines
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    time += 0.02;
    requestAnimationFrame(drawBackground);
}

drawBackground();

// Scroll effect for Navbar
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.padding = '1.2rem 5%'; /* Tamanho reduzido ao rolar */
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.padding = '2.2rem 5%'; /* Tamanho original maior */
        nav.style.background = 'rgba(18, 18, 18, 0.8)';
    }
});

// Add to Cart functionality
const cartButtons = document.querySelectorAll('.add-to-cart');
let cartCount = 0;

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        const icon = document.querySelector('.fa-shopping-bag');
        
        // Simple feedback
        button.innerText = 'Adicionado!';
        button.style.background = '#22C55E'; // Green success
        button.style.borderColor = '#22C55E';

        // Update cart icon (visual cue)
        icon.style.color = 'var(--primary-orange)';
        icon.classList.add('fa-bounce');
        
        setTimeout(() => {
            button.innerText = 'Adicionar ao Carrinho';
            button.style.background = 'var(--primary-orange)';
            button.style.borderColor = 'var(--primary-orange)';
            icon.classList.remove('fa-bounce');
        }, 1500);

        console.log(`Itens no carrinho: ${cartCount}`);
    });
});

// User Session Management
function checkUserSession() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userIconLink = document.querySelector('.nav-icon-link');
    const registerLink = document.querySelector('.register-mobile-link');

    if (user) {
        if (userIconLink) {
            userIconLink.innerHTML = `<i class="fas fa-user-check" style="color: var(--primary-orange);"></i> <span style="font-size: 0.8rem; margin-left: 5px;">${user.name.split(' ')[0]}</span>`;
            userIconLink.href = '#'; // Could link to a profile page
            userIconLink.title = 'Sair';
            userIconLink.addEventListener('click', (e) => {
                if (confirm('Deseja sair da sua conta?')) {
                    localStorage.removeItem('currentUser');
                    window.location.reload();
                }
            });
        }
        if (registerLink) {
            registerLink.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', checkUserSession);

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Search Functionality
const searchToggle = document.getElementById('searchToggle');
const searchInput = document.getElementById('searchInput');

if (searchToggle && searchInput) {
    // Toggle search bar
    searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Real-time filtering
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        const sections = document.querySelectorAll('.section-title');

        let hasResults = false;

        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').innerText.toLowerCase();
            const productCategory = card.querySelector('.product-category').innerText.toLowerCase();
            
            if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
                card.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Optional: Hide section titles if filtering
        sections.forEach(section => {
            if (searchTerm.length > 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && e.target !== searchToggle) {
            searchInput.classList.remove('active');
        }
    });
}
