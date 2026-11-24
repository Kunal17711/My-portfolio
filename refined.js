(() => {
    "use strict";

    const catalog = window.KB_PROJECTS || [];
    const viewport = document.getElementById("viewport");

    document.querySelectorAll("#world img").forEach(image => {
        image.draggable = false;
    });

    for (const eventName of ["dragstart", "selectstart", "dblclick"]) {
        viewport.addEventListener(eventName, event => event.preventDefault());
    }

    const featuredLinks = {
        "ORBIT": "orbit-website",
        "HORYZON": "horyzon-website",
        "HIRASHA AI": "hirasha-ai",
        "STRIDE": "stride-website",
        "CAPTION STUDIO": "caption-studio-web"
    };

    if (typeof projects !== "undefined") {
        projects.forEach(project => {
            const entry = catalog.find(item => item.id === featuredLinks[project.name]);
            if (entry?.website) project.url = entry.website;
        });
    }

    if (typeof target !== "undefined") {
        target.zoom = window.innerWidth < 700 ? 0.78 : 0.95;
        if (typeof focusProject === "function") focusProject(0, false);
    }
})();
