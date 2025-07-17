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