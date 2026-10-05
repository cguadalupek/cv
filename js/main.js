const projects = {
  proxmox: {
    kicker: "Infraestructura",
    title: "Homelab virtualizado con Proxmox",
    problem: "Necesitaba un entorno unificado para laboratorios, pruebas y servicios internos, sin depender de equipos dispersos.",
    solution: "Implementé un homelab con Proxmox VE, máquinas virtuales, redes virtuales y almacenamiento compartido para desplegar servicios de forma repetible y aislada.",
    tech: ["Proxmox VE", "KVM", "Linux", "Redes virtuales", "Almacenamiento"],
    links: [{ label: "Canal de YouTube", href: "https://www.youtube.com/@kevin_carmen" }]
  },
  multimedia: {
    kicker: "Multimedia",
    title: "Plataforma multimedia autoalojada",
    problem: "Quería centralizar mi biblioteca multimedia y acceder a ella con comodidad sin depender solo de servicios externos.",
    solution: "Organicé un stack autoalojado con contenedores, proxy inverso y acceso seguro desde la red local o de forma remota según el caso.",
    tech: ["Docker", "Nginx", "HTTPS", "Biblioteca multimedia", "Acceso remoto"],
    links: [{ label: "Ver canal", href: "https://www.youtube.com/@kevin_carmen" }]
  },
  monitoreo: {
    kicker: "Operaciones",
    title: "Monitoreo y alta disponibilidad",
    problem: "Faltaba visibilidad sobre el estado de los servicios, con riesgo de caídas sin alertas tempranas ni criterios de redundancia.",
    solution: "Definí monitoreo de métricas y salud de servicios mediante paneles, alertas y validaciones de redundancia de acuerdo con su criticidad.",
    tech: ["Métricas", "Alertas", "Dashboards", "Docker", "Uptime"],
    links: [{ label: "Ver canal", href: "https://www.youtube.com/@kevin_carmen" }]
  },
  backups: {
    kicker: "Resiliencia",
    title: "Automatización de backups",
    problem: "Las copias manuales eran inconsistentes y dificultaban comprobar la recuperación ante fallos o errores operativos.",
    solution: "Apliqué políticas automatizadas de respaldo, retención y comprobaciones periódicas para máquinas virtuales y datos relevantes.",
    tech: ["Snapshots", "Scripts", "Cron", "Retención", "Almacenamiento"],
    links: [{ label: "Ver canal", href: "https://www.youtube.com/@kevin_carmen" }]
  },
  chatbot: {
    kicker: "IA local",
    title: "Chatbot local con IA y RAG",
    problem: "Necesitaba consultar documentación técnica con mayor rapidez, sin buscar manualmente entre múltiples archivos.",
    solution: "Desarrollé un chatbot con RAG para consultar documentación local y responder de manera contextual sobre contenido técnico.",
    tech: ["Python", "Ollama", "LangChain"],
    links: [{ label: "Repositorio", href: "https://github.com/kevin/chatbot-rag" }]
  },
  precios: {
    kicker: "Producto",
    title: "Comparador de precios de hardware",
    problem: "Comparar precios entre tiendas y listados consume tiempo y hace fácil pasar por alto mejores opciones.",
    solution: "Estoy construyendo una herramienta que reúne fuentes y presenta comparativas claras en una interfaz sencilla; actualmente está en desarrollo.",
    tech: ["Python", "APIs y scraping", "Frontend web", "Datos estructurados"],
    links: [{ label: "Seguimiento en YouTube", href: "https://www.youtube.com/@kevin_carmen" }]
  }
};

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id]")];
const modal = document.getElementById("project-modal");
const modalKicker = document.getElementById("project-modal-kicker");
const modalTitle = document.getElementById("project-modal-title");
const modalProblem = document.getElementById("project-modal-problem");
const modalSolution = document.getElementById("project-modal-solution");
const modalTech = document.getElementById("project-modal-tech");
const modalActions = document.getElementById("project-modal-actions");
const closeModalTargets = document.querySelectorAll("[data-close-modal]");
let lastFocusedElement = null;

function closeMenu() {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
}

function createProjectLink(link) {
  const anchor = document.createElement("a");
  anchor.className = "button button--primary";
  anchor.href = link.href;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.textContent = link.label;
  return anchor;
}

function openProjectModal(projectKey, trigger) {
  const project = projects[projectKey];
  if (!project || !modal) return;

  lastFocusedElement = trigger;
  modalKicker.textContent = project.kicker;
  modalTitle.textContent = project.title;
  modalProblem.textContent = project.problem;
  modalSolution.textContent = project.solution;
  modalTech.replaceChildren(...project.tech.map((item) => {
    const technology = document.createElement("li");
    technology.textContent = item;
    return technology;
  }));
  modalActions.replaceChildren(...project.links.map(createProjectLink));
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeProjectModal() {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  lastFocusedElement?.focus();
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => openProjectModal(button.dataset.project, button));
});
closeModalTargets.forEach((target) => target.addEventListener("click", closeProjectModal));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeProjectModal();
  }

  if (event.key !== "Tab" || !modal || modal.hidden) return;
  const focusable = [...modal.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${current.target.id}`));
  }, { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.1, 0.25] });
  sections.forEach((section) => observer.observe(section));
}
