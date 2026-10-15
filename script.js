document.addEventListener("DOMContentLoaded", () => {
  const c = SITE_CONTENT;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const normalizeImages = (project) => {
    if (Array.isArray(project.images)) return project.images.filter(Boolean);
    if (project.image) return [project.image];
    return [];
  };

  const servicesText = (services) => Array.isArray(services) ? services.join(" · ") : String(services || "");

  $$("[data-brand]").forEach(el => el.textContent = c.brand);
  $("[data-intro-title]").textContent = c.introTitle;
  $("[data-intro-copy]").textContent = c.introCopy;
  $("[data-about-title]").textContent = c.aboutTitle;
  $("[data-about-copy]").textContent = c.aboutCopy;
  $("[data-about-copy-2]").textContent = c.aboutCopy2;
  $("[data-contact-title]").textContent = c.contactTitle;
  $("[data-location]").textContent = c.location;
  $("#year").textContent = new Date().getFullYear();

  const email = $("[data-email]");
  email.textContent = `${c.email} ↗`;
  email.href = `mailto:${c.email}`;

  const heroImages = $("#heroImages");
  const heroClasses = ["hero-image-large", "hero-image-medium", "hero-image-small"];
  const heroAlts = ["Main portrait", "Second portrait", "Detail view"];
  heroImages.innerHTML = c.heroImages.slice(0, 3).map((src, i) => `
    <figure class="hero-image ${heroClasses[i]}">
      <img src="${escapeAttr(src)}" alt="${heroAlts[i]}" width="800" height="900" fetchpriority="${i === 0 ? "high" : "auto"}" decoding="async" onerror="this.parentElement.classList.add('placeholder')">
      <span class="image-placeholder">ADD<br>HERO IMAGE</span>
    </figure>
  `).join("");

  const studies = Array.isArray(c.caseStudies) ? c.caseStudies : [];
  $("#caseStudyEmpty").hidden = studies.length > 0;
  $("#caseStudyGrid").innerHTML = studies.map(study => {
    const title = escapeHtml(study.title || "Untitled study");
    return `<article class="study-card">
      ${study.image ? `<div class="study-image"><img src="${escapeAttr(study.image)}" alt="" loading="lazy" decoding="async"></div>` : ""}
      <p class="project-category">${escapeHtml(study.category || "Case Study")}</p>
      <h3>${title}</h3>
      <p class="study-description">${escapeHtml(study.description || "")}</p>
      ${study.url ? `<a class="study-link" href="${escapeAttr(study.url)}">Read more <span aria-hidden="true">↗</span><span class="visually-hidden">: ${title}</span></a>` : ""}
    </article>`;
  }).join("");

  const projectGrid = $("#projectGrid");
  projectGrid.innerHTML = c.projects.map((p, i) => {
    const images = normalizeImages(p);
    const firstImage = images[0] || "";
    return `
      <article class="project-card" data-project="${i}" tabindex="0" role="group" aria-roledescription="slide" aria-label="Project ${i + 1} of ${c.projects.length}: ${escapeAttr(p.title)}">
        <div class="project-image">
          <img src="${escapeAttr(firstImage)}" alt="${escapeAttr(p.title)}" loading="lazy" decoding="async" width="800" height="816" onerror="this.parentElement.classList.add('placeholder')">
          <span class="image-placeholder">ADD<br>PROJECT IMAGE</span>
        </div>
        <p class="project-category">${escapeHtml(p.category)}</p>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
      </article>
    `;
  }).join("");

  const nav = $(".nav");
  const toggle = $(".menu-toggle");
  toggle.setAttribute("aria-controls", nav.id || "main-nav");
  nav.id = "main-nav";
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $$('a', nav).forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }));

  const track = projectGrid;
  const prevButton = $("#prevProject");
  const nextButton = $("#nextProject");
  const carouselStatus = $("#carouselStatus");
  let activeIndex = 0;

  const getCardStep = () => {
    const card = $(".project-card", track);
    if (!card) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const updateCarousel = (announce = false) => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const step = Math.max(1, getCardStep());
    activeIndex = Math.min(c.projects.length - 1, Math.max(0, Math.round(track.scrollLeft / step)));
    const atStart = track.scrollLeft <= 2;
    const atEnd = track.scrollLeft >= maxScroll - 2;
    prevButton.disabled = atStart;
    nextButton.disabled = atEnd;
    carouselStatus.textContent = c.projects.length ? `${activeIndex + 1} / ${c.projects.length}` : "";
    if (announce) carouselStatus.textContent = `Project ${activeIndex + 1} of ${c.projects.length}`;
  };

  const moveCarousel = (direction) => {
    track.scrollBy({ left: direction * getCardStep(), behavior: "smooth" });
  };

  prevButton.addEventListener("click", () => moveCarousel(-1));
  nextButton.addEventListener("click", () => moveCarousel(1));
  track.addEventListener("scroll", () => updateCarousel(false), { passive: true });
  window.addEventListener("resize", () => updateCarousel(false));
  track.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { e.preventDefault(); moveCarousel(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); moveCarousel(-1); }
    if (e.key === "Home") { e.preventDefault(); track.scrollTo({ left: 0, behavior: "smooth" }); }
    if (e.key === "End") { e.preventDefault(); track.scrollTo({ left: track.scrollWidth, behavior: "smooth" }); }
  });

  let dragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let moved = false;
  track.addEventListener("pointerdown", e => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true; moved = false; dragStartX = e.clientX; dragStartScroll = track.scrollLeft;
    track.classList.add("is-dragging");
  });
  track.addEventListener("pointermove", e => {
    if (!dragging) return;
    const delta = e.clientX - dragStartX;
    if (!moved && Math.abs(delta) > 5) {
      moved = true;
      // Capture only actual drags so a normal click still reaches its project card.
      track.setPointerCapture?.(e.pointerId);
    }
    if (!moved) return;
    track.scrollLeft = dragStartScroll - delta;
  });
  const endDrag = e => {
    if (!dragging) return;
    dragging = false; track.classList.remove("is-dragging");
    try { track.releasePointerCapture?.(e.pointerId); } catch (_) {}
    if (moved) setTimeout(() => { moved = false; }, 0);
  };
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
  track.addEventListener("click", e => {
    if (moved) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  updateCarousel();

  const modal = $("#projectModal");
  const modalCard = $(".modal-card", modal);
  const modalImage = $("#modalImage");
  const modalVideo = $("#modalVideo");
  const modalVideoError = $("#modalVideoError");
  const modalVideoLink = $("#modalVideoLink");
  modalVideo.addEventListener("error", () => {
    if (!modalVideo.hidden && modalVideo.getAttribute("src")) modalVideoError.hidden = false;
  });
  modalVideo.addEventListener("loadeddata", () => { modalVideoError.hidden = true; });
  const modalMedia = $(".modal-image", modal);
  const normalizeMedia = project => [
    ...(project.video ? [{ type: "video", src: project.video }] : []),
    ...normalizeImages(project).map((src, index) => ({ type: "image", src, index }))
  ];
  const resetVideo = () => {
    modalVideo.pause();
    try { modalVideo.currentTime = 0; } catch (_) {}
    modalVideo.removeAttribute("src");
    modalVideo.load();
  };
  const modalCategory = $("#modalCategory");
  const modalTitle = $("#modalTitle");
  const modalDescription = $("#modalDescription");
  const modalMeta = $("#modalMeta");
  const modalCaseStudy = $("#modalCaseStudy");
  const modalGalleryControls = $("#modalGalleryControls");
  const modalGalleryCount = $("#modalGalleryCount");
  const modalPrev = $("#modalPrev");
  const modalNext = $("#modalNext");
  let currentProject = 0;
  let currentImage = 0;
  let previousFocus = null;

  const updateModalImage = () => {
    const p = c.projects[currentProject];
    const media = normalizeMedia(p);
    const item = media[currentImage];
    resetVideo();
    modalVideoError.hidden = true;
    const isVideo = item?.type === "video";
    modalVideo.hidden = !isVideo;
    modalImage.hidden = isVideo;
    modalMedia.classList.toggle("has-video", isVideo);
    modalMedia.classList.toggle("has-contained-images", !isVideo && p.galleryFit === "contain");
    if (isVideo) {
      modalVideo.src = item.src;
      modalVideo.poster = normalizeImages(p)[0] || "";
      modalVideoLink.href = item.src;
      modalVideo.load();
      modalVideo.setAttribute("aria-label", `${p.title} — project video`);
    } else {
      modalImage.src = item?.src || "";
      modalImage.alt = `${p.title} — image ${(item?.index || 0) + 1}`;
      modalImage.loading = "eager";
    }
    modalGalleryCount.textContent = `${media.length ? currentImage + 1 : 0} / ${media.length}`;
    modalPrev.disabled = currentImage === 0;
    modalNext.disabled = currentImage >= media.length - 1;
    modalGalleryControls.hidden = media.length <= 1;
  };

  const openProject = index => {
    const p = c.projects[index];
    if (!p) return;
    currentProject = index;
    currentImage = 0;
    previousFocus = document.activeElement;
    modalCategory.textContent = p.category || "";
    modalTitle.textContent = p.title || "Untitled project";
    modalDescription.textContent = p.description || "";
    const services = servicesText(p.services);
    const meta = [];
    if (p.client) meta.push(`Client: ${p.client}`);
    if (services) meta.push(`Services: ${services}`);
    modalMeta.textContent = meta.join("\n");
    if (p.caseStudy) {
      modalCaseStudy.hidden = false;
      modalCaseStudy.href = p.caseStudy;
    } else {
      modalCaseStudy.hidden = true;
      modalCaseStudy.removeAttribute("href");
    }
    updateModalImage();
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("open"));
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalCard.focus();
  };

  const closeProject = () => {
    if (modal.hidden) return;
    resetVideo();
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => { modal.hidden = true; }, 180);
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  };

  $$(".project-card").forEach(card => {
    card.addEventListener("click", () => openProject(Number(card.dataset.project)));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProject(Number(card.dataset.project)); }
    });
  });
  $$('[data-close-modal]').forEach(el => el.addEventListener("click", closeProject));
  modalPrev.addEventListener("click", () => { if (currentImage > 0) { currentImage--; updateModalImage(); } });
  modalNext.addEventListener("click", () => {
    const media = normalizeMedia(c.projects[currentProject]);
    if (currentImage < media.length - 1) { currentImage++; updateModalImage(); }
  });

  document.addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); closeProject(); return; }
    // Let the native player handle seeking and its own keyboard controls.
    if (e.target === modalVideo && e.key !== "Tab") return;
    if (e.key === "ArrowLeft" && !modalPrev.disabled) { e.preventDefault(); modalPrev.click(); return; }
    if (e.key === "ArrowRight" && !modalNext.disabled) { e.preventDefault(); modalNext.click(); return; }
    if (e.key !== "Tab") return;
    const focusables = $$('button:not([disabled]), a[href]:not([hidden]), video[controls]:not([hidden])', modal).filter(el => !el.hidden && el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === modalCard)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Case-study links can open the matching creative directly, without autoplay.
  const linkedProject = new URLSearchParams(window.location.search).get("project");
  if (linkedProject !== null && /^\d+$/.test(linkedProject)) {
    const index = Number(linkedProject);
    if (c.projects[index]) {
      previousFocus = $(".project-card[data-project='" + index + "']");
      openProject(index);
      previousFocus = $(".project-card[data-project='" + index + "']") || previousFocus;
    }
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[ch]));
  }
  function escapeAttr(value) { return escapeHtml(value); }
});
