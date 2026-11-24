
(() => {

    "use strict";

    let installed = false;

    function install() {

        if (installed) return;

        const pages = document.getElementById(
            "kbInternalPages"
        );

        const scroller = document.getElementById(
            "ipScroller"
        );

        const content = document.getElementById(
            "ipZoomContent"
        );

        const originalBack = document.getElementById(
            "ipBack"
        );

        if (
            !pages ||
            !scroller ||
            !content ||
            !originalBack
        ) return;

        installed = true;

        // Floating circular back button

        const back = document.createElement("button");

        back.id = "kbPageBackCircle";

        back.type = "button";

        back.title = "Return to portfolio";

        back.setAttribute(
            "aria-label",
            "Return to portfolio"
        );

        back.innerHTML = `

            <svg viewBox="0 0 24 24"
                 aria-hidden="true">

                <path d="M20 12H4"/>

                <path d="M11 5l-7 7 7 7"/>

            </svg>

        `;

        pages.appendChild(back);

        let closing = false;

        back.addEventListener("click",event => {

            event.stopPropagation();

            if (closing) return;

            closing = true;

            pages.classList.add("kb-page-exit");

            const reducedMotion = matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            setTimeout(() => {

                originalBack.click();

                pages.classList.remove(
                    "kb-page-exit"
                );

                closing = false;

            }, reducedMotion ? 0 : 550);

        });

        // Temporary center zoom indicator

        const toast = document.createElement("div");

        toast.id = "kbPageZoomToast";

        toast.setAttribute("aria-live","polite");

        pages.appendChild(toast);

        let toastTimer;

        function getZoom() {

            return parseFloat(
                content.style.zoom
            ) || 1;

        }

        function showZoom() {

            clearTimeout(toastTimer);

            toast.textContent =

                Math.round(getZoom() * 100) + "%";

            toast.classList.add("visible");

            toastTimer = setTimeout(() => {

                toast.classList.remove("visible");

            }, 600);

        }

        // Zoom using existing page zoom logic.

        function zoomAtCenter(direction) {

            const oldZoom = getZoom();

            const centerX =

                scroller.scrollLeft +

                scroller.clientWidth / 2;

            const centerY =

                scroller.scrollTop +

                scroller.clientHeight / 2;

            const button = document.getElementById(

                direction > 0

                    ? "ipZoomIn"

                    : "ipZoomOut"

            );

            button?.click();

            const newZoom = getZoom();

            const ratio = newZoom / oldZoom;

            scroller.scrollLeft =

                centerX * ratio -

                scroller.clientWidth / 2;

            scroller.scrollTop =

                centerY * ratio -

                scroller.clientHeight / 2;

            showZoom();

        }

        // CTRL + wheel zoom

        let wheelAccumulator = 0;

        scroller.addEventListener("wheel",event => {

            if (
                !event.ctrlKey &&
                !event.metaKey
            ) return;

            event.preventDefault();

            event.stopImmediatePropagation();

            wheelAccumulator += event.deltaY;

            if (Math.abs(wheelAccumulator) < 35) {

                return;

            }

            zoomAtCenter(

                wheelAccumulator < 0 ? 1 : -1

            );

            wheelAccumulator = 0;

        }, {

            passive: false,

            capture: true

        });

        // Desktop grab and drag scrolling

        let dragging = false;

        let moved = false;

        let blockClickUntil = 0;

        let pointerId = null;

        let startX = 0;

        let startY = 0;

        let startLeft = 0;

        let startTop = 0;

        scroller.addEventListener(
            "pointerdown",
            event => {

                if (
                    event.pointerType !== "mouse" ||
                    event.button !== 0
                ) return;

                if (

                    event.target.closest(

                        "a,button,input,textarea,select,label,summary"

                    )

                ) return;

                dragging = true;

                moved = false;

                pointerId = event.pointerId;

                startX = event.clientX;

                startY = event.clientY;

                startLeft = scroller.scrollLeft;

                startTop = scroller.scrollTop;

            }

        );

        scroller.addEventListener(
            "pointermove",
            event => {

                if (
                    !dragging ||
                    event.pointerId !== pointerId
                ) return;

                const dx = event.clientX - startX;

                const dy = event.clientY - startY;

                if (

                    !moved &&

                    Math.hypot(dx,dy) < 5

                ) return;

                if (!moved) {

                    moved = true;

                    scroller.classList.add(
                        "kb-page-dragging"
                    );

                    scroller.setPointerCapture(
                        event.pointerId
                    );

                }

                scroller.scrollLeft =
                    startLeft - dx;

                scroller.scrollTop =
                    startTop - dy;

                event.preventDefault();

            }

        );

        function endDrag() {

            if (moved) {

                blockClickUntil =
                    performance.now() + 250;

            }

            dragging = false;

            moved = false;

            if (

                pointerId !== null &&

                scroller.hasPointerCapture(pointerId)

            ) {

                scroller.releasePointerCapture(
                    pointerId
                );

            }

            pointerId = null;

            scroller.classList.remove(
                "kb-page-dragging"
            );

        }

        window.addEventListener(
            "pointerup",
            endDrag
        );

        scroller.addEventListener(
            "pointercancel",
            endDrag
        );

        scroller.addEventListener(
            "lostpointercapture",
            endDrag
        );

        scroller.addEventListener(
            "dragstart",
            event => event.preventDefault()
        );

        scroller.addEventListener(
            "click",
            event => {

                if (
                    performance.now() < blockClickUntil
                ) {

                    event.preventDefault();

                    event.stopImmediatePropagation();

                }

            },

            true

        );

        // Pinch zoom on mobile

        let pinchDistance = 0;

        function distance(touches) {

            return Math.hypot(

                touches[0].clientX -

                touches[1].clientX,

                touches[0].clientY -

                touches[1].clientY

            );

        }

        scroller.addEventListener(
            "touchstart",
            event => {

                if (event.touches.length === 2) {

                    pinchDistance =
                        distance(event.touches);

                }

            },

            {passive:true}

        );

        scroller.addEventListener(
            "touchmove",
            event => {

                if (

                    event.touches.length !== 2 ||

                    !pinchDistance

                ) return;

                event.preventDefault();

                event.stopPropagation();

                const current =
                    distance(event.touches);

                const difference =
                    current - pinchDistance;

                if (Math.abs(difference) > 28) {

                    zoomAtCenter(

                        difference > 0 ? 1 : -1

                    );

                    pinchDistance = current;

                }

            },

            {passive:false}

        );

        scroller.addEventListener(
            "touchend",
            () => {

                pinchDistance = 0;

            }
        );

        // Always open pages from their beginning.

        new MutationObserver(() => {

            if (!pages.hidden) {

                scroller.scrollTop = 0;

                scroller.scrollLeft = 0;

                document.getElementById(
                    "ipZoomReset"
                )?.click();

                back.focus({
                    preventScroll:true
                });

            } else {

                toast.classList.remove("visible");

                endDrag();

            }

        }).observe(pages, {

            attributes:true,

            attributeFilter:["hidden"]

        });

        console.log(
            "KUNAL BUILDS: Immersive pages ready."
        );

    }

    // Existing pages are loaded asynchronously.

    const observer = new MutationObserver(() => {

        install();

        if (installed) observer.disconnect();

    });

    observer.observe(document.body, {

        childList:true,

        subtree:true

    });

    install();

    if (installed) observer.disconnect();

})();
