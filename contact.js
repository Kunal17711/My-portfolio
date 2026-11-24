(() => {

    "use strict";

    const oldDock = document.getElementById("kbContactDock");
    document.getElementById("contact")?.remove();

    const dock = document.createElement("div");

    dock.id = "kbContactDock";

    if (oldDock) oldDock.replaceWith(dock);
    else document.getElementById("screen")?.appendChild(dock);

    const icons = {

        arrow: `
            <path d="M5 19L19 5"/>
            <path d="M5 5h14v14"/>
        `,

        mail: `
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m2 6 10 7L22 6"/>
        `,

        instagram: `
            <rect x="3" y="3" width="18" height="18" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <path d="M17.5 6.5h.01"/>
        `,

        linkedin: `
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M8 10v7M8 7h.01M12 17v-7"/>
            <path d="M12 13a3 3 0 0 1 6 0v4"/>
        `,

        x: `
            <path d="M4 3h4l12 18h-4z"/>
            <path d="M20 3 4 21"/>
        `,

        github: `
            <path d="M9 19c-4 1-4-2-6-2"/>
            <path d="M15 22v-4a3 3 0 0 0-1-2"/>
            <path d="M9 22v-4a3 3 0 0 1 1-2"/>
            <path d="M12 16c-5 0-8-2-8-6 0-2 1-3 2-4l-.5-3L9 5h6l3.5-2L18 6c1 1 2 2 2 4 0 4-3 6-8 6z"/>
        `,

        briefcase: `
            <rect x="3" y="7" width="18" height="14" rx="2"/>
            <path d="M8 7V4h8v3M3 12h18"/>
        `,

        globe: `
            <circle cx="12" cy="12" r="9"/>
            <path d="M3 12h18"/>
            <ellipse cx="12" cy="12" rx="4" ry="9"/>
        `,

        user: `
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 21v-2a8 8 0 0 1 16 0v2"/>
        `

    };

    function svg(name, className = "") {

        return `
            <svg
                class="${className}"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                ${icons[name] || icons.globe}
            </svg>
        `;

    }

    const contacts = [

        {
            name: "Email",
            url: "mailto:kkunaall10@gmail.com",
            icon: "mail"
        },

        {
            name: "Instagram",
            url: "https://instagram.com/iiblamekunal",
            icon: "instagram"
        },

        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/kunalldev",
            icon: "linkedin"
        },

        {
            name: "X",
            url: "https://x.com/kunallbuilds",
            icon: "x"
        },

        {
            name: "GitHub",
            url: "https://github.com/Kunal17711",
            icon: "github"
        },

        {
            name: "Fiverr",
            url: "https://www.fiverr.com/s/yv3DB6z",
            icon: "briefcase"
        },

        {
            name: "Upwork",
            url: "https://www.upwork.com/freelancers/~01bb3c4a0ecb285252?mp_source=share",
            icon: "briefcase"
        }

    ];

    const usefulLinks = [

        {
            name: "About",
            url: "/about",
            icon: "user"
        },

        {
            name: "Projects",
            url: "/projects",
            icon: "globe"
        },

        {
            name: "Services",
            url: "/services",
            icon: "briefcase"
        }

    ];

    dock.innerHTML = `

        <div id="kbContactMenu"
             aria-label="Contact Kunal Builds"
             inert>

            <div class="kb-contact-heading">

                Let's build something.

            </div>

            <div class="kb-contact-subtitle">

                Have an idea? Let's talk about it.

            </div>

            <div id="kbPrimaryContacts"></div>

            <div class="contact-divider"></div>

            <div class="contact-small-label">

                Discover more

            </div>

            <div id="kbUsefulLinks"></div>

            <details class="contact-guide">

                <summary>What should I send?</summary>

                <p>
                    Tell me about your project type,
                    number of pages or screens,
                    main goal, design references,
                    required features and backend needs,
                    such as Firebase or Supabase.
                </p>

                <p>
                    A short explanation is enough to start.
                    Websites, landing pages, dashboards,
                    mobile apps, redesigns, UI/UX and MVPs.
                </p>

                <p>
                    <a href="mailto:kkunaall10@gmail.com">
                        kkunaall10@gmail.com
                    </a>
                </p>

            </details>

            <div class="contact-location">

                Haryana, India

            </div>

        </div>

        <button id="kbContactButton"
                type="button"
                aria-label="Connect with Kunal Builds"
                aria-controls="kbContactMenu"
                aria-expanded="false">

            <span class="contact-text">

                LET'S CONNECT

            </span>

            ${svg("arrow")}

        </button>

    `;

    const menu = dock.querySelector("#kbContactMenu");
    const button = dock.querySelector("#kbContactButton");

    function appendLinks(container, links, offset = 0) {

        links.forEach((contact, index) => {

            const link = document.createElement("a");

            link.className = "kb-contact-link";
            link.href = contact.url;

            link.style.setProperty("--i", index + offset);

            if (!contact.url.startsWith("mailto:")) {

                link.target = "_blank";
                link.rel = "noopener noreferrer";

            }

            link.innerHTML = `

                <span class="contact-link-left">

                    ${svg(contact.icon)}

                    <span>${contact.name}</span>

                </span>

                ${svg("arrow", "contact-arrow")}

            `;

            container.appendChild(link);

        });

    }

    appendLinks(
        dock.querySelector("#kbPrimaryContacts"),
        contacts
    );

    appendLinks(
        dock.querySelector("#kbUsefulLinks"),
        usefulLinks,
        contacts.length
    );

    let closeTimer = null;

    let opened = false;

    let pinned = false;

    const hoverSupported = matchMedia(
        "(hover: hover) and (pointer: fine)"
    );

    function setOpen(value) {

        clearTimeout(closeTimer);

        opened = value;

        dock.classList.toggle("is-open", value);

        button.setAttribute(
            "aria-expanded",
            String(value)
        );

        menu.inert = !value;

    }

    function closeMenu() {

        pinned = false;
        setOpen(false);

    }

    // Desktop hover

dock.addEventListener("pointerenter", event => {

    if (event.pointerType === "mouse") {

        clearTimeout(closeTimer);

        pinned = false;

        setOpen(true);

    }

});

dock.addEventListener("pointerleave", event => {

    if (event.pointerType === "mouse") {

        clearTimeout(closeTimer);

        closeTimer = setTimeout(() => {

            pinned = false;

            setOpen(false);

        }, 100);

    }

});

// Mobile tap and keyboard support

button.addEventListener("click", event => {

    event.stopPropagation();

    if (hoverSupported.matches && event.detail > 0) {

        pinned = false;

        setOpen(true);

        button.blur();

    } else {

        setOpen(!opened);

    }

});

// Keyboard navigation

    dock.addEventListener("focusout", () => {

        setTimeout(() => {

            if (
                !dock.contains(document.activeElement) &&
                !dock.matches(":hover")
            ) {

                closeMenu();

            }

        }, 0);

    });

    document.addEventListener("pointerdown", event => {

        if (!dock.contains(event.target)) {
            closeMenu();
        }

    });

    document.addEventListener("keydown", event => {

        if (document.documentElement.classList.contains('kb-ai-active')) return;

        if (event.key === "Escape" && opened) {

            closeMenu();
            button.focus();

        }

    });

    // Close menu when switching off the CRT.

    const screen = document.getElementById("screen");

    new MutationObserver(() => {

        if (
            screen.classList.contains("off") ||
            screen.classList.contains("kb-intro-running")
        ) {

            closeMenu();

        }

    }).observe(screen, {

        attributes: true,
        attributeFilter: ["class"]

    });

    console.log("KUNAL BUILDS: Contact V8 ready.");

})();
