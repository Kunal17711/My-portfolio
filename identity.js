(() => {

    "use strict";

    function bindSearch(root) {

        const search = root.querySelector(".kbi-search");

        if (!search) return;

        const cards = [...root.querySelectorAll(
            ".kbi-project"
        )];

        const count = root.querySelector(
            ".kbi-result-count"
        );

        const empty = root.querySelector(
            ".kbi-empty"
        );

        search.addEventListener("input",() => {

            const query = search.value
                .trim().toLowerCase();

            let visible = 0;

            cards.forEach(card => {

                const match = (
                    card.dataset.search || ""
                ).toLowerCase().includes(query);

                card.hidden = !match;

                if (match) visible++;

            });

            count.textContent = visible + " projects";

            empty.hidden = visible !== 0;

        });

        root.querySelectorAll(".kbi-project img")
            .forEach(img => {

                img.addEventListener("error",() => {

                    const fallback =
                        document.createElement("div");

                    fallback.className = "kbi-no-preview";

                    fallback.textContent =
                        img.closest(".kbi-project")
                           ?.querySelector("h3")
                           ?.textContent ||
                        "Preview unavailable";

                    img.replaceWith(fallback);

                });

            });

    }

    // Standalone SEO page.

    if (document.body.classList.contains("kbi-static")) {

        bindSearch(document);

        return;

    }

    const render = window.KB_IDENTITY_RENDER;

    if (!render) return;

    let installed = false;

    function install() {

        if (installed) return;

        const screen = document.getElementById("screen") ||
            document.getElementById("kbInternalPages")
                ?.parentElement;

        if (!screen) return;

        installed = true;

        const panel = document.createElement("section");

        panel.id = "kbIdentityScreen";
        panel.hidden = true;

        panel.innerHTML = `

            <div id="kbIdentityScroller">

                <div id="kbIdentityContent"></div>

            </div>

            <button id="kbIdentityBack"
                    type="button"
                    aria-label="Go back">

                ${render.back}

            </button>

        `;

        screen.appendChild(panel);

        const scroller = panel.querySelector(
            "#kbIdentityScroller"
        );

        const content = panel.querySelector(
            "#kbIdentityContent"
        );

        const back = panel.querySelector(
            "#kbIdentityBack"
        );

        let active = false;
        let previousTitle;
        let previousFocus;
        let suspended = [];
        let zoom = 1;

        function openIdentity() {

            if (active) return;

            previousTitle = document.title;

            previousFocus = document.activeElement;

            document.getElementById("kbContactDock")
                ?.classList.remove("is-open");

            suspended = [...screen.children]
                .filter(node => node !== panel)
                .map(node => [node,node.inert]);

            suspended.forEach(([node]) => {
                node.inert = true;
            });

            content.innerHTML = render.render();

            bindSearch(content);

            content.style.zoom = "1";

            zoom = 1;

            panel.hidden = false;

            panel.classList.add("kbi-enter");

            active = true;

            scroller.scrollTop = 0;

            document.title =
                "Who is Kunal Builds? | Web and App Developer";

            back.focus({preventScroll:true});

        }

        function closeIdentity() {

            if (!active) return;

            active = false;

            panel.hidden = true;

            panel.classList.remove("kbi-enter");

            suspended.forEach(([node,inert]) => {
                node.inert = inert;
            });

            suspended = [];

            document.title = previousTitle;

            previousFocus?.focus({preventScroll:true});

        }

        back.addEventListener("click",closeIdentity);

        document.addEventListener("click",event => {

            const a = event.target.closest("a");

            if (!a ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey) return;

            let url;

            try {
                url = new URL(a.href,location.href);
            } catch {
                return;
            }

            const internal = url.origin === location.origin;

            if (!internal) return;

            if (/^\/who-is-kunal\/?$/.test(url.pathname)) {

                event.preventDefault();

                event.stopImmediatePropagation();

                openIdentity();

                return;

            }

            if (active && panel.contains(a)) {

                if (/^\/services(?:\/[^/]+)?\/?$/
                    .test(url.pathname) &&
                    typeof window.KB_OPEN_SERVICES === "function") {

                    event.preventDefault();

                    event.stopImmediatePropagation();

                    closeIdentity();

                    const id = url.pathname
                        .split("/").filter(Boolean)[1] || "";

                    window.KB_OPEN_SERVICES(id);

                    return;

                }

                if (url.pathname === "/" && url.hash) {

                    closeIdentity();

                }

            }

        },true);

        panel.addEventListener("click",event => {
            event.stopPropagation();
        });

        panel.addEventListener("wheel",event => {

            event.stopPropagation();

            if (!event.ctrlKey && !event.metaKey) return;

            event.preventDefault();

            const old = zoom;

            zoom = Math.max(
                .75,
                Math.min(1.5,
                    zoom + (event.deltaY < 0 ? .05 : -.05))
            );

            const center = scroller.scrollTop +
                scroller.clientHeight / 2;

            content.style.zoom = String(zoom);

            scroller.scrollTop =
                center * zoom / old -
                scroller.clientHeight / 2;

        },{passive:false});

        let drag = null;

        scroller.addEventListener("pointerdown",event => {

            event.stopPropagation();

            if (
                event.pointerType !== "mouse" ||
                event.button !== 0 ||
                event.target.closest("a,button,input,summary")
            ) return;

            drag = {

                id:event.pointerId,
                x:event.clientX,
                y:event.clientY,
                top:scroller.scrollTop,
                left:scroller.scrollLeft,
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

                scroller.classList.add("kbi-dragging");

            }

            scroller.scrollTop = drag.top - dy;

            scroller.scrollLeft = drag.left - dx;

            event.preventDefault();

        });

        function stopDrag() {

            drag = null;

            scroller.classList.remove("kbi-dragging");

        }

        window.addEventListener("pointerup",stopDrag);

        scroller.addEventListener("pointercancel",stopDrag);

        scroller.addEventListener("lostpointercapture",stopDrag);

        scroller.addEventListener("dragstart",event => {

            event.preventDefault();

        });

        window.addEventListener("keydown",event => {
            if (document.documentElement.classList.contains('kb-ai-active')) return;

            if (!active) return;

            if (event.key === "Escape") {

                event.preventDefault();

                event.stopImmediatePropagation();

                closeIdentity();

            }

        },true);

        // Add identity navigation to Discover More.

        function connectMenu() {

            const menu = document.getElementById(
                "kbUsefulLinks"
            );

            if (!menu ||
                menu.querySelector("[data-kbi-menu]")) return;

            const about = [...menu.querySelectorAll("a")]
                .find(a => /about/i.test(a.textContent));

            const a = about
                ? about.cloneNode(true)
                : document.createElement("a");

            a.dataset.kbiMenu = "1";

            a.removeAttribute("id");
            a.removeAttribute("target");
            a.removeAttribute("rel");

            a.href = "/who-is-kunal/";

            a.textContent = "Who is Kunal Builds?";

            a.classList.add("kbi-menu-link");

            menu.appendChild(a);

        }

        connectMenu();

        new MutationObserver(connectMenu).observe(

            document.body,

            {
                childList:true,
                subtree:true
            }

        );

        window.KB_OPEN_IDENTITY = openIdentity;
        window.KB_IDENTITY = {open: openIdentity, close: closeIdentity};

        console.log(
            "Kunal Builds identity page ready."
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
