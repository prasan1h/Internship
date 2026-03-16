// Progressive Form Flow Controller
// This script manages the multi-step vehicle selling form with proper validation and flow control

document.addEventListener("DOMContentLoaded", function () {
  // Configuration: Define the flow order
  const flowOrder = [
    "brand",
    "vehicle_type",
    "model",
    "model-year",
    "vehicle-colour",
    "purchase-details",
    "owner-type",
    "reg-photos",
    "inspection",
    "contact-info",
  ];

  // Track which steps have been completed
  const completedSteps = new Set();
  let currentStep = "brand"; // Start with brand

  // Initialize the form
  function init() {
    // Hide all sections initially except the first one
    hideAllSections();
    showSection("brand");
    updateStepMenu();
    attachEventListeners();
    updateStepCounter();
  }

  // Hide all content sections
  function hideAllSections() {
    const sections = document.querySelectorAll(
      '[id^="brand"], [id^="vehicle"], [id^="model"], [id^="owner"], [id^="purchase"], [id^="reg"], [id^="inspection"], [id^="contact"]',
    );
    sections.forEach((section) => {
      section.style.display = "none";
    });
  }

  // Show a specific section
  function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.display = "block";
      currentStep = sectionId;
    }
  }

  // Update step menu styling based on completion status
  function updateStepMenu() {
    flowOrder.forEach((step, index) => {
      const menuButton = document.getElementById(`menu-${step}`);
      if (!menuButton) return;

      const currentIndex = flowOrder.indexOf(currentStep);
      const stepIndex = index;

      // Reset classes
      menuButton.className =
        "w-fit h-fit py-1 px-3 rounded-full transition-all";

      if (step === currentStep) {
        // Active step - dark blue background
        menuButton.classList.add("bg-secondary", "text-white", "font-semibold");
        menuButton.disabled = false;
      } else if (completedSteps.has(step)) {
        // Completed step - filled blue
        menuButton.classList.add("bg-secondary", "text-white");
        menuButton.disabled = false;
      } else if (stepIndex === currentIndex + 1 && isCurrentStepValid()) {
        // Next available step - enabled outline
        menuButton.classList.add(
          "bg-white",
          "text-secondary",
          "border-2",
          "border-secondary",
        );
        menuButton.disabled = false;
      } else if (stepIndex > currentIndex) {
        // Future steps - disabled
        menuButton.classList.add(
          "bg-gray-100",
          "text-gray-400",
          "border-2",
          "border-gray-300",
          "cursor-not-allowed",
        );
        menuButton.disabled = true;
      } else {
        // Previous steps (not completed) - outline
        menuButton.classList.add(
          "bg-white",
          "text-secondary",
          "border-2",
          "border-secondary",
        );
        menuButton.disabled = false;
      }
    });
  }

  // Check if current step has a valid selection
  function isCurrentStepValid() {
    const currentSection = document.getElementById(currentStep);
    if (!currentSection) return false;

    // Check based on section type
    if (
      currentStep === "brand" ||
      currentStep === "vehicle_type" ||
      currentStep === "owner-type"
    ) {
      // Check if any option card is selected
      const selectedCard = currentSection.querySelector(".selected-card");
      return selectedCard !== null;
    }

    if (currentStep === "model") {
      // Check if model search has a value or an option is selected
      const selectedCard = currentSection.querySelector(".selected-card");
      return selectedCard !== null;
    }

    if (currentStep === "model-year") {
      // Check if any year button is selected
      const selectedYear = currentSection.querySelector(".selected-year");
      return selectedYear !== null;
    }

    if (currentStep === "vehicle-colour") {
      // Check if any color option is selected
      const selectedColor = currentSection.querySelector(".selected-color");
      return selectedColor !== null;
    }

    if (currentStep === "purchase-details") {
      // Check if both date and amount are filled
      const dateInput = currentSection.querySelector('input[type="date"]');
      const amountInput = currentSection.querySelector('input[type="number"]');
      return dateInput && dateInput.value && amountInput && amountInput.value;
    }

    if (currentStep === "reg-photos") {
      // Check if at least the front view is uploaded
      const frontPreview = document.getElementById("preview-front");
      const hasImage = frontPreview && frontPreview.querySelector("img");
      return hasImage !== null;
    }

    if (currentStep === "inspection") {
      // Check if date and branch are selected
      const dateInput = currentSection.querySelector('input[type="date"]');
      const branchSelect = currentSection.querySelector("select");
      return dateInput && dateInput.value && branchSelect && branchSelect.value;
    }

    if (currentStep === "contact-info") {
      // Check if all contact fields are filled
      const inputs = currentSection.querySelectorAll("input");
      let allFilled = true;
      inputs.forEach((input) => {
        if (!input.value) allFilled = false;
      });
      return allFilled;
    }

    return false;
  }

  // Attach event listeners to all interactive elements
  function attachEventListeners() {
    // Menu button clicks
    flowOrder.forEach((step) => {
      const menuButton = document.getElementById(`menu-${step}`);
      if (menuButton) {
        menuButton.addEventListener("click", function () {
          if (!this.disabled) {
            navigateToStep(step);
          }
        });
      }
    });

    // Brand selection
    attachCardSelectionListeners("brand");

    // Vehicle type selection
    attachCardSelectionListeners("vehicle_type");

    // Model selection
    attachCardSelectionListeners("model");

    // Model year selection
    attachYearSelectionListeners();

    // Color selection
    attachColorSelectionListeners();

    // Owner type selection
    attachCardSelectionListeners("owner-type");

    // Purchase details inputs
    attachPurchaseDetailsListeners();

    // Inspection inputs
    attachInspectionListeners();

    // Contact form submission
    attachContactFormListener();

    // Back button
    const backButton = document.querySelector('[data-lucide="arrow-left"]');
    if (backButton) {
      backButton.parentElement.style.cursor = "pointer";
      backButton.parentElement.addEventListener("click", goToPreviousStep);
    }
  }

  // Generic card selection for brand, vehicle type, model, owner type
  function attachCardSelectionListeners(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const cards = section.querySelectorAll(
      ".flex.flex-col.justify-center.gap-4.border-2",
    );
    cards.forEach((card) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", function () {
        // Remove selection from all cards in this section
        cards.forEach((c) => {
          c.classList.remove(
            "selected-card",
            "bg-secondary",
            "text-white",
            "border-secondary",
          );
          c.classList.add("border-gray-300");
          const text = c.querySelector("p");
          if (text) text.classList.remove("text-white");
        });

        // Add selection to clicked card
        this.classList.add("selected-card", "bg-secondary", "border-secondary");
        this.classList.remove("border-gray-300");
        const text = this.querySelector("p");
        if (text) text.classList.add("text-white");

        // Update menu and potentially auto-advance
        updateStepMenu();

        // Auto-advance to next step after a short delay
        setTimeout(() => {
          goToNextStep();
        }, 500);
      });
    });
  }

  // Year selection
  function attachYearSelectionListeners() {
    const section = document.getElementById("model-year");
    if (!section) return;

    const yearButtons = section.querySelectorAll("button");
    yearButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove selection from all year buttons
        yearButtons.forEach((btn) => {
          btn.classList.remove("selected-year", "bg-secondary", "text-white");
          btn.classList.add("bg-white", "text-black");
        });

        // Add selection to clicked button
        this.classList.add("selected-year", "bg-secondary", "text-white");
        this.classList.remove("bg-white", "text-black");

        // Update menu and auto-advance
        updateStepMenu();
        setTimeout(() => {
          goToNextStep();
        }, 500);
      });
    });
  }

  // Color selection
  function attachColorSelectionListeners() {
    const section = document.getElementById("vehicle-colour");
    if (!section) return;

    const colorButtons = section.querySelectorAll("button");
    colorButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove selection from all color buttons
        colorButtons.forEach((btn) => {
          btn.classList.remove("selected-color", "bg-secondary", "text-white");
          btn.classList.add("bg-white", "text-black");
        });

        // Add selection to clicked button
        this.classList.add("selected-color", "bg-secondary", "text-white");
        this.classList.remove("bg-white", "text-black");

        // Update menu and auto-advance
        updateStepMenu();
        setTimeout(() => {
          goToNextStep();
        }, 500);
      });
    });
  }

  // Purchase details validation
  function attachPurchaseDetailsListeners() {
    const section = document.getElementById("purchase-details");
    if (!section) return;

    const inputs = section.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        updateStepMenu();

        // Auto-advance if both fields are filled
        if (isCurrentStepValid()) {
          setTimeout(() => {
            goToNextStep();
          }, 1000);
        }
      });
    });
  }

  // Photo Upload Functionality
  function setupPhotoUploads() {
    const uploadInputs = [
      { id: "upload-front", preview: "preview-front" },
      { id: "upload-rear", preview: "preview-rear" },
      { id: "upload-right", preview: "preview-right" },
      { id: "upload-left", preview: "preview-left" },
      { id: "upload-dashboard", preview: "preview-dashboard" },
    ];

    uploadInputs.forEach((input) => {
      const fileInput = document.getElementById(input.id);
      if (fileInput) {
        fileInput.addEventListener("change", function (e) {
          const file = e.target.files[0];
          if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (event) {
              const previewContainer = document.getElementById(input.preview);
              previewContainer.innerHTML = `
                            <img src="${event.target.result}" alt="Preview" class="w-32 h-32 object-cover rounded-md border-2 border-green-500">
                            <div class="absolute top-0 right-0 bg-green-500 text-white rounded-full p-1">
                                <i data-lucide="check" class="w-4 h-4"></i>
                            </div>
                        `;
              lucide.createIcons(); // Re-initialize icons
              updateStepMenu(); // Update validation
            };
            reader.readAsDataURL(file);
          }
        });
      }
    });
  }

  // Call this function in your init() function
  setupPhotoUploads();

  // Inspection validation
  function attachInspectionListeners() {
    const section = document.getElementById("inspection");
    if (!section) return;

    const dateInput = section.querySelector('input[type="date"]');
    const branchSelect = section.querySelector("select");

    [dateInput, branchSelect].forEach((element) => {
      if (element) {
        element.addEventListener("change", function () {
          updateStepMenu();

          // Auto-advance if both fields are filled
          if (isCurrentStepValid()) {
            setTimeout(() => {
              goToNextStep();
            }, 500);
          }
        });
      }
    });
  }

  // Contact form
  function attachContactFormListener() {
    const section = document.getElementById("contact-info");
    if (!section) return;

    const form = section.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (isCurrentStepValid()) {
          alert(
            "Form submitted successfully! Your vehicle details have been recorded.",
          );
          // Here you would typically send the data to your backend
        } else {
          alert("Please fill in all required fields.");
        }
      });

      // Real-time validation
      const inputs = section.querySelectorAll("input");
      inputs.forEach((input) => {
        input.addEventListener("input", function () {
          updateStepMenu();
        });
      });
    }
  }

  // Navigate to a specific step
  function navigateToStep(step) {
    const stepIndex = flowOrder.indexOf(step);
    const currentIndex = flowOrder.indexOf(currentStep);

    // Only allow navigation if:
    // 1. Going to a completed step
    // 2. Going to the next step if current is valid
    // 3. Going to current step
    if (
      completedSteps.has(step) ||
      (stepIndex === currentIndex + 1 && isCurrentStepValid()) ||
      step === currentStep ||
      stepIndex < currentIndex
    ) {
      hideAllSections();
      showSection(step);
      updateStepMenu();
      updateStepCounter();
    }
  }

  // Go to next step
  function goToNextStep() {
    if (!isCurrentStepValid()) {
      return;
    }

    // Mark current step as completed
    completedSteps.add(currentStep);

    // Find next step
    const currentIndex = flowOrder.indexOf(currentStep);
    if (currentIndex < flowOrder.length - 1) {
      const nextStep = flowOrder[currentIndex + 1];
      navigateToStep(nextStep);
    }
  }

  // Go to previous step
  function goToPreviousStep() {
    const currentIndex = flowOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      const previousStep = flowOrder[currentIndex - 1];
      navigateToStep(previousStep);
    }
  }

  // Update step counter
  function updateStepCounter() {
    const stepCounter = document.getElementById("steps");
    if (stepCounter) {
      const currentIndex = flowOrder.indexOf(currentStep) + 1;
      stepCounter.textContent = `${currentIndex}/${flowOrder.length}`;
    }
  }

  // Initialize the form
  init();
});
