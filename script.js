
// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingContainer = document.getElementById('loading');
    
    // Create the terminal-style elements
    loadingContainer.innerHTML = `
        <div class="terminal-text">
            <span class="terminal-prompt">bash$</span>
            <span class="terminal-command" id="typed-command"></span>
            <span class="terminal-cursor"></span>
        </div>
    `;
    
    const typedCommand = document.getElementById('typed-command');
    const text = "cd ~/yoga's-portfolio";
    let charIndex = 0;
    
    // References to elements for animations
    const navbar = document.getElementById('navbar');
    const mobileNav = document.getElementById('mobile-nav');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const ctaButtons = document.getElementById('cta-buttons');
    const sectionTitles = document.querySelectorAll('.section-title');
    const aboutContent = document.querySelector('.about-content');
    const skillsGrid = document.querySelector('.skills-grid');
    const projectsGrid = document.querySelector('.projects-grid');
    const blogGrid = document.querySelector('.blog-grid');
    const contactContainer = document.querySelector('.contact-container');

    // Type out the command character by character
    function typeText() {
        if (charIndex < text.length) {
            typedCommand.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        } else {
            // After typing completes, wait and then fade out
            setTimeout(() => {
                gsap.to(loadingContainer, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        loadingContainer.style.display = 'none';
                        // Initialize animations for page content
                        initAnimations();
                    }
                });
            }, 1000);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 500);

    function initAnimations() {
        // Navbar animation
        gsap.to(navbar, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        });

        gsap.to(mobileNav, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        });

        // Hero section animations
        gsap.to(heroTitle, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.7
        });

        gsap.to(heroSubtitle, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.9
        });

        gsap.to(ctaButtons, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 1.1
        });

        // Section title animations
        gsap.to(sectionTitles, {
            scrollTrigger: {
                trigger: sectionTitles,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // About section animation
        gsap.to(aboutContent, {
            scrollTrigger: {
                trigger: aboutContent,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });

        // Skills grid animation
        gsap.to(skillsGrid, {
            scrollTrigger: {
                trigger: skillsGrid,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });

        // Projects grid animation
        gsap.to(projectsGrid, {
            scrollTrigger: {
                trigger: projectsGrid,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });

        // Blog grid animation
        gsap.to(blogGrid, {
            scrollTrigger: {
                trigger: blogGrid,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });

        // Contact container animation
        gsap.to(contactContainer, {
            scrollTrigger: {
                trigger: contactContainer,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });

        // Initialize particles.js
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#3b82f6"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#3b82f6",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const formData = new FormData(contactForm);

                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            alert('✅ Message sent! Thank you.');
                            contactForm.reset();
                        } else {
                            alert('❌ There was a problem. Please try again.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('❌ Error sending message.');
                    });
            });
        }
    }
});
