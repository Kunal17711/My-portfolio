
(() => {

    "use strict";

    const screen = document.getElementById("screen");
    const audio = document.getElementById("audio");

    if (!screen || !audio) return;

    if (document.getElementById("kbMusicDock")) return;

    const noteIcon = `

        <svg viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="1.7"
             stroke-linecap="round"
             stroke-linejoin="round"
             aria-hidden="true">

            <path d="M9 18V5l12-2v13"/>
            <path d="M9 9l12-2"/>
            <ellipse cx="6" cy="18" rx="3" ry="2.5"/>
            <ellipse cx="18" cy="16" rx="3" ry="2.5"/>

        </svg>

    `;

    const dock = document.createElement("div");

    dock.id = "kbMusicDock";

    dock.innerHTML = `

        <div id="kbMusicInvite">

            <div class="kb-music-symbol">
                ${noteIcon}
            </div>

            <p class="kb-music-question">

                Would you like to listen to my favourite
                music while exploring my work?

            </p>

            <div class="kb-invitation-actions">

                <button id="kbMusicAccept" type="button">
                    Play music
                </button>

                <button id="kbMusicDecline" type="button">
                    Maybe later
                </button>

            </div>

            <div id="kbMusicMessage"
                 role="status"
                 hidden></div>

        </div>

        <button id="kbMusicIcon"
                type="button"
                aria-label="Play music"
                aria-pressed="false"
                hidden>

            ${noteIcon}

        </button>

    `;

    screen.appendChild(dock);

    const invite = dock.querySelector("#kbMusicInvite");
    const icon = dock.querySelector("#kbMusicIcon");
    const accept = dock.querySelector("#kbMusicAccept");
    const decline = dock.querySelector("#kbMusicDecline");
    const message = dock.querySelector("#kbMusicMessage");

    audio.loop = true;

    // Soft background music volume

    audio.volume = 0.30;

    let invitationShown = false;

    let revealTimer = null;

    let busy = false;

    function syncIcon() {

        const playing = !audio.paused;

        icon.classList.toggle("playing", playing);

        const label = playing
            ? "Pause music"
            : "Play music";

        icon.title = label;

        icon.setAttribute("aria-label", label);

        icon.setAttribute(
            "aria-pressed",
            String(playing)
        );

        // Synchronize the original music system.

        if (typeof musicPlaying !== "undefined") {

            musicPlaying = playing;

        }

        if (typeof updateMusicButton === "function") {

            updateMusicButton();

        }

    }

    function collapseInvitation() {

        invite.classList.add("closing");

        setTimeout(() => {

            invite.hidden = true;

            icon.hidden = false;

            syncIcon();

        }, 350);

    }

    async function startMusic() {

        if (busy) return false;

        busy = true;

        try {

            // Avoid playing two audio tracks together.

            const video = document.getElementById(
                "kbPortfolioVideo"
            );

            if (video) {

                video.muted = true;

            }

            await audio.play();

            syncIcon();

            return true;

        } catch (error) {

            console.warn("Music playback failed:", error);

            message.hidden = false;

            message.textContent =
                "Music is unavailable. Please try again.";

            return false;

        } finally {

            busy = false;

        }

    }

    accept.addEventListener("click", async () => {

        const success = await startMusic();

        if (success) {

            collapseInvitation();

        }

    });

    decline.addEventListener("click", () => {

        collapseInvitation();

    });

    icon.addEventListener("click", async () => {

        if (audio.paused) {

            await startMusic();

        } else {

            audio.pause();

        }

        syncIcon();

    });

    audio.addEventListener("play", syncIcon);

    audio.addEventListener("pause", syncIcon);

    audio.addEventListener("ended", syncIcon);
    audio.addEventListener("volumechange", () => {
        const volume = document.getElementById("volume");
        const value = document.getElementById("volumeValue");
        if (volume) volume.value = String(Math.round(audio.volume * 100));
        if (value) value.textContent = Math.round(audio.volume * 100) + "%";
    });

    // Reveal invitation only after the intro paragraph.

    function revealMusicInvitation() {

        if (invitationShown) return;

        if (screen.classList.contains("kb-intro-running")) {
            return;
        }

        clearTimeout(revealTimer);

        revealTimer = setTimeout(() => {

            if (
                screen.classList.contains("kb-intro-running") ||
                screen.classList.contains("off")
            ) return;

            invitationShown = true;

            dock.classList.add("ready");

        }, 1400);

    }

    const observer = new MutationObserver(
        revealMusicInvitation
    );

    observer.observe(screen, {

        attributes: true,
        attributeFilter: ["class"]

    });

    revealMusicInvitation();

    syncIcon();

    console.log(
        "KUNAL BUILDS: Music invitation ready."
    );

})();
