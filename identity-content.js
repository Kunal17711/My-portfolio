(() => {

    "use strict";

    const data = window.KB_IDENTITY_DATA || {};

    const projects = data.projects || [];
    const stats = data.stats || {};

    const esc = value => String(value ?? "")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#39;");

    const arrow = `
        <svg class="kbi-arrow"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2.6"
             stroke-linecap="round"
             stroke-linejoin="round"
             aria-hidden="true">
            <path d="M5 19L19 5M7 5h12v12"/>
        </svg>`;

    const back = `
        <svg viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2.2"
             stroke-linecap="round"
             stroke-linejoin="round"
             aria-hidden="true">
            <path d="M20 12H4M11 5l-7 7 7 7"/>
        </svg>`;

    const profiles = [

        ["Instagram",
         "https://instagram.com/iiblamekunal"],

        ["LinkedIn",
         "https://www.linkedin.com/in/kunalldev"],

        ["X",
         "https://x.com/kunallbuilds"],

        ["GitHub",
         "https://github.com/Kunal17711"],

        ["Fiverr",
         "https://www.fiverr.com/s/yv3DB6z"],

        ["Upwork",
         "https://www.upwork.com/freelancers/~01bb3c4a0ecb285252?mp_source=share"]

    ];

    const faq = [

        [
            "Who is Kunal Builds?",
            "Kunal Builds is the developer identity of Kunal, an independent web and app developer from Haryana, India. His work includes websites, mobile applications, dashboards, UI/UX interfaces and digital products."
        ],

        [
            "What does Kunal Builds do?",
            "Kunal develops responsive websites, landing pages, product interfaces, mobile applications, dashboards, website redesigns and startup MVPs."
        ],

        [
            "Where is Kunal Builds based?",
            "Kunal Builds is based in Haryana, India, with a digital-first approach to remote development and design work."
        ],

        [
            "What technologies does Kunal use?",
            "His technology stack includes React, Next.js, TypeScript, Tailwind CSS, React Native, Expo, Supabase, Firebase, Vercel and AI-assisted development workflows."
        ],

        [
            "Does Kunal Builds use AI?",
            "Yes. AI-assisted workflows support ideation, interface exploration, development and refinement. Implementation, product decisions and testing remain essential parts of the development process."
        ],

        [
            "What is Aldren Row?",
            "Aldren Row is a clothing brand founded by Kunal, where he also serves as HOD."
        ],

        [
            "Can I explore projects by Kunal Builds?",
            "Yes. The project archive contains website previews, project descriptions, live project links and available case studies."
        ],

        [
            "Does Kunal Builds work on startup MVPs?",
            "Startup MVP development is one of the services offered. Features, design, backend integrations and deployment requirements are defined according to the project scope."
        ],

        [
            "How can I contact Kunal Builds?",
            "Project enquiries can be sent to kkunaall10@gmail.com or through the listed professional social profiles."
        ]

    ];

    const builds = [

        ["Websites",
         "Responsive portfolio, business, product and personal-brand websites."],

        ["Landing pages",
         "Focused launch experiences with clear messaging and purposeful calls to action."],

        ["Dashboards",
         "Organized admin interfaces, data presentation and practical operational workflows."],

        ["Mobile applications",
         "Mobile-first products, application interfaces, prototypes and backend-connected workflows."],

        ["UI/UX design",
         "Consistent visual systems, usable interfaces and clearly structured user journeys."],

        ["Product websites",
         "Digital experiences that communicate product value and explain functionality."],

        ["Startup MVPs",
         "Focused first versions of product ideas, including frontend and backend integration."],

        ["Website redesigns",
         "Modernized interfaces with improved hierarchy, responsiveness and usability."],

        ["AI-assisted concepts",
         "Digital product ideas developed through AI-assisted exploration and practical implementation."]

    ];

    const technologies = [

        ...new Set([

            ...(stats.technologies || []),

            "Vercel",
            "API Integration",
            "UI/UX Design",
            "Responsive Design",
            "Technical SEO"

        ])

    ];

    const format = number =>
        Number.isFinite(Number(number))
            ? Number(number).toLocaleString("en-US")
            : "Unavailable";

    function link(label,href,cls = "kbi-link",external = false) {

        return `
            <a class="${cls}"
               href="${esc(href)}"
               ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
                ${esc(label)} ${arrow}
            </a>`;

    }

    function section(title,content) {

        return `
            <section class="kbi-section">

                <h2>${esc(title)}</h2>

                <div class="kbi-section-body">

                    ${content}

                </div>

            </section>`;

    }

    function renderProjects() {

        return projects.map(project => `

            <article class="kbi-project"
                     data-search="${esc(
                         project.name + " " +
                         project.category + " " +
                         project.description
                     )}">

                ${project.image ? `
                    <img src="${esc(project.thumbnail || project.image)}"
                         ${project.thumbnail && project.thumbnail !== project.image ? `srcset="${esc(project.thumbnail)} 480w, ${esc(project.image)} 1440w" sizes="(max-width:700px) 88vw, 30vw"` : ""}
                         alt="${esc(project.name)} project preview by Kunal Builds"
                         loading="lazy"
                         decoding="async"
                         width="480" height="300"
                         draggable="false">
                ` : `
                    <div class="kbi-no-preview">
                        ${esc(project.name)}
                    </div>
                `}

                <div class="kbi-project-info">

                    <span class="kbi-project-category">
                        ${esc(project.category)}
                    </span>

                    <h3>${esc(project.name)}</h3>

                    ${project.description ? `
                        <p>${esc(project.description)}</p>
                    ` : ""}

                    <div class="kbi-project-actions">

                        ${project.website
                            ? link(
                                "Visit website",
                                project.website,
                                "kbi-link",
                                true
                            )
                            : ""}

                        ${project.casePath
                            ? link(
                                "Case study",
                                project.casePath
                            )
                            : ""}

                    </div>

                </div>

            </article>

        `).join("");

    }

    function render() {

        const metrics = [

            [format(stats.totalRepositories),"Repositories"],

            [format(stats.totalLinesOfCode),
             "Non-empty source lines"],

            [format(stats.totalSourceFiles),"Source files"],

            [format(stats.technologyCount),"Detected technologies"]

        ];

        return `

        <article class="kbi-document">

            <section class="kbi-hero">

                <div>

                    <span class="kbi-location">
                        Haryana, India
                    </span>

                    <h1>Who is Kunal Builds?</h1>

                    <p class="kbi-lead">

                        Kunal Builds is the developer identity
                        of Kunal, an independent web and app
                        developer from Haryana, India.

                        His work spans websites, mobile apps,
                        dashboards, UI/UX interfaces, artificial
                        intelligence projects and digital products.

                    </p>

                    <div class="kbi-actions">

                        ${link("View portfolio","/","kbi-button")}

                        ${link("View projects","/#projects","kbi-secondary")}

                        ${link("Contact",
                            "mailto:kkunaall10@gmail.com",
                            "kbi-secondary")}

                    </div>

                </div>

                ${data.profileImage ? `
                    <img class="kbi-profile"
                         src="${esc(data.profileImage)}"
                         alt="Kunal, independent developer and founder of Kunal Builds"
                         decoding="async">
                ` : ""}

            </section>

            <div class="kbi-stats">

                ${metrics.map(([number,label]) => `

                    <div class="kbi-stat">

                        <strong>${esc(number)}</strong>

                        <span>${esc(label)}</span>

                    </div>

                `).join("")}

            </div>

            <p class="kbi-stat-note">

                Statistics are based on the repository audit
                and represent tracked source files and non-empty
                source lines, including comments and reused code.

            </p>

            ${section("Quick answer",`

                <p>

                    Kunal Builds is an independent developer
                    identity focused on creating clean, fast
                    and practical digital experiences.

                    Kunal combines product thinking, interface
                    design, software development and AI-assisted
                    workflows to turn ideas into working products.

                </p>

            `)}

            ${section("Developer identity",`

                <dl class="kbi-identity-table">

                    <dt>Primary identity</dt>
                    <dd>Kunal Builds</dd>

                    <dt>Name</dt>
                    <dd>Kunal</dd>

                    <dt>Also known as</dt>
                    <dd>Kunal Dev, Kunal Developer, Kunal17711</dd>

                    <dt>Role</dt>
                    <dd>Web and App Developer</dd>

                    <dt>Brand</dt>
                    <dd>Aldren Row, Founder and HOD</dd>

                    <dt>Based in</dt>
                    <dd>Haryana, India</dd>

                    <dt>Expertise</dt>
                    <dd>Web development, mobile applications,
                        UI/UX, software products and MVP development</dd>

                </dl>

            `)}

            ${section("About Kunal",`

                <p>

                    Kunal works under the identity Kunal Builds,
                    developing digital products for creators,
                    businesses, students and early-stage ideas.

                </p>

                <p>

                    His development approach focuses on responsive
                    layouts, clear visual hierarchy, backend flows,
                    deployment and maintainable implementations.

                    The objective is to create usable products,
                    not just static visual concepts.

                </p>

                <div class="kbi-actions">

                    ${link("About Kunal Builds","/#about")}

                    ${link("Explore services","/services/")}

                </div>

            `)}

            ${section("What Kunal builds",`

                <div class="kbi-build-grid">

                    ${builds.map(([title,text]) => `

                        <div class="kbi-build">

                            <h3>${esc(title)}</h3>

                            <p>${esc(text)}</p>

                        </div>

                    `).join("")}

                </div>

            `)}

            ${section("AI-assisted development",`

                <p>

                    Kunal uses AI-assisted tools for ideation,
                    product exploration, interface refinement,
                    copy improvement and development workflows.

                </p>

                <p>

                    AI acts as a supporting layer rather than
                    replacing product judgement, implementation,
                    testing or responsible deployment.

                </p>

            `)}

            ${section("Skills and technologies",`

                <div class="kbi-tags">

                    ${technologies.map(tech => `

                        <span>${esc(tech)}</span>

                    `).join("")}

                </div>

                <div class="kbi-actions">

                    ${link("Website development",
                        "/services/website-development/")}

                    ${link("Mobile app development",
                        "/services/mobile-app-development/")}

                    ${link("Startup MVP development",
                        "/services/startup-mvp-development/")}

                </div>

            `)}

            <section class="kbi-project-section">

                <h2>Projects by Kunal Builds.</h2>

                <p>

                    Explore ${projects.length} portfolio entries
                    covering websites, mobile applications,
                    developer tools, creative interfaces
                    and digital product experiments.

                </p>

                <div class="kbi-search-wrap">

                    <svg viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         stroke-width="1.7"
                         aria-hidden="true">
                        <circle cx="10.5" cy="10.5" r="6.5"/>
                        <path d="m16 16 5 5"/>
                    </svg>

                    <input class="kbi-search"
                           type="search"
                           placeholder="Search projects..."
                           aria-label="Search portfolio projects">

                    <span class="kbi-result-count">
                        ${projects.length} projects
                    </span>

                </div>

                <div class="kbi-project-grid">

                    ${renderProjects()}

                </div>

                <p class="kbi-empty" hidden>

                    No matching projects found.

                </p>

            </section>

            ${section("Professional profiles",`

                <div class="kbi-social-grid">

                    ${profiles.map(([name,url]) =>
                        link(name,url,"kbi-social",true)
                    ).join("")}

                </div>

            `)}

            ${section("Related pages",`

                <div class="kbi-related">

                    ${link("About Kunal Builds","/#about")}

                    ${link("Project archive","/#projects")}

                    ${link("Development services","/services/")}

                    ${link("Website development",
                        "/services/website-development/")}

                    ${link("Mobile app development",
                        "/services/mobile-app-development/")}

                    ${link("UI/UX design",
                        "/services/ui-ux-design/")}

                    ${link("Contact Kunal Builds",
                        "mailto:kkunaall10@gmail.com")}

                </div>

            `)}

            ${section("Frequently asked questions",`

                ${faq.map(([question,answer]) => `

                    <details class="kbi-faq">

                        <summary>

                            ${esc(question)}

                            <span class="kbi-plus"
                                  aria-hidden="true"></span>

                        </summary>

                        <p>${esc(answer)}</p>

                    </details>

                `).join("")}

            `)}

            <section class="kbi-contact">

                <h2>Work with Kunal Builds.</h2>

                <p>

                    Have a website, application, dashboard
                    or digital product in mind?

                    Share your idea, target audience, required
                    features and design references to begin
                    defining the project scope.

                </p>

                <a class="kbi-email"
                   href="mailto:kkunaall10@gmail.com">

                    kkunaall10@gmail.com

                </a>

                <div class="kbi-actions">

                    ${link("Contact Kunal Builds",
                        "mailto:kkunaall10@gmail.com",
                        "kbi-button")}

                    ${link("View services",
                        "/services/",
                        "kbi-secondary")}

                </div>

            </section>

            <footer class="kbi-footer">

                <span>KUNAL BUILDS</span>

                <span>Haryana, India</span>

            </footer>

        </article>`;

    }

    window.KB_IDENTITY_RENDER = {

        render,
        back,
        profiles,
        faq

    };

})();
