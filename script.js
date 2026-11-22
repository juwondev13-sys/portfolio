/* ===== EDIT THESE ===== */
const NAME = "Olajuwon";
const EMAIL = "juwondev13@gmail.com";
const WHATSAPP = "08101893379";   // country code first, no + or spaces
const GITHUB = "https://github.com/juwondev13-sys";

/* Your projects. status must be "Completed", "Ongoing" or "Planned".
   img is one screenshot "images/a.jpg" or several ["images/a.jpg", "images/b.jpg"] (missing files are skipped). Leave url "" to hide the link. Leave stack [] to hide the tags. */
const projects = [
  { title: "GadgetHub", img: ["images/gadgethub-1.jpeg", "images/gadgethub-2.jpeg", "images/gadgethub-3.jpeg"], type: "E-commerce Website", status: "Completed",
    url: "https://juwondev13-sys.github.io/gadgethub/",
    desc: "An online gadget store with product listings, categories, product details and a shopping cart.", stack: [] },
  { title: "Benny Farms", img: ["images/bennyfarms-1.jpeg", "images/bennyfarms-2.jpeg"], type: "Farm Management Automation", status: "Completed", url: "",
    desc: "An automated farm management system built with n8n, Telegram and Google Sheets to track sales, stock, livestock, feed inventory and egg production.",
    stack: ["n8n", "Telegram", "Google Sheets"] },
  { title: "MORASH AFRICA", img: "images/morashafrica.jpeg", type: "Concert Ticket Telegram Bot", status: "Completed", url: "",
    desc: "A Telegram ticket registration bot with ticket selection, customer information collection, booking summaries and automated email confirmations.",
    stack: ["Telegram"] },
  { title: "Personal Telegram Task Assistant", img: "images/taskassistant.jpg", type: "Telegram Bot", status: "Completed", url: "",
    desc: "A Telegram-based productivity assistant for managing daily tasks, reminders and notifications.",
    stack: ["Telegram"] },
  { title: "TFSquare Hotel", img: "images/tfsquare-hotel.jpg", type: "Hotel Website & Management System", status: "Ongoing", url: "",
    desc: "A hotel website and management solution with room showcases, booking enquiries and an administrative dashboard.", stack: [] },
  { title: "TFSquare Hotel", img: "images/tfsquare-whatsapp.jpg", type: "WhatsApp Business Assistant", status: "Planned", url: "",
    desc: "A planned WhatsApp automation system for handling hotel enquiries, customer questions and booking requests.",
    stack: ["WhatsApp"] }
];
const WORDS = ["AI automations", "websites that sell", "workflows that run themselves"];

/* ===== CODE ===== */
document.documentElement.classList.add("js");
const $ = s => document.querySelector(s);
const wa = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Hi " + NAME + ", I saw your portfolio and I'd like to talk about a project.");
$("#waTop").href = $("#wa").href = wa;
$("#mail").href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Project enquiry");
$("#gh").href = GITHUB;
$("#yr").textContent = new Date().getFullYear();

const gal = p => {
  const a = [].concat(p.img || []);
  if (!a.length) return "";
  return `<div class="gal"><div class="track">${a.map(src => `<img class="shot" src="${src}" alt="${p.title} screenshot" loading="lazy" onerror="this.remove()">`).join("")}</div>${a.length > 1 ? `<button class="gnav prev" data-d="-1" aria-label="Previous image">‹</button><button class="gnav next" data-d="1" aria-label="Next image">›</button><span class="count">1 / ${a.length}</span>` : ""}</div>`;
};
function show(f = "All") {
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.f === f));
  $("#projects").innerHTML = projects.filter(p => f === "All" || p.status === f).map(p => `
    <article class="card rv in">${gal(p)}<div class="top"><span class="tag">${p.type}</span><span class="pill ${p.status.toLowerCase()}">${p.status}</span></div>
    <h3>${p.title}</h3><p>${p.desc}</p>
    ${p.stack.length ? `<div class="stack">${p.stack.map(t => `<span>${t}</span>`).join("")}</div>` : ""}
    ${p.url ? `<a class="more" href="${p.url}" target="_blank" rel="noopener">View project ↗</a>` : ""}</article>`).join("");
}
$("#stats").innerHTML = ["Completed", "Ongoing", "Planned"].map(k => `<div><b>${projects.filter(p => p.status === k).length}</b><small>${k}</small></div>`).join("");
$("#filters").addEventListener("click", e => { const b = e.target.closest(".chip"); if (b) show(b.dataset.f); });
show();

/* gallery: arrows, counter and full-size view */
$("#projects").addEventListener("click", e => {
  const b = e.target.closest(".gnav");
  if (b) { const t = b.closest(".gal").querySelector(".track"); t.scrollBy({ left: b.dataset.d * t.clientWidth, behavior: "smooth" }); return; }
  if (e.target.classList.contains("shot")) { $("#lb img").src = e.target.src; $("#lb").classList.add("open"); }
});
$("#projects").addEventListener("scroll", e => {
  const t = e.target, c = t.parentNode.querySelector(".count");
  if (c) c.textContent = (Math.round(t.scrollLeft / t.clientWidth) + 1) + " / " + t.children.length;
}, true);
$("#lb").onclick = () => $("#lb").classList.remove("open");
addEventListener("keydown", e => { if (e.key === "Escape") $("#lb").classList.remove("open"); });

$("#burger").onclick = () => $("#links").classList.toggle("open");
$("#links").onclick = () => $("#links").classList.remove("open");

let i = 0; const sw = $("#swap");
setInterval(() => {
  sw.classList.add("out");
  setTimeout(() => { i = (i + 1) % WORDS.length; sw.textContent = WORDS[i]; sw.classList.remove("out"); }, 350);
}, 2800);

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".rv:not(.in)").forEach(el => io.observe(el));
