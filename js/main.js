const roles = [
  "Técnico IT",
  "Analista de Soporte TI",
  "Service Desk",
  "Infraestructura y Homelab",
  "Development"
];

const projects = {
  proxmox: {
    kicker: "Infraestructura",
    title: "Homelab Virtualizado con Proxmox",
    problem:
      "Necesitaba un entorno unificado para laboratorios, pruebas y servicios internos sin depender de equipos dispersos.",
    solution:
      "Levante un homelab basado en Proxmox VE con VMs, redes virtuales y almacenamiento compartido para despliegues repetibles y aislamiento por proyecto.",
    tech: ["Proxmox VE", "KVM", "Linux", "Redes virtuales", "Almacenamiento"],
    links: [
      { label: "Canal de YouTube", href: "https://www.youtube.com/@kevin_carmen" }
    ]
  },
  multimedia: {
    kicker: "Multimedia",
    title: "Plataforma Multimedia Auto-Hospedada",
    problem:
      "Quería centralizar la biblioteca multimedia y acceder a ella de forma cómoda sin depender solo de servicios externos.",
    solution:
      "Organicé un stack auto-hospedado con contenedores, proxy inverso y acceso seguro desde la red local o remoto según el caso.",
    tech: ["Docker", "Nginx", "HTTPS", "Biblioteca multimedia", "Acceso remoto"],
    links: [
      { label: "Ver canal", href: "https://www.youtube.com/@kevin_carmen" }
    ]
  },
  monitoreo: {
    kicker: "Operaciones",
    title: "Sistema de Monitoreo y Alta Disponibilidad",
    problem:
      "Faltaba visibilidad del estado de servicios y había riesgo de downtime sin alertas tempranas ni criterios de redundancia.",
    solution:
      "Definí monitoreo de métricas y salud de servicios con paneles, alertas y validaciones de redundancia según criticidad.",
    tech: ["Métricas", "Alertas", "Dashboards", "Docker y servicios", "Uptime"],
    links: [
      { label: "Ver canal", href: "https://www.youtube.com/@kevin_carmen" }
    ]
  },
  backups: {
    kicker: "Resiliencia",
    title: "Automatizacion de Backups en Infraestructura Virtual",
    problem:
      "Las copias manuales eran inconsistentes y costaba validar recuperacion ante fallos o errores operativos.",
    solution:
      "Aplique politicas de backup automatizadas con retencion y comprobaciones periodicas sobre VMs y datos relevantes.",
    tech: ["Snapshots", "Scripts", "Cron", "Retencion", "Almacenamiento"],
    links: [
      { label: "Ver canal", href: "https://www.youtube.com/@kevin_carmen" }
    ]
  },
  chatbot: {
    kicker: "IA local",
    title: "Chatbot Local con IA y RAG",
    problem:
      "Necesitaba consultar documentos técnicos de manera más rápida sin buscar manualmente entre múltiples archivos.",
    solution:
      "Desarrollé un chatbot con RAG para consultar documentación local y responder sobre contenido técnico de forma contextual.",
    tech: ["Python", "Ollama", "LangChain"],
    links: [
      { label: "Repositorio", href: "https://github.com/kevin/chatbot-rag" }
    ]
  },
  precios: {
    kicker: "Producto",
    title: "Comparador de Precios de Hardware",
    problem:
      "Comparar precios entre tiendas y listados consume tiempo y vuelve fácil equivocarse o perder mejores opciones.",
    solution:
      "Estoy construyendo una herramienta para reunir fuentes y mostrar comparativas claras en una interfaz sencilla, aún en desarrollo.",
    tech: ["Python", "APIs y scraping", "Frontend web", "Datos estructurados"],
    links: [
      { label: "Seguimiento en YouTube", href: "https://www.youtube.com/@kevin_carmen" }
    ]
  }
};

const themeStorageKey = "kevin-carmen-theme";
const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeToggleState = document.getElementById("theme-toggle-state");
const typedRole = document.getElementById("typed-role");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const hashLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
const sections = Array.from(document.querySelectorAll("main .panel[id]"));
const panels = document.querySelector(".panels");
const floatingNav = document.getElementById("floating-nav");
const contentArea = document.querySelector(".content-area");
const modal = document.getElementById("project-modal");
const modalKicker = document.getElementById("project-modal-kicker");
const modalTitle = document.getElementById("project-modal-title");
const modalProblem = document.getElementById("project-modal-problem");
const modalSolution = document.getElementById("project-modal-solution");
const modalTech = document.getElementById("project-modal-tech");
const modalActions = document.getElementById("project-modal-actions");
const projectButtons = document.querySelectorAll("[data-project]");
const closeTargets = document.querySelectorAll("[data-close-modal]");
const mobileQuery = window.matchMedia("(max-width: 760px)");
let activeSectionId = null;

function updateThemeColor() {
  const themeColor = html.dataset.theme === "light" ? "#f4f1ea" : "#17171c";
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute("content", themeColor);
  }
}

function applyTheme(theme) {
  html.dataset.theme = theme;
  localStorage.setItem(themeStorageKey, theme);
  if (themeToggleState) {
    themeToggleState.textContent = theme === "light" ? "Claro" : "Oscuro";
  }
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    themeToggle.setAttribute(
      "aria-label",
      theme === "light" ? "Tema claro activo; cambiar a oscuro" : "Tema oscuro activo; cambiar a claro"
    );
  }
  updateThemeColor();
}

function initTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initialTheme = savedTheme || (systemPrefersLight ? "light" : "dark");
  applyTheme(initialTheme);
}

function initThemeToggle() {
  if (!themeToggle) {
    return;
  }
  themeToggle.addEventListener("click", () => {
    const nextTheme = html.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

function initTypewriter() {
  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function tick() {
    const currentRole = roles[roleIndex];
    const step = deleting
      ? currentRole.slice(0, characterIndex - 1)
      : currentRole.slice(0, characterIndex + 1);

    typedRole.textContent = step;
    characterIndex = deleting ? characterIndex - 1 : characterIndex + 1;

    let delay = deleting ? 40 : 70;

    if (!deleting && step === currentRole) {
      delay = 1700;
      deleting = true;
    } else if (deleting && step.length === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 260;
    }

    window.setTimeout(tick, delay);
  }

  tick();
}

function setActiveNav(id) {
  navLinks.forEach((link) => {
    const isActive = Boolean(id) && link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isActive);
  });
}

function isMobileCardMode() {
  return mobileQuery.matches;
}

function syncFloatingNavToContentColumn() {
  if (!floatingNav) {
    return;
  }
  if (mobileQuery.matches) {
    floatingNav.style.removeProperty("left");
    floatingNav.style.removeProperty("width");
    return;
  }
  if (!contentArea) {
    return;
  }
  const rect = contentArea.getBoundingClientRect();
  floatingNav.style.left = `${rect.left}px`;
  floatingNav.style.width = `${rect.width}px`;
}

function updateFloatingNavVisibility() {
  if (!floatingNav) {
    return;
  }
  const threshold = isMobileCardMode() ? 120 : 170;
  const isVisible = window.scrollY > threshold;
  document.body.classList.toggle("floating-nav-visible", isVisible);
  floatingNav.setAttribute("aria-hidden", isVisible ? "false" : "true");
}

function setPanelsEmpty(isEmpty) {
  if (!panels) {
    return;
  }

  document.body.classList.toggle("mobile-home-state", isEmpty);
}

function syncPanelState(animate = false) {
  if (!panels) {
    return;
  }

  document.body.classList.add("card-mode-ready");

  const currentSectionId = activeSectionId;
  const shouldHidePanels = isMobileCardMode() && !currentSectionId;
  setPanelsEmpty(shouldHidePanels);

  sections.forEach((section) => {
    const isActive = Boolean(currentSectionId) && section.id === currentSectionId;
    section.classList.toggle("is-panel-active", isActive);

    if (isActive && animate) {
      section.classList.remove("is-panel-active");
      void section.offsetWidth;
      section.classList.add("is-panel-active");
    }
  });
}

function showSection(id, options = {}) {
  const target = sections.find((section) => section.id === id);
  if (!target) {
    return;
  }

  const shouldAnimate = options.animate !== false && activeSectionId !== id;
  activeSectionId = id;
  setActiveNav(id);
  syncPanelState(shouldAnimate);
  updateFloatingNavVisibility();

  if (options.scroll !== false) {
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function initHashNavigation() {
  hashLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const id = href.slice(1);
      const hasSection = sections.some((section) => section.id === id);
      if (!hasSection) {
        return;
      }

      event.preventDefault();
      showSection(id);
    });
  });
}

function syncResponsiveNavigation() {
  const hashId = window.location.hash.replace("#", "");
  const hasHashSection = sections.some((section) => section.id === hashId);

  if (hasHashSection) {
    activeSectionId = hashId;
  } else if (!activeSectionId) {
    activeSectionId = "sobre-mi";
  } else if (!sections.some((section) => section.id === activeSectionId)) {
    activeSectionId = "sobre-mi";
  }

  if (activeSectionId) {
    setActiveNav(activeSectionId);
  } else {
    setActiveNav(null);
  }

  syncPanelState(false);
  syncFloatingNavToContentColumn();
  updateFloatingNavVisibility();
}

function openProjectModal(projectKey) {
  const project = projects[projectKey];
  if (!project) {
    return;
  }

  modalKicker.textContent = project.kicker;
  modalTitle.textContent = project.title;
  modalProblem.textContent = project.problem;
  modalSolution.textContent = project.solution;

  modalTech.innerHTML = "";
  project.tech.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalTech.appendChild(li);
  });

  modalActions.innerHTML = "";
  project.links.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.className = "button button--primary";
    anchor.href = link.href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = link.label;
    modalActions.appendChild(anchor);
  });

  modal.hidden = false;
  document.body.classList.add("project-modal-open");
}

function closeProjectModal() {
  modal.hidden = true;
  document.body.classList.remove("project-modal-open");
}

function initProjectModal() {
  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openProjectModal(button.dataset.project);
    });
  });

  closeTargets.forEach((target) => {
    target.addEventListener("click", closeProjectModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeProjectModal();
    }
  });
}

function initFloatingNav() {
  syncResponsiveNavigation();
  updateFloatingNavVisibility();
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => syncFloatingNavToContentColumn());
  });
  window.addEventListener("scroll", updateFloatingNavVisibility, { passive: true });
  window.addEventListener("resize", syncResponsiveNavigation);
  if (contentArea && typeof ResizeObserver !== "undefined") {
    new ResizeObserver(() => syncFloatingNavToContentColumn()).observe(contentArea);
  }
}

function initCursorGlow() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (reduceMotion || !finePointer) {
    return;
  }

  const root = document.documentElement;
  let rafId = 0;
  let clientX = 140;
  let clientY = 100;

  function applyGlowPosition() {
    rafId = 0;
    root.style.setProperty("--glow-cursor-x", `${clientX}px`);
    root.style.setProperty("--glow-cursor-y", `${clientY}px`);
  }

  function scheduleGlowPosition() {
    if (!rafId) {
      rafId = window.requestAnimationFrame(applyGlowPosition);
    }
  }

  window.addEventListener(
    "mousemove",
    (event) => {
      clientX = event.clientX;
      clientY = event.clientY;
      scheduleGlowPosition();
    },
    { passive: true }
  );
}

initTheme();
initThemeToggle();
initTypewriter();
initHashNavigation();
initProjectModal();
initFloatingNav();
initCursorGlow();
