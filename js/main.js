document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    updateYear();
    setupContactLinks();
    setupTypewriterHero();
    setupMobileMenu();
    setupActiveNav();
    setupRevealAnimations();
});

function updateYear() {
    const year = document.getElementById("current-year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

function setupMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    const closeMenu = () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        const icon = toggle.querySelector("[data-lucide]");
        if (icon) {
            icon.setAttribute("data-lucide", "menu");
            lucide.createIcons();
        }
    };

    const openMenu = () => {
        nav.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Cerrar menú");
        const icon = toggle.querySelector("[data-lucide]");
        if (icon) {
            icon.setAttribute("data-lucide", "x");
            lucide.createIcons();
        }
    };

    toggle.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    nav.addEventListener("click", (event) => {
        const link = event.target.closest("a");
        if (!link) return;
        closeMenu();
    });

    document.addEventListener("click", (event) => {
        if (!nav.classList.contains("is-open")) return;
        if (event.target.closest(".site-nav") || event.target.closest(".menu-toggle")) return;
        closeMenu();
    });
}

function setupContactLinks() {
    const whatsappButtons = document.querySelectorAll(".button-whatsapp[href*='wa.me']");
    if (!whatsappButtons.length) return;

    const message = "Hola, vimos su perfil y nos gustaría consultar por la vivienda. Somos Caro y Fran.";

    whatsappButtons.forEach((whatsapp) => {
        const phoneNumber = whatsapp.getAttribute("href").replace("https://wa.me/", "");
        whatsapp.setAttribute("href", `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
        whatsapp.setAttribute("target", "_blank");
        whatsapp.setAttribute("rel", "noopener noreferrer");
    });
}

function setupTypewriterHero() {
    const title = document.querySelector(".hero-title[data-typewriter]");
    if (!title) return;

    const text = title.dataset.typewriter || "";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    title.classList.add("is-typing");

    if (reducedMotion) {
        title.textContent = text;
        title.classList.add("is-complete");
        return;
    }

    title.textContent = "";
    let index = 0;
    const speed = 28;

    const tick = () => {
        index += 1;
        title.textContent = text.slice(0, index);

        if (index < text.length) {
            window.setTimeout(tick, speed);
            return;
        }

        title.classList.remove("is-typing");
        title.classList.add("is-complete");
    };

    window.setTimeout(tick, 250);
}

function setupActiveNav() {
    const links = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
    const sections = links
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (!links.length || !sections.length) return;

    const setActive = (id) => {
        links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible && visible.target.id) {
                setActive(visible.target.id);
            }
        },
        {
            rootMargin: "-35% 0px -50% 0px",
            threshold: [0.08, 0.15, 0.25, 0.4],
        }
    );

    sections.forEach((section) => observer.observe(section));

    links.forEach((link) => {
        link.addEventListener("click", () => {
            if (link.getAttribute("href")?.startsWith("#")) {
                setActive(link.getAttribute("href").slice(1));
            }
        });
    });
}

function setupRevealAnimations() {
    const elements = document.querySelectorAll(".section-reveal");
    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px",
        }
    );

    elements.forEach((element) => observer.observe(element));
}
