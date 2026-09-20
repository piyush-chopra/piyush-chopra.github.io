const themeButton = document.querySelector(".theme-button");
const root = document.documentElement;
const preference = window.matchMedia("(prefers-color-scheme: dark)");
function currentTheme() {
  return root.dataset.theme || (preference.matches ? "dark" : "light");
}
function updateThemeLabel() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  themeButton.setAttribute("aria-label", `Switch to ${next} theme`);
  themeButton.title = `Switch to ${next} theme`;
}
try {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;
} catch {}
updateThemeLabel();
themeButton.addEventListener("click", () => {
  root.dataset.theme = currentTheme() === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("portfolio-theme", root.dataset.theme);
  } catch {}
  updateThemeLabel();
});
preference.addEventListener("change", updateThemeLabel);

const filters = document.querySelector(".filters");
const projects = [...document.querySelectorAll("[data-category]")];
filters.hidden = false;
filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  filters
    .querySelectorAll("button")
    .forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
  let count = 0;
  projects.forEach((project) => {
    project.hidden =
      button.dataset.filter !== "all" &&
      project.dataset.category !== button.dataset.filter;
    if (!project.hidden) count++;
  });
  document.getElementById("filter-status").textContent =
    `${count} projects shown. Foundry Office remains featured above.`;
});

const copyButton = document.querySelector(".copy-email");
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    const status = document.querySelector(".copy-status");
    try {
      await navigator.clipboard.writeText("piyush.chopra201998@gmail.com");
      status.textContent = "Email copied. Looking forward to connecting.";
    } catch {
      status.textContent = "Use the email link below to get in touch.";
    }
  });
}

if ("IntersectionObserver" in window) {
  const links = [...document.querySelectorAll("nav a")];
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link) => {
          if (link.hash === `#${entry.target.id}`)
            link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    },
    { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => observer.observe(section));
}
