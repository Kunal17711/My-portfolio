(() => {
    "use strict";

    const cases = window.KB_CASES || [];
    const stats = window.KB_STATS || {};
    const catalog = window.KB_CATALOG || [];
    const screenshots = window.KB_SCREENSHOTS || [];

    const normalize = value => String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    const aliases = {
        aldrenrow: "aldrenrow",
        earnstack: "earnstack-website",
        fashionwebsite: "fashion-landing-page",
        rakshaweb: "raksha",
        profileos: "profileos"
    };

    const arrow = `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 19L19 5M7 5h12v12"/>
        </svg>`;

    function el(tag, cls, value) {
        const node = document.createElement(tag);
        if (cls) node.className = cls;
        if (value !== undefined) node.textContent = value;
        return node;
    }

    function findImage(title) {
        const key = normalize(title);

        const project = catalog.find(p =>
            normalize(p.id) === key ||
            normalize(p.repo) === key ||
            normalize(p.title) === key
        );

        const names = [
            project?.id,
            aliases[key],
            title,
            key
        ].filter(Boolean).map(normalize);

        const file = screenshots.find(file =>
            names.includes(
                normalize(file.replace(/\.[^.]+$/, ""))
            )
        );

        return file
            ? "/assets/images/sites/" + file
            : "";
    }

    let installed = false;

    function install() {
        if (installed) return;

        const pages = document.getElementById("kbInternalPages");
        const content = document.getElementById("ipZoomContent");
        const scroller = document.getElementById("ipScroller");
        const about = document.getElementById("ipAbout");
        const projects = document.getElementById("ipProjects");

        if (!pages || !content || !scroller || !about || !projects) return;

        installed = true;

        // Actual portfolio statistics

        const grid = pages.querySelector(".ip-stat-grid");

        const format = number =>
            Number(number || 0).toLocaleString("en-IN");

        if (grid) {
            grid.replaceChildren();

            const metrics = [
                [format(stats.totalRepositories), "Repositories"],
                [format(stats.totalLinesOfCode), "Lines of source code"],
                [format(stats.totalSourceFiles), "Source files"],
                [format(stats.technologyCount), "Technologies"],
                [format(cases.length), "Case studies"],
                ["Full stack", "Development"]
            ];

            metrics.forEach(([value,label]) => {
                const card = el("div","ip-glass");

                card.append(
                    el("strong","",value),
                    el("span","",label)
                );

                grid.appendChild(card);
            });
        }

        // Individual case study reader

        const reader = el("section","kb-case-document");

        reader.id = "ipCasePage";
        reader.hidden = true;

        content.appendChild(reader);

        const back = el("button");

        back.id = "kbCaseBack";
        back.type = "button";
        back.hidden = true;
        back.setAttribute("aria-label","Return to projects");

        back.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 12H4M11 5l-7 7 7 7"/>
            </svg>`;

        pages.appendChild(back);

        let previousPage;
        let previousScroll = 0;
        let previousTitle;
        let active = false;

        function addLink(label,url) {
            if (!url) return;

            try {
                const parsed = new URL(url);
                if (!["https:","http:","mailto:"].includes(parsed.protocol)) return;
            } catch {
                return;
            }

            const link = el("a","kb-case-button",label);

            link.href = url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.insertAdjacentHTML("beforeend",arrow);

            reader.appendChild(link);
        }

        function openCase(project) {
            const model = (window.KB_PROJECTS || []).find(p => p.caseId === project.id);
            if (!active) {
                previousPage = about.hidden ? projects : about;
                previousScroll = scroller.scrollTop;
                previousTitle = document.title;
            }

            active = true;

            about.hidden = true;
            projects.hidden = true;

            const oldBack = document.getElementById("kbPageBackCircle");

            if (oldBack) oldBack.hidden = true;

            reader.replaceChildren();

            reader.append(
                el("h1","",project.name),
                el("p","kb-case-lead",model?.description || project.description)
            );

            addLink("Visit live project",model ? model.website : project.website);

            const source = model?.image || findImage(project.name) ||
                (project.image ? "/" + project.image.replace(/^\//, "") : "");

            if (source) {
                const img = el("img","kb-case-hero");

                img.src = source;
                img.alt = project.name + " project preview by Kunal Builds";
                img.onerror = () => img.remove();

                reader.appendChild(img);
            }

            const details = (project.sections || []).filter(section =>
                /^(problem|solution|documented features|features|design approach)$/i.test(section.heading)
            ).map(section => ({
                heading: /^features$/i.test(section.heading) ? "Core features" : section.heading,
                paragraphs: section.paragraphs || []
            }));

            const sections = [
                {heading:"Project overview",paragraphs:[model?.description || project.description]},
                ...details,
                ...(model?.stack?.length ? [{heading:"Technology stack",paragraphs:[model.stack.join(", ")]}] : []),
                ...(model?.sourceLines || model?.sourceFiles ? [{heading:"Development statistics",paragraphs:[[
                    model.sourceLines ? model.sourceLines.toLocaleString("en-IN") + " non-empty source lines" : "",
                    model.sourceFiles ? model.sourceFiles.toLocaleString("en-IN") + " source files" : ""
                ].filter(Boolean).join(" · ")]}] : [])
            ];

            for (const section of sections) {
                const block = el("section","kb-case-section");

                block.appendChild(el("h2","",section.heading));

                for (const text of section.paragraphs || []) {
                    block.appendChild(el("p","",text));
                }

                reader.appendChild(block);
            }

            const contact = el("section","kb-case-section");

            contact.append(
                el("h2","","Work with Kunal Builds"),
                el("p","","Have a similar project in mind? Share your goals, required features and design references.")
            );

            reader.appendChild(contact);

            addLink("Contact Kunal Builds","mailto:kkunaall10@gmail.com");

            reader.hidden = false;
            back.hidden = false;

            scroller.scrollTop = 0;
            scroller.scrollLeft = 0;

            document.title =
                project.name + " Case Study | Kunal Builds";

            back.focus({preventScroll:true});
        }

        function closeCase() {
            if (!active) return;

            active = false;

            reader.hidden = true;
            back.hidden = true;

            const oldBack = document.getElementById("kbPageBackCircle");

            if (oldBack) oldBack.hidden = false;

            previousPage.hidden = false;

            document.title = previousTitle;

            requestAnimationFrame(() => {
                scroller.scrollTop = previousScroll;
            });
        }

        back.addEventListener("click",closeCase);

        // Connect all existing case study links

        pages.addEventListener("click",event => {
            const link = event.target.closest("a");

            if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;

            let url;

            try {
                url = new URL(link.href);
            } catch {
                return;
            }

            const match = url.pathname.match(
                /^\/projects\/([^/]+)\/?$/
            );

            if (!match) return;

            const project = cases.find(c =>
                normalize(c.id) === normalize(match[1])
            );

            if (!project) return;

            event.preventDefault();
            event.stopImmediatePropagation();

            openCase(project);
        },true);

        window.addEventListener("keydown",event => {
            if (document.documentElement.classList.contains('kb-ai-active')) return;
            if (active && event.key === "Escape") {
                event.preventDefault();
                event.stopImmediatePropagation();
                closeCase();
            }
        },true);

        new MutationObserver(() => {
            if (pages.hidden && active) closeCase();
        }).observe(pages,{
            attributes:true,
            attributeFilter:["hidden"]
        });

        window.KB_CASE = {
            open: id => {
                const project = cases.find(c => c.id === id);
                if (project) openCase(project);
            },
            close: closeCase
        };

        console.log(
            "Kunal Builds case studies ready:",
            cases.length
        );
    }

    const observer = new MutationObserver(() => {
        install();
        if (installed) observer.disconnect();
    });

    observer.observe(document.body,{
        childList:true,
        subtree:true
    });

    install();

    if (installed) observer.disconnect();

})();
