/* ==========================================================================
   BookVerse — custom scripts
   Guarded so each feature only runs on the page that has the matching markup:
   1. Gallery/book modal — shared Bootstrap modal, Previous/Next navigation
   2. Status filter (books.html) — <select> driven show/hide via data-status
   3. Add-book form (add.html) — file extension validation + live preview
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initImageModal();
  initStatusFilter();
  initAddBookForm();
});

/* --------------------------------------------------------------------- */
/* 1. Shared image modal with Previous / Next                           */
/* --------------------------------------------------------------------- */
function initImageModal() {
  const modalEl = document.getElementById("imageModal");
  if (!modalEl) return; // not on this page

  const modalImg = document.getElementById("imageModalImg");
  const modalTitle = document.getElementById("imageModalLabel");
  const prevBtn = document.getElementById("modalPrevBtn");
  const nextBtn = document.getElementById("modalNextBtn");
  const bsModal = new bootstrap.Modal(modalEl);

  // Every clickable cover on the page, in document order, so Prev/Next can
  // step through them regardless of which one was opened first.
  const triggers = Array.from(document.querySelectorAll("[data-gallery-img]"));
  let currentIndex = 0;

  function showByIndex(index) {
    if (!triggers.length) return;
    currentIndex = (index + triggers.length) % triggers.length;
    const trigger = triggers[currentIndex];
    modalImg.src = trigger.getAttribute("src");
    modalImg.alt = trigger.getAttribute("alt") || "";
    modalTitle.textContent = trigger.dataset.title || trigger.alt || "Book cover";
  }

  triggers.forEach((img, index) => {
    img.addEventListener("click", function () {
      showByIndex(index);
      bsModal.show();
    });
  });

  if (prevBtn) prevBtn.addEventListener("click", () => showByIndex(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showByIndex(currentIndex + 1));
}

/* --------------------------------------------------------------------- */
/* 2. Status filter (books.html) — driven by a <select>                  */
/* --------------------------------------------------------------------- */
function initStatusFilter() {
  const select = document.getElementById("statusFilter");
  if (!select) return; // not on this page

  const rows = document.querySelectorAll("[data-status]");

  select.addEventListener("change", function () {
    const filter = this.value; // "All" | "Available" | "Reserved" | "Sold"

    rows.forEach((row) => {
      const matches = filter === "All" || filter === row.dataset.status;
      row.classList.toggle("d-none", !matches);
    });
  });
}

/* --------------------------------------------------------------------- */
/* 3. Add-book form: image_path extension check + preview (add.html)     */
/* --------------------------------------------------------------------- */
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

function initAddBookForm() {
  const form = document.getElementById("addBookForm");
  if (!form) return; // not on this page

  const fileInput = document.getElementById("image_path");
  const preview = document.getElementById("imagePreview");
  const selectedLabel = document.getElementById("fileSelectedLabel");
  const fileFeedback = document.getElementById("imagePathFeedback");

  fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) {
      preview.classList.remove("show");
      selectedLabel.textContent = "";
      return;
    }

    const extension = file.name.split(".").pop().toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      this.classList.add("is-invalid");
      this.classList.remove("is-valid");
      fileFeedback.textContent =
        "Unsupported file type. Please choose a " +
        ALLOWED_EXTENSIONS.join(", ") +
        " image.";
      preview.classList.remove("show");
      preview.removeAttribute("src");
      selectedLabel.textContent = "";
      return;
    }

    this.classList.remove("is-invalid");
    this.classList.add("is-valid");
    selectedLabel.textContent = "Selected: " + file.name;

    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.classList.add("show");
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // static site — no backend to post to yet

    if (!form.checkValidity() || fileInput.classList.contains("is-invalid")) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    showSuccessMessage();
    form.reset();
    preview.classList.remove("show");
    fileInput.classList.remove("is-valid");
    selectedLabel.textContent = "";
    form.classList.remove("was-validated");
  });
}

function showSuccessMessage() {
  const alertBox = document.getElementById("formSuccessAlert");
  if (!alertBox) return;
  alertBox.classList.remove("d-none");
  alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => alertBox.classList.add("d-none"), 4000);
}
