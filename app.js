const projects = [

    {
        name: "ORBIT",
        category: "SOCIAL PLATFORM",
        image: "orbit.webp",
        description: "An independent social experience built around image sharing, meaningful connections, direct messaging and a carefully designed interface.",
        tags: ["Flutter", "Supabase", "Social"],
        url: "https://github.com/Kunal17711/orbit",
        x: 0,
        y: 0,
        rotation: 0
    },

    {
        name: "HORYZON",
        category: "ANDROID / WALLPAPERS",
        image: "horyzon.webp",
        description: "A premium Android wallpaper experience featuring curated visual collections, immersive photography and fast, intuitive wallpaper discovery.",
        tags: ["Android", "Kotlin", "Design"],
        url: "",
        x: 430,
        y: -220,
        rotation: 7
    },

    {
        name: "HIRASHA AI",
        category: "ARTIFICIAL INTELLIGENCE",
        image: "hirasha.webp",
        description: "An independent AI ecosystem exploring intelligent conversations, creative workflows, image tools and software development experiences.",
        tags: ["AI", "Python", "Web"],
        url: "",
        x: -430,
        y: -220,
        rotation: -7
    },

    {
        name: "GUPSHUP",
        category: "PRIVATE MESSAGING",
        image: "gupshup.webp",
        description: "A privacy-focused messaging project exploring end-to-end encrypted communication and secure, minimal digital conversations.",
        tags: ["Encryption", "Flutter", "Prototype"],
        url: "",
        x: 430,
        y: 240,
        rotation: 6
    },

    {
        name: "VERICRAFT",
        category: "DEVELOPER TOOLS",
        image: "vericraft.webp",
        description: "A developer-focused software security project designed around repository analysis, code quality and modern development workflows.",
        tags: ["SaaS", "Security", "Development"],
        url: "",
        x: -430,
        y: 240,
        rotation: -6
    },

    {
        name: "STRIDE",
        category: "FINTECH / SANDBOX",
        image: "stride.webp",
        description: "An experimental teen-focused fintech sandbox exploring financial awareness, simulated payments and modern financial interfaces. No real money transactions.",
        tags: ["Fintech", "Flutter", "Sandbox"],
        url: "",
        x: 0,
        y: -460,
        rotation: -3
    },

    {
        name: "CAPTION STUDIO",
        category: "CREATOR TOOLS",
        image: "caption.webp",
        description: "A creator-focused utility for automatic captions and subtitle workflows, designed to simplify video content production.",
        tags: ["Python", "Audio", "Creators"],
        url: "",
        x: 0,
        y: 460,
        rotation: 3
    },

    {
        name: "THE LAB",
        category: "EXPERIMENTAL TECHNOLOGY",
        image: "lab.webp",
        description: "The experimental playground of Kunal Builds. A collection of bold prototypes, creative technology, interfaces and future product ideas.",
        tags: ["Research", "Experiments", "Design"],
        url: "",
        x: 880,
        y: 0,
        rotation: -5
    }

];

const $ = id => document.getElementById(id);

const screen = $("screen");
const viewport = $("viewport");
const world = $("world");
const detail = $("detail");
const audio = $("audio");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

let activeIndex = 0;
let powered = true;
let musicPlaying = false;
let resumeMusic = false;

const camera = {
    x: 0,
    y: 0,
    zoom: innerWidth < 700 ? 0.72 : 0.9
};

const target = { ...camera };

let drag = null;
let suppressClick = false;
let glitchTimer;

function createProjects() {

    projects.forEach((project, index) => {

        const tile = document.createElement("article");

        tile.className = "tile";
        tile.dataset.index = index;

        tile.style.left = project.x + "px";
        tile.style.top = project.y + "px";
        tile.style.setProperty(
            "--rotation",
            project.rotation + "deg"
        );

        tile.innerHTML = `
            <div class="tile-inner">

                <span class="project-category">
                    ${project.category}
                </span>

                <button class="artwork"
                    aria-label="Open ${project.name}">

                    <img
                        src="assets/images/${project.image}"
                        alt="${project.name} product showcase"
                        draggable="false"
                        decoding="async"
                    >

                </button>

                <strong class="project-name">
                    ${project.name}
                </strong>

                <span class="project-number">
                    PROJECT / ${String(index + 1).padStart(2, "0")}
                </span>

            </div>
        `;

        const image = tile.querySelector("img");

        image.addEventListener("error", () => {

            console.error(
                "Missing image:",
                project.image
            );

            image.hidden = true;

            const fallback = document.createElement("span");

            fallback.className = "image-fallback";
            fallback.textContent = project.name.charAt(0);

            tile.querySelector(".artwork").append(fallback);

        });

        tile.querySelector(".artwork").addEventListener(
            "click",
            () => {

                if (suppressClick || !powered) return;

                focusProject(index);
                showDetail(project);

            }
        );

        world.appendChild(tile);

    });

}

let renderFrame = 0;

function scheduleRender() {
    if (!renderFrame && !document.hidden && powered && !document.documentElement.classList.contains('kb-ai-active')) {
        renderFrame = requestAnimationFrame(render);
    }
}
window.KB_SCHEDULE_RENDER = scheduleRender;

function render() {
    renderFrame = 0;
    if (document.hidden || !powered || document.documentElement.classList.contains('kb-ai-active')) return;

    const easing = reducedMotion ? 1 : 0.085;

    camera.x += (target.x - camera.x) * easing;
    camera.y += (target.y - camera.y) * easing;

    camera.zoom +=
        (target.zoom - camera.zoom) * easing;

    world.style.transform = `
        translate3d(${camera.x}px, ${camera.y}px, 0)
        scale(${camera.zoom})
    `;

    const moving = Math.abs(target.x - camera.x) > .05 ||
        Math.abs(target.y - camera.y) > .05 ||
        Math.abs(target.zoom - camera.zoom) > .0001;

    if (moving) scheduleRender();

}

function triggerGlitch() {

    if (reducedMotion) return;

    clearTimeout(glitchTimer);

    screen.classList.remove("switching");

    void screen.offsetWidth;

    screen.classList.add("switching");

    glitchTimer = setTimeout(() => {
        screen.classList.remove("switching");
    }, 300);

}

function focusProject(index, animate = true) {

    if (!powered) return;

    activeIndex =
        (index + projects.length) % projects.length;

    const project = projects[activeIndex];

    target.x = -project.x * target.zoom;
    target.y = -project.y * target.zoom;
    scheduleRender();

    $("channel").textContent =
        "CH " + String(activeIndex + 1).padStart(2, "0");

    $("activeName").textContent = project.name;
    $("activeCategory").textContent = project.category;

    document.querySelectorAll(".tile").forEach(tile => {

        tile.classList.toggle(
            "active",
            Number(tile.dataset.index) === activeIndex
        );

    });

    if (animate) triggerGlitch();

}

function resetView() {

    target.zoom = innerWidth < 700 ? 0.72 : 0.9;

    focusProject(0);

}

function showDetail(project) {

    if (!powered) return;

    $("detailCategory").textContent = project.category;
    $("detailTitle").textContent = project.name;
    $("detailDescription").textContent = project.description;

    const image = $("detailImage");

    image.hidden = !project.image;

    detail.classList.toggle(
        "no-image",
        !project.image
    );

    if (project.image) {

        image.src = "assets/images/" + project.image;
        image.alt = project.name;

    } else {

        image.removeAttribute("src");

    }

    $("detailTags").replaceChildren();

    (project.tags || []).forEach(tag => {

        const chip = document.createElement("span");

        chip.textContent = tag;

        $("detailTags").appendChild(chip);

    });

    const link = $("detailLink");

    link.hidden = !project.url;

    if (project.url) {
        link.href = project.url;
    } else {
        link.removeAttribute("href");
    }

    if (!detail.open) {
        detail.showModal();
    }

}

$("detailImage").addEventListener("error", () => {

    $("detailImage").hidden = true;
    detail.classList.add("no-image");

});

$("about").addEventListener("click", () => {

    showDetail({

        name: "KUNAL BUILDS",

        category: "THE FOUNDER / ABOUT",

        image: "profile.webp",

        description: "An independent technology builder exploring the intersection of software, design and creative technology. Building digital products, experimenting with new ideas and turning imagination into real experiences.",

        tags: [
            "Independent Developer",
            "Product Design",
            "Technology"
        ],

        url: "https://github.com/Kunal17711"

    });

});

$("contact").addEventListener("click", () => {

    showDetail({

        name: "LET'S BUILD.",

        category: "COLLABORATIONS / CONTACT",

        image: "profile.webp",

        description: "Interested in technology, digital products, creative experiments or building something meaningful together? Explore my work and connect with me through GitHub.",

        tags: [
            "Collaboration",
            "Ideas",
            "Development"
        ],

        url: "https://github.com/Kunal17711"

    });

});

$("close").addEventListener("click", () => detail.close());

detail.addEventListener("click", event => {

    if (event.target === detail) {

        const rect = detail.getBoundingClientRect();

        if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        ) {

            detail.close();

        }

    }

});

viewport.addEventListener("pointerdown", event => {

    if (!powered || event.button !== 0) return;

    suppressClick = false;

    drag = {
        id: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        cameraX: target.x,
        cameraY: target.y,
        moved: false
    };

});

viewport.addEventListener("pointermove", event => {

    if (!drag || event.pointerId !== drag.id) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (!drag.moved && Math.hypot(dx, dy) < 6) return;

    if (!drag.moved) {

        drag.moved = true;

        viewport.setPointerCapture(event.pointerId);

    }

    suppressClick = true;

    viewport.classList.add("dragging");

    target.x = Math.max(-6500, Math.min(6500, drag.cameraX + dx));
    target.y = Math.max(-6500, Math.min(6500, drag.cameraY + dy));
    scheduleRender();

});

function stopDrag() {

    if (!drag) return;

    drag = null;

    viewport.classList.remove("dragging");

    setTimeout(() => {
        suppressClick = false;
    }, 50);

}

window.addEventListener("pointerup", stopDrag);
window.addEventListener("pointercancel", stopDrag);

viewport.addEventListener("wheel", event => {

    if (!powered) return;

    event.preventDefault();

    const oldZoom = target.zoom;

    const nextZoom = Math.max(
        0.18,
        Math.min(1.8, oldZoom * Math.exp(-event.deltaY * 0.001))
    );

    const rect = viewport.getBoundingClientRect();

    const mouseX =
        event.clientX - rect.left - rect.width / 2;

    const mouseY =
        event.clientY - rect.top - rect.height / 2;

    const ratio = nextZoom / oldZoom;

    target.x = mouseX - (mouseX - target.x) * ratio;
    target.y = mouseY - (mouseY - target.y) * ratio;

    target.zoom = nextZoom;
    scheduleRender();

}, { passive: false });

$("prev").onclick = () => focusProject(activeIndex - 1);

$("next").onclick = () => focusProject(activeIndex + 1);

$("reset").onclick = resetView;

// MUSIC SYSTEM

audio.volume = 0.30;

function updateMusicButton() {

    $("music").textContent =
        musicPlaying ? "MUSIC ON" : "MUSIC OFF";

    $("music").classList.toggle(
        "playing",
        musicPlaying
    );

    $("music").setAttribute(
        "aria-pressed",
        String(musicPlaying)
    );

}

async function toggleMusic() {

    if (!powered) return;

    if (musicPlaying) {

        audio.pause();

        musicPlaying = false;

    } else {

        try {

            await audio.play();

            musicPlaying = true;

        } catch (error) {

            console.error("Audio failed:", error);

            $("music").textContent = "AUDIO ERROR";

            setTimeout(updateMusicButton, 2000);

            return;

        }

    }

    updateMusicButton();

}

$("music").onclick = toggleMusic;

$("volume").addEventListener("input", event => {

    audio.volume = Number(event.target.value) / 100;

    $("volumeValue").textContent =
        event.target.value + "%";

});

// TV POWER

async function togglePower() {

    powered = !powered;

    screen.classList.toggle("off", !powered);

    if (!powered) {

        resumeMusic = musicPlaying;

        audio.pause();

        musicPlaying = false;

        if (detail.open) detail.close();

    } else {

        triggerGlitch();
        scheduleRender();

        if (resumeMusic) {

            try {

                await audio.play();

                musicPlaying = true;

            } catch (error) {

                musicPlaying = false;

            }

        }

    }

    updateMusicButton();

}

$("power").onclick = togglePower;
$("wake").onclick = togglePower;

// FULLSCREEN

async function toggleFullscreen() {

    try {

        if (document.fullscreenElement) {

            await document.exitFullscreen();

        } else if (document.documentElement.requestFullscreen) {

            await document.documentElement.requestFullscreen();

        }

    } catch (error) {

        console.error(error);

    }

}

$("fullscreen").onclick = toggleFullscreen;

if (!document.fullscreenEnabled) {
    $("fullscreen").hidden = true;
}

// KEYBOARD SHORTCUTS

document.addEventListener("keydown", event => {

    if (document.documentElement.classList.contains('kb-ai-active')) return;

    if (detail.open) return;

    if (
        event.target.matches("input, textarea, select") ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
    ) return;

    const key = event.key.toLowerCase();

    if (key === "p") {
        togglePower();
        return;
    }

    if (!powered) return;

    if (key === "arrowright") {

        event.preventDefault();

        focusProject(activeIndex + 1);

    }

    if (key === "arrowleft") {

        event.preventDefault();

        focusProject(activeIndex - 1);

    }

    if (key === "m") toggleMusic();
    if (key === "f") toggleFullscreen();
    if (key === "r") resetView();

});

// CLOCK

function updateClock() {

    $("clock").textContent =
        new Date().toLocaleTimeString("en-GB");

}

updateClock();

setInterval(updateClock, 1000);

// INITIALIZATION

createProjects();

focusProject(0, false);

scheduleRender();
document.addEventListener("visibilitychange", () => {
    if (document.hidden && renderFrame) {
        cancelAnimationFrame(renderFrame);
        renderFrame = 0;
    } else if (!document.hidden) {
        scheduleRender();
    }
});

setTimeout(() => {

    $("boot").classList.add("hidden");

}, reducedMotion ? 100 : 2000);

console.log("KUNAL BUILDS V3 initialized.");
