
(() => {

    "use strict";

    // Sharp professional arrow icon.

    const arrowSVG = `

        <svg

            class="kb-arrow-icon"

            viewBox="0 0 24 24"

            fill="none"

            stroke="currentColor"

            stroke-width="2.7"

            stroke-linecap="round"

            stroke-linejoin="round"

            aria-hidden="true"

        >

            <path d="M5 19L19 5"/>

            <path d="M7 5h12v12"/>

        </svg>

    `;

    // Perfectly centered close icon.

    const closeSVG = `

        <svg

            class="kb-close-icon"

            viewBox="0 0 24 24"

            fill="none"

            stroke="currentColor"

            stroke-width="2"

            stroke-linecap="round"

            aria-hidden="true"

        >

            <path d="M6 6L18 18"/>

            <path d="M18 6L6 18"/>

        </svg>

    `;

    function updateCloseButtons() {

        document.querySelectorAll(

            "#close, #kbArchiveClose"

        ).forEach(button => {

            if (button.querySelector(".kb-close-icon")) {
                return;
            }

            button.innerHTML = closeSVG;

            button.setAttribute(
                "aria-label",
                "Close"
            );

        });

    }

    function updateArrow(link) {

        if (!link) return;

        if (link.querySelector(".kb-arrow-icon")) {
            return;
        }

        const label = link.textContent

            .replace(/[\u2197\u2192\u279A\u27A4]/g, "")

            .trim();

        if (!label) return;

        const text = document.createElement("span");

        text.textContent = label;

        link.replaceChildren(text);

        link.insertAdjacentHTML(

            "beforeend",

            arrowSVG

        );

    }

    function updateControls() {

        updateCloseButtons();

        updateArrow(

            document.getElementById("detailLink")

        );

        document.querySelectorAll(

            ".kb-project-links a"

        ).forEach(updateArrow);

    }

    let scheduled = false;

    function scheduleUpdate() {

        if (scheduled) return;

        scheduled = true;

        requestAnimationFrame(() => {

            scheduled = false;

            updateControls();

        });

    }

    // Apply to existing and newly generated projects.

    const observer = new MutationObserver(

        scheduleUpdate

    );

    observer.observe(document.body, {

        subtree: true,

        childList: true,

        characterData: true

    });

    updateControls();

    console.log(

        "KUNAL BUILDS: Premium controls loaded."

    );

})();
