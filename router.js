/* One browser-history boundary for CRT pages. The standalone HTML routes use
   the same paths, so refreshes and new tabs remain ordinary navigation. */
(() => {
    "use strict";

    const caseIds = new Set((window.KB_CASES || []).map(item => item.id));
    const serviceIds = new Set((window.KB_SERVICES || []).map(item => item.id));
    let navigating = Promise.resolve();

    function route(value) {
        let url;
        try { url = new URL(value, location.href); } catch { return ""; }
        if (url.origin !== location.origin) return "";
        if (url.pathname === "/" && ["#about", "#projects"].includes(url.hash)) {
            return `/${url.hash.slice(1)}/`;
        }
        const path = url.pathname.replace(/\/+$/, "") || "/";
        if (["/", "/about", "/projects", "/who-is-kunal", "/services"].includes(path)) {
            return path === "/" ? "/" : path + "/";
        }
        const service = path.match(/^\/services\/([a-z0-9-]+)$/);
        if (service && serviceIds.has(service[1])) return path + "/";
        const project = path.match(/^\/projects\/([a-z0-9-]+)$/);
        if (project && caseIds.has(project[1])) return path + "/";
        return "";
    }

    function isOpen(id) {
        const panel = document.getElementById(id);
        return Boolean(panel && !panel.hidden);
    }

    async function show(path) {
        const screen = document.getElementById("screen");
        const detail = document.getElementById("detail");
        if (detail?.open) detail.close();
        if (screen?.classList.contains("kb-intro-running")) {
            document.dispatchEvent(new KeyboardEvent("keydown", {key:"Escape",bubbles:true}));
        }
        if (isOpen("kbServiceScreen") && !path.startsWith("/services/")) {
            await window.KB_SERVICES_UI?.close();
        }
        if (isOpen("kbIdentityScreen") && path !== "/who-is-kunal/") {
            window.KB_IDENTITY?.close();
        }
        if (isOpen("ipCasePage")) window.KB_CASE?.close();

        const isPage = path === "/about/" || path === "/projects/" ||
            /^\/projects\/[^/]+\/$/.test(path);
        if (!isPage && isOpen("kbInternalPages")) window.KB_PAGE?.close();

        if (path === "/") return;
        if (path === "/who-is-kunal/") {
            window.KB_IDENTITY?.open();
            return;
        }
        if (path.startsWith("/services/")) {
            const id = path.split("/").filter(Boolean)[1] || "";
            window.KB_SERVICES_UI?.open(id);
            return;
        }
        if (path === "/about/" || path === "/projects/") {
            window.KB_PAGE?.open(path === "/about/" ? "about" : "projects");
            return;
        }
        const id = path.split("/").filter(Boolean)[1];
        window.KB_PAGE?.open("projects");
        window.KB_CASE?.open(id);
    }

    function navigate(path, push = true) {
        const normalized = route(path);
        if (!normalized) return;
        navigating = navigating.then(async () => {
            if (push && location.pathname !== normalized) {
                history.pushState({kb:true}, "", normalized);
            }
            await show(normalized);
            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) {
                const publicOrigin = new URL(canonical.href).origin;
                canonical.href = publicOrigin + normalized;
                const ogUrl = document.querySelector('meta[property="og:url"]');
                if (ogUrl) ogUrl.content = canonical.href;
            }
        }).catch(error => console.error("Navigation failed:", error));
    }

    window.addEventListener("click", event => {
        if (event.defaultPrevented || event.button !== 0 || event.ctrlKey ||
            event.metaKey || event.shiftKey || event.altKey) return;
        const target = event.target instanceof Element ? event.target : null;
        if (!target) return;
        if (target.closest('.kb-ai-root')) return;

        let path = "";
        const link = target.closest("a[href]");
        if (link && !link.hasAttribute("download")) path = route(link.href);
        else {
            const button = target.closest("button");
            if (!button) return;
            const id = button.id;
            if (button.dataset.ipPage) path = `/${button.dataset.ipPage}/`;
            else if (id === "about") path = "/about/";
            else if (id === "ipBack" || id === "kbPageBackCircle" || id === "kbIdentityBack") path = "/";
            else if (id === "kbCaseBack") path = "/projects/";
            else if (id === "kbServiceBack") path = /^\/services\/[^/]+\/$/.test(location.pathname) ? "/services/" : "/";
            else if (button.parentElement?.id === "kbPageNavigation") path = button.textContent.includes("PROJECTS") ? "/projects/" : "/about/";
        }
        if (!path) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        navigate(path);
    }, true);

    window.addEventListener("popstate", () => navigate(location.pathname, false));
    window.KB_NAVIGATE = navigate;
})();
