(() => {

    "use strict";

    const world = document.getElementById("world");
    const screen = document.getElementById("screen");

    if (!world || !screen) return;

    if (document.getElementById("kbVideoTile")) return;

    // Move existing projects around the center video.

    const positions = {

        "ORBIT": [-390, 10],

        "HORYZON": [390, -245],

        "HIRASHA AI": [-390, -350],

        "GUPSHUP": [390, 245],

        "VERICRAFT": [-390, 370],

        "STRIDE": [0, -370],

        "CAPTION STUDIO": [0, 370],

        "THE LAB": [820, 0]

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

    // Center video

    const tile = document.createElement("div");

    tile.id = "kbVideoTile";

    tile.innerHTML = `

        <div class="kb-video-frame">

            <video
                id="kbPortfolioVideo"
                src="assets/video/kunal-intro.mp4"
                poster="assets/video/kunal-intro-poster.webp"
                muted
                loop
                playsinline
                preload="none"
                disablepictureinpicture
                disableremoteplayback
                draggable="false"
                aria-label="Kunal Builds introduction video">
            </video>

            <div id="kbVideoError" hidden>
                Video unavailable
            </div>

            <button
                id="kbVideoSound"
                type="button"
                aria-label="Unmute video"
                aria-pressed="false"
                title="Unmute video">
            </button>

        </div>

    `;

    world.appendChild(tile);

    const video = document.getElementById(
        "kbPortfolioVideo"
    );

    const button = document.getElementById(
        "kbVideoSound"
    );

    const music = document.getElementById("audio");

    let resumeMusic = false;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;

    video.volume = 0.75;

    const muteIcon = `

        <svg viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="1.6"
             stroke-linecap="round"
             stroke-linejoin="round">

            <path d="M3 9h4l5-4v14l-5-4H3z"/>

            <path d="m16 9 6 6M22 9l-6 6"/>

        </svg>

    `;

    const soundIcon = `

        <svg viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="1.6"
             stroke-linecap="round"
             stroke-linejoin="round">

            <path d="M3 9h4l5-4v14l-5-4H3z"/>

            <path d="M16 9a4 4 0 0 1 0 6"/>

            <path d="M19 6a8 8 0 0 1 0 12"/>

        </svg>

    `;

    function updateSoundIcon() {

        button.innerHTML = video.muted
            ? muteIcon
            : soundIcon;

        const label = video.muted
            ? "Unmute video"
            : "Mute video";

        button.title = label;

        button.setAttribute("aria-label", label);

        button.setAttribute(
            "aria-pressed",
            String(!video.muted)
        );

    }

    updateSoundIcon();

    // Button taps still toggle sound; the canvas owns pointer tracking so a
    // second finger landing on this control cannot break a pinch gesture.

    button.addEventListener(
        "dblclick",
        event => event.stopPropagation()
    );

    // Mute and unmute

    button.addEventListener("click", async event => {

        event.stopPropagation();

        if (video.muted) {

            // Prevent background music and video audio
            // from playing over each other.

            resumeMusic = Boolean(
                music && !music.paused
            );

            if (resumeMusic) {

                music.pause();

            }

            video.muted = false;

            try {

                await video.play();

            } catch (error) {

                video.muted = true;

                if (resumeMusic && music) {

                    music.play().catch(() => {});

                    resumeMusic = false;

                }

                console.warn(error);

            }

        } else {

            video.muted = true;

            if (resumeMusic && music) {

                music.play().catch(() => {});

                resumeMusic = false;

            }

        }

        updateSoundIcon();

    });

    video.addEventListener(
        "volumechange",
        updateSoundIcon
    );

    video.addEventListener("error", () => {

        document.getElementById(
            "kbVideoError"
        ).hidden = false;

        button.hidden = true;

        console.error("Intro video failed to load.");

    });

    // Center camera on the introduction video.

    function centerCamera() {

        if (typeof target !== "undefined") {

            target.x = 0;

            target.y = 0;

            target.zoom = innerWidth < 700
                ? Math.min(.72, screen.clientWidth / 460)
                : .95;
            window.KB_SCHEDULE_RENDER?.();

        }

    }

    centerCamera();

    // Play only after introductory typing finishes.

    let videoVisible = true;

    function synchronizePlayback() {

        const hidden =

            screen.classList.contains(
                "kb-intro-running"
            ) ||

            screen.classList.contains("off") ||

            document.hidden || !videoVisible ||
            screen.classList.contains('kb-page-open') ||
            screen.classList.contains('kb-content-inactive') ||
            document.documentElement.classList.contains('kb-ai-active');

        if (hidden) {

            video.pause();

        } else {

            video.play().catch(error => {

                console.warn(
                    "Video playback:",
                    error.message
                );

            });

        }

    }

    let introductionRunning =
        screen.classList.contains("kb-intro-running");

    new MutationObserver(() => {

        const running =
            screen.classList.contains("kb-intro-running");

        if (introductionRunning && !running) {

            centerCamera();

        }

        introductionRunning = running;

        synchronizePlayback();

    }).observe(screen, {

        attributes: true,

        attributeFilter: ["class"]

    });

    document.addEventListener(
        "visibilitychange",
        synchronizePlayback
    );

    if ("IntersectionObserver" in window) {
        new IntersectionObserver(entries => {
            videoVisible = entries[0]?.isIntersecting ?? true;
            synchronizePlayback();
        }, {root: document.getElementById("viewport"), threshold: .05}).observe(tile);
    }

    synchronizePlayback();

    // Press R to return to center video.

    document.addEventListener("keydown", event => {

        if (document.documentElement.classList.contains('kb-ai-active')) return;

        if (

            event.key.toLowerCase() === "r" &&

            !document.querySelector("dialog[open]") &&

            !event.target.matches("input, textarea")

        ) {

            event.stopImmediatePropagation();

            centerCamera();

        }

    }, true);

    console.log("Kunal Builds center video ready.");

})();
