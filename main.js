    document.addEventListener('DOMContentLoaded', () => {
      const section = document.querySelector('.min-h-screen.relative');
      const cards = document.querySelectorAll('.card');
      const cardData = Array.from(cards).map((card, index) => ({
        element: card,
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 4, // Random velocity between -2 and 2
        vy: (Math.random() - 0.5) * 4,
        paused: false,
        isDragging: false,
        dragStartX: 0,
        dragStartY: 0
      }));

      // Set random initial positions
      function setInitialPositions() {
        const sectionRect = section.getBoundingClientRect();
        const cardWidth = window.innerWidth < 768 ? 128 : 192; // w-32 (8rem) or w-48 (12rem)
        const cardHeight = window.innerWidth < 768 ? 88 : 112; // h-22 (5.5rem) or h-28 (7rem)
        const maxWidth = sectionRect.width - cardWidth;
        const maxHeight = sectionRect.height - cardHeight;

        cardData.forEach(card => {
          card.x = Math.random() * maxWidth;
          card.y = Math.random() * maxHeight;
          card.element.style.position = 'absolute';
          card.element.style.left = `${card.x}px`;
          card.element.style.top = `${card.y}px`;
        });
      }

      // Animation loop for random movement
      function animate() {
        const sectionRect = section.getBoundingClientRect();
        const cardWidth = window.innerWidth < 768 ? 128 : 192;
        const cardHeight = window.innerWidth < 768 ? 88 : 112;
        const maxWidth = sectionRect.width - cardWidth;
        const maxHeight = sectionRect.height - cardHeight;

        cardData.forEach(card => {
          if (card.paused || card.isDragging) return;

          // Update position
          card.x += card.vx;
          card.y += card.vy;

          // Bounce off boundaries
          if (card.x <= 0 || card.x >= maxWidth) {
            card.vx = -card.vx;
            card.x = Math.max(0, Math.min(card.x, maxWidth));
          }
          if (card.y <= 0 || card.y >= maxHeight) {
            card.vy = -card.vy;
            card.y = Math.max(0, Math.min(card.y, maxHeight));
          }

          // Apply position
          card.element.style.left = `${card.x}px`;
          card.element.style.top = `${card.y}px`;
        });

        requestAnimationFrame(animate);
      }

      // Handle dragging
      function startDragging(card, clientX, clientY) {
        card.isDragging = true;
        card.paused = true;
        card.element.style.cursor = 'grabbing';
        card.dragStartX = clientX - card.x;
        card.dragStartY = clientY - card.y;
      }

      function dragCard(card, clientX, clientY) {
        if (!card.isDragging) return;
        const sectionRect = section.getBoundingClientRect();
        const cardWidth = window.innerWidth < 768 ? 128 : 192;
        const cardHeight = window.innerWidth < 768 ? 88 : 112;
        const maxWidth = sectionRect.width - cardWidth;
        const maxHeight = sectionRect.height - cardHeight;

        card.x = Math.max(0, Math.min(clientX - sectionRect.left - card.dragStartX, maxWidth));
        card.y = Math.max(0, Math.min(clientY - sectionRect.top - card.dragStartY, maxHeight));

        card.element.style.left = `${card.x}px`;
        card.element.style.top = `${card.y}px`;
      }

      function stopDragging(card) {
        card.isDragging = false;
        card.paused = false;
        card.element.style.cursor = 'grab';
        // Randomize velocity after dragging to keep movement dynamic
        card.vx = (Math.random() - 0.5) * 4;
        card.vy = (Math.random() - 0.5) * 4;
      }

      // Mouse and touch event listeners
      cards.forEach((card, index) => {
        // Mouse events
        card.addEventListener('mousedown', (e) => {
          e.preventDefault();
          startDragging(cardData[index], e.clientX, e.clientY);
        });

        // Touch events
        card.addEventListener('touchstart', (e) => {
          e.preventDefault();
          const touch = e.touches[0];
          startDragging(cardData[index], touch.clientX, touch.clientY);
        });

        // Hover events
        card.addEventListener('mouseenter', () => {
          if (!cardData[index].isDragging) cardData[index].paused = true;
        });
        card.addEventListener('mouseleave', () => {
          if (!cardData[index].isDragging) cardData[index].paused = false;
        });
      });

      document.addEventListener('mousemove', (e) => {
        cardData.forEach(card => dragCard(card, e.clientX, e.clientY));
      });

      document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        cardData.forEach(card => dragCard(card, touch.clientX, touch.clientY));
      }, { passive: false });

      document.addEventListener('mouseup', () => {
        cardData.forEach(card => stopDragging(card));
      });

      document.addEventListener('touchend', () => {
        cardData.forEach(card => stopDragging(card));
      });

      // Handle window resize
      function handleResize() {
        setInitialPositions();
      }

      // Initialize
      setInitialPositions();
      animate();
      window.addEventListener('resize', handleResize);
    });

    window.addEventListener('DOMContentLoaded', () => {
      const overlay = document.getElementById('intro-overlay');
      if (overlay) {
        setTimeout(() => {
          overlay.classList.add('hide');
        }, 2000);
      }
    });

    const heroTitles = [
      "Our Company",
      "TechVillage",
      "Web3D Studio",
      "Digital Kampung"
    ];
    const heroSubtitles = [
      "Explore the Future of 3D Web",
      "Build, Learn, Inspire",
      "Innovate with Us",
      "Empowering Digital Natives"
    ];
    let heroTitleIndex = 0;
    let heroSubtitleIndex = 0;
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroTitleLinks = [
      "/pages/our-company.html",
      "/pages/techvillage.html",
      "/pages/web3d-studio.html",
      "/pages/digital-kampung.html"
    ];
    const heroTitleLink = document.getElementById('hero-title-link');
    if (heroTitle && heroSubtitle && heroTitleLink) {
      heroTitle.textContent = heroTitles[0];
      heroSubtitle.textContent = heroSubtitles[0];
      heroTitleLink.href = heroTitleLinks[0];
      heroTitle.classList.add('slide-in-left-hero');
      heroSubtitle.classList.add('slide-in-left-hero');
      setInterval(() => {
        heroTitle.classList.remove('slide-in-left-hero');
        heroTitle.classList.add('slide-out-left-hero');
        heroSubtitle.classList.remove('slide-in-left-hero');
        heroSubtitle.classList.add('slide-out-left-hero');
        setTimeout(() => {
          heroTitleIndex = (heroTitleIndex + 1) % heroTitles.length;
          heroSubtitleIndex = (heroSubtitleIndex + 1) % heroSubtitles.length;
          heroTitle.textContent = heroTitles[heroTitleIndex];
          heroSubtitle.textContent = heroSubtitles[heroSubtitleIndex];
          heroTitleLink.href = heroTitleLinks[heroTitleIndex];
          heroTitle.classList.remove('slide-out-left-hero');
          heroTitle.classList.add('slide-in-left-hero');
          heroSubtitle.classList.remove('slide-out-left-hero');
          heroSubtitle.classList.add('slide-in-left-hero');
        }, 700);
      }, 5000);
      heroTitleLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = heroTitleLink.href;
      });
    }

    // Data layanan
    const serviceDetails = [
      {
        title: "Business Website",
        subtitle: "BUSINESS WEBSITE",
        desc: "If your business does not yet have a website, then it is time to have an online presence that communicates the brand of your company, as well as that displays information about services or products.",
        features: [
          "Interactive features",
          "User-friendly",
          "UX & UI implementation",
          "100% SEO optimized",
          "Mobile optimized",
          "Speed performance"
        ],
        button: "GET PROPOSAL",
        illustration: "https://assets10.lottiefiles.com/packages/lf20_4kx2q32n.json"
      },
      {
        title: "e-Commerce Website",
        subtitle: "E-COMMERCE WEBSITE",
        desc: "Grow your business with a custom e-commerce website that is secure, scalable, and easy to manage. Accept payments, manage inventory, and reach more customers.",
        features: [
          "Product catalog",
          "Secure checkout",
          "Order management",
          "Mobile ready",
          "SEO friendly",
          "Analytics integration"
        ],
        button: "GET PROPOSAL",
        illustration: "https://assets10.lottiefiles.com/packages/lf20_2ks3pjua.json"
      },
      {
        title: "App Development",
        subtitle: "APP DEVELOPMENT",
        desc: "We build modern web and mobile apps tailored to your business needs. From MVP to full-scale product, we deliver robust and scalable solutions.",
        features: [
          "Cross-platform",
          "Modern UI/UX",
          "API integration",
          "Performance optimized",
          "Push notifications",
          "App store ready"
        ],
        button: "GET PROPOSAL",
        illustration: "https://assets10.lottiefiles.com/packages/lf20_1pxqjqps.json"
      },
      {
        title: "SEO",
        subtitle: "SEO",
        desc: "Boost your website ranking and visibility with our SEO services. We use proven strategies to drive organic traffic and improve your online presence.",
        features: [
          "Keyword research",
          "On-page SEO",
          "Technical SEO",
          "Content optimization",
          "Backlink building",
          "Analytics & reporting"
        ],
        button: "GET PROPOSAL",
        illustration: "https://assets10.lottiefiles.com/packages/lf20_2ks3pjua.json"
      },
      {
        title: "Digital Marketing",
        subtitle: "DIGITAL MARKETING",
        desc: "Reach your audience and grow your brand with our digital marketing services. We offer social media, email, and content marketing solutions.",
        features: [
          "Social media",
          "Email campaigns",
          "Content creation",
          "Ad management",
          "Brand strategy",
          "Performance tracking"
        ],
        button: "GET PROPOSAL",
        illustration: "https://assets10.lottiefiles.com/packages/lf20_4kx2q32n.json"
      },
      {
        title: "Branding",
        subtitle: "BRANDING",
        desc: "Build a memorable brand identity with our branding services. From logo design to brand guidelines, we help you stand out.",
        features: [
          "Logo design",
          "Brand guidelines",
          "Visual identity",
          "Messaging",
          "Rebranding",
          "Print & digital assets"
        ],
        button: "GET PROPOSAL",
        illustration: "https://assets10.lottiefiles.com/packages/lf20_1pxqjqps.json"
      }
    ];

    const serviceImages = [
      'images/lemper ayam.jpg',
      'images/lemper ayam.jpg',
      'images/lemper ayam.jpg',
      'images/lemper ayam.jpg',
      'images/lemper ayam.jpg',
      'images/lemper ayam.jpg'
    ];

    let currentServiceIndex = 0;

    function renderServiceContent(idx, direction = 'right') {
      const data = serviceDetails[idx];
      const img = serviceImages[idx];
      let html = '';
      switch(idx) {
        case 0: // Business Website
          html = `
            <div class="flex flex-col md:flex-row items-center gap-8 w-full p-8 md:p-12 rounded-2xl shadow-xl bg-gradient-to-br from-red-50 to-white dark:from-[#23232b] dark:to-[#18181b] min-h-[400px]">
              <div class="flex-1 flex flex-col justify-center">
                <h3 class="text-3xl md:text-5xl font-extrabold text-red-600 mb-2">${data.title}</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-6 text-lg">${data.desc}</p>
                <div class="grid grid-cols-2 gap-4 mb-6">
                  ${data.features.map(f => `<div class='bg-white dark:bg-black/30 rounded-xl px-4 py-3 font-semibold text-gray-800 dark:text-white shadow border-l-4 border-red-400'>${f}</div>`).join('')}
                </div>
                <button class="mt-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow transition">${data.button}</button>
              </div>
              <div class="flex-1 flex justify-center items-center">
                <img src="${img}" alt="${data.title}" class="rounded-2xl shadow-lg w-72 h-56 object-cover border-4 border-red-100 dark:border-red-900" />
              </div>
            </div>
          `;
          break;
        case 1: // e-Commerce Website
          html = `
            <div class="flex flex-col items-center w-full p-8 md:p-12 rounded-2xl shadow-xl bg-gradient-to-b from-pink-50 to-white dark:from-[#2d223a] dark:to-[#18181b] min-h-[420px]">
              <img src="${img}" alt="${data.title}" class="rounded-2xl shadow-lg w-60 h-44 object-cover border-4 border-pink-100 dark:border-pink-900 mb-6" />
              <h3 class="text-2xl md:text-4xl font-bold text-pink-600 mb-2">${data.title}</h3>
              <ol class="relative border-l-4 border-pink-400 pl-6 mb-6 w-full max-w-md">
                ${data.features.map((f,i) => `<li class="mb-4 ml-2 flex items-center"><span class="absolute -left-4 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold">${i+1}</span><span class="text-gray-700 dark:text-gray-200 ml-4">${f}</span></li>`).join('')}
              </ol>
              <p class="text-gray-700 dark:text-gray-300 mb-4 text-center">${data.desc}</p>
              <button class="mt-2 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow transition text-lg">${data.button}</button>
            </div>
          `;
          break;
        case 2: // App Development
          html = `
            <div class="flex flex-col md:flex-row-reverse items-center gap-8 w-full p-8 md:p-12 rounded-2xl shadow-xl bg-gradient-to-br from-blue-50 to-white dark:from-[#1e293b] dark:to-[#18181b] min-h-[400px]">
              <div class="flex-1 flex flex-col justify-center items-start">
                <h3 class="text-2xl md:text-4xl font-bold text-blue-600 mb-2">${data.title}</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4">${data.desc}</p>
                <div class="flex flex-wrap gap-3 mb-6">
                  ${data.features.map(f => `<div class='flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-4 py-2 rounded-lg font-semibold shadow'><span>💻</span>${f}</div>`).join('')}
                </div>
                <button class="mt-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow transition">${data.button}</button>
              </div>
              <div class="flex-1 flex justify-center items-center">
                <img src="${img}" alt="${data.title}" class="rounded-2xl shadow-lg w-64 h-52 object-cover border-4 border-blue-100 dark:border-blue-900" />
              </div>
            </div>
          `;
          break;
        case 3: // SEO
          html = `
            <div class="flex flex-col md:flex-row items-center gap-8 w-full p-8 md:p-12 rounded-2xl shadow-xl bg-gradient-to-br from-yellow-50 to-white dark:from-[#3b2f1e] dark:to-[#18181b] min-h-[400px]">
              <div class="flex-1 flex flex-col justify-center">
                <h3 class="text-2xl md:text-4xl font-bold text-yellow-600 mb-2">${data.title}</h3>
                <blockquote class="italic text-yellow-800 dark:text-yellow-200 bg-yellow-50 dark:bg-yellow-900 rounded-lg px-4 py-2 mb-4">"Boost your website ranking and visibility!"</blockquote>
                <div class="flex flex-wrap gap-2 mb-6">
                  ${data.features.map(f => `<span class='inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 px-3 py-2 rounded-full text-xs font-semibold shadow-sm border border-yellow-200 dark:border-yellow-800'>${f}</span>`).join('')}
                </div>
                <p class="text-gray-700 dark:text-gray-300 mb-4">${data.desc}</p>
                <button class="mt-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg shadow transition">${data.button}</button>
              </div>
              <div class="flex-1 flex justify-center items-center">
                <img src="${img}" alt="${data.title}" class="rounded-2xl shadow-lg w-64 h-52 object-cover border-4 border-yellow-100 dark:border-yellow-900" />
              </div>
            </div>
          `;
          break;
        case 4: // Digital Marketing
          html = `
            <div class="flex flex-col md:flex-row-reverse items-center gap-8 w-full p-8 md:p-12 rounded-2xl shadow-xl bg-gradient-to-br from-green-50 to-white dark:from-[#1e3b2f] dark:to-[#18181b] min-h-[400px]">
              <div class="flex-1 flex flex-col justify-center items-start">
                <h3 class="text-2xl md:text-4xl font-bold text-green-600 mb-2">${data.title}</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4">${data.desc}</p>
                <div class="grid grid-cols-2 gap-2 mb-6">
                  ${data.features.map((f,i) => `<span class='inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-3 py-2 rounded-lg text-xs font-semibold shadow-sm border border-green-200 dark:border-green-800'><span>${['📢','✉️','🟣','📈','🟡','✅'][i]}</span>${f}</span>`).join('')}
                </div>
                <button class="mt-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow transition text-lg">${data.button}</button>
              </div>
              <div class="flex-1 flex justify-center items-center">
                <img src="${img}" alt="${data.title}" class="rounded-2xl shadow-lg w-64 h-52 object-cover border-4 border-green-100 dark:border-green-900" />
              </div>
            </div>
          `;
          break;
        case 5: // Branding
          html = `
            <div class="flex flex-col items-center w-full p-8 md:p-12 rounded-2xl shadow-xl bg-gradient-to-b from-purple-50 to-white dark:from-[#2e1e3b] dark:to-[#18181b] min-h-[420px]">
              <img src="${img}" alt="${data.title}" class="rounded-2xl shadow-lg w-60 h-44 object-cover border-4 border-purple-100 dark:border-purple-900 mb-6" />
              <h3 class="text-2xl md:text-4xl font-bold text-purple-600 mb-2">${data.title}</h3>
              <ul class="list-disc list-inside text-gray-700 dark:text-gray-200 mb-4">
                ${data.features.map(f => `<li class='mb-1 flex items-center gap-2'><span>🎨</span>${f}</li>`).join('')}
              </ul>
              <p class="text-gray-700 dark:text-gray-300 mb-4 text-center">${data.desc}</p>
              <button class="mt-2 px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-full shadow transition text-lg">${data.button}</button>
            </div>
          `;
          break;
        default:
          html = `<div class='p-8'>No data</div>`;
      }
      // Animasi slide
      const wrapper = document.createElement('div');
      wrapper.className = 'service-content-anim overflow-hidden relative w-full h-full';
      const inner = document.createElement('div');
      inner.className = `service-content-inner absolute w-full h-full transition-transform duration-500 ease-in-out`;
      inner.style.transform = direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
      inner.innerHTML = html;
      wrapper.appendChild(inner);
      const container = document.getElementById('service-content');
      container.innerHTML = '';
      container.appendChild(wrapper);
      setTimeout(() => {
        inner.style.transform = 'translateX(0)';
      }, 10);
    }

    // Inisialisasi konten pertama
    renderServiceContent(0);

    // Event listener untuk card
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('click', function() {
        const newIndex = Number(this.dataset.index);
        if (newIndex === currentServiceIndex) return;
        serviceCards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const direction = newIndex > currentServiceIndex ? 'right' : 'left';
        renderServiceContent(newIndex, direction);
        currentServiceIndex = newIndex;
      });
    });

    // Tambahkan style untuk .service-card.active di CSS