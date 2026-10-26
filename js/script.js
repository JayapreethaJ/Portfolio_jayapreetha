/**
 * ==========================================================================
 * JAYAPREETHA JAYARAMAN - PORTFOLIO INTERACTION LOGIC
 * Features:
 *   - Sticky Navbar & Scroll Progress
 *   - Active Navigation Spy
 *   - Dynamic Hero Typing Animation (Jayapreetha's profile)
 *   - Scroll Reveal (Intersection Observer)
 *   - Animated Statistics Counters (Faithful verified metrics)
 *   - Portfolio Category Filtering (3D, UI/UX, Web)
 *   - Dynamic Project Details Modal (4 verified resume projects)
 *   - Pure JS & EmailJS Integration for Contact Form
 *   - Button Ripple Micro-interaction
 *   - Back-to-Top Smooth Scroll
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. SCROLL PROGRESS BAR & STICKY NAVBAR
  // --------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scroll-progress');
  const navbar = document.querySelector('.navbar-custom');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleWindowScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Progress bar update
    if (scrollProgressBar && scrollHeight > 0) {
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Sticky navbar update
    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  };

  window.addEventListener('scroll', handleWindowScroll, { passive: true });
  handleWindowScroll(); // Initial call

  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. ACTIVE NAVIGATION SPY & MOBILE MENU COLLAPSE
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.navbar-custom .nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  // Auto-close mobile menu upon link click (all anchor links inside navbar)
  const navClickables = document.querySelectorAll('.navbar-custom a[href^="#"]');
  navClickables.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // Section spy on scroll
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => spyObserver.observe(section));

  // --------------------------------------------------------------------------
  // 3. TYPING EFFECT IN HERO SECTION (JAYAPREETHA'S VERIFIED PROFILE)
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const words = [
      'Full Stack Developer',
      '3D Designer (Blender)',
      'UI/UX & Web Developer',
      'Client Relationship Manager'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const pauseTime = 1800;

    const typeLoop = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        timeout = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeout = 400;
      }

      setTimeout(typeLoop, timeout);
    };

    typeLoop();
  }

  // --------------------------------------------------------------------------
  // 4. ANIMATED STATISTICS COUNTERS
  // --------------------------------------------------------------------------
  const counterElements = document.querySelectorAll('.stat-number');
  if (counterElements.length > 0) {
    const countUp = (element, targetValue, duration = 1800) => {
      const startTime = performance.now();

      const animateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOut * targetValue);

        element.textContent = `${currentValue}+`;

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          element.textContent = `${targetValue}+`;
        }
      };

      requestAnimationFrame(animateCount);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetEl = entry.target;
          const targetNum = parseInt(targetEl.getAttribute('data-target'), 10) || 0;
          countUp(targetEl, targetNum);
          observer.unobserve(targetEl);
        }
      });
    }, { threshold: 0.4 });

    counterElements.forEach(counter => statsObserver.observe(counter));
  }

  // --------------------------------------------------------------------------
  // 5. PORTFOLIO FILTERING
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === itemCategory) {
          item.classList.remove('hide');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. PORTFOLIO MODAL DETAILS (JAYAPREETHA'S VERIFIED RESUME PROJECTS)
  // --------------------------------------------------------------------------
  const projectData = {
    1: {
      title: '3D Product Visualization & Modeling',
      category: '3D Modeling & Visualization',
      client: 'Portfolio Case Study',
      duration: 'October 2026',
      tools: 'Blender, 3D Modeling, Texturing, Lighting, Rendering',
      image: 'images/project1.jpg',
      description: 'Designed and rendered 3D models and product visualizations involving a traditional tea stall, glassware, perfume bottles, and small appliances, with a focus on texturing, lighting, and realistic presentation.'
    },
    2: {
      title: 'Music Website UI Design',
      category: 'UI/UX Design',
      client: 'Creative Concept Study',
      duration: 'July 2025',
      tools: 'Figma, UI Design, Prototyping, Modern Layouts',
      image: 'images/project2.jpg',
      description: 'Designed a responsive music website featuring events, albums, and artists, focusing on modern layouts, usability, and user engagement.'
    },
    3: {
      title: 'Kids Toys E-Commerce Website',
      category: 'UI/UX Design',
      client: 'E-Commerce Concept Study',
      duration: 'May 2025',
      tools: 'Figma, UI/UX Design Principles, Wireframing',
      image: 'images/project3.jpg',
      description: 'Designed an online toy store interface with categories for educational toys, kids\' fashion, and outdoor activities, using colorful and interactive UI/UX principles.'
    },
    4: {
      title: 'Interactive To-Do List',
      category: 'Frontend Development',
      client: 'Web Application Project',
      duration: 'August 2025',
      tools: 'HTML5, CSS3, JavaScript, Bootstrap, Local Storage',
      image: 'images/project4.jpg',
      description: 'Created a task management web application that lets users add, edit, complete, and delete tasks, with persistence using browser local storage.'
    }
  };

  const projectModalElement = document.getElementById('projectDetailModal');
  if (projectModalElement) {
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalImage = document.getElementById('modalProjectImage');
    const modalClient = document.getElementById('modalProjectClient');
    const modalCategory = document.getElementById('modalProjectCategory');
    const modalDuration = document.getElementById('modalProjectDuration');
    const modalTools = document.getElementById('modalProjectTools');
    const modalDesc = document.getElementById('modalProjectDesc');

    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project-id');
        const data = projectData[projectId];
        if (data) {
          modalTitle.textContent = data.title;
          modalImage.src = data.image;
          modalImage.alt = data.title;
          modalClient.textContent = data.client;
          modalCategory.textContent = data.category;
          modalDuration.textContent = data.duration;
          modalTools.textContent = data.tools;
          modalDesc.textContent = data.description;

          const bsModal = new bootstrap.Modal(projectModalElement);
          bsModal.show();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. SCROLL REVEAL (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-init');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --------------------------------------------------------------------------
  // 8. BUTTON RIPPLE EFFECT
  // --------------------------------------------------------------------------
  const rippleButtons = document.querySelectorAll('.btn-custom');
  rippleButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple-circle');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // --------------------------------------------------------------------------
  // 8.1 RELIABLE RESUME & CV DOWNLOAD HANDLER (PREVENTS "FAILED TO LOAD PDF")
  // --------------------------------------------------------------------------
  const resumeDownloadButtons = document.querySelectorAll('.btn-download-resume, a[download*="Resume"], a[download*="CV"]');
  resumeDownloadButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      // In web browser / iframe environments, fetch as Blob to ensure immediate binary file download
      // without opening broken tabs or triggering "Failed to load PDF document" browser plugin errors.
      if (window.location.protocol.startsWith('http')) {
        e.preventDefault();
        const preferredFilename = btn.getAttribute('download') || 'Jayapreetha_Jayaraman_Resume.pdf';
        const candidatePaths = [
          btn.getAttribute('href'),
          'Jayapreetha_Jayaraman_Resume.pdf',
          'resume/Jayapreetha_Jayaraman_Resume.pdf',
          './Jayapreetha_Jayaraman_Resume.pdf',
          'resume.pdf'
        ].filter(Boolean);

        for (const path of candidatePaths) {
          try {
            const response = await fetch(path);
            if (response.ok) {
              const contentType = response.headers.get('content-type') || '';
              // Verify it is not an HTML 404 error page
              if (!contentType.includes('text/html')) {
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                const downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.download = preferredFilename;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
                return;
              }
            }
          } catch (err) {
            console.warn('Resume download candidate path note:', path, err);
          }
        }
        // Fallback to direct navigation if fetch loop didn't intercept
        window.location.href = btn.getAttribute('href') || 'Jayapreetha_Jayaraman_Resume.pdf';
      }
      // If running from file:// protocol (local filesystem), default anchor behavior executes cleanly
    });
  });

  // --------------------------------------------------------------------------
  // 9. CONTACT FORM VALIDATION & EMAILJS INTEGRATION
  // --------------------------------------------------------------------------
  /**
   * EMAILJS CREDENTIALS (VERIFIED)
   * Public Key: NZ0SIaYM7smrE0cOg
   * Service ID: service_8ggzv6q
   * Template ID: template_znw6sao
   * Recipient inbox: jayaraman4preetha@gmail.com
   */
  const EMAILJS_PUBLIC_KEY = 'NZ0SIaYM7smrE0cOg';
  const EMAILJS_SERVICE_ID = 'service_8ggzv6q';
  const EMAILJS_TEMPLATE_ID = 'template_znw6sao';
  const TARGET_EMAIL = 'jayaraman4preetha@gmail.com';

  // Initialize EmailJS browser SDK with actual Public Key
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY) {
    try {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    } catch (err) {
      console.warn('EmailJS initialization note:', err);
    }
  }

  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const formErrorAlert = document.getElementById('formErrorAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const subjectInput = document.getElementById('userSubject');
      const messageInput = document.getElementById('userMessage');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      let isValid = true;

      const validateField = (input, condition) => {
        if (!condition) {
          input.classList.add('is-invalid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      validateField(nameInput, nameInput.value.trim().length >= 2);
      validateField(emailInput, emailRegex.test(emailInput.value.trim()));
      validateField(subjectInput, subjectInput.value.trim().length >= 3);
      validateField(messageInput, messageInput.value.trim().length >= 10);

      if (isValid) {
        const originalBtnText = submitBtn.innerHTML;
        // Prevent duplicate submissions while in flight
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending message...';

        // Check if real EmailJS credentials have been supplied
        const hasCredentials = (
          typeof emailjs !== 'undefined' &&
          EMAILJS_PUBLIC_KEY &&
          EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
          EMAILJS_SERVICE_ID &&
          EMAILJS_SERVICE_ID !== 'YOUR_EMAILJS_SERVICE_ID' &&
          EMAILJS_TEMPLATE_ID &&
          EMAILJS_TEMPLATE_ID !== 'YOUR_EMAILJS_TEMPLATE_ID'
        );

        if (hasCredentials) {
          // Send via real EmailJS SDK to jayaraman4preetha@gmail.com
          const templateParams = {
            from_name: nameInput.value.trim(),
            name: nameInput.value.trim(),
            user_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            email: emailInput.value.trim(),
            user_email: emailInput.value.trim(),
            reply_to: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
            to_email: TARGET_EMAIL,
            to_name: 'Jayapreetha Jayaraman'
          };

          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then(() => {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnText;

              if (formSuccessAlert) {
                formSuccessAlert.innerHTML = `
                  <i class="bi bi-check-circle-fill me-2 fs-5"></i>
                  <strong>Thank you!</strong> Your message has been sent directly to <strong>${TARGET_EMAIL}</strong>. Jayapreetha will get back to you shortly.
                `;
                formSuccessAlert.style.display = 'block';
                formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }
              if (formErrorAlert) formErrorAlert.style.display = 'none';

              // Clear the form only after EmailJS confirms successful delivery
              contactForm.reset();

              setTimeout(() => {
                if (formSuccessAlert) formSuccessAlert.style.display = 'none';
              }, 7000);
            })
            .catch((error) => {
              console.error('EmailJS Error Details:', error);
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnText;

              // Do not clear the form on error so user input is preserved
              if (formErrorAlert) {
                const errorMsg = error?.text || error?.message || 'Network or service issue';
                formErrorAlert.innerHTML = `
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong>Email delivery failed:</strong> ${errorMsg}.
                  <span class="d-block small mt-1 text-muted">Please check your Email Services and Templates status in your EmailJS dashboard or try again shortly.</span>
                `;
                formErrorAlert.style.display = 'block';
                formErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }
              if (formSuccessAlert) formSuccessAlert.style.display = 'none';
            });
        } else {
          // Credentials not yet configured: keep form data intact and show clear configuration requirement
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;

            const missingKeys = [];
            if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') missingKeys.push('EMAILJS_PUBLIC_KEY');
            if (!EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID === 'YOUR_EMAILJS_SERVICE_ID') missingKeys.push('EMAILJS_SERVICE_ID');
            if (!EMAILJS_TEMPLATE_ID || EMAILJS_TEMPLATE_ID === 'YOUR_EMAILJS_TEMPLATE_ID') missingKeys.push('EMAILJS_TEMPLATE_ID');

            if (formErrorAlert) {
              formErrorAlert.innerHTML = `
                <div class="d-flex align-items-start gap-2">
                  <i class="bi bi-shield-exclamation fs-5 text-danger flex-shrink-0 mt-1"></i>
                  <div>
                    <strong>EmailJS Configuration Required:</strong> To send messages directly to <strong>${TARGET_EMAIL}</strong>, please enter your actual EmailJS credentials in <code>js/script.js</code>:
                    <ul class="mb-0 mt-1 ps-3 small">
                      ${missingKeys.map(k => `<li>Missing <code>${k}</code></li>`).join('')}
                    </ul>
                  </div>
                </div>
              `;
              formErrorAlert.style.display = 'block';
              formErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            if (formSuccessAlert) formSuccessAlert.style.display = 'none';
          }, 350);
        }
      }
    });

    const inputs = contactForm.querySelectorAll('.form-control-custom');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  }

});
