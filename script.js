document.addEventListener("DOMContentLoaded", function () {
  // =====================================================
  // NAVBAR SCROLL EFFECT
  // =====================================================

  const navbar = document.getElementById("mainNavbar");

  function handleNavbar() {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbar);
  handleNavbar();

  // =====================================================
  // SMOOTH SCROLL
  // =====================================================

  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      // Abaikan href="#"
      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      // Jika target tidak ditemukan
      if (!target) {
        return;
      }

      event.preventDefault();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Tutup navbar mobile
      const navbarMenu = document.getElementById("navbarNav");

      if (navbarMenu && navbarMenu.classList.contains("show")) {
        const toggler = document.querySelector(".navbar-toggler");

        if (toggler) {
          toggler.click();
        }
      }
    });
  });

  // =====================================================
  // ACTIVE NAVIGATION
  // =====================================================

  const sections = document.querySelectorAll("section[id]");

  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNavigation() {
    if (!navbar) return;

    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - navbar.offsetHeight - 100;

      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");

      const linkTarget = link.getAttribute("href");

      if (linkTarget === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavigation);

  updateActiveNavigation();

  // =====================================================
  // CONTACT FORM
  // =====================================================

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      alert("Terima kasih! Pesan berhasil dikirim.");

      contactForm.reset();
    });
  }

  // =====================================================
  // SCROLL REVEAL
  // =====================================================

  const revealElements = document.querySelectorAll(
    ".skill-card, " +
      ".portfolio-card, " +
      ".timeline-card, " +
      ".about-card, " +
      ".about-content",
  );

  // Cek apakah browser mendukung IntersectionObserver
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    revealElements.forEach(function (element) {
      element.classList.add("reveal");

      revealObserver.observe(element);
    });
  } else {
    // Jika browser tidak mendukung
    revealElements.forEach(function (element) {
      element.classList.add("show");
    });
  }
});
