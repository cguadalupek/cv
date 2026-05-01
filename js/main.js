const roles = [
  "Tecnico IT",
  "Analista de Soporte TI",
  "Service Desk",
  "Infraestructura y Homelab"
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
      "Queria centralizar la biblioteca multimedia y acceder a ella de forma comoda sin depender solo de servicios externos.",
    solution:
      "Organice un stack auto-hospedado con contenedores, proxy inverso y acceso seguro desde la red local o remoto segun el caso.",
    tech: ["Docker", "Nginx", "HTTPS", "Biblioteca multimedia", "Acceso remoto"],
    links: [
      { label: "Ver canal", href: "https://www.youtube.com/@kevin_carmen" }
    ]
  },
  monitoreo: {
    kicker: "Operaciones",
    title: "Sistema de Monitoreo y Alta Disponibilidad",
    problem:
      "Faltaba visibilidad del estado de servicios y habia riesgo de downtime sin alertas tempranas ni criterios de redundancia.",
    solution:
      "Defini monitoreo de metricas y salud de servicios con paneles, alertas y validaciones de redundancia segun criticidad.",
    tech: ["Metricas", "Alertas", "Dashboards", "Docker y servicios", "Uptime"],
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
      "Necesitaba consultar documentos tecnicos de manera mas rapida sin buscar manualmente entre multiples archivos.",
    solution:
      "Desarrolle un chatbot con RAG para consultar documentacion local y responder sobre contenido tecnico de forma contextual.",
    tech: ["Python", "Ollama", "LangChain"],
    links: [
      { label: "Repositorio", href: "https://github.com/kevin/chatbot-rag" }
    ]
  },
  precios: {
    kicker: "Producto",
    title: "Comparador de Precios de Hardware",
    problem:
      "Comparar precios entre tiendas y listados consume tiempo y vuelve facil equivocarse o perder mejores opciones.",
    solution:
      "Estoy construyendo una herramienta para reunir fuentes y mostrar comparativas claras en una interfaz sencilla, aun en desarrollo.",
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
const sections = Array.from(document.querySelectorAll("main .panel[id]"));
const modal = document.getElementById("project-modal");
const modalKicker = document.getElementById("project-modal-kicker");
const modalTitle = document.getElementById("project-modal-title");
const modalProblem = document.getElementById("project-modal-problem");
const modalSolution = document.getElementById("project-modal-solution");
const modalTech = document.getElementById("project-modal-tech");
const modalActions = document.getElementById("project-modal-actions");
const projectButtons = document.querySelectorAll("[data-project]");
const closeTargets = document.querySelectorAll("[data-close-modal]");

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
  themeToggleState.textContent = theme === "light" ? "Claro" : "Oscuro";
  themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  updateThemeColor();
}

function initTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initialTheme = savedTheme || (systemPrefersLight ? "light" : "dark");
  applyTheme(initialTheme);
}

function initThemeToggle() {
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
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isActive);
  });
}

function initSectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) {
        setActiveNav(visibleEntry.target.id);
      }
    },
    {
      rootMargin: "-18% 0px -55% 0px",
      threshold: [0.15, 0.4, 0.7]
    }
  );

  sections.forEach((section) => observer.observe(section));
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

initTheme();
initThemeToggle();
initTypewriter();
initSectionObserver();
initProjectModal();
