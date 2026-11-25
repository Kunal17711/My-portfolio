(() => {
    "use strict";

    const services = window.KB_SERVICES || [];

    const icons = {
        globe: `<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>`,
        layout: `<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>`,
        dashboard: `<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="14" y="3" width="7" height="8" rx="2"/><rect x="3" y="14" width="8" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>`,
        mobile: `<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/>`,
        design: `<circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16M6 6l12 12"/>`,
        rocket: `<path d="M12 16l-4-4 7-7 6-2-2 6-7 7zM8 12H4l-2 5 6-1M12 16v4l5-2-1-6M5 19l-2 2"/><circle cx="16" cy="8" r="1"/>`,
        refresh: `<path d="M20 7v6h-6M4 17v-6h6"/><path d="M5 8a8 8 0 0 1 13-3l2 2M4 17l2 2a8 8 0 0 0 13-3"/>`
    };

    const svg = paths => `<svg viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true">${paths}</svg>`;

    const arrow = `<span class="kbs-arrow">
        ${svg('<path stroke-width="2.7" d="M5 19L19 5M7 5h12v12"/>')}
    </span>`;

    const backIcon = svg(
        '<path stroke-width="2.3" d="M20 12H4M11 5l-7 7 7 7"/>'
    );

    const check = `<span class="kbs-check">
        ${svg('<path stroke-width="2.5" d="M5 12l4 4L19 6"/>')}
    </span>`;

    const esc = value => String(value ?? "")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#39;");

    const servicePath = id => id
        ? `/services/${id}/`
        : "/services/";

    function contact(title, detail = false) {
        return `
            <section class="kbs-contact">

                <h2>Work with Kunal Builds</h2>

                <p>
                    ${detail
                    ? `Interested in ${esc(title.toLowerCase())}?`
                    : "Not sure which service fits your idea?"}

                    Share your goals, target users, required
                    features and design references. Together,
                    we can define a practical project scope.
                </p>

                <div class="kbs-actions">

                    <a class="kbs-button"
                       href="mailto:kkunaall10@gmail.com">
                        Contact Kunal Builds ${arrow}
                    </a>

                    <a class="kbs-button kbs-secondary"
                       href="/#projects">
                        Explore projects ${arrow}
                    </a>

                </div>

            </section>`;
    }

    function row(heading, content) {
        return `
            <section class="kbs-section">

                <h2>${esc(heading)}</h2>

                <div class="kbs-section-body">
                    ${content}
                </div>

            </section>`;
    }

    function renderIndex() {
        return `
            <article class="kbs-document">

                <h1>Services by<br>Kunal Builds.</h1>

                <p class="kbs-lead">
                    Digital experiences built with purpose.
                    Professional web development, mobile applications
                    and digital product design from Haryana, India.
                </p>

                <p>
                    I help creators, startups, businesses and
                    independent founders turn ideas into clean,
                    responsive and practical digital products.
                </p>

                <div class="kbs-grid">

                    ${services.map(s => `
                        <article class="kbs-card">

                            <div class="kbs-icon">
                                ${svg(icons[s.icon] || icons.globe)}
                            </div>

                            <h2>${esc(s.name)}</h2>

                            <p>${esc(s.description)}</p>

                            <a class="kbs-link"
                               href="${servicePath(s.id)}">
                                Explore service ${arrow}
                            </a>

                        </article>
                    `).join("")}

                </div>

                ${row("What you can build", `
                    <p>
                        From a single landing page to a complete
                        product interface, development is shaped
                        around your requirements and the needs
                        of your intended users.
                    </p>
                    <p>
                        Every project has a defined scope,
                        selected technologies and a practical
                        implementation approach.
                    </p>
                `)}

                ${row("How I work", processHTML())}

                ${contact("")}

            </article>`;
    }

    function processHTML() {
        const steps = [
            ["Discovery", "Understand the product, goals, audience and required features."],
            ["Planning and design", "Define page structure, user journeys and visual direction."],
            ["Development", "Implement the agreed interface, functionality and integrations."],
            ["Testing and delivery", "Review responsive behavior, address issues and prepare the agreed handover."]
        ];

        return `<div class="kbs-process">
            ${steps.map(([title,text]) => `
                <div class="kbs-process-item">
                    <h3>${title}</h3>
                    <p>${text}</p>
                </div>
            `).join("")}
        </div>`;
    }

    function relatedHTML(service) {
        const cases = window.KB_CASES || [];

        return `<div class="kbs-related">
            ${service.projects.map(id => {
                const project = cases.find(c => c.id === id);

                const name = project?.name ||
                    id.replace(/-/g," ");

                const image = project?.image || "";

                return `
                    <a href="/projects/${encodeURIComponent(id)}/">

                        ${image && image.startsWith("assets/")
                            ? `<img src="/${esc(image)}"
                                alt="${esc(name)} project preview"
                                loading="lazy" draggable="false">`
                            : ""}

                        <span class="kbs-related-label">
                            ${esc(name)} ${arrow}
                        </span>

                    </a>`;
            }).join("")}
        </div>`;
    }

    function renderService(service) {
        return `
            <article class="kbs-document">

                <h1>${esc(service.name)}.</h1>

                <p class="kbs-lead">
                    ${esc(service.description)}
                </p>

                <div class="kbs-actions">

                    <a class="kbs-button"
                       href="mailto:kkunaall10@gmail.com?subject=${encodeURIComponent(service.name + " inquiry")}">
                        Discuss your project ${arrow}
                    </a>

                    <a class="kbs-link"
                       href="/services/">
                        All services ${arrow}
                    </a>

                </div>

                ${row("Overview",
                    `<p>${esc(service.overview)}</p>`)}

                ${row("Who it is for",
                    `<p>${esc(service.audience)}</p>`)}

                ${row("What's included", `
                    <div class="kbs-features">
                        ${service.includes.map(item => `
                            <div class="kbs-feature">
                                ${check}
                                <span>${esc(item)}</span>
                            </div>
                        `).join("")}
                    </div>
                `)}

                ${row("Technology stack", `
                    <div class="kbs-tags">
                        ${service.stack.map(tech =>
                            `<span class="kbs-tag">${esc(tech)}</span>`
                        ).join("")}
                    </div>
                `)}

                ${row("Design approach",
                    `<p>${esc(service.approach)}</p>`)}

                ${row("Development process", processHTML())}

                ${row("Deliverables", `
                    <p>
                        Deliverables are defined before development.
                        Depending on the project, they may include
                        source files, responsive interfaces,
                        configured integrations, build files
                        and deployment documentation.
                    </p>
                    <p>
                        Timelines, maintenance, hosting costs
                        and revisions are agreed separately
                        according to the project requirements.
                    </p>
                `)}

                ${row("Related projects",relatedHTML(service))}

                ${row("Frequently asked questions", `
                    ${service.faq.map(([question,answer]) => `
                        <details class="kbs-faq">

                            <summary>
                                ${esc(question)}
                                <span class="kbs-plus"></span>
                            </summary>

                            <p>${esc(answer)}</p>

                        </details>
                    `).join("")}
                `)}

                ${contact(service.name,true)}

                ${row("Explore other services", `
                    <div class="kbs-tags">
                        ${services.filter(s => s.id !== service.id)
                        .map(s => `
                            <a class="kbs-link kbs-tag"
                               href="${servicePath(s.id)}">
                                ${esc(s.name)} ${arrow}
                            </a>
                        `).join("")}
                    </div>
                `)}

            </article>`;
    }

    // Shared renderer for static SEO page generation.

    window.KB_SERVICE_RENDER = {
        index: renderIndex,
        detail: renderService,
        backIcon
    };

    // Node.js can use the renderer without a browser.

    if (typeof document === "undefined") return;

    const screen = document.getElementById("screen");

    if (!screen || document.getElementById("kbServiceScreen")) {
        return;
    }

    const panel = document.createElement("section");

    panel.id = "kbServiceScreen";
    panel.hidden = true;

    panel.innerHTML = `
        <div id="kbServiceScroller">
            <div id="kbServiceContent"></div>
        </div>

        <button id="kbServiceBack"
                type="button"
                aria-label="Go back">
            ${backIcon}
        </button>

        <div id="kbServiceZoom"></div>
    `;

    screen.appendChild(panel);

    const scroller = panel.querySelector("#kbServiceScroller");
    const content = panel.querySelector("#kbServiceContent");
    const back = panel.querySelector("#kbServiceBack");
    const toast = panel.querySelector("#kbServiceZoom");

    let active = false;
    let current = "";
    let closing = false;
    let zoom = 1;
    let zoomTimer;
    let previousFocus;
    let previousTitle;
    let suspended = [];
    let video;
    let resumeVideo = false;

    function suspendScreen() {
        suspended = [...screen.children]
            .filter(node => node !== panel)
            .map(node => ({
                node,
                inert: node.inert
            }));

        suspended.forEach(({node}) => {
            node.inert = true;
        });
    }

    function restoreScreen() {
        suspended.forEach(({node,inert}) => {
            node.inert = inert;
        });

        suspended = [];
    }

    function showService(id = "") {
        if (closing) return;

        const service = id
            ? services.find(s => s.id === id)
            : null;

        if (id && !service) return;

        if (!active) {
            previousFocus = document.activeElement;
            previousTitle = document.title;

            suspendScreen();

            video = document.getElementById("kbPortfolioVideo");
            resumeVideo = Boolean(video && !video.paused);

            video?.pause();

            active = true;
            panel.hidden = false;
            screen.classList.add('kb-content-inactive');

            panel.classList.add("kbs-opening");
        }

        current = id;

        content.innerHTML = service
            ? renderService(service)
            : renderIndex();

        zoom = 1;
        content.style.zoom = "1";

        scroller.scrollTop = 0;
        scroller.scrollLeft = 0;

        document.title = service
            ? service.seoTitle
            : "Services by Kunal Builds | Web and App Development";

        back.focus({preventScroll:true});
    }

    function closeService(immediate = false) {
        if (!active || closing) return;

        closing = true;

        panel.classList.remove("kbs-opening");
        panel.classList.add("kbs-closing");

        return new Promise(resolve => setTimeout(() => {
            panel.hidden = true;
            screen.classList.remove('kb-content-inactive');
            panel.classList.remove("kbs-closing");

            active = false;
            closing = false;
            current = "";

            restoreScreen();

            document.title = previousTitle;

            if (video && resumeVideo && !document.hidden) {
                video.play().catch(() => {});
            }

            previousFocus?.focus({preventScroll:true});
            resolve();

        }, immediate || matchMedia("(prefers-reduced-motion:reduce)").matches
            ? 0 : 400));
    }

    back.addEventListener("click",() => {
        if (current) {
            showService("");
        } else {
            closeService();
        }
    });

    // Connect all Services links, including dynamically
    // created contact menu and case study buttons.

    document.addEventListener("click",event => {
        if (event.target.closest(".kb-ai-root")) return;
        const link = event.target.closest("a");

        if (!link ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey) return;

        let url;

        try {
            url = new URL(link.href,location.href);
        } catch {
            return;
        }

        const allowed = [location.origin];

        if (!allowed.includes(url.origin)) return;

        const match = url.pathname.match(
            /^\/services(?:\/([^/]+))?\/?$/
        );

        if (!match) return;

        if (match[1] &&
            !services.some(s => s.id === match[1])) return;

        if (screen.classList.contains("kb-intro-running")) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        showService(match[1] || "");

    },true);

    // Related projects open their local SEO case study
    // route if it exists, without using the old website.

    panel.addEventListener("click",event => {
        event.stopPropagation();
    });

    // Independent scrolling and center zoom.

    function changeZoom(delta) {
        const old = zoom;

        const x = scroller.scrollLeft +
            scroller.clientWidth / 2;

        const y = scroller.scrollTop +
            scroller.clientHeight / 2;

        zoom = Math.max(.75,Math.min(1.5,zoom + delta));

        content.style.zoom = String(zoom);

        const ratio = zoom / old;

        scroller.scrollLeft =
            x * ratio - scroller.clientWidth / 2;

        scroller.scrollTop =
            y * ratio - scroller.clientHeight / 2;

        toast.textContent =
            Math.round(zoom * 100) + "%";

        toast.classList.add("visible");

        clearTimeout(zoomTimer);

        zoomTimer = setTimeout(() => {
            toast.classList.remove("visible");
        },650);
    }

    panel.addEventListener("wheel",event => {
        event.stopPropagation();

        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            changeZoom(event.deltaY < 0 ? .05 : -.05);
        }

    },{passive:false});

    // Desktop drag scrolling.

    let drag = null;
    let suppressClick = 0;

    scroller.addEventListener("pointerdown",event => {
        event.stopPropagation();

        if (event.pointerType !== "mouse" ||
            event.button !== 0 ||
            event.target.closest("a,button,input,summary")) {
            return;
        }

        drag = {
            id:event.pointerId,
            x:event.clientX,
            y:event.clientY,
            left:scroller.scrollLeft,
            top:scroller.scrollTop,
            moved:false
        };
    });

    scroller.addEventListener("pointermove",event => {
        event.stopPropagation();

        if (!drag || drag.id !== event.pointerId) return;

        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;

        if (!drag.moved && Math.hypot(dx,dy) < 5) return;

        if (!drag.moved) {
            drag.moved = true;
            scroller.setPointerCapture(event.pointerId);
            scroller.classList.add("kbs-dragging");
        }

        scroller.scrollLeft = drag.left - dx;
        scroller.scrollTop = drag.top - dy;

        event.preventDefault();
    });

    function endDrag() {
        if (drag?.moved) {
            suppressClick = performance.now() + 200;
        }

        drag = null;
        scroller.classList.remove("kbs-dragging");
    }

    window.addEventListener("pointerup",endDrag);

    scroller.addEventListener("pointercancel",endDrag);
    scroller.addEventListener("lostpointercapture",endDrag);

    scroller.addEventListener("dragstart",event => {
        event.preventDefault();
    });

    scroller.addEventListener("click",event => {
        if (performance.now() < suppressClick) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    },true);

    // Native browser pinch zoom and vertical scrolling.

    // Isolate service keyboard controls from canvas.

    window.addEventListener("keydown",event => {
        if (document.documentElement.classList.contains('kb-ai-active')) return;
        if (!active) return;

        if (event.key === "Escape") {
            event.preventDefault();
            event.stopImmediatePropagation();
            back.click();
        }

        if ((event.ctrlKey || event.metaKey) &&
            ["+","=","-","0"].includes(event.key)) {

            event.preventDefault();
            event.stopImmediatePropagation();

            changeZoom(event.key === "0"
                ? 1 - zoom
                : event.key === "-" ? -.1 : .1);
        }

    },true);

    window.KB_OPEN_SERVICES = showService;
    window.KB_SERVICES_UI = {open: showService, close: () => closeService(true)};

    console.log(
        "KUNAL BUILDS: Services ready.",
        services.length
    );

})();
