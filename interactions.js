(() => {
    "use strict";

    const screen = document.getElementById("screen");

    if (!screen) {
        console.warn("Interactions: screen not found.");
        return;
    }

    const catalog = Array.isArray(window.KB_PROJECTS)
        ? window.KB_PROJECTS : [];

    const stats = window.KB_STATS || {};

    const icons = {
        filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',

        grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',

        terminal: '<path d="m5 6 6 6-6 6M13 18h6"/>',

        music: '<path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="18" cy="16" rx="3" ry="2"/>',

        close: '<path d="m6 6 12 12M18 6 6 18"/>',

        arrow: '<path d="M5 19 19 5M7 5h12v12"/>',

        play: '<path d="m8 5 12 7-12 7z"/>',

        pause: '<path d="M9 5v14M15 5v14"/>'
    };

    const svg = name => `<svg viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true">${icons[name] || ""}</svg>`;

    function el(tag,cls,text) {
        const node = document.createElement(tag);

        if (cls) node.className = cls;
        if (text !== undefined) node.textContent = text;

        return node;
    }

    function safeURL(value) {
        try {
            const url = new URL(value);

            return ["http:","https:"].includes(url.protocol)
                ? url.href : "";
        } catch {
            return "";
        }
    }

    // CRT screen power-on.

    if (!matchMedia("(prefers-reduced-motion:reduce)").matches) {

        const power = el("div");
        power.id = "kbPowerOn";

        screen.appendChild(power);

        setTimeout(() => power.remove(),1100);
    }

    // Cursor and subtle screen reflection.

    const cursor = el("div");
    cursor.id = "kbInteractiveCursor";
    document.body.appendChild(cursor);

    const glow = el("div");
    glow.id = "kbPointerGlow";
    screen.appendChild(glow);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let pointerInside = false;
    let frame = 0;

    function animateCursor() {
        cursorX += (mouseX-cursorX)*.22;
        cursorY += (mouseY-cursorY)*.22;

        cursor.style.transform =
            `translate3d(${cursorX}px,${cursorY}px,0)
             translate(-50%,-50%)`;

        if (pointerInside ||
            Math.abs(mouseX-cursorX) > .5 ||
            Math.abs(mouseY-cursorY) > .5) {

            frame = requestAnimationFrame(animateCursor);

        } else {
            frame = 0;
        }
    }

    screen.addEventListener("pointermove",event => {

        if (event.pointerType !== "mouse") return;

        pointerInside = true;

        mouseX = event.clientX;
        mouseY = event.clientY;

        const rect = screen.getBoundingClientRect();

        glow.style.setProperty(
            "--pointer-x",
            `${mouseX-rect.left}px`
        );

        glow.style.setProperty(
            "--pointer-y",
            `${mouseY-rect.top}px`
        );

        cursor.classList.add("visible");

        if (isHome()) {
            glow.classList.add("visible");
        }

        cursor.classList.toggle(
            "hovering",
            Boolean(event.target.closest(
                "a,button,.kb-refined-project"
            ))
        );

        if (!frame) {
            cursorX = mouseX;
            cursorY = mouseY;
            frame = requestAnimationFrame(animateCursor);
        }
    });

    screen.addEventListener("pointerleave",() => {
        pointerInside = false;
        cursor.classList.remove("visible");
        glow.classList.remove("visible");
    });

    window.addEventListener("pointerdown",() => {
        cursor.classList.add("pressed");
    });

    window.addEventListener("pointerup",() => {
        cursor.classList.remove("pressed");
    });

    // Identify visible internal pages.

    function visible(id) {
        const node = document.getElementById(id);

        if (!node || node.hidden) return false;

        const style = getComputedStyle(node);

        return style.display !== "none" &&
            style.visibility !== "hidden" &&
            Number(style.opacity) !== 0 &&
            node.getClientRects().length > 0;
    }

    function isHome() {
        return !visible("kbInternalPages") &&
            !visible("kbServiceScreen") &&
            !screen.classList.contains("kb-intro-running");
    }

    // Add lightweight hover effects to home cards.

    function refineProjects() {
        screen.querySelectorAll(
            ".project-card,.project-tile,.project-item,[data-project-id]"
        ).forEach(node => {

            if (node.closest(
                "#kbInternalPages,#kbServiceScreen,.kb-interaction-panel"
            )) return;

            if (!node.classList.contains("kb-refined-project")) {
                node.classList.add("kb-refined-project");
            }
        });
    }

    refineProjects();

    // Shared panel.

    const overlay = el("section","kb-interaction-panel");
    overlay.hidden = true;

    overlay.setAttribute("role","dialog");
    overlay.setAttribute("aria-label","Portfolio tools");
    overlay.setAttribute("aria-modal","true");

    const card = el("div","kb-interaction-card");

    overlay.appendChild(card);
    screen.appendChild(overlay);

    let previousFocus;
    let previousInert = [];

    function openPanel(title,description) {

        if (overlay.hidden) {
            previousFocus = document.activeElement;

            previousInert = [...screen.children]
                .filter(node => node !== overlay)
                .map(node => [node,node.inert]);

            previousInert.forEach(([node]) => {
                node.inert = true;
            });
        }

        card.replaceChildren();

        const close = el(
            "button","kb-interaction-close"
        );

        close.type = "button";
        close.setAttribute("aria-label","Close");
        close.innerHTML = svg("close");

        close.addEventListener("click",closePanel);

        card.append(
            close,
            el("h2","",title),
            el(
                "p",
                "kb-interaction-description",
                description
            )
        );

        overlay.hidden = false;
        close.focus({preventScroll:true});
    }

    function closePanel() {
        overlay.hidden = true;

        previousInert.forEach(([node,inert]) => {
            node.inert = inert;
        });

        previousInert = [];

        previousFocus?.focus({preventScroll:true});
    }

    overlay.addEventListener("click",event => {
        event.stopPropagation();

        if (event.target === overlay) {
            closePanel();
        }
    });

    overlay.addEventListener("pointerdown",event => {
        event.stopPropagation();
    });

    overlay.addEventListener("wheel",event => {
        event.stopPropagation();
    });

    overlay.addEventListener("keydown",event => {
        if (event.key !== "Tab") return;

        const items = [...card.querySelectorAll(
            "button,a[href],input,[tabindex='0']"
        )].filter(node => !node.disabled);

        if (!items.length) return;

        const first = items[0];
        const last = items[items.length-1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey &&
                   document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    // Project categories and search.

    function projectName(project) {
        return String(
            project.name ||
            project.title ||
            project.id ||
            "Project"
        );
    }

    function projectCategory(project) {
        return String(project.category || "Other projects");
    }

    const categories = [...new Set(
        catalog.map(projectCategory)
    )].sort();

    const screenshots = new Set(
        window.KB_SCREENSHOTS || []
    );

    function projectImage(project) {

        if (project.thumbnail || project.image) return project.thumbnail || project.image;

        const id = String(project.id || "");

        for (const name of [
            id,
            id+"-website",
            id+"-github-pages"
        ]) {
            for (const ext of [
                ".jpg",".png",".webp",".jpeg"
            ]) {

                const file = name+ext;

                if (screenshots.has(file)) {
                    return "/assets/images/sites/"+file;
                }
            }
        }

        return "";
    }

    function showOverview(category = "") {

        openPanel(
            category || "Project overview",
            "Browse projects and explore selected work."
        );

        const search = el("input","kb-project-search");

        search.type = "search";
        search.placeholder = "Search projects";
        search.setAttribute("aria-label","Search projects");

        const list = el("div","kb-overview-list");

        card.append(search,list);

        function render() {

            list.replaceChildren();

            const query = search.value.trim().toLowerCase();

            const projects = catalog.filter(project => {

                const matchesCategory = !category ||
                    projectCategory(project) === category;

                const matchesQuery = (
                    projectName(project)+" "+
                    projectCategory(project)+" "+
                    String(project.description || "")
                ).toLowerCase().includes(query);

                return matchesCategory && matchesQuery;
            });

            if (!projects.length) {
                list.appendChild(
                    el("p","","No matching projects.")
                );
                return;
            }

            for (const project of projects) {

                const website = safeURL(project.website);

                const link = el(
                    website || project.caseId ? "a" : "div","kb-overview-project"
                );

                if (website || project.caseId) link.href = project.caseId ? (
                    "/projects/"+
                    encodeURIComponent(project.caseId)+"/"
                ) : website;

                if (website && !project.caseId) {
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                }

                const image = projectImage(project);

                if (image) {
                    const img = el("img");

                    img.src = image;
                    img.alt = projectName(project)+" preview";
                    img.loading = "lazy";
                    img.draggable = false;

                    img.onerror = () => img.remove();

                    link.appendChild(img);
                }

                link.appendChild(
                    el("span","",projectName(project))
                );

                list.appendChild(link);
            }
        }

        search.addEventListener("input",render);

        render();
        search.focus({preventScroll:true});
    }

    function showCategories() {

        openPanel(
            "Project categories",
            "Explore work by product type and technology."
        );

        const list = el("div","kb-category-list");

        ["All projects",...categories].forEach(name => {

            const button = el(
                "button","kb-category-button",name
            );

            button.type = "button";

            button.insertAdjacentHTML(
                "beforeend",svg("arrow")
            );

            button.addEventListener("click",() => {
                showOverview(
                    name === "All projects" ? "" : name
                );
            });

            list.appendChild(button);
        });

        card.appendChild(list);
    }

    // Existing background music.

    function findAudio() {
        return document.getElementById("audio") || [...document.querySelectorAll("audio")]
            .find(audio => {

                const source =
                    audio.currentSrc ||
                    audio.src ||
                    audio.querySelector("source")?.src ||
                    "";

                return /fav-song/i.test(source);
            });
    }

    let fallbackAudio;

    function getAudio() {

        const existing = findAudio();

        if (existing) return existing;

        if (!fallbackAudio) {

            fallbackAudio = new Audio(
                "assets/audio/fav-song.mp3"
            );

            fallbackAudio.loop = true;
            fallbackAudio.volume = .3;
        }

        return fallbackAudio;
    }

    function showMusic() {

        openPanel(
            "Background music",
            "Listen while exploring the portfolio."
        );

        const audio = getAudio();

        const actions = el("div","kb-music-actions");

        const play = el("button");

        play.type = "button";

        const volume = el("input");

        volume.type = "range";
        volume.min = "0";
        volume.max = "1";
        volume.step = ".01";
        volume.value = audio.volume;

        volume.setAttribute("aria-label","Music volume");

        const status = el(
            "p","kb-interaction-description"
        );

        function update() {
            play.innerHTML = svg(
                audio.paused ? "play" : "pause"
            );

            play.setAttribute(
                "aria-label",
                audio.paused ? "Play music" : "Pause music"
            );

            status.textContent = audio.paused
                ? "Music paused"
                : "Music playing";
        }

        play.addEventListener("click",async () => {

            try {
                if (audio.paused) {
                    await audio.play();
                } else {
                    audio.pause();
                }

                update();

            } catch {
                status.textContent =
                    "Unable to play the audio file.";
            }
        });

        volume.addEventListener("input",() => {
            audio.volume = Number(volume.value);
        });

        actions.append(play,volume);
        card.append(actions,status);

        update();
    }

    // Professional command interface.
    // Only predefined local commands are supported.

    function showCommands() {

        openPanel(
            "Command interface",
            "Quick access to portfolio information."
        );

        const output = el("div");

        output.id = "kbCommandOutput";

        output.textContent =
            "Kunal Builds\n"+
            "Type help for available commands.\n\n";

        const form = el(
            "form","kb-command-input-row"
        );

        const input = el("input");

        input.id = "kbCommandInput";
        input.autocomplete = "off";
        input.spellcheck = false;
        input.placeholder = "Enter command";

        input.setAttribute("aria-label","Command");

        form.append(
            el("span","",">"),
            input
        );

        card.append(output,form);

        function print(text) {
            output.textContent += text+"\n";
            output.scrollTop = output.scrollHeight;
        }

        form.addEventListener("submit",event => {

            event.preventDefault();

            const command = input.value
                .trim().toLowerCase();

            input.value = "";

            if (!command) return;

            print("> "+command);

            switch(command) {

                case "help":
                    print(
                        "help       Available commands\n"+
                        "about      Developer information\n"+
                        "stats      Repository statistics\n"+
                        "projects   Browse projects\n"+
                        "services   Development services\n"+
                        "contact    Contact details\n"+
                        "music      Music controls\n"+
                        "clear      Clear output\n"+
                        "exit       Close interface"
                    );
                    break;

                case "about":
                    print(
                        "Kunal Builds\n"+
                        "Independent web and app developer.\n"+
                        "Haryana, India."
                    );
                    break;

                case "stats":
                    print(
                        "Repositories: "+
                        (stats.totalRepositories ?? "Unavailable")+
                        "\nSource lines: "+
                        (stats.totalLinesOfCode?.toLocaleString("en-IN")
                            ?? "Unavailable")+
                        "\nSource files: "+
                        (stats.totalSourceFiles ?? "Unavailable")+
                        "\nTechnologies: "+
                        (stats.technologyCount ?? "Unavailable")
                    );
                    break;

                case "projects":
                    showOverview();
                    break;

                case "services":
                    closePanel();

                    if (typeof window.KB_OPEN_SERVICES === "function") {
                        window.KB_OPEN_SERVICES();
                    } else {
                        location.href = "/services/";
                    }
                    break;

                case "contact":
                    print(
                        "Email: kkunaall10@gmail.com\n"+
                        "GitHub: github.com/Kunal17711\n"+
                        "LinkedIn: linkedin.com/in/kunalldev"
                    );
                    break;

                case "music":
                    showMusic();
                    break;

                case "clear":
                    output.textContent = "";
                    break;

                case "exit":
                    closePanel();
                    break;

                default:
                    print(
                        "Unknown command. Type help."
                    );
            }

            print("");
        });

        input.focus({preventScroll:true});
    }

    // Minimal bottom controls.

    const controls = el("div");
    controls.id = "kbQuickControls";

    const buttons = [
        ["filter","Project categories",showCategories],
        ["grid","Project overview",()=>showOverview()],
        ["terminal","Command interface",showCommands],
        ["music","Background music",showMusic]
    ];

    for (const [icon,label,action] of buttons) {

        const button = el("button");

        button.type = "button";
        button.title = label;
        button.setAttribute("aria-label",label);

        button.innerHTML = svg(icon);

        button.addEventListener("click",event => {

            event.stopPropagation();

            action();
        });

        controls.appendChild(button);
    }

    controls.addEventListener("pointerdown",event => {
        event.stopPropagation();
    });

    screen.appendChild(controls);

    // Keyboard shortcuts.

    window.addEventListener("keydown",event => {
        if (document.documentElement.classList.contains('kb-ai-active')) return;

        if (!overlay.hidden && event.key === "Escape") {

            event.preventDefault();
            event.stopImmediatePropagation();

            closePanel();
            return;
        }

        if (!isHome() ||
            event.ctrlKey ||
            event.metaKey ||
            event.altKey ||
            event.repeat ||
            event.target.closest(
                "input,textarea,select,[contenteditable='true']"
            )) return;

        if (event.key === "`" || event.key === "~") {
            event.preventDefault();
            showCommands();
        }

        if (event.key.toLowerCase() === "c") {
            showCategories();
        }

        if (event.key.toLowerCase() === "m") {
            showOverview();
        }

    },true);

    // Keep home controls isolated from internal pages.

    function synchronize() {
        const hidden = !isHome();
        // Setting an already-present hidden attribute still notifies this
        // observer. Write only on a real mode change to avoid a frame loop.
        if (controls.hidden !== hidden) controls.hidden = hidden;
        if (glow.hidden !== hidden) glow.hidden = hidden;

        refineProjects();
    }

    let scheduled = false;

    new MutationObserver(() => {

        if (scheduled) return;

        scheduled = true;

        requestAnimationFrame(() => {
            scheduled = false;
            synchronize();
        });

    }).observe(screen,{
        childList:true,
        subtree:true,
        attributes:true,
        attributeFilter:["hidden","class"]
    });

    synchronize();

    console.log("Kunal Builds: interactions initialized.");

})();
