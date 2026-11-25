/* Canvas previews retain their layout while waiting for a real intersection.
   Never combine loading=lazy with display:none: that prevents the load itself. */
(() => {
    'use strict';
    const viewport = document.getElementById('viewport');
    if (!viewport) return;
    const asset = value => window.KB_ASSET?.(value) || value;
    const images = new Set();
    let zoom = innerWidth < 700 ? .68 : .95;
    function load(image) {
        const source = image.dataset.previewSource;
        if (!source || image.getAttribute('src')) return;
        const original = source.replace(/\.webp$/, '');
        const variants = [240,480,960].map(width => [`${original}.${width}.webp`,width])
            .filter(([name]) => window.KB_ASSETS?.[name]);
        if (variants.length) {
            image.srcset = [...variants.map(([name,width]) => `${asset(name)} ${width}w`),`${asset(source)} 1086w`].join(', ');
            image.sizes = `${Math.ceil(280 * zoom)}px`;
        }
        image.src = asset(source);
    }
    const observer = new IntersectionObserver(entries => {
        for (const {target:tile,isIntersecting} of entries) {
            tile.dataset.kbVisible = String(isIntersecting);
            if (isIntersecting) tile.querySelectorAll('img[data-preview-source]').forEach(load);
        }
    }, {root:viewport,rootMargin:'120px'});
    window.KB_PREVIEW = (image,source,tile) => {
        image.dataset.previewSource = source.startsWith('/') ? source : '/assets/images/'+source;
        image.decoding = 'async'; image.draggable = false;
        image.width = tile.classList.contains('universe-tile') ? 480 : 1086;
        image.height = tile.classList.contains('universe-tile') ? 300 : 1448;
        images.add(image);observer.observe(tile);
    };
    window.KB_UPDATE_CANVAS_IMAGES = value => {
        if (Math.abs(value-zoom) < .12) return;
        zoom = value;
        for (const image of images) if (image.srcset) image.sizes = `${Math.ceil(280*zoom)}px`;
    };
})();
