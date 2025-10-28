
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');

    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    const applyTheme = (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        if (themeToggleIcon) {
            themeToggleIcon.innerHTML = theme === 'dark'
                ? `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`
                : `<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
            applyTheme(currentTheme);
        });
    }

    applyTheme(currentTheme);

    const navLinks = document.querySelectorAll('[data-page]');
    const mainContent = document.getElementById('main-content');

    const CERTIFICATION_DATA = [
      { id: "aws-cda", name: "AWS Certified Developer - Associate", provider: "Amazon Web Services", icon: "☁️", category: "cloud", description: "Learn to develop and maintain applications on AWS. Focuses on core AWS services, uses, and basic architecture.", difficulty: "Intermediate", duration: "2-3 months", rating: 4.7, reviewCount: 12500 },
      { id: "aws-csa", name: "AWS Certified Solutions Architect - Associate", provider: "Amazon Web Services", icon: "☁️", category: "cloud", description: "Demonstrates knowledge of how to architect and deploy secure and robust applications on AWS technologies.", difficulty: "Intermediate", duration: "3-4 months", rating: 4.8, reviewCount: 25000 },
      { id: "gcp-ace", name: "Google Associate Cloud Engineer", provider: "Google Cloud", icon: "☁️", category: "cloud", description: "Deploy applications, monitor operations, and manage enterprise solutions on Google Cloud.", difficulty: "Beginner", duration: "1-2 months", rating: 4.6, reviewCount: 9800 },
      { id: "azure-az900", name: "Microsoft Certified: Azure Fundamentals", provider: "Microsoft Azure", icon: "☁️", category: "cloud", description: "Foundational knowledge of cloud concepts and how those concepts are implemented on Microsoft Azure.", difficulty: "Beginner", duration: "1 month", rating: 4.5, reviewCount: 18000 },
      { id: "gcp-dve", name: "Google Data Analytics Professional Certificate", provider: "Google", icon: "📊", category: "data", description: "Gain an immersive understanding of the practices and processes used by a junior or associate data analyst.", difficulty: "Beginner", duration: "6 months", rating: 4.8, reviewCount: 110000 },
      { id: "ibm-ds", name: "IBM Data Science Professional Certificate", provider: "IBM", icon: "📊", category: "data", description: "Build data science skills, learn Python and SQL, analyze and visualize data, build machine learning models.", difficulty: "Beginner", duration: "5 months", rating: 4.6, reviewCount: 65000 },
      { id: "tf-dev", name: "TensorFlow Developer Certificate", provider: "Google", icon: "🤖", category: "data", description: "Demonstrate your proficiency in using TensorFlow to solve deep learning and ML problems.", difficulty: "Intermediate", duration: "3-4 months", rating: 4.7, reviewCount: 4500 },
      { id: "comptia-sec+", name: "CompTIA Security+", provider: "CompTIA", icon: "🔒", category: "security", description: "A global certification that validates the baseline skills necessary to perform core security functions.", difficulty: "Intermediate", duration: "2-3 months", rating: 4.7, reviewCount: 35000 },
      { id: "isc2-cc", name: "Certified in Cybersecurity (CC)", provider: "(ISC)²", icon: "🔒", category: "security", description: "Ideal for IT professionals, career changers and students looking to prove their knowledge in cybersecurity.", difficulty: "Beginner", duration: "1-2 months", rating: 4.6, reviewCount: 8000 },
      { id: "g-cyber", name: "Google Cybersecurity Professional Certificate", provider: "Google", icon: "🔒", category: "security", description: "Learn job-ready skills that are in demand, like how to identify common risks, threats, and vulnerabilities.", difficulty: "Beginner", duration: "6 months", rating: 4.8, reviewCount: 55000 },
      { id: "g-pm", name: "Google Project Management Professional Certificate", provider: "Google", icon: "📈", category: "pm_ux", description: "Kickstart your career in project management. Build your skills in initiating, planning, and running projects.", difficulty: "Beginner", duration: "5 months", rating: 4.8, reviewCount: 95000 },
      { id: "g-ux", name: "Google UX Design Professional Certificate", provider: "Google", icon: "🎨", category: "pm_ux", description: "Learn the foundations of UX design, including empathizing with users, building wireframes and prototypes.", difficulty: "Beginner", duration: "6 months", rating: 4.8, reviewCount: 82000 },
      { id: "psm-i", name: "Professional Scrum Master I (PSM I)", provider: "Scrum.org", icon: "📈", category: "pm_ux", description: "Demonstrate a fundamental level of Scrum mastery, understanding of Scrum as described in the Scrum Guide.", difficulty: "Intermediate", duration: "1 month", rating: 4.7, reviewCount: 21000 },
    ];

    const renderFeed = () => {
        mainContent.innerHTML = `
            <div class="space-y-12 animate-fadeInUp">
                <div>
                    <h1 class="text-4xl font-bold text-center text-black dark:text-white mb-4 font-poppins">
                        <span class="font-emoji">🗺️</span> Chart Your Learning Pathway
                    </h1>
                    <p class="text-lg text-center text-apple-gray dark:text-gray-400 max-w-2xl mx-auto">
                        Enter any skill, domain, or career path, and our AI will generate a step-by-step roadmap to guide your learning journey.
                    </p>
                </div>

                <div class="max-w-2xl mx-auto">
                    <form id="pathway-form" class="flex flex-col sm:flex-row items-center gap-4 p-2 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg shadow-gray-200/50 dark:shadow-black/20">
                        <input
                            type="text"
                            id="domain-query"
                            placeholder="e.g., Full Stack Development, Game Design, AI..."
                            class="w-full flex-1 p-4 bg-transparent border-none focus:ring-0 text-lg dark:text-white placeholder:text-apple-gray dark:placeholder:text-gray-500"
                            required
                        />
                        <button
                            type="submit"
                            id="generate-pathway"
                            class="w-full sm:w-auto bg-apple-blue text-white px-8 py-4 rounded-full font-semibold font-poppins hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            Create Pathway
                        </button>
                    </form>
                </div>

                <div id="pathway-results" class="mt-12"></div>
            </div>
        `;
    };

    const pages = {
        'feed': renderFeed,
        'bookmarks': renderBookmarksPage,
        'scheduler': renderSchedulerPage,
        'studyPlan': renderStudyPlanPage,
    };

    const navigateTo = (page) => {
        window.history.pushState({ page }, '', `#${page}`);
        document.querySelectorAll('[data-page]').forEach(link => {
            const linkPage = link.getAttribute('data-page');
            const isActive = linkPage === page;
            link.classList.toggle('bg-apple-blue', isActive);
            link.classList.toggle('text-white', isActive);
            link.classList.toggle('hover:bg-gray-200', !isActive);
            link.classList.toggle('dark:hover:bg-gray-700', !isActive);
        });
        pages[page]();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.currentTarget.dataset.page;
            navigateTo(page);
        });
    });

    const initialPage = window.location.hash.substring(1) || 'feed';
    navigateTo(initialPage);

    let bookmarkedCerts = new Map(JSON.parse(localStorage.getItem('bookmarkedCerts') || '[]'));

    const saveBookmarks = () => {
        localStorage.setItem('bookmarkedCerts', JSON.stringify(Array.from(bookmarkedCerts.entries())));
    };

    window.toggleBookmark = (cert) => {
        const certObj = JSON.parse(decodeURIComponent(cert));
        if (bookmarkedCerts.has(certObj.id)) {
            bookmarkedCerts.delete(certObj.id);
        } else {
            bookmarkedCerts.set(certObj.id, certObj);
        }
        saveBookmarks();
        navigateTo(window.location.hash.substring(1) || 'feed');
    };

    document.body.addEventListener('submit', async (e) => {
        if (e.target.id === 'pathway-form') {
            e.preventDefault();
            const domainQuery = document.getElementById('domain-query').value;
            const resultsContainer = document.getElementById('pathway-results');
            resultsContainer.innerHTML = '<div class="text-center">Generating pathway...</div>';

            // Mock pathway generation
            setTimeout(() => {
                const pathway = [
                    {
                        step: 1,
                        title: "Introduction to Web Development",
                        description: "Understand the basics of web development.",
                        detailedDescription: "Learn about HTML, CSS, and JavaScript.",
                        keyTopics: ["HTML", "CSS", "JavaScript"],
                        prerequisites: [],
                        resources: CERTIFICATION_DATA.slice(0, 2),
                    },
                    {
                        step: 2,
                        title: "Frontend Frameworks",
                        description: "Learn about modern frontend frameworks.",
                        detailedDescription: "Explore React, Vue, and Angular.",
                        keyTopics: ["React", "Vue", "Angular"],
                        prerequisites: ["HTML", "CSS", "JavaScript"],
                        resources: CERTIFICATION_DATA.slice(2, 4),
                    },
                ];
                renderPathway(pathway);
            }, 1000);
        }
    });

    document.body.addEventListener('click', async (e) => {
        if (e.target.id === 'generate-plan') {
            const selectedCerts = Array.from(document.querySelectorAll('[data-cert-id]:checked')).map(el => el.dataset.certId);
            const errorEl = document.getElementById('scheduler-error');
            if (selectedCerts.length === 0) {
                errorEl.textContent = "Please select at least one certification to plan for.";
                return;
            }
            errorEl.textContent = "";

            // Mock study plan generation
            const selectedCertsData = CERTIFICATION_DATA.filter(cert => selectedCerts.includes(cert.id));
            const studyPlan = {
                introduction: `This is a mock study plan for the following certifications: ${selectedCertsData.map(c => c.name).join(', ')}.`,
                weeklyPlan: selectedCertsData.map((cert, i) => ({
                    week: i + 1,
                    weeklySummary: `Focus on ${cert.name}.`,
                    dailyBreakdown: [
                        { day: "Monday", hours: 2, tasks: [`${cert.name} - Module 1`, `${cert.name} - Module 2`] },
                        { day: "Tuesday", hours: 2, tasks: [`${cert.name} - Module 3`, `${cert.name} - Module 4`] },
                    ],
                })),
                conclusion: "Good luck with your studies!",
            };

            localStorage.setItem('studyPlan', JSON.stringify(studyPlan));
            navigateTo('studyPlan');
        }
    });

    const renderPathway = (pathway) => {
        const resultsContainer = document.getElementById('pathway-results');
        resultsContainer.innerHTML = `
            <div class="space-y-4">
                ${pathway.map(step => `
                    <div class="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-300 ease-in-out">
                        <div class="flex justify-between items-center p-6 cursor-pointer" onclick="toggleStep(${step.step})">
                            <div class="flex-1">
                                <h2 class="text-xl font-bold text-black dark:text-white font-poppins">${step.title}</h2>
                                <p class="text-apple-gray dark:text-gray-400 mt-1">${step.description}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" id="step-arrow-${step.step}" class="h-6 w-6 text-apple-gray transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <div id="step-content-${step.step}" class="overflow-hidden max-h-0 transition-all duration-500 ease-in-out">
                            <div class="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700 space-y-6">
                                <p class="text-gray-600 dark:text-gray-300">${step.detailedDescription}</p>
                                <div class="grid md:grid-cols-2 gap-6">
                                    ${step.resources.map(cert => renderCertificationCard(cert)).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    };

    window.toggleStep = (stepNumber) => {
        const content = document.getElementById(`step-content-${stepNumber}`);
        const arrow = document.getElementById(`step-arrow-${stepNumber}`);
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            arrow.classList.remove('rotate-180');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            arrow.classList.add('rotate-180');
        }
    };

    const renderCertificationCard = (certification) => {
        const isBookmarked = bookmarkedCerts.has(certification.id);
        const certString = encodeURIComponent(JSON.stringify(certification));
        return `
            <div class="relative flex flex-col bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-gray-400/10 dark:hover:shadow-apple-blue/10 hover:-translate-y-2">
                <button
                    onclick="toggleBookmark('${certString}')"
                    class="absolute top-4 right-4 text-gray-400 hover:text-apple-blue z-10 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 transition-all duration-200 ${isBookmarked ? 'text-apple-blue' : ''}" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.13L5 18V4z" />
                    </svg>
                </button>
                <div class="flex items-start gap-4 mb-4">
                    <div class="text-4xl">${certification.icon}</div>
                    <div class="flex-1">
                        <h3 class="text-lg font-bold text-black dark:text-white font-poppins pr-6">${certification.name}</h3>
                        <p class="text-sm text-apple-gray dark:text-gray-400">${certification.provider}</p>
                    </div>
                </div>
            </div>
        `;
    };

    const renderBookmarksPage = () => {
        const bookmarkedList = Array.from(bookmarkedCerts.values());
        mainContent.innerHTML = `
            <div class="animate-fadeInUp space-y-8">
                <div>
                    <h1 class="text-4xl font-bold text-black dark:text-white mb-2 font-poppins">
                        <span class="font-emoji">🔖</span> My Bookmarks
                    </h1>
                    <p class="text-lg text-apple-gray dark:text-gray-400">
                        Your saved certifications. Use these to generate a study plan in the AI Scheduler.
                    </p>
                </div>

                ${bookmarkedList.length > 0 ? `
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        ${bookmarkedList.map(cert => renderCertificationCard(cert)).join('')}
                    </div>
                ` : `
                    <div class="text-center py-20 bg-apple-light dark:bg-gray-800/50 rounded-2xl">
                        <h2 class="text-2xl font-bold text-black dark:text-white mb-4">No Bookmarks Yet!</h2>
                        <p class="text-apple-gray dark:text-gray-400 max-w-md mx-auto">
                            Go to the Feed to explore certifications and click the bookmark icon to save them here.
                        </p>
                    </div>
                `}
            </div>
        `;
    };

    const renderSchedulerPage = () => {
        const bookmarkedList = Array.from(bookmarkedCerts.values());
        mainContent.innerHTML = `
            <div class="animate-fadeInUp space-y-8">
                <div>
                    <h1 class="text-4xl font-bold text-black dark:text-white mb-2 font-poppins">
                        <span class="font-emoji">🗓️</span> AI Study Scheduler
                    </h1>
                    <p class="text-lg text-apple-gray dark:text-gray-400">
                        Generate a personalized study plan based on your goals and daily schedule.
                    </p>
                </div>

                <div class="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 space-y-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">1. Select Certifications to Plan</h3>
                        ${bookmarkedList.length > 0 ? `
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                ${bookmarkedList.map(cert => `
                                    <label class="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors">
                                        <input type="checkbox" data-cert-id="${cert.id}" class="h-5 w-5 rounded border-gray-300 text-apple-blue focus:ring-apple-blue"/>
                                        <span class="font-emoji mr-1">${cert.icon}</span>
                                        <span class="text-sm font-medium text-black dark:text-white">${cert.name}</span>
                                    </label>
                                `).join('')}
                            </div>
                        ` : `
                            <p class="text-apple-gray dark:text-gray-400">You have no bookmarked certifications. Please add some from the feed first.</p>
                        `}
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">2. Set Your availability for Each day in the week (hours )</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-4">
                            ${['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => `
                                <div>
                                    <label for="${day}" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">${day}</label>
                                    <input type="number" id="${day}" value="${day === 'saturday' ? 4 : (day === 'sunday' ? 0 : 2)}" min="0" max="24" class="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-apple-blue"/>
                                </div>
                            `).join('')}
                        </div>
                         <div>
                            <label for="start-date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                            <input type="date" id="start-date" value="${new Date().toISOString().split('T')[0]}" class="w-full md:w-1/3 p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-apple-blue"/>
                        </div>
                    </div>
                    <div id="scheduler-error" class="text-red-600 dark:text-red-300 text-center -my-4"></div>
                    <button id="generate-plan" class="w-full bg-apple-blue text-white px-6 py-4 rounded-lg font-semibold font-poppins text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                        Generate My Study Plan
                    </button>
                </div>
            </div>
        `;
    };

    const renderStudyPlanPage = () => {
        const plan = JSON.parse(localStorage.getItem('studyPlan'));
        if (!plan) {
            mainContent.innerHTML = `
                <div class="animate-fadeInUp text-center py-20 bg-apple-light dark:bg-gray-800/50 rounded-2xl">
                    <h1 class="text-3xl font-bold text-black dark:text-white mb-4 font-poppins">
                        <span class="font-emoji">🧭</span> You don't have a study plan yet.
                    </h1>
                    <p class="text-apple-gray dark:text-gray-400 max-w-md mx-auto mb-8">
                        Go to the AI Scheduler to generate a personalized plan based on your bookmarked certifications and weekly schedule.
                    </p>
                    <button
                        onclick="navigateTo('scheduler')"
                        class="bg-apple-blue text-white px-8 py-4 rounded-lg font-semibold font-poppins hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                    >
                        Create a Plan
                    </button>
                </div>
            `;
            return;
        }

        mainContent.innerHTML = `
            <div class="animate-fadeInUp space-y-8">
                <div>
                     <h1 class="text-4xl font-bold text-black dark:text-white mb-2 font-poppins">
                        <span class="font-emoji">🚀</span> My Study Plan
                    </h1>
                    <p class="text-lg text-apple-gray dark:text-gray-400">
                        Track your progress and stay on top of your learning goals.
                    </p>
                </div>
                 <div class="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
                    <div>
                         <div class="text-black dark:text-white">
                            <div class="prose max-w-none dark:prose-invert">
                                <p>${plan.introduction}</p>
                                ${plan.weeklyPlan.map(week => `
                                    <details class="bg-apple-light dark:bg-gray-800 p-4 rounded-lg mb-4" open>
                                        <summary class="font-bold text-lg cursor-pointer text-black dark:text-white">Week ${week.week}</summary>
                                        <div class="mt-4 pl-4 border-l-2 border-apple-blue space-y-4">
                                            <p class="italic text-gray-600 dark:text-gray-400">${week.weeklySummary}</p>
                                            ${week.dailyBreakdown.map(dayPlan => `
                                                <div>
                                                    <h4 class="font-semibold text-black dark:text-white">${dayPlan.day} (${dayPlan.hours} hours)</h4>
                                                    <ul class="list-none p-0 space-y-2">
                                                        ${dayPlan.tasks.map((task, i) => `
                                                            <li>
                                                                <label class="flex items-start gap-3 cursor-pointer group">
                                                                    <input type="checkbox" class="mt-1 h-5 w-5 flex-shrink-0 rounded border-gray-300 text-apple-blue focus:ring-apple-blue cursor-pointer"/>
                                                                    <span class="transition-colors">${task}</span>
                                                                </label>
                                                            </li>
                                                        `).join('')}
                                                    </ul>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </details>
                                `).join('')}
                                <p>${plan.conclusion}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatInput = document.getElementById('chat-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    let chatHistory = [{
        role: 'model',
        text: 'Hi there! I am your AI Career Counselor. Ask me anything about the career domains in this app, or tell me your interests, and I can suggest a path for you. How can I help you today?'
    }];

    const renderChatHistory = () => {
        chatbotMessages.innerHTML = chatHistory.map(message => `
            <div class="max-w-[85%] word-wrap break-word p-3 rounded-xl ${message.role === 'user' ? 'bg-apple-blue text-white self-end' : 'bg-apple-light text-black dark:bg-gray-700 dark:text-white self-start'}">
                <p>${message.text}</p>
            </div>
        `).join('');
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    });

    chatbotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        chatHistory.push({ role: 'user', text: messageText });
        renderChatHistory();
        chatInput.value = '';

        // Mock model response
        setTimeout(() => {
            let response = "I am a mock chatbot. I cannot answer your question.";
            if (messageText.toLowerCase().includes("hello")) {
                response = "Hello there! How can I help you today?";
            } else if (messageText.toLowerCase().includes("career")) {
                response = "I can help you with career advice. What field are you interested in?";
            } else if (messageText.toLowerCase().includes("recommend")) {
                response = "I can recommend some certifications for you. What is your current skill level?";
            }
            chatHistory.push({ role: 'model', text: response });
            renderChatHistory();
        }, 1000);
    });

    renderChatHistory();
});
