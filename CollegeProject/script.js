document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupNavigation();
    startCountdown();
    initializeGallery();
    setupQuiz();
    initializeDiyas();
    setupScrollEffects();
    setupFAQ();
    setupSmoothScrolling();
}

function setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function startCountdown() {
    const targetDate = new Date('September 7, 2024 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = `
                <div class="celebration-message">
                    <h3>🎉 Ganesh Utsav is Here! 🎉</h3>
                    <p>Ganpati Bappa Morya!</p>
                </div>
            `;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initializeGallery() {
    const galleryData = {
        celebrations: [
            { icon: '🎭', title: 'Cultural Dance' },
            { icon: '🎵', title: 'Devotional Songs' },
            { icon: '🙏', title: 'Prayer Ceremony' },
            { icon: '🎪', title: 'Community Gathering' },
            { icon: '🎨', title: 'Art Exhibition' },
            { icon: '🍽️', title: 'Prasad Distribution' }
        ],
        idols: [
            { icon: '🐘', title: 'Majestic Ganesha' },
            { icon: '👑', title: 'Royal Decoration' },
            { icon: '🌺', title: 'Flower Adorned' },
            { icon: '✨', title: 'Golden Ganesha' },
            { icon: '🎭', title: 'Artistic Design' },
            { icon: '🏛️', title: 'Temple Style' }
        ],
        processions: [
            { icon: '🚶‍♂️', title: 'Devotee March' },
            { icon: '🥁', title: 'Traditional Drums' },
            { icon: '🎺', title: 'Musical Band' },
            { icon: '🚛', title: 'Decorated Truck' },
            { icon: '🎊', title: 'Celebration Parade' },
            { icon: '🌊', title: 'To the River' }
        ],
        decorations: [
            { icon: '🎋', title: 'Bamboo Arch' },
            { icon: '🏮', title: 'Colorful Lights' },
            { icon: '🌸', title: 'Fresh Flowers' },
            { icon: '🎀', title: 'Silk Ribbons' },
            { icon: '⭐', title: 'Star Decorations' },
            { icon: '🕯️', title: 'Oil Lamps' }
        ]
    };

    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryGrid = document.getElementById('gallery-grid');

    loadGallery('celebrations');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            loadGallery(tabName);
        });
    });

    function loadGallery(category) {
        const items = galleryData[category] || [];
        galleryGrid.innerHTML = '';

        items.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <div class="gallery-content">
                    <div class="gallery-icon">${item.icon}</div>
                    <div class="gallery-title">${item.title}</div>
                </div>
            `;
            
            galleryItem.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });

            galleryGrid.appendChild(galleryItem);
        });
    }
}

function setupQuiz() {
    const quizData = [
        {
            question: "What is Lord Ganesha also known as?",
            options: ["Vighnaharta", "Surya", "Indra", "Varuna"],
            correct: 0
        },
        {
            question: "How many days does Ganesh Utsav typically last?",
            options: ["5 days", "7 days", "10 days", "15 days"],
            correct: 2
        },
        {
            question: "What is Lord Ganesha's favorite sweet?",
            options: ["Laddu", "Modak", "Jalebi", "Rasgulla"],
            correct: 1
        },
        {
            question: "Who popularized the public celebration of Ganesh Utsav?",
            options: ["Mahatma Gandhi", "Lokmanya Tilak", "Swami Vivekananda", "Rabindranath Tagore"],
            correct: 1
        },
        {
            question: "What does 'Ganpati Bappa Morya' mean?",
            options: ["Come again next year", "Bless us always", "Victory to Lord Ganesha", "Remove all obstacles"],
            correct: 0
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let quizStarted = false;

    window.startQuiz = function() {
        if (quizStarted) {
            resetQuiz();
        }
        quizStarted = true;
        currentQuestion = 0;
        score = 0;
        showQuestion();
        document.querySelector('button[onclick="startQuiz()"]').textContent = 'Restart Quiz';
    };

    function showQuestion() {
        if (currentQuestion >= quizData.length) {
            showResults();
            return;
        }

        const question = quizData[currentQuestion];
        const questionContainer = document.getElementById('quiz-question');
        const optionsContainer = document.getElementById('quiz-options');
        const scoreContainer = document.getElementById('quiz-score');

        questionContainer.innerHTML = `Question ${currentQuestion + 1}: ${question.question}`;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(optionElement);
        });

        scoreContainer.innerHTML = `Score: <span id="score">${score}</span>/${quizData.length}`;
    }

    function selectAnswer(selectedIndex) {
        const question = quizData[currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        options[selectedIndex].classList.add(selectedIndex === question.correct ? 'correct' : 'incorrect');
        if (selectedIndex !== question.correct) {
            options[question.correct].classList.add('correct');
        }

        if (selectedIndex === question.correct) {
            score++;
            document.getElementById('score').textContent = score;
        }

        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 2000);
    }

    function showResults() {
        const questionContainer = document.getElementById('quiz-question');
        const optionsContainer = document.getElementById('quiz-options');
        
        let message = '';
        let emoji = '';
        
        if (score === quizData.length) {
            message = 'Perfect! You are a true Ganesha devotee! 🏆';
            emoji = '🎉';
        } else if (score >= 3) {
            message = 'Great job! You know a lot about Ganesh Utsav! 👏';
            emoji = '😊';
        } else {
            message = 'Good try! Learn more about Lord Ganesha and try again! 📚';
            emoji = '🤔';
        }

        questionContainer.innerHTML = `${emoji} Quiz Complete! ${emoji}`;
        optionsContainer.innerHTML = `
            <div class="quiz-result">
                <h3>${message}</h3>
                <p>Your Score: ${score}/${quizData.length}</p>
            </div>
        `;
    }

    function resetQuiz() {
        quizStarted = false;
        currentQuestion = 0;
        score = 0;
        document.getElementById('quiz-question').innerHTML = 'Click "Start Quiz" to begin!';
        document.getElementById('quiz-options').innerHTML = '';
        document.getElementById('quiz-score').innerHTML = 'Score: <span id="score">0</span>/5';
    }
}

function initializeDiyas() {
    const diyaContainer = document.getElementById('diya-container');
    
    for (let i = 0; i < 5; i++) {
        createDiya();
    }

    window.lightDiya = function() {
        const unlit = document.querySelectorAll('.diya:not(.lit)');
        if (unlit.length > 0) {
            const randomDiya = unlit[Math.floor(Math.random() * unlit.length)];
            randomDiya.classList.add('lit');
            
            if (Math.random() < 0.3) {
                createDiya();
            }
            
            showBlessing();
        } else {
            createDiya();
            setTimeout(() => {
                const newDiyas = document.querySelectorAll('.diya:not(.lit)');
                if (newDiyas.length > 0) {
                    newDiyas[0].classList.add('lit');
                }
            }, 100);
        }
    };

    function createDiya() {
        const diya = document.createElement('div');
        diya.className = 'diya';
        diya.innerHTML = '🪔';
        diya.addEventListener('click', function() {
            if (!this.classList.contains('lit')) {
                this.classList.add('lit');
                showBlessing();
            }
        });
        diyaContainer.appendChild(diya);
    }

    function showBlessing() {
        const blessings = [
            '🙏 May Lord Ganesha bless you!',
            '✨ Your prayers are heard!',
            '🌟 Obstacles removed!',
            '💫 Blessings received!',
            '🕉️ Om Gam Ganapataye Namaha!'
        ];
        
        const blessing = blessings[Math.floor(Math.random() * blessings.length)];
        
        const blessingDiv = document.createElement('div');
        blessingDiv.textContent = blessing;
        blessingDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 215, 0, 0.9);
            color: #2C1810;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-weight: bold;
            z-index: 10000;
            animation: fadeInOut 3s ease-in-out;
            pointer-events: none;
        `;
        
        document.body.appendChild(blessingDiv);
        
        setTimeout(() => {
            document.body.removeChild(blessingDiv);
        }, 3000);
    }
}

window.shareWish = function() {
    const wishText = document.getElementById('wish-text').value.trim();
    
    if (!wishText) {
        alert('Please write your wish first!');
        return;
    }
    
    const wishes = [
        'May your wish reach Lord Ganesha! 🙏',
        'Your heartfelt wish has been shared! ✨',
        'Ganpati Bappa will fulfill your wish! 🐘',
        'Blessings sent to all your loved ones! 💖'
    ];
    
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="background: #4CAF50; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem;">
            ${randomWish}
        </div>
    `;
    
    const wishForm = document.querySelector('.wishes-form');
    const existingSuccess = wishForm.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    successDiv.className = 'success-message';
    wishForm.appendChild(successDiv);
    
    document.getElementById('wish-text').value = '';
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
};

function setupFAQ() {
    window.toggleFaq = function(element) {
        const faqItem = element.parentNode;
        const isActive = faqItem.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            faqItem.classList.add('active');
        }
    };
}

function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .ritual-card, .timeline-item, .event-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function setupSmoothScrolling() {
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = section.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating-om, .floating-lotus, .floating-diya');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
        element.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'float 6s ease-in-out infinite';
            }, 100);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addFloatingAnimation, 1000);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }
    
    .celebration-message {
        text-align: center;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        backdrop-filter: blur(10px);
    }
    
    .celebration-message h3 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #FFD23F;
    }
    
    .quiz-result {
        text-align: center;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        backdrop-filter: blur(10px);
    }
    
    .quiz-result h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #FFD23F;
    }
    
    .gallery-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
        color: white;
    }
    
    .gallery-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    
    .gallery-title {
        font-size: 1.2rem;
        font-weight: 600;
        opacity: 0.9;
    }
`;
document.head.appendChild(style);

function optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', optimizeImages);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

window.addEventListener('error', function(e) {
    console.log('An error occurred:', e.error);
});

window.addEventListener('resize', function() {
    const countdown = document.getElementById('countdown');
    if (countdown && window.innerWidth < 768) {
        countdown.style.flexWrap = 'wrap';
    }
});

console.log('🕉️ Ganesh Utsav Website Loaded Successfully! Ganpati Bappa Morya! 🐘');
