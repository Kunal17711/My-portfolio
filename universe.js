
(() => {

    "use strict";

    const world = document.getElementById("world");

    const screen = document.getElementById("screen");

    const viewport = document.getElementById("viewport");

    const detail = document.getElementById("detail");

    if (!world || !screen || !viewport || !detail) return;

    if (window.KB_UNIVERSE_LOADED) return;

    window.KB_UNIVERSE_LOADED = true;

    const catalog = window.KB_PROJECTS || [];

    // =====================================
    // FEATURED PROJECT POSITIONS
    // =====================================

    const positions = {

        "ORBIT": [-610, 0],

        "HORYZON": [610, -330],

        "HIRASHA AI": [-610, -440],

        "GUPSHUP": [610, 330],

        "VERICRAFT": [-610, 440],

        "STRIDE": [0, -410],

        "CAPTION STUDIO": [0, 410],

        "THE LAB": [1120, 0]

    };

    if (typeof projects !== "undefined") {

        projects.forEach((project, index) => {

            const position = positions[project.name];

            if (!position) return;

            project.x = position[0];

            project.y = position[1];

            const tile = world.querySelector(

                `.tile[data-index="${index}"]`

            );

            if (tile) {

                tile.style.left = project.x + "px";

                tile.style.top = project.y + "px";

            }

        });

    }

    // =====================================
    // CENTER CAMERA
    // =====================================

    function centerUniverse() {

        if (typeof target === "undefined") return;

        target.x = 0;

        target.y = 0;

        target.zoom = innerWidth < 700

            ? Math.min(.68, screen.clientWidth / 510)

            : Math.min(.95, screen.clientWidth / 1550);

        window.KB_SCHEDULE_RENDER?.();

    }

    centerUniverse();

    // =====================================
    // WEBSITE URL VALIDATION
    // =====================================

    function safeURL(value) {

        if (!value) return "";

        try {

            const url = new URL(value);

            return ["https:", "http:"].includes(
                url.protocol
            ) ? url.href : "";

        } catch {

            return "";

        }

    }

    function cleanTitle(project) {

        const name = String(
            project.title || project.repo || "Project"
        );

        const shortName = name.split(
            /\s[|]\s|\s[—–]\s|\s-\s/
        )[0];

        return shortName.slice(0, 55);

    }

    // =====================================
    // SCREENSHOT MATCHING
    // =====================================

    function screenshotFor(project) {
        return {
            image: project.image || "",
            thumbnail: project.thumbnail || project.image || "",
            url: safeURL(project.website)
        };

    }

    // =====================================
    // WEBSITE PROJECT DETAILS
    // =====================================

    function openWebsite(project) {

        const preview = screenshotFor(project);

        detail.classList.add("website-detail");

        const tags = [

            project.category,

            project.language,

            preview.image
                ? "Website preview"
                : "Preview unavailable"

        ].filter(Boolean);

        if (project.status && project.status !== "HTTP 200") {

            tags.push(
                "Last recorded check: " + project.status
            );

        }

        showDetail({

            name: cleanTitle(project),

            category: project.category,

            image: preview.image,

            description: project.description ||

                "An independent digital project from Kunal Builds.",

            tags,

            url: preview.url || (project.caseId
                ? "/projects/" + encodeURIComponent(project.caseId) + "/"
                : "")

        });

        const link = document.getElementById(
            "detailLink"
        );

        link.textContent = preview.url ? "Visit website \u2197" : "Read case study \u2197";

        const caseLink = document.getElementById("kbDetailCaseLink");
        if (caseLink) {
            caseLink.hidden = !project.caseId || !preview.url;
            if (!caseLink.hidden) caseLink.href = "/projects/" + encodeURIComponent(project.caseId) + "/";
        }

    }

    detail.addEventListener("close", () => {

        detail.classList.remove("website-detail");

        document.getElementById(
            "detailLink"
        ).textContent = "Explore \u2197";

    });

    const caseLink = document.createElement("a");
    caseLink.id = "kbDetailCaseLink";
    caseLink.textContent = "Read case study";
    caseLink.hidden = true;
    detail.querySelector(".detail-content")?.appendChild(caseLink);

    // =====================================
    // BUILD LARGE EXPLORABLE CANVAS
    // =====================================

    const slots = [];

    // Outer rings of projects around the featured area.

    for (let ring = 2; ring <= 7; ring++) {

        for (let x = -ring; x <= ring; x++) {

            for (let y = -ring; y <= ring; y++) {

                if (
                    Math.max(
                        Math.abs(x),
                        Math.abs(y)
                    ) !== ring
                ) continue;

                const px = x * 540;

                const py = y * 470;

                // Reserve central space for featured work.

                if (
                    Math.abs(px) < 1400 &&
                    Math.abs(py) < 850
                ) continue;

                slots.push({

                    x: px,

                    y: py,

                    distance: Math.hypot(px, py)

                });

            }

        }

    }

    slots.sort(
        (a,b) => a.distance - b.distance
    );

    const visibleProjects = catalog;

    // =====================================
    // CREATE WEBSITE CARDS
    // =====================================

    const fragment = document.createDocumentFragment();

    visibleProjects.forEach((project,index) => {

        const position = slots[index];

        if (!position) return;

        const preview = screenshotFor(project);

        const tile = document.createElement("article");

        tile.className = "tile universe-tile";

        tile.style.left = position.x + "px";

        tile.style.top = position.y + "px";

        const rotation = ((index * 7) % 13) - 6;

        tile.style.setProperty(

            "--rotation",

            rotation + "deg"

        );

        const inner = document.createElement("div");

        inner.className = "tile-inner";

        const category = document.createElement("span");

        category.className = "project-category";

        category.textContent = project.category;

        const artwork = document.createElement("button");

        artwork.className = "artwork";

        artwork.type = "button";

        artwork.setAttribute(

            "aria-label",

            "Explore " + cleanTitle(project)

        );

        const placeholder = document.createElement("div");

        placeholder.className = "universe-placeholder";

        const placeholderName = document.createElement("strong");

        placeholderName.textContent = cleanTitle(project);

        const placeholderLabel = document.createElement("small");

        placeholderLabel.textContent = preview.image

            ? "LOADING PREVIEW"

            : "PREVIEW UNAVAILABLE";

        placeholder.append(

            placeholderName,

            placeholderLabel

        );

        artwork.appendChild(placeholder);

        if (preview.image) {

            const img = document.createElement("img");

            window.KB_PREVIEW(img, preview.thumbnail, tile);

            img.alt = cleanTitle(project);

            img.decoding = "async";

            img.draggable = false;

            img.style.opacity = "0";

            img.addEventListener("load", () => {

                placeholder.remove();

                img.style.opacity = "1";

            });

            img.addEventListener("error", () => {

                img.remove();

                placeholderLabel.textContent =

                    "PREVIEW UNAVAILABLE";

            });

            artwork.appendChild(img);


        }

        const name = document.createElement("strong");

        name.className = "project-name";

        name.textContent = cleanTitle(project);

        artwork.addEventListener("click", () => {

            if (

                typeof suppressClick !== "undefined" &&

                suppressClick

            ) return;

            if (screen.classList.contains("off")) return;

            openWebsite(project);

        });

        inner.append(

            category,

            artwork,

            name

        );

        tile.appendChild(inner);

        fragment.appendChild(tile);

    });

    world.appendChild(fragment);

    // =====================================
    // RESET TO CENTER VIDEO BUTTON
    // =====================================

    const resetButton = document.createElement("button");

    resetButton.id = "kbCenterButton";

    resetButton.type = "button";

    resetButton.title = "Return to center";

    resetButton.setAttribute(

        "aria-label",

        "Return to center video"

    );

    resetButton.innerHTML = `

        <svg viewBox="0 0 24 24"

             fill="none"

             stroke="currentColor"

             stroke-width="1.5"

             stroke-linecap="round">

            <circle cx="12" cy="12" r="8"/>

            <circle cx="12" cy="12" r="2"/>

            <path d="M12 1v5M12 18v5M1 12h5M18 12h5"/>

        </svg>

    `;

    resetButton.addEventListener(

        "click",

        centerUniverse

    );

    screen.appendChild(resetButton);

    // Return camera to center after the typing intro.

    let wasIntro = screen.classList.contains(

        "kb-intro-running"

    );

    new MutationObserver(() => {

        const running = screen.classList.contains(

            "kb-intro-running"

        );

        if (wasIntro && !running) {

            centerUniverse();

        }

        wasIntro = running;

    }).observe(screen, {

        attributes: true,

        attributeFilter: ["class"]

    });

    document.addEventListener("keydown", event => {

        if (document.documentElement.classList.contains('kb-ai-active')) return;

        if (

            event.key.toLowerCase() === "r" &&

            !document.querySelector("dialog[open]") &&

            !event.target.matches("input,textarea") &&

            !event.ctrlKey &&

            !event.altKey &&

            !event.metaKey

        ) {

            centerUniverse();

        }

    }, true);

    console.log(

        "KUNAL BUILDS UNIVERSE:",

        visibleProjects.length,

        "website projects added."

    );

})();
