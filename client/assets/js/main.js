document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only enable custom cursor on non-touch devices
    if(window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding slight delay to outline for smoother effect
            setTimeout(() => {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            }, 50);
        });
    } else {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Navbar & Scroll Progress & Scroll Top & Reveal Sections
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const reveals = document.querySelectorAll('.reveal');
    let countersAnimated = false;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Navbar
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';

        // Scroll Top Button
        if (scrollTop > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }

        // Reveal animations
        const windowHeight = window.innerHeight;
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;

            if(revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });

        // Statistics Counter Animation
        const statsSection = document.querySelector('.statistics');
        if (statsSection) {
            const statsTop = statsSection.getBoundingClientRect().top;
            if (statsTop < windowHeight - 100 && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        }
    });

    // Animate Counters
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16); // 60fps

            const updateCounter = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = (current + increment).toFixed(Number.isInteger(target) ? 0 : 2);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // Typed.js
    if (document.querySelector('.typed')) {
        new Typed('.typed', {
            strings: ['AI &amp; ML Student', 'Future AI Engineer', 'Problem Solver', 'Tech Enthusiast'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: ['#00f0ff', '#7000ff'] },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00f0ff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // Fetch and Populate Data
    fetchData();

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if(contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalBtnText = btn.innerHTML;
            btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    formStatus.innerHTML = `<span class="status-success"><i class="fas fa-check-circle"></i> ${data.message}</span>`;
                    contactForm.reset();
                } else {
                    formStatus.innerHTML = `<span class="status-error"><i class="fas fa-exclamation-circle"></i> ${data.message || 'Something went wrong.'}</span>`;
                }
            } catch (error) {
                formStatus.innerHTML = `<span class="status-error"><i class="fas fa-exclamation-circle"></i> Network error. Please try again later.</span>`;
            } finally {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
                
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }
        });
    }
});

async function fetchData() {
    try {
        // Fetch Projects
        const projectsRes = await fetch('/api/data/projects');
        const projectsData = await projectsRes.json();
        if(projectsData.success) {
            populateProjects(projectsData.data);
        }

        // Fetch Skills
        const skillsRes = await fetch('/api/data/skills');
        const skillsData = await skillsRes.json();
        if(skillsData.success) {
            populateSkills(skillsData.data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function populateProjects(projects) {
    const container = document.getElementById('projects-container');
    if(!container) return;

    let html = '';
    projects.forEach(project => {
        let techTags = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        
        html += `
            <div class="project-card glass-card">
                <div class="project-img">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tech">
                        ${techTags}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" class="btn btn-secondary"><i class="fab fa-github"></i> Code</a>
                        <a href="${project.live}" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Demo</a>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function populateSkills(skills) {
    const container = document.getElementById('skills-container');
    if(!container) return;

    let html = '';
    skills.forEach(category => {
        let itemsHtml = category.items.map(item => `<div class="skill-item">${item}</div>`).join('');
        
        html += `
            <div class="skill-category glass-card">
                <h3>${category.category}</h3>
                <div class="skill-list">
                    ${itemsHtml}
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}
