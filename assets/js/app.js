(() => {
    const config = window.AUTO_PARTS_CONFIG || {};
    const products = window.AUTO_PARTS_PRODUCTS || [];
    const categories = window.AUTO_PARTS_CATEGORIES || {};
    const cleanWhatsApp = String(config.whatsappNumber || "").replace(/\D/g, "");
    const whatsappBase = cleanWhatsApp ? `https://wa.me/${cleanWhatsApp}` : "#";

    window.decorateGoogleTranslate = function() {
        const widget = document.getElementById("google_translate_element");
        if (!widget) return;

        const addFlags = () => {
            const select = widget.querySelector("select.goog-te-combo");
            if (!select || ![...select.options].some(option => option.value === "en") || ![...select.options].some(option => option.value === "it")) return false;

            const labels = {en: "🇬🇧 English", it: "🇮🇹 Italiano"};
            Array.from(select.options).forEach(option => {
                if (labels[option.value]) option.textContent = labels[option.value];
            });
            select.setAttribute("aria-label", "Translate page language");
            return true;
        };

        if (addFlags()) return;
        const observer = new MutationObserver(() => {
            if (addFlags()) observer.disconnect();
        });
        observer.observe(widget, {childList: true, subtree: true});
    };

    const DICT = {
        fr: {
            home: "Accueil",
            shop: "Catalogue",
            categories: "Catégories",
            testimonials: "Témoignages",
            contact: "Contact",
            heroEyebrow: "Pièces automobiles • assistance directe",
            heroTitle: "La bonne pièce, au bon moment.",
            heroText: "Parcourez notre catalogue, consultez les prix en USD et confirmez la compatibilité avant de commander.",
            browseCatalog: "Voir le catalogue",
            requestPart: "Demander une pièce",
            compatibility: "Compatibilité vérifiée",
            clearPricing: "Prix visibles",
            browseSystem: "Explorer par système",
            popularCategories: "Catégories populaires",
            viewAll: "Voir tout",
            featured: "Sélection",
            popularParts: "Pièces à découvrir",
            shopAll: "Tout le catalogue",
            fastSupport: "Assistance rapide",
            notSure: "Vous ne trouvez pas la bonne référence ?",
            notSureText: "Indiquez la marque, le modèle, l'année et la pièce recherchée. Nous préparons le message puis poursuivons sur WhatsApp.",
            contactUs: "Nous contacter",
            simpleOrder: "Commande simple",
            noAccount: "Pas de compte, pas de panier imposé.",
            noAccountText: "Choisissez une pièce, consultez sa fiche et échangez avec le vendeur avant de confirmer.",
            customerStories: "Témoignages",
            customersSay: "Ce que disent nos clients",
            testimonialIntro: "Une sélection de témoignages présentés de façon simple pour mettre en avant la qualité du service et la réactivité.",
            catalogueClear: "Catalogue clair",
            catalogueClearText: "Photos, description, prix et caractéristiques au même endroit.",
            usdPrices: "Prix en USD",
            usdPricesText: "Les prix indicatifs restent visibles pendant la navigation.",
            directSupport: "Contact direct",
            directSupportText: "Passez du formulaire à WhatsApp sans ressaisir vos informations.",
            fitmentCheck: "Référence vérifiée",
            fitmentCheckText: "La compatibilité est confirmée avant la commande.",
            shopFooter: "Catalogue",
            helpFooter: "Assistance",
            companyFooter: "AutoParts",
            footerText: "Pièces automobiles, informations claires et assistance directe pour trouver la bonne référence.",
            allProducts: "Tous les produits",
            productCategories: "Catégories",
            productHelp: "Trouver une pièce",
            whatsapp: "WhatsApp",
            language: "Langue",
            rights: "Tous droits réservés.",
            footerTag: "Des pièces, des détails, un contact simple.",
            catalogKicker: "Catalogue AutoParts",
            catalogTitle: "Trouvez votre pièce.",
            catalogText: "Recherchez par nom ou filtrez par famille. Chaque fiche affiche une description détaillée et les informations utiles à la compatibilité.",
            searchPlaceholder: "Rechercher : alternateur, turbo, joint…",
            productsCount: "produits",
            noMatch: "Aucune pièce trouvée",
            noMatchText: "Essayez une autre recherche ou envoyez-nous votre demande.",
            backShop: "Retour au catalogue",
            priceLabel: "Prix indicatif",
            stockConfirm: "Disponibilité à confirmer",
            moq: "Quantité minimale",
            reference: "Référence",
            orderWhatsapp: "Continuer sur WhatsApp",
            continueShop: "Continuer mes recherches",
            description: "Description du produit",
            specifications: "Caractéristiques",
            related: "Produits similaires",
            condition: "État",
            fitment: "Compatibilité",
            origin: "Origine",
            warranty: "Garantie",
            mainImage: "Image principale",
            contactTitle: "Décrivez la pièce recherchée",
            contactText: "Remplissez les informations utiles. Le site prépare ensuite votre message et ouvre WhatsApp.",
            name: "Nom",
            phone: "Téléphone",
            city: "Ville",
            vehicle: "Véhicule / modèle",
            year: "Année",
            part: "Pièce recherchée",
            message: "Précisions",
            sendWhatsapp: "Continuer sur WhatsApp",
            cancel: "Annuler",
            namePlaceholder: "Votre nom",
            phonePlaceholder: "+237 6…",
            cityPlaceholder: "Douala, Yaoundé…",
            vehiclePlaceholder: "Ex. Toyota Prado",
            yearPlaceholder: "Ex. 2008",
            messagePlaceholder: "Référence OEM, côté gauche/droit, photo disponible…",
            selectPart: "Sélectionner une pièce",
            otherPart: "Autre pièce / référence non affichée",
            cardDetails: "Voir la fiche",
            askAvailability: "Demander",
            formRequired: "Veuillez renseigner au moins votre nom, votre téléphone et la pièce recherchée."
        },
        en: {
            home: "Home",
            shop: "Catalogue",
            categories: "Categories",
            testimonials: "Testimonials",
            contact: "Contact",
            heroEyebrow: "Automotive parts • direct support",
            heroTitle: "The right part, at the right time.",
            heroText: "Browse the catalogue, see USD prices and confirm compatibility before ordering.",
            browseCatalog: "Browse catalogue",
            requestPart: "Request a part",
            compatibility: "Fitment checked",
            clearPricing: "Visible prices",
            browseSystem: "Browse by system",
            popularCategories: "Popular categories",
            viewAll: "View all",
            featured: "Selection",
            popularParts: "Parts to discover",
            shopAll: "Full catalogue",
            fastSupport: "Fast support",
            notSure: "Can't find the right reference?",
            notSureText: "Tell us the make, model, year and required part. We prepare the message, then continue on WhatsApp.",
            contactUs: "Contact us",
            simpleOrder: "Simple ordering",
            noAccount: "No forced account or checkout.",
            noAccountText: "Choose a part, review its details and talk to the seller before confirming.",
            customerStories: "Testimonials",
            customersSay: "What our customers say",
            testimonialIntro: "A clean testimonial section that highlights service quality and responsiveness.",
            catalogueClear: "Clear catalogue",
            catalogueClearText: "Photos, descriptions, prices and specifications in one place.",
            usdPrices: "USD pricing",
            usdPricesText: "Indicative prices stay visible while browsing.",
            directSupport: "Direct contact",
            directSupportText: "Move from the form to WhatsApp without retyping your information.",
            fitmentCheck: "Reference checked",
            fitmentCheckText: "Compatibility is confirmed before the order.",
            shopFooter: "Catalogue",
            helpFooter: "Support",
            companyFooter: "AutoParts",
            footerText: "Automotive parts, clear information and direct support to identify the right reference.",
            allProducts: "All products",
            productCategories: "Categories",
            productHelp: "Find a part",
            whatsapp: "WhatsApp",
            language: "Language",
            rights: "All rights reserved.",
            footerTag: "Parts, details and simple contact.",
            catalogKicker: "AutoParts catalogue",
            catalogTitle: "Find your part.",
            catalogText: "Search by name or filter by family. Every product page includes detailed information for fitment checks.",
            searchPlaceholder: "Search: alternator, turbo, seal…",
            productsCount: "products",
            noMatch: "No matching parts",
            noMatchText: "Try another search or send us your request.",
            backShop: "Back to catalogue",
            priceLabel: "Indicative price",
            stockConfirm: "Availability to confirm",
            moq: "Minimum order",
            reference: "Reference",
            orderWhatsapp: "Continue on WhatsApp",
            continueShop: "Keep browsing",
            description: "Product description",
            specifications: "Specifications",
            related: "Related products",
            condition: "Condition",
            fitment: "Compatibility",
            origin: "Origin",
            warranty: "Warranty",
            mainImage: "Main image",
            contactTitle: "Tell us which part you need",
            contactText: "Fill in the useful details. The site then prepares your message and opens WhatsApp.",
            name: "Name",
            phone: "Phone",
            city: "City",
            vehicle: "Vehicle / model",
            year: "Year",
            part: "Required part",
            message: "Details",
            sendWhatsapp: "Continue on WhatsApp",
            cancel: "Cancel",
            namePlaceholder: "Your name",
            phonePlaceholder: "+237 6…",
            cityPlaceholder: "Douala, Yaoundé…",
            vehiclePlaceholder: "e.g. Toyota Prado",
            yearPlaceholder: "e.g. 2008",
            messagePlaceholder: "OEM reference, left/right side, photo available…",
            selectPart: "Select a part",
            otherPart: "Other part / reference not listed",
            cardDetails: "View details",
            askAvailability: "Ask",
            formRequired: "Please enter at least your name, phone number and required part."
        }
    };

    let lang = "fr";
    const tr = key => DICT[lang][key] || key;
    const categoryLabel = key => categories[key]?.[lang] || key;
    const productName = p => p?.name?.[lang] || p?.name?.fr || "";
    const productShort = p => p?.short?.[lang] || p?.short?.fr || "";
    const productDescription = p => p?.description?.[lang] || p?.description?.fr || "";

    const waFor = product => {
        if (!cleanWhatsApp) return "#";
        const msg = product ?
            (lang === "fr" ?
                `Bonjour, je suis intéressé(e) par ${productName(product)} (réf. ${product.sku}, $${product.price}). Pouvez-vous confirmer la disponibilité et la compatibilité avec mon véhicule ?` :
                `Hello, I am interested in ${productName(product)} (ref. ${product.sku}, $${product.price}). Can you confirm availability and compatibility with my vehicle?`) :
            (lang === "fr" ?
                "Bonjour, je souhaite de l'aide pour trouver une pièce automobile." :
                "Hello, I would like help finding an automotive part.");
        return `${whatsappBase}?text=${encodeURIComponent(msg)}`;
    };

    function applyStaticTranslations() {
        document.documentElement.lang = lang;
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const value = DICT[lang][el.dataset.i18n];
            if (value) el.textContent = value;
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const value = DICT[lang][el.dataset.i18nPlaceholder];
            if (value) el.placeholder = value;
        });
        document.querySelectorAll("[data-fr][data-en]").forEach(el => {
            el.textContent = lang === "fr" ? el.dataset.fr : el.dataset.en;
        });
        document.querySelectorAll("[data-lang]").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
        document.querySelectorAll("[data-whatsapp]").forEach(el => {
            el.href = waFor(null);
            el.target = "_blank";
            el.rel = "noopener noreferrer";
        });
    }

    const cardHTML = (p, index = 0) => {
        const animationAttributes = window.AOS ? `data-aos="fade-up" data-aos-delay="${Math.min(index % 4 * 70, 210)}"` : "";
        return `
    <article ${animationAttributes} class="product-card" data-product-id="${p.id}" data-category="${p.category}" data-name="${(productName(p) + " " + p.sku).toLowerCase()}">
      <a class="product-media" href="sproduct.html?id=${encodeURIComponent(p.id)}" aria-label="${tr("cardDetails")} — ${productName(p)}">
        <span class="product-tag">${categoryLabel(p.category)}</span>
        <img src="${p.images[0]}" alt="${productName(p)}" loading="lazy">
      </a>
      <div class="product-info">
        <span class="product-category">${categoryLabel(p.category)} · ${p.sku}</span>
        <a href="sproduct.html?id=${encodeURIComponent(p.id)}"><h3>${productName(p)}</h3></a>
        <p class="product-summary">${productShort(p)}</p>
        <div class="product-row">
          <div><small>${tr("priceLabel")}</small><strong>$${Number(p.price).toFixed(p.price < 10 ? 2 : 0)}</strong></div>
          <a class="product-wa" href="${waFor(p)}" target="_blank" rel="noopener noreferrer" aria-label="${tr("askAvailability")} — ${productName(p)}"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
        <a class="product-details-link" href="sproduct.html?id=${encodeURIComponent(p.id)}">${tr("cardDetails")} <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </article>`;
    };

    function renderProductGrids() {
        document.querySelectorAll("[data-products-grid]").forEach(grid => {
            const limit = Number(grid.dataset.limit || 0);
            grid.innerHTML = (limit ? products.slice(0, limit) : products).map(cardHTML).join("");
        });
    }

    const menuToggle = document.querySelector("[data-menu-toggle]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            const open = mobileMenu.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(open));
            menuToggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });
        mobileMenu.querySelectorAll("a,button").forEach(el => el.addEventListener("click", () => mobileMenu.classList.remove("open")));
    }

    const categoryRail = document.querySelector("[data-category-rail]");
    document.querySelectorAll("[data-category-scroll]").forEach(btn => btn.addEventListener("click", () => {
        if (!categoryRail) return;
        const direction = btn.dataset.categoryScroll === "next" ? 1 : -1;
        categoryRail.scrollBy({
            left: direction * Math.max(240, categoryRail.clientWidth * 0.72),
            behavior: "smooth"
        });
    }));

    const search = document.querySelector("[data-search]");
    const filtersWrap = document.querySelector("[data-filters]");
    const count = document.querySelector("[data-result-count]");
    const empty = document.querySelector("[data-empty-state]");
    const pagination = document.querySelector("[data-pagination]");
    const pageSize = 12;
    let currentPage = 1;
    let active = new URLSearchParams(location.search).get("category") || "all";

    function renderFilters() {
        if (!filtersWrap) return;
        const used = [...new Set(products.map(p => p.category))];
        filtersWrap.innerHTML = ["all", ...used].map(key => `<button class="filter-chip ${active === key ? "active" : ""}" type="button" data-filter="${key}">${categoryLabel(key)}</button>`).join("");
        filtersWrap.querySelectorAll("[data-filter]").forEach(btn => btn.addEventListener("click", () => {
            active = btn.dataset.filter;
            currentPage = 1;
            filtersWrap.querySelectorAll("[data-filter]").forEach(x => x.classList.toggle("active", x === btn));
            applyFilters();
        }));
    }

    function renderPagination(total) {
        if (!pagination) return;
        const pages = Math.ceil(total / pageSize);
        if (pages <= 1) {
            pagination.innerHTML = "";
            pagination.hidden = true;
            return;
        }
        pagination.hidden = false;
        const buttons = [];
        buttons.push(`<button type="button" class="page-btn" data-page="${Math.max(1,currentPage-1)}" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>`);
        for (let i = 1; i <= pages; i += 1) {
            buttons.push(`<button type="button" class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`);
        }
        buttons.push(`<button type="button" class="page-btn" data-page="${Math.min(pages,currentPage+1)}" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>`);
        pagination.innerHTML = buttons.join("");
        pagination.querySelectorAll("[data-page]").forEach(btn => btn.addEventListener("click", () => {
            const next = Number(btn.dataset.page);
            if (!Number.isFinite(next) || next === currentPage) return;
            currentPage = next;
            applyFilters();
            document.querySelector(".shop-products")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }));
    }

    function applyFilters() {
        const q = (search?.value || "").trim().toLowerCase();
        const cards = [...document.querySelectorAll(".product-card[data-product-id]")];
        const matched = cards.filter(card => {
            const p = products.find(x => x.id === card.dataset.productId);
            const haystack = p ? [productName(p), p.name.fr, p.name.en, p.sku, categoryLabel(p.category)].join(" ").toLowerCase() : card.dataset.name;
            const matchesQ = !q || haystack.includes(q);
            const matchesC = active === "all" || card.dataset.category === active;
            return matchesQ && matchesC;
        });
        const maxPage = Math.max(1, Math.ceil(matched.length / pageSize));
        currentPage = Math.min(currentPage, maxPage);
        cards.forEach(card => card.hidden = true);
        matched.slice((currentPage - 1) * pageSize, currentPage * pageSize).forEach(card => card.hidden = false);
        if (count) count.textContent = String(matched.length);
        if (empty) empty.classList.toggle("show", matched.length === 0);
        renderPagination(matched.length);
    }
    search?.addEventListener("input", () => {
        currentPage = 1;
        applyFilters();
    });

    function renderDetail() {
        const detail = document.querySelector("[data-product-detail]");
        if (!detail) return;
        const id = new URLSearchParams(location.search).get("id");
        const p = products.find(x => x.id === id) || products[0];
        if (!p) return;

        document.title = `${productName(p)} — AutoParts`;
        document.querySelectorAll("[data-detail-name]").forEach(el => el.textContent = productName(p));
        document.querySelectorAll("[data-detail-category]").forEach(el => el.textContent = categoryLabel(p.category));
        document.querySelectorAll("[data-detail-price]").forEach(el => el.textContent = `${Number(p.price).toFixed(p.price < 10 ? 2 : 0)}`);
        document.querySelectorAll("[data-detail-ref]").forEach(el => el.textContent = p.sku);
        document.querySelectorAll("[data-detail-description]").forEach(el => el.textContent = productDescription(p));
        document.querySelectorAll("[data-quick-moq]").forEach(el => el.textContent = p.specs.moq);
        document.querySelectorAll("[data-quick-fitment]").forEach(el => el.textContent = p.specs.fitment);
        const wa = document.querySelector("[data-detail-whatsapp]");
        if (wa) {
            wa.href = waFor(p);
            wa.target = "_blank";
            wa.rel = "noopener noreferrer";
        }

        const galleryMain = document.querySelector("[data-gallery-main]");
        const galleryThumbs = document.querySelector("[data-gallery-thumbs]");
        const images = p.images?.length ? p.images : [];
        if (galleryMain && images[0]) {
            galleryMain.src = images[0];
            galleryMain.alt = productName(p);
        }
        if (galleryThumbs) {
            galleryThumbs.innerHTML = images.map((src, i) => `<button class="gallery-thumb ${i === 0 ? "active" : ""}" type="button" data-gallery-src="${src}" aria-label="${tr("mainImage")} ${i + 1}"><img src="${src}" alt=""></button>`).join("");
            galleryThumbs.querySelectorAll("[data-gallery-src]").forEach(btn => btn.addEventListener("click", () => {
                galleryThumbs.querySelectorAll(".gallery-thumb").forEach(x => x.classList.toggle("active", x === btn));
                if (galleryMain) galleryMain.src = btn.dataset.gallerySrc;
            }));
        }

        const specs = document.querySelector("[data-specs]");
        if (specs) {
            const rows = [
                [tr("reference"), p.sku],
                [tr("condition"), p.specs.condition],
                [tr("fitment"), p.specs.fitment],
                [tr("origin"), p.specs.origin],
                [tr("moq"), p.specs.moq],
                [tr("warranty"), p.specs.warranty]
            ];
            specs.innerHTML = rows.map(([k, v]) => `<div class="spec-row"><span>${k}</span><strong>${v}</strong></div>`).join("");
        }

        const related = document.querySelector("[data-related-grid]");
        if (related) related.innerHTML = products.filter(x => x.id !== p.id && x.category === p.category).concat(products.filter(x => x.id !== p.id && x.category !== p.category)).slice(0, 4).map(cardHTML).join("");
    }

    const modal = document.querySelector("[data-contact-modal]");
    const form = document.querySelector("[data-contact-form]");
    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    };
    const openModal = () => {
        if (!modal) return;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        setTimeout(() => modal.querySelector("input")?.focus(), 60);
    };
    document.querySelectorAll("[data-contact-open]").forEach(btn => btn.addEventListener("click", e => {
        e.preventDefault();
        openModal();
    }));
    document.querySelectorAll("[data-contact-close]").forEach(btn => btn.addEventListener("click", closeModal));
    modal?.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeModal();
    });

    function populateContactParts() {
        const select = document.querySelector("[data-contact-part]");
        if (!select) return;
        const current = select.value;
        const pageProduct = new URLSearchParams(location.search).get("id");
        select.innerHTML = `<option value="">${tr("selectPart")}</option>` + products.map(p => `<option value="${p.id}">${productName(p)} — ${p.sku}</option>`).join("") + `<option value="other">${tr("otherPart")}</option>`;
        if ([...select.options].some(o => o.value === current) && current) select.value = current;
        else if (pageProduct && [...select.options].some(o => o.value === pageProduct)) select.value = pageProduct;
    }

    form?.addEventListener("submit", e => {
        e.preventDefault();
        const data = new FormData(form);
        const name = String(data.get("name") || "").trim();
        const phone = String(data.get("phone") || "").trim();
        const partId = String(data.get("part") || "").trim();
        if (!name || !phone || !partId) {
            const error = form.querySelector("[data-form-error]");
            if (error) {
                error.textContent = tr("formRequired");
                error.hidden = false;
            }
            return;
        }
        const chosen = products.find(p => p.id === partId);
        const partText = chosen ? `${productName(chosen)} (${chosen.sku})` : tr("otherPart");
        const reference = String(data.get("reference") || "").trim();
        const lines = [
            "Bonjour AutoParts, voici ma demande :",
            `Nom : ${name}`,
            `Téléphone : ${phone}`,
            `Ville : ${data.get("city") || "-"}`,
            `Véhicule / modèle : ${data.get("vehicle") || "-"}`,
            `Année : ${data.get("year") || "-"}`,
            `Pièce recherchée : ${partText}`,
            `Référence / OEM : ${reference || "-"}`,
            `Précisions : ${data.get("message") || "-"}`,
            "",
            "Pouvez-vous me confirmer la disponibilité et la compatibilité ?"
        ];
        if (cleanWhatsApp) window.open(`${whatsappBase}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
    });

    applyStaticTranslations();
    renderProductGrids();
    renderFilters();
    renderDetail();
    populateContactParts();
    applyFilters();

    if (window.AOS) {
        window.AOS.init({
            duration: 620,
            easing: "ease-out-quart",
            once: true,
            offset: 45,
            disable: () => matchMedia("(prefers-reduced-motion: reduce)").matches
        });
    }

    // Testimonial carousel: autoplay, pause on hover/focus/touch, still swipeable on mobile.
    const testimonialScroller = document.querySelector("[data-testimonial-scroller]");
    if (testimonialScroller) {
        const originalCards = [...testimonialScroller.children];
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            testimonialScroller.appendChild(clone);
        });

        let testimonialTimer = null;
        let testimonialPaused = false;

        const cardStep = () => {
            const card = testimonialScroller.querySelector(".testimonial-card");
            if (!card) return 320;
            const styles = getComputedStyle(testimonialScroller);
            const gap = parseFloat(styles.columnGap || styles.gap || "12") || 12;
            return card.getBoundingClientRect().width + gap;
        };

        const markCenterCard = () => {
            const center = testimonialScroller.scrollLeft + testimonialScroller.clientWidth / 2;
            testimonialScroller.querySelectorAll(".testimonial-card").forEach(card => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                card.classList.toggle("is-near-center", Math.abs(cardCenter - center) < card.offsetWidth * 0.55);
            });
        };

        const advanceTestimonials = () => {
            if (testimonialPaused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            const half = testimonialScroller.scrollWidth / 2;
            if (testimonialScroller.scrollLeft >= half - cardStep() * 0.75) {
                testimonialScroller.scrollLeft = 0;
            }
            testimonialScroller.scrollBy({
                left: cardStep(),
                behavior: "smooth"
            });
            setTimeout(markCenterCard, 420);
        };

        const startTestimonials = () => {
            clearInterval(testimonialTimer);
            testimonialTimer = setInterval(advanceTestimonials, innerWidth < 700 ? 3600 : 3000);
        };

        const pauseTestimonials = () => {
            testimonialPaused = true;
        };
        const resumeTestimonials = () => {
            testimonialPaused = false;
            startTestimonials();
        };

        testimonialScroller.addEventListener("mouseenter", pauseTestimonials);
        testimonialScroller.addEventListener("mouseleave", resumeTestimonials);
        testimonialScroller.addEventListener("focusin", pauseTestimonials);
        testimonialScroller.addEventListener("focusout", resumeTestimonials);
        testimonialScroller.addEventListener("pointerdown", pauseTestimonials);
        testimonialScroller.addEventListener("pointerup", () => setTimeout(resumeTestimonials, 2200));
        testimonialScroller.addEventListener("scroll", markCenterCard, {
            passive: true
        });
        markCenterCard();
        startTestimonials();
    }

    // Deter casual image copying without blocking normal links/buttons.
    document.querySelectorAll("img").forEach(img => img.setAttribute("draggable", "false"));
    document.addEventListener("dragstart", event => {
        if (event.target instanceof HTMLImageElement) event.preventDefault();
    });
    document.addEventListener("contextmenu", event => {
        if (event.target instanceof HTMLImageElement) event.preventDefault();
    });

    const reveal = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const obs = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        }), {
            threshold: .1
        });
        reveal.forEach(el => obs.observe(el));
    } else reveal.forEach(el => el.classList.add("visible"));
})();