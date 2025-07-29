// Academic Project Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Copy citation to clipboard
    const citationBox = document.querySelector('.citation-box');
    if (citationBox) {
        citationBox.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(function() {
                // Show feedback
                const originalBg = citationBox.style.backgroundColor;
                citationBox.style.backgroundColor = '#d4edda';
                citationBox.style.transition = 'background-color 0.3s ease';
                
                setTimeout(() => {
                    citationBox.style.backgroundColor = originalBg;
                }, 1000);
                
                // Optional: Show tooltip or notification
                showNotification('Citation copied to clipboard!');
            });
        });
        
        // Add cursor pointer style
        citationBox.style.cursor = 'pointer';
        citationBox.title = 'Click to copy citation';
    }

    // Show notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-weight: 500;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add hover effects to result cards
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
        });
    });

    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if (header) {
            const rate = scrolled * -0.5;
            header.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading animation for method diagram
    const methodDiagram = document.querySelector('.method-diagram');
    if (methodDiagram) {
        methodDiagram.addEventListener('click', function() {
            this.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
                    <div>Loading method diagram...</div>
                </div>
            `;
            
            // Add CSS for spin animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Simulate loading
            setTimeout(() => {
                this.innerHTML = 'Method Architecture Diagram<br>(Replace with actual diagram)';
            }, 2000);
        });
    }

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Special animation for motivation and method images
    const motivationImg = document.querySelector('#motivation img');
    const methodImg = document.querySelector('#method .method-figure img');
    
    // Reusable function for creating image modal
    function createImageModal(event) {
        const sourceImg = event.target;
        
        // Create modal for better image viewing
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.95);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: zoom-out;
            padding: 20px;
            box-sizing: border-box;
            backdrop-filter: blur(5px);
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = sourceImg.src;
        modalImg.style.cssText = `
            max-width: 95%;
            max-height: 95%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            background: white;
            border: 1px solid #e1e8ed;
        `;
        
        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            color: #333;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1001;
            background: rgba(255, 255, 255, 0.9);
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
        `;
        
        // Add hover effect for close button
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = 'rgba(255, 255, 255, 1)';
            closeBtn.style.transform = 'scale(1.1)';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'rgba(255, 255, 255, 0.9)';
            closeBtn.style.transform = 'scale(1)';
        });
        
        modal.appendChild(modalImg);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        // Add fade-in animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '1';
        }, 10);
        
        // Close on click
        [modal, closeBtn].forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target === modal || e.target === closeBtn) {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        if (document.body.contains(modal)) {
                            document.body.removeChild(modal);
                        }
                    }, 300);
                }
            });
        });
        
        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modal.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                }, 300);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    // Apply modal functionality to images
    if (motivationImg) {
        motivationImg.style.cursor = 'zoom-in';
        motivationImg.title = 'Click to enlarge';
        motivationImg.addEventListener('click', createImageModal);
    }

    if (methodImg) {
        methodImg.style.cursor = 'zoom-in';
        methodImg.title = 'Click to enlarge';
        methodImg.addEventListener('click', createImageModal);
    }

    // Add click-to-enlarge for result GIFs
    const resultGifs = document.querySelectorAll('.result-gif');
    resultGifs.forEach(gif => {
        gif.style.cursor = 'zoom-in';
        gif.title = 'Click to enlarge';
        gif.addEventListener('click', createImageModal);
    });
});
