
(() => {

    "use strict";

    const arrow = `

        <svg viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2.6"
             stroke-linecap="round"
             stroke-linejoin="round"
             aria-hidden="true">

            <path d="M5 19L19 5M7 5h12v12"/>

        </svg>

    `;

    function makeLink(label, href, secondary = false) {

        const link = document.createElement("a");

        link.className = "kb-case-button";

        if (secondary) {

            link.classList.add("kb-case-secondary");

        }

        link.href = href;

        link.textContent = label;

        link.insertAdjacentHTML("beforeend", arrow);

        if (href.startsWith("https://")) {

            link.target = "_blank";

            link.rel = "noopener noreferrer";

        }

        return link;

    }

    function polishDocument(reader) {

        if (reader.dataset.editorialReady === "1") return;

        const title = reader.querySelector("h1");

        if (!title) return;

        const name = title.textContent.trim()

            .replace(/\s+by Kunal Builds$/i, "");

        reader.dataset.editorialReady = "1";

        title.textContent = name + " by Kunal Builds";

        // Remove repeated generic contact sections.
        // Keep the actual project documentation.

        reader.querySelectorAll(".kb-case-section")

            .forEach(section => {

                const heading = section.querySelector("h2");

                if (!heading) return;

                if (

                    /^work with kunal builds$/i.test(
                        heading.textContent.trim()
                    )

                ) {

                    section.remove();

                }

            });

        // Remove the old standalone contact button.

        [...reader.children].forEach(child => {

            if (

                child.matches("a.kb-case-button") &&

                /contact kunal builds/i.test(
                    child.textContent
                )

            ) {

                child.remove();

            }

        });

        // Create one premium crimson contact section.

        const card = document.createElement("section");

        card.className = "kb-case-contact";

        const heading = document.createElement("h2");

        heading.textContent = "Work with Kunal Builds";

        const description = document.createElement("p");

        description.textContent =

            `Interested in a project like ${name}? ` +

            "Share your idea, target users, required pages " +

            "or screens, and any design references.";

        const actions = document.createElement("div");

        actions.className = "kb-case-contact-actions";

        actions.append(

            makeLink(

                "Contact Kunal Builds",

                "mailto:kkunaall10@gmail.com"

            ),

            makeLink(

                "View services",

                "/services",

                true

            )

        );

        card.append(heading, description, actions);

        reader.appendChild(card);

    }

    let installed = false;

    function install() {

        if (installed) return;

        const pages = document.getElementById("kbInternalPages");

        const reader = document.getElementById("ipCasePage");

        if (!pages || !reader) return;

        installed = true;

        function synchronize() {

            const active = !reader.hidden && !pages.hidden;

            pages.classList.toggle("kb-case-active", active);

            if (active) polishDocument(reader);

        }

        new MutationObserver(records => {

            if (records.some(record =>

                record.type === "childList" &&

                [...record.removedNodes].some(node =>

                    node.nodeType === 1 &&

                    node.matches(".kb-case-contact")

                )

            )) {

                delete reader.dataset.editorialReady;

            }

            synchronize();

        }).observe(reader, {

            childList: true,

            attributes: true,

            attributeFilter: ["hidden"]

        });

        new MutationObserver(synchronize)

            .observe(pages, {

                attributes: true,

                attributeFilter: ["hidden"]

            });

        synchronize();

        console.log("Editorial case study UI ready.");

    }

    const observer = new MutationObserver(() => {

        install();

        if (installed) observer.disconnect();

    });

    observer.observe(document.body, {

        childList: true,

        subtree: true

    });

    install();

    if (installed) observer.disconnect();

    // Support standalone case study HTML pages.

    if (document.body.classList.contains("kb-standalone")) {

        const reader = document.querySelector(".kb-case-document");

        if (reader) polishDocument(reader);

    }

})();
