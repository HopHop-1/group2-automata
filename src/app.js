// =====================================================
//  GROUP 2 – ACSAD AUTOMATA  |  src/app.js
//  Mirrors the structure of the main ACSAD-AUTOMATA
//  repo so this can be dropped into groups/group2/
// =====================================================

const GROUP_PATH = "./groups/group2/info.json";

// ── DOM refs ──────────────────────────────────────
const groupName     = document.getElementById("groupName");
const memberNames   = document.getElementById("memberNames");
const downloadBtn   = document.getElementById("downloadBtn");
const tabRow        = document.getElementById("tabRow");
const subTabRow     = document.getElementById("subTabRow");
const skeletonState = document.getElementById("skeletonState");
const emptyState    = document.getElementById("emptyState");
const labPanel      = document.getElementById("labPanel");
const labTitle      = document.getElementById("labTitle");
const labDescription= document.getElementById("labDescription");
const screenshotImage = document.getElementById("screenshotImage");
const previewFallback = document.getElementById("previewFallback");
const codeBlock     = document.getElementById("codeBlock");
const sourceFile    = document.getElementById("sourceFile");
const inputFields   = document.getElementById("inputFields");
const runBtn        = document.getElementById("runBtn");
const outputBox     = document.getElementById("outputBox");
const sidebar       = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarRailToggleBtn");
const sidebarOverlay= document.getElementById("sidebarOverlay");
const mobileSidebarBtn = document.getElementById("mobileSidebarBtn");
const groupList     = document.getElementById("groupList");
const mainContent   = document.querySelector(".main-content");

// ── State ─────────────────────────────────────────
let groupData       = null;
let activeTabIndex  = 0;
let activeSubIndex  = 0;
let currentMain     = null; // the loaded main() function

// ── Boot ──────────────────────────────────────────
(async function init() {
  setupSidebar();
  await loadGroup();
})();

// ── Sidebar ───────────────────────────────────────
function setupSidebar() {
  // Desktop collapse toggle
  sidebarToggle.addEventListener("click", () => {
    const collapsed = sidebar.classList.toggle("collapsed");
    sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    if (collapsed) {
      mainContent.classList.add("sidebar-collapsed");
    } else {
      mainContent.classList.remove("sidebar-collapsed");
    }
  });

  // Mobile open
  mobileSidebarBtn?.addEventListener("click", () => {
    sidebar.classList.add("mobile-open");
    sidebarOverlay.classList.add("mobile-open");
  });

  // Mobile close via overlay
  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("mobile-open");
    sidebarOverlay.classList.remove("mobile-open");
  });

  // Build sidebar nav — for now just Group 2 (this site IS group 2)
  renderSidebarNav();
}

function renderSidebarNav() {
  groupList.innerHTML = "";
  const btn = document.createElement("button");
  btn.className = "group-nav-btn active";
  btn.setAttribute("aria-current", "page");
  btn.innerHTML = `
    <span class="group-avatar">G2</span>
    <span class="group-nav-label">Group 2</span>
  `;
  btn.addEventListener("click", () => {
    // Close mobile sidebar on selection
    sidebar.classList.remove("mobile-open");
    sidebarOverlay.classList.remove("mobile-open");
  });
  groupList.appendChild(btn);
}

// ── Load Group Data ───────────────────────────────
async function loadGroup() {
  showSkeleton();
  try {
    const res = await fetch(GROUP_PATH);
    if (!res.ok) throw new Error(`Failed to fetch info.json (${res.status})`);
    groupData = await res.json();
    renderHero();
    renderTabs();
    selectTab(0);
  } catch (err) {
    hideSkeleton();
    showEmpty(`Could not load group data: ${err.message}`);
  }
}

// ── Hero ──────────────────────────────────────────
function renderHero() {
  groupName.textContent = groupData.group || "Group 2";

  if (Array.isArray(groupData.members) && groupData.members.length > 0) {
    memberNames.textContent = groupData.members.join("  ·  ");
  } else {
    memberNames.textContent = "Members not listed.";
  }

  if (groupData.download) {
    downloadBtn.href = `./groups/group2/${groupData.download}`;
    downloadBtn.removeAttribute("aria-disabled");
  }
}

// ── Tabs ──────────────────────────────────────────
function renderTabs() {
  tabRow.innerHTML = "";
  groupData.labacts.forEach((act, i) => {
    const btn = document.createElement("button");
    btn.className = "tab-btn";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", "false");
    btn.textContent = act.name;
    btn.addEventListener("click", () => selectTab(i));
    tabRow.appendChild(btn);
  });
}

function selectTab(index) {
  activeTabIndex = index;
  activeSubIndex = 0;

  // Update tab button states
  tabRow.querySelectorAll(".tab-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
    btn.setAttribute("aria-selected", String(i === index));
  });

  const act = groupData.labacts[index];

  // Handle "Recursion" tab with subtabs
  if (act.subtabs && act.subtabs.length > 0) {
    renderSubTabs(act.subtabs);
    subTabRow.hidden = false;
    selectSubTab(act.subtabs, 0);
  } else {
    subTabRow.hidden = true;
    subTabRow.innerHTML = "";
    loadLabAct(act);
  }
}

function renderSubTabs(subtabs) {
  subTabRow.innerHTML = "";
  subtabs.forEach((sub, i) => {
    const btn = document.createElement("button");
    btn.className = "sub-tab-btn";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", "false");
    btn.textContent = sub.name;
    btn.addEventListener("click", () => selectSubTab(subtabs, i));
    subTabRow.appendChild(btn);
  });
}

function selectSubTab(subtabs, index) {
  activeSubIndex = index;
  subTabRow.querySelectorAll(".sub-tab-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
    btn.setAttribute("aria-selected", String(i === index));
  });
  loadLabAct(subtabs[index]);
}

// ── Load a Lab Act ────────────────────────────────
async function loadLabAct(act) {
  showSkeleton();
  currentMain = null;
  outputBox.textContent = "Program output will appear here.";
  outputBox.className = "output-box";

  try {
    // Load source code
    const codeRes = await fetch(`./groups/group2/${act.file}`);
    if (!codeRes.ok) throw new Error(`Source file not found: ${act.file}`);
    const codeText = await codeRes.text();

    // Extract and load main() function safely
    currentMain = extractMain(codeText);

    // Render panel
    labTitle.textContent       = act.name;
    labDescription.textContent = act.description || "";
    sourceFile.textContent     = act.file;
    codeBlock.textContent      = codeText;
    codeBlock.className        = act.file.endsWith(".java") ? "language-java" : "language-javascript";

    // Screenshot
    if (act.screenshot) {
      screenshotImage.src = `./groups/group2/${act.screenshot}`;
      screenshotImage.hidden = false;
      previewFallback.hidden = true;
      screenshotImage.onerror = () => {
        screenshotImage.hidden = true;
        previewFallback.hidden = false;
      };
    } else {
      screenshotImage.hidden = true;
      previewFallback.hidden = false;
    }

    // Input fields
    renderInputFields(act.inputs || []);

    // Highlight
    hljs.highlightElement(codeBlock);

    hideSkeleton();
    showPanel();

  } catch (err) {
    hideSkeleton();
    showEmpty(`Error loading lab act: ${err.message}`);
  }
}

// ── Input Fields ──────────────────────────────────
function renderInputFields(inputs) {
  inputFields.innerHTML = "";
  inputs.forEach((inp, i) => {
    const group = document.createElement("div");
    group.className = "input-group";

    const label = document.createElement("label");
    label.htmlFor = `input-${i}`;
    label.textContent = inp.label || `Input ${i + 1}`;

    const input = document.createElement("input");
    input.type = "text";
    input.id = `input-${i}`;
    input.placeholder = inp.placeholder || "";
    input.autocomplete = "off";
    input.spellcheck = false;

    // Run on Enter key
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") runBtn.click();
    });

    group.appendChild(label);
    group.appendChild(input);
    inputFields.appendChild(group);
  });
}

// ── Run Button ────────────────────────────────────
runBtn.addEventListener("click", () => {
  if (!currentMain) {
    outputBox.textContent = "Error: No algorithm loaded.";
    outputBox.className = "output-box error";
    return;
  }

  const inputs = Array.from(inputFields.querySelectorAll("input")).map(i => i.value);

  try {
    const result = currentMain(inputs);
    outputBox.textContent = result ?? "(no output)";
    outputBox.className = "output-box success";
  } catch (err) {
    outputBox.textContent = `Error: ${err.message}`;
    outputBox.className = "output-box error";
  }
});

// ── Extract main() from JS source ─────────────────
function extractMain(source) {
  // Safely evaluate the JS file and return its main function
  // We use Function constructor to sandbox it (no window access)
  try {
    const wrapped = `${source}\nreturn main;`;
    // eslint-disable-next-line no-new-func
    const factory = new Function(wrapped);
    const fn = factory();
    if (typeof fn !== "function") throw new Error("main() not found in source.");
    return fn;
  } catch (err) {
    throw new Error(`Could not load algorithm: ${err.message}`);
  }
}

// ── UI State Helpers ──────────────────────────────
function showSkeleton() {
  skeletonState.style.display = "flex";
  emptyState.hidden = true;
  labPanel.hidden   = true;
}

function hideSkeleton() {
  skeletonState.style.display = "none";
}

function showPanel() {
  emptyState.hidden = true;
  labPanel.hidden   = false;
}

function showEmpty(msg) {
  emptyState.hidden = false;
  emptyState.textContent = msg || "Select a lab act to get started.";
  labPanel.hidden = true;
}
