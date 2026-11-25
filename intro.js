(() => {

    "use strict";

    const screen = document.getElementById("screen");

    if (!screen) return;

    screen.classList.add("kb-intro-running");

    const reducedMotion = matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Minimal introduction

    const message = [
        "Hi, I am Kunal.",
        "Also known as Kunal Builds.",
        "",
        "I build digital products, explore technology and turn curiosity into creation.",
        "",
        "Welcome to my portfolio."
    ].join("\n");

    const intro = document.getElementById('kbIntroScreen');
    const content = intro.querySelector('.kb-intro-content');
    const text = document.getElementById('kbIntroText');
    const textNode = text.firstChild;
    const transition = document.getElementById('kbTransition');
    let index = textNode.length;
    let timer;
    let finished = false;
    let audioContext = null;

    // Mechanical keyboard sound

    async function enableAudio() {

        if (finished) return;
     if (audioContext) {
         await audioContext.resume().catch(() => {});
         return;
     }

        try {

            const AudioClass =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioClass) return;

            audioContext = new AudioClass();

            await audioContext.resume();

        } catch (error) {

            console.log("Audio unavailable");

        }

    }

    intro.addEventListener("pointerdown", enableAudio);
     intro.addEventListener("click", enableAudio);
     document.addEventListener("keydown", enableAudio);

    function keySound() {

        if (
            !audioContext ||
            audioContext.state !== "running"
        ) return;

        const duration = 0.035;

        const samples = Math.floor(
            audioContext.sampleRate * duration
        );

        const buffer = audioContext.createBuffer(
            1,
            samples,
            audioContext.sampleRate
        );

        const data = buffer.getChannelData(0);

        for (let i = 0; i < samples; i++) {

            data[i] =
                (Math.random() * 2 - 1) *
                Math.exp(-i / (samples * 0.12));

        }

        const source =
            audioContext.createBufferSource();

        source.buffer = buffer;

        const filter =
            audioContext.createBiquadFilter();

        filter.type = "bandpass";

        filter.frequency.value =
            1300 + Math.random() * 900;

        filter.Q.value = 0.85;

        const gain = audioContext.createGain();

        gain.gain.value =
            0.06 + Math.random() * 0.025;

        source.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);

        source.start();

    }

    // Smooth cinematic transition

    async function finishIntroduction() {

        if (finished) return;

        finished = true;

        clearTimeout(timer);

        document.removeEventListener(
            "keydown", skipIntro, true
        );

        if (audioContext) {

            audioContext.close().catch(() => {});

        }

        // A fast Escape must not reveal an unstyled or uninitialized canvas.
        try { await window.KB_SITE_READY; }
        catch { textNode.data='Portfolio resources could not load. Please refresh to try again.'; return; }
        document.removeEventListener('keydown', enableAudio);
        intro.classList.add("kb-intro-exit");

        if (!reducedMotion) {

            transition.classList.add("running");

        }

        setTimeout(() => {

            screen.classList.remove(
                "kb-intro-running"
            );

            screen.classList.add(
                "kb-portfolio-reveal"
            );

            intro.remove();

            setTimeout(() => {

                transition.remove();

                screen.classList.remove(
                    "kb-portfolio-reveal"
                );

            }, 1500);

        }, reducedMotion ? 0 : 450);

    }

    function skipIntro(event) {

        if (event.key === "Escape") {

            event.preventDefault();
            event.stopImmediatePropagation();

            finishIntroduction();

        }

    }

    document.addEventListener(
        "keydown", skipIntro, true
    );

    // CHARACTER BY CHARACTER TYPING

    function typeCharacter() {

        if (finished) return;

        if (index >= message.length) {

            timer = setTimeout(
                finishIntroduction,
                1800
            );

            return;

        }

        const character = message[index];

        textNode.appendData(character);

        index++;

        // Individual keyboard click

        if (character.trim()) {

            keySound();

        }

        // Natural human typing rhythm

        let delay = 28 + Math.random() * 22;

        if (character === " ") {

            delay = 45;

        }

        if (character === ",") {

            delay = 170;

        }

        if (character === ".") {

            delay = 300;

        }

        if (character === "\n") {

            delay = 350;

        }

        timer = setTimeout(
            typeCharacter,
            delay
        );

    }

    async function start() {

        try {

            await Promise.race([

                document.fonts.load('24px "VT323"'),

                new Promise(resolve =>
                    setTimeout(resolve,1000)
                )

            ]);

        } catch {}

        if (finished) return;
        const measure = text.cloneNode(false);
        measure.removeAttribute('id');
        measure.style.cssText = getComputedStyle(text).cssText;
        for (const key of ['font','lineHeight','letterSpacing','whiteSpace','overflowWrap']) measure.style[key]=getComputedStyle(text)[key];
        measure.style.margin='0';measure.textContent=message;content.appendChild(measure);
        text.style.minHeight=measure.getBoundingClientRect().height+'px';measure.remove();

        if (reducedMotion) {

            textNode.data = message;

            timer = setTimeout(
                finishIntroduction,
                5000
            );

        } else {

            timer = setTimeout(
                typeCharacter,
                45
            );

        }

    }

    start();

    console.log("KUNAL BUILDS V6: Luxury intro ready");

})();
