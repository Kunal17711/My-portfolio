
(() => {

    "use strict";

    const screen = document.getElementById("screen");

    if (!screen) return;

    const cases = [

        {
            name: "Aldren Row",
            slug: "aldren-row",
            id: "aldrenrow",
            asset: "aldrenrow",
            category: "Premium Clothing Brand Website",
            description: "A minimalist clothing brand digital presence with bold editorial layouts, cinematic animations and product storytelling.",
            stack: ["Next.js","Tailwind CSS","Framer Motion","SEO","Branding"]
        },

        {
            name: "Focura",
            slug: "focura",
            id: "focura",
            asset: "focura",
            category: "Productivity Platform Interface",
            description: "A modern productivity platform interface featuring fluid tab transitions and refined dark mode.",
            stack: ["Next.js","Tailwind CSS","TypeScript","React Hooks","Framer Motion"]
        },

        {
            name: "Vibekit",
            slug: "vibekit",
            id: "vibekit",
            asset: "vibekit",
            category: "Developer Tool / UI Kit",
            description: "An interactive design system and component showcase for building animated websites.",
            stack: ["Next.js","Tailwind CSS","Framer Motion","Component Design"]
        },

        {
            name: "Earnstack",
            slug: "earnstack",
            id: "earnstack-website",
            asset: "earnstack",
            category: "Fintech Platform Website",
            description: "A fintech landing page and analytical dashboard concept focused on wealth tracking and financial data presentation.",
            stack: ["Next.js","Tailwind CSS","TypeScript","ApexCharts","Framer Motion"]
        },

        {
            name: "ProfileOS",
            slug: "profileos",
            id: "profileos",
            asset: "profileos",
            category: "Digital Product / Landing Page",
            description: "A personal branding product presenting profile ideas, bios, templates, checklists and AI prompts.",
            stack: ["Next.js","Tailwind CSS","Product Design","Personal Branding"]
        },

        {
            name: "Vidora",
            slug: "vidora",
            id: "vidora",
            asset: "vidora",
            category: "Marketplace Interface",
            description: "A video editor marketplace landing page focused on clean positioning, responsive UI and creator focused storytelling.",
            stack: ["Next.js","Tailwind CSS","Cloudinary"]
        },

        {
            name: "Raksha Web",
            slug: "raksha-web",
            id: "raksha",
            asset: "raksha-web",
            category: "Safety Product Website",
            description: "A safety product website concept focused on messaging, product positioning and clean digital presence.",
            stack: ["React","Supabase","Node.js"]
        },

        {
            name: "Raksha App",
            slug: "raksha-app",
            id: "raksha-app",
            asset: "raksha-app",
            category: "Mobile App Interface",
            description: "A personal safety mobile app concept with SOS flows, live location ideas, trusted contacts and safety focused UX.",
            stack: ["React Native","Firebase","Maps"]
        },

        {
            name: "EduSync",
            slug: "edusync",
            id: "edusync",
            asset: "edusync",
            category: "Education Dashboard",
            description: "An education focused dashboard interface designed for school and learning workflows.",
            stack: ["React","Next.js","Supabase"]
        },

        {
            name: "Fashion Website",
            slug: "fashion-website",
            id: "fashion-landing-page",
            asset: "fashion-website",
            category: "Fashion / Ecommerce UI",
            description: "A fashion website interface focused on premium product presentation, clean layouts and responsive sections.",
            stack: ["React","Tailwind CSS"]
        },

        {
            name: "Solvare",
            slug: "solvare",
            id: "solvare",
            asset: "solvare",
            category: "Web Interface",
            description: "A polished web interface focused on visual clarity and product style UI.",
            stack: ["React","Tailwind CSS"]
        },

        {
            name: "WishWrap",
            slug: "wishwrap",
            id: "wishwrap",
            asset: "wishwrap",
            category: "Product Interface",
            description: "A gifting product interface focused on simple user flows and clean presentation.",
            stack: ["React","Tailwind CSS"]
        },

        {
            name: "Paradox",
            slug: "paradox",
            id: "paradox",
            asset: "paradox",
            category: "Creative Web Interface",
            description: "A creative web interface focused on bold visuals and modern interaction design.",
            stack: ["React","Tailwind CSS"]
        },

        {
            name: "PicPrompt",
            slug: "picprompt",
            id: "picprompt",
            asset: "picprompt",
            category: "AI Product Interface",
            description: "An AI prompt product concept focused on usability and clean UI.",
            stack: ["React","Tailwind CSS"]
        },

        {
            name: "Beyond Reality",
            slug: "beyond-reality",
            id: "beyond-reality",
            asset: "beyond-reality",
            category: "Creative Digital Interface",
            description: "A creative digital interface focused on immersive visual presentation and modern layout.",
            stack: ["React","Tailwind CSS"]
        }

    ];

    (window.KB_CASES || []).forEach(study => {
        if (cases.some(item => item.id === study.id)) return;
        const project = (window.KB_PROJECTS || []).find(item => item.caseId === study.id);
        cases.push({
            id: study.id,
            slug: study.id,
            name: study.name,
            category: project?.category || study.category || "Digital project",
            description: study.description || "",
            stack: project?.stack || [],
            image: project?.image || (study.image ? "/" + study.image : "")
        });
    });

    cases.forEach(item => {
        const project = (window.KB_PROJECTS || []).find(p => p.caseId === item.id);
        if (!project) return;
        item.name = project.name;
        item.description = project.description;
        item.category = project.category;
        item.stack = project.stack;
        item.image = project.image;
    });

    const socials = [

        ["Email","mailto:kkunaall10@gmail.com"],
        ["Instagram","https://instagram.com/iiblamekunal"],
        ["LinkedIn","https://www.linkedin.com/in/kunalldev"],
        ["X","https://x.com/kunallbuilds"],
        ["GitHub","https://github.com/Kunal17711"],
        ["Fiverr","https://www.fiverr.com/s/yv3DB6z"],
        ["Upwork","https://www.upwork.com/freelancers/~01bb3c4a0ecb285252?mp_source=share"]

    ];

    const base = location.origin;

    const isLocal = [

        "localhost",
        "127.0.0.1",
        "[::1]"

    ].includes(location.hostname);

    const catalog = window.KB_PROJECTS || [];

    const screenshots = new Set(
        window.KB_SCREENSHOTS || []
    );

    const arrow = `

        <svg viewBox="0 0 24 24"
             aria-hidden="true">

            <path d="M5 19L19 5M7 5h12v12"/>

        </svg>

    `;

    function create(tag, className, text) {

        const element = document.createElement(tag);

        if (className) element.className = className;

        if (text !== undefined) element.textContent = text;

        return element;

    }

    function safeUrl(value) {

        try {

            const url = new URL(value);

            return ["https:","http:","mailto:"]
                .includes(url.protocol) ? url.href : "";

        } catch {

            return "";

        }

    }

    function makeLink(label, url, className) {

        const valid = safeUrl(url);

        if (!valid) return null;

        const link = create("a", className, label);

        link.href = valid;

        if (!valid.startsWith("mailto:") && !valid.startsWith(location.origin)) {

            link.target = "_blank";
            link.rel = "noopener noreferrer";

        }

        const icon = create("span","ip-arrow");

        icon.innerHTML = arrow;

        link.appendChild(icon);

        return link;

    }

    let pages;
    let scroller;
    let zoomContent;

    let activePage = "";
    let zoom = 1;
    let category = "All";
    let contentRendered = false;

    let previousFocus = null;
    let resumeVideo = false;

    const zoomMemory = {

        about: 1,
        projects: 1

    };

    const scrollMemory = {

        about: 0,
        projects: 0

    };

    function setZoom(value) {

        zoom = Math.min(1.5,Math.max(.75,value));

        zoom = Math.round(zoom * 100) / 100;

        zoomContent.style.zoom = String(zoom);

        document.getElementById(
            "ipZoomReset"
        ).textContent = Math.round(zoom * 100) + "%";

        if (activePage) {

            zoomMemory[activePage] = zoom;

        }

    }

    function openPage(name) {

        if (!["about","projects"].includes(name)) return;

        if (screen.classList.contains("kb-intro-running")) return;

        if (!contentRendered) {
            renderCases();
            renderSocials();
            renderFilters();
            renderAllProjects();
            contentRendered = true;
        }

        if (activePage) {

            scrollMemory[activePage] = scroller.scrollTop;

        } else {

            previousFocus = document.activeElement;

        }

        activePage = name;

        const video = document.getElementById(
            "kbPortfolioVideo"
        );

        if (!screen.classList.contains("kb-page-open")) {

            resumeVideo = Boolean(video && !video.paused);

        }

        if (video) video.pause();

        screen.classList.add("kb-page-open");

        pages.hidden = false;

        document.getElementById("ipAbout").hidden =
            name !== "about";

        document.getElementById("ipProjects").hidden =
            name !== "projects";

        pages.querySelectorAll(".ip-tabs button")
            .forEach(button => {

                const selected =
                    button.dataset.ipPage === name;

                button.classList.toggle("active",selected);

                button.setAttribute(
                    "aria-pressed",
                    String(selected)
                );

            });

        setZoom(zoomMemory[name]);

        scroller.scrollTop = scrollMemory[name] || 0;
        scroller.scrollLeft = 0;

        document.getElementById("ipBack")
            .focus({preventScroll:true});

        document.title =

            name === "about"
                ? "About Kunal Builds | Independent Developer"
                : "Projects by Kunal Builds | Digital Portfolio";

    }

    function closePage() {

        if (activePage) {

            scrollMemory[activePage] = scroller.scrollTop;

        }

        activePage = "";

        pages.hidden = true;

        screen.classList.remove("kb-page-open");

        const video = document.getElementById(
            "kbPortfolioVideo"
        );

        if (video && resumeVideo && !document.hidden) {

            video.play().catch(() => {});

        }

        document.title =
            "Kunal Builds | Independent Developer & Digital Product Portfolio";

        previousFocus?.focus({preventScroll:true});

    }

    // Project card builder

    function buildCard(project) {

        const card = create(
            "article",
            "ip-glass ip-project-card"
        );

        const artwork = create(
            "div",
            "ip-project-image"
        );

        const fallback = create(
            "span",
            "ip-image-fallback",
            project.name + " | Preview unavailable"
        );

        artwork.appendChild(fallback);

        if (project.images.length) {

            const image = create("img");

            image.alt = project.name + " project preview";

            image.loading = "lazy";
            image.decoding = "async";
            image.draggable = false;
            image.width = 480;
            image.height = 300;
            if (project.fullImage && project.fullImage !== project.images[0]) {
                image.srcset = project.images[0] + " 480w, " + project.fullImage + " 1440w";
                image.sizes = "(max-width: 700px) 88vw, 30vw";
            }

            let imageIndex = 0;

            image.addEventListener("load",() => {

                fallback.hidden = true;

                image.hidden = false;
                image.style.opacity = "1";

            });

            image.addEventListener("error",() => {

                imageIndex++;

                if (imageIndex < project.images.length) {

                    image.src = project.images[imageIndex];

                } else {

                    image.remove();

                    fallback.hidden = false;

                }

            });

            // A display:none lazy image never intersects and never loads.
            image.style.opacity = "0";

            image.src = project.images[0];

            artwork.appendChild(image);

        }

        const body = create("div","ip-project-body");

        body.append(

            create("span","ip-project-meta",project.category),

            create("h3","",project.name),

            create("p","",project.description)

        );

        const tags = create("div","ip-tags");

        project.stack.filter(Boolean).forEach(tech => {

            tags.appendChild(
                create("span","",tech)
            );

        });

        body.appendChild(tags);

        if (project.status && project.status !== "HTTP 200") {

            body.appendChild(

                create(
                    "p",
                    "ip-project-meta",
                    "Last recorded check: " + project.status
                )

            );

        }

        const actions = create("div","ip-project-actions");

        if (project.website) {

            const link = makeLink(

                "Visit website",

                project.website,

                "ip-primary"

            );

            if (link) actions.appendChild(link);

        }

        if (project.caseStudy) {

            const link = makeLink(

                "Case study",

                project.caseStudy,

                project.website
                    ? "ip-text-link"
                    : "ip-primary"

            );

            if (link) actions.appendChild(link);

        }

        if (project.source) {

            const source = makeLink(

                "Source code",

                project.source,

                "ip-text-link"

            );

            if (source) actions.appendChild(source);

        }

        body.appendChild(actions);

        card.append(artwork,body);

        return card;

    }

    function imagesFor(project) {

        if (project.thumbnail || project.image) return [project.thumbnail || project.image];

        const images = [];

        const file = project.id + ".jpg";

        const pagesFile = project.id + "-github-pages.jpg";

        if (screenshots.has(file)) {

            images.push("/assets/images/sites/" + file);

        }

        if (screenshots.has(pagesFile)) {

            images.push("/assets/images/sites/" + pagesFile);

        }

        if (!images.length && project.screenshot) {

            images.push(project.screenshot);

        }

        return images;

    }

    function cleanTitle(project) {

        return project.name || "Project";

    }

    function renderCases() {

        const container = document.getElementById(
            "ipCaseStudies"
        );

        const history = document.getElementById(
            "ipProjectHistory"
        );

        cases.forEach(item => {

            const match = catalog.find(p => p.caseId === item.id);

            const caseStudy =
                base + "/projects/" + item.slug;

            const imageList = [match?.thumbnail || match?.image || item.image].filter(Boolean);

            container.appendChild(

                buildCard({

                    name: item.name,

                    category: item.category,

                    description: item.description,

                    stack: item.stack,

                    images: imageList,
                    fullImage: match?.image || item.image,

                    website:
                        match?.website || "",

                    caseStudy

                })

            );

            const link = makeLink(

                item.name,

                caseStudy,

                ""

            );

            if (link) history.appendChild(link);

        });

    }

    function renderAllProjects() {

        const query = document.getElementById(
            "ipSearch"
        ).value.trim().toLowerCase();

        const container = document.getElementById(
            "ipAllProjects"
        );

        const filtered = catalog.filter(project => {

            const searchable = [

                project.title,

                project.repo,

                project.category,

                project.description,

                project.language

            ].join(" ").toLowerCase();

            return (

                category === "All" ||

                project.category === category

            ) && searchable.includes(query);

        });

        const fragment =
            document.createDocumentFragment();

        filtered.forEach(project => {

            const matchedCase = cases.find(item => item.id === project.caseId);

            const tags = matchedCase
                ? matchedCase.stack
                : project.stack || [project.language].filter(Boolean);

            const card = buildCard({

                name: cleanTitle(project),

                category:
                    project.category || "Digital Project",

                description:
                    project.description ||
                    "An independent digital project.",

                stack: tags,

                images: imagesFor(project),
                fullImage: project.image,

                website:
                    project.website || project.githubPages,

                status: project.status,

                caseStudy: matchedCase

                    ? base + "/projects/" + matchedCase.slug + "/"

                    : "",

                source: project.source || ""

            });

            fragment.appendChild(card);

        });

        container.replaceChildren(fragment);

        document.getElementById(
            "ipResults"
        ).textContent =

            filtered.length + " of " +
            catalog.length + " projects";

        if (!filtered.length) {

            container.appendChild(

                create(
                    "p",
                    "",
                    "No projects match your search."
                )

            );

        }

    }

    function renderFilters() {

        const categories = [

            "All",

            ...new Set(
                catalog.map(p => p.category).filter(Boolean)
            )

        ];

        const filters = document.getElementById(
            "ipFilters"
        );

        categories.forEach(name => {

            const button = create("button","",name);

            button.type = "button";

            button.classList.toggle(
                "active",
                name === category
            );

            button.addEventListener("click",() => {

                category = name;

                filters.querySelectorAll("button")
                    .forEach(item => {

                        item.classList.toggle(
                            "active",
                            item === button
                        );

                    });

                renderAllProjects();

            });

            filters.appendChild(button);

        });

    }

    function renderSocials() {

        const container = document.getElementById(
            "ipSocials"
        );

        socials.forEach(([name,url]) => {

            const link = makeLink(

                name,

                url,

                "ip-glass ip-social"

            );

            if (link) container.appendChild(link);

        });

    }

    async function initialize() {

        // Load the content inside the existing CRT.

        const response = await fetch("/pages-content.html");

        if (!response.ok) {

            throw new Error("Internal pages could not be loaded.");

        }

        const template = document.createElement("template");

        template.innerHTML = await response.text();

        screen.appendChild(template.content);

        pages = document.getElementById("kbInternalPages");

        scroller = document.getElementById("ipScroller");

        zoomContent = document.getElementById("ipZoomContent");

        pages.querySelectorAll(".ip-arrow")
            .forEach(icon => {

                icon.innerHTML = arrow;

            });

        document.getElementById(
            "ipProjectCount"
        ).textContent = catalog.length;

        document.getElementById(
            "ipCaseCount"
        ).textContent = cases.length;

        const nav = create("nav");

        nav.id = "kbPageNavigation";

        nav.setAttribute(
            "aria-label",
            "Kunal Builds navigation"
        );

        const aboutButton = create(

            "button",

            "",

            "ABOUT"

        );

        const projectButton = create(

            "button",

            "",

            "PROJECTS / " + catalog.length

        );

        aboutButton.type = "button";

        projectButton.type = "button";

        aboutButton.onclick = () => openPage("about");

        projectButton.onclick = () => openPage("projects");

        nav.append(aboutButton,projectButton);

        screen.appendChild(nav);

        // Reuse the original question-mark button.

        const oldAbout = [

            ...screen.querySelectorAll("button")

        ].find(button =>

            !pages.contains(button) &&

            button.textContent.trim() === "?"

        );

        if (oldAbout) {

            oldAbout.addEventListener("click",event => {

                event.preventDefault();

                event.stopImmediatePropagation();

                openPage("about");

            },true);

            aboutButton.hidden = true;

            aboutButton.style.display = "none";

        }

        pages.addEventListener("click",event => {

            const button = event.target.closest(
                "[data-ip-page]"
            );

            if (button) {

                openPage(button.dataset.ipPage);

            }

        });

        document.getElementById(
            "ipBack"
        ).onclick = closePage;

        document.getElementById(
            "ipZoomOut"
        ).onclick = () => setZoom(zoom - .1);

        document.getElementById(
            "ipZoomIn"
        ).onclick = () => setZoom(zoom + .1);

        document.getElementById(
            "ipZoomReset"
        ).onclick = () => setZoom(1);

        document.getElementById(
            "ipSearch"
        ).addEventListener("input",renderAllProjects);

        // Separate page zoom from canvas zoom.

        pages.addEventListener("wheel",event => {

            event.stopPropagation();

            if (event.ctrlKey || event.metaKey) {

                event.preventDefault();

                setZoom(

                    zoom +
                    (event.deltaY < 0 ? .05 : -.05)

                );

            }

        },{passive:false});

        pages.addEventListener("pointerdown",event => {

            event.stopPropagation();

        });

        pages.addEventListener("pointermove",event => {

            event.stopPropagation();

        });

        // Prevent original canvas keyboard shortcuts.

        window.addEventListener("keydown",event => {
            if (document.documentElement.classList.contains('kb-ai-active')) return;

            if (!activePage) return; if (event.key === "Escape" && document.querySelector("#ipCasePage:not([hidden])")) return;

            if (event.key === "Escape") {

                event.preventDefault();

                event.stopImmediatePropagation();

                closePage();

                return;

            }

            if (
                (event.ctrlKey || event.metaKey) &&
                ["+","=","-","0"].includes(event.key)
            ) {

                event.preventDefault();

                event.stopImmediatePropagation();

                if (event.key === "0") {

                    setZoom(1);

                } else {

                    setZoom(

                        zoom +
                        (event.key === "-" ? -.1 : .1)

                    );

                }

                return;

            }

            event.stopImmediatePropagation();

        },true);

        // Keep center video paused while reading.

        const video = document.getElementById(
            "kbPortfolioVideo"
        );

        video?.addEventListener("play",() => {

            if (activePage) video.pause();

        });


        /* KB INTERNAL LINKS START */

        const contactLinks = {
            "About": "about",
            "Projects": "projects"
        };

        document.querySelectorAll("#kbUsefulLinks a")
            .forEach(link => {

                const label = link.textContent.trim();
                const page = contactLinks[label];

                if (!page) return;

                link.href = "#" + page;

                link.removeAttribute("target");
                link.removeAttribute("rel");

                link.addEventListener("click", event => {

                    event.preventDefault();
                    event.stopPropagation();

                    const dock = document.getElementById(
                        "kbContactDock"
                    );

                    // Reset existing contact menu state.

                    document.dispatchEvent(
                        new KeyboardEvent("keydown", {
                            key: "Escape",
                            bubbles: true
                        })
                    );

                    dock?.classList.remove("is-open");

                    openPage(page);

                });

            });

        /* KB INTERNAL LINKS END */

        // Direct page links for sharing.

        function openFromHash() {

            const requested = location.hash.slice(1);

            if (

                ["about","projects"].includes(requested) &&

                !screen.classList.contains("kb-intro-running")

            ) {

                openPage(requested);

            }

        }

        window.addEventListener(
            "hashchange",
            openFromHash
        );

        new MutationObserver(openFromHash)
            .observe(screen,{

                attributes:true,

                attributeFilter:["class"]

            });

        openFromHash();

        window.KB_PAGE = {open: openPage, close: closePage};

        console.log(

            "KUNAL BUILDS: Internal pages ready.",

            catalog.length,

            "projects and",

            cases.length,

            "case studies."

        );

    }

    initialize().catch(error => {

        console.error("Internal pages:",error);

    });

})();
