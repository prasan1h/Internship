document.addEventListener("DOMContentLoaded", function () {
  const flowOrder = [
    "brand",
    "vehicle_type",
    "model",
    "model-year",
    "vehicle-colour",
    "purchase-details",
    "owner-type",
    "reg-photos",
    "inspection-details",
    "contact-info",
  ];

  const formData = {
    brand: null,
    vehicleType: null,
    model: null,
    modelYear: null,
    colour: null,
    purchaseDate: null,
    purchaseAmount: null,
    ownerType: null,
    photos: {
      front: null,
      rear: null,
      right: null,
      left: null,
      dashboard: null,
    },
    inspectionDate: null,
    inspectionBranch: null,
    contactName: null,
    contactMobile: null,
    contactEmail: null,
  };

  const completedSteps = new Set();
  let currentStep = "brand";

  function init() {
    hideAllSections();
    showSection("brand");
    updateStepMenu();
    attachEventListeners();
    updateStepCounter();
    updateBackArrowVisibility();
    setupDateInputs();
    setupMobileInput();
  }

  function setupDateInputs() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const purchaseDateInput = document.getElementById("purchase-date");
    if (purchaseDateInput) {
      purchaseDateInput.max = yesterday.toISOString().split("T")[0];
    }

    const inspectionDateInput = document.getElementById("inspection-date");
    if (inspectionDateInput) {
      inspectionDateInput.min = tomorrow.toISOString().split("T")[0];
    }
  }

  function setupMobileInput() {
    const mobileInput = document.getElementById("contact-mobile");
    if (mobileInput) {
      mobileInput.addEventListener("input", function (e) {
        this.value = this.value.replace(/\D/g, "");

        if (this.value.length > 10) {
          this.value = this.value.slice(0, 10);
        }

        formData.contactMobile = this.value;
        saveFormData();
        updateStepMenu();
      });
    }
  }

  function saveFormData() {
    localStorage.setItem("vehicleFormData", JSON.stringify(formData));
    // console.log('Form Data Updated:', JSON.stringify(formData, null, 2));
  }

  // Update back arrow visibility
  function updateBackArrowVisibility() {
    const backArrowContainer = document.getElementById("back-arrow-container");
    const currentIndex = flowOrder.indexOf(currentStep);

    if (currentIndex > 0) {
      backArrowContainer.classList.remove("hidden");
    } else {
      backArrowContainer.classList.add("hidden");
    }
  }

  // Hide all content sections
  function hideAllSections() {
    const sections = document.querySelectorAll(
      '[id^="brand"], [id^="vehicle"], [id^="model"], [id^="owner"], [id^="purchase-details"], [id^="reg"], [id^="inspection-details"], [id^="contact-info"]',
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
      updateBackArrowVisibility();
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
        menuButton.classList.add("bg-secondary", "text-white", "font-semibold");
        menuButton.disabled = false;
      } else if (completedSteps.has(step)) {
        menuButton.classList.add("bg-secondary", "text-white");
        menuButton.disabled = false;
      } else if (stepIndex === currentIndex + 1 && isCurrentStepValid()) {
        menuButton.classList.add(
          "bg-white",
          "text-secondary",
          "border-2",
          "border-secondary",
        );
        menuButton.disabled = false;
      } else if (stepIndex > currentIndex) {
        menuButton.classList.add(
          "bg-gray-100",
          "text-gray-400",
          "border-2",
          "border-gray-300",
          "cursor-not-allowed",
        );
        menuButton.disabled = true;
      } else {
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

    if (
      currentStep === "brand" ||
      currentStep === "vehicle_type" ||
      currentStep === "owner-type"
    ) {
      const selectedCard = currentSection.querySelector(".selected-card");
      return selectedCard !== null;
    }

    if (currentStep === "model") {
      const selectedCard = currentSection.querySelector(".selected-card");
      return selectedCard !== null;
    }

    if (currentStep === "model-year") {
      const selectedYear = currentSection.querySelector(".selected-year");
      return selectedYear !== null;
    }

    if (currentStep === "vehicle-colour") {
      const selectedColor = currentSection.querySelector(".selected-color");
      return selectedColor !== null;
    }

    if (currentStep === "purchase-details") {
      const dateInput = document.getElementById("purchase-date");
      const amountInput = document.getElementById("purchase-amount");
      return dateInput && dateInput.value && amountInput && amountInput.value;
    }

    if (currentStep === "reg-photos") {
      const frontPreview = document.getElementById("preview-front");
      const hasImage = frontPreview && frontPreview.querySelector("img");
      return hasImage !== null;
    }

    if (currentStep === "inspection-details") {
      const idateInput = document.getElementById("inspection-date");
      const branchSelect = document.getElementById("inspection-branch");
      return (
        idateInput && idateInput.value && branchSelect && branchSelect.value
      );
    }

    if (currentStep === "contact-info") {
      const nameInput = document.getElementById("contact-name");
      const mobileInput = document.getElementById("contact-mobile");
      const emailInput = document.getElementById("contact-email");

      return (
        nameInput &&
        nameInput.value &&
        mobileInput &&
        mobileInput.value.length === 10 &&
        emailInput &&
        emailInput.value
      );
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

    attachCardSelectionListeners("brand");
    attachCardSelectionListeners("vehicle_type");
    attachCardSelectionListeners("model");
    attachYearSelectionListeners();
    attachColorSelectionListeners();
    attachCardSelectionListeners("owner-type");
    attachPurchaseDetailsListeners();
    setupPhotoUploads();
    attachInspectionListeners();
    attachContactFormListener();

    // Back button
    const backButton = document.getElementById("back-arrow-container");
    if (backButton) {
      backButton.addEventListener("click", goToPreviousStep);
    }
  }

  // Generic card selection
  function attachCardSelectionListeners(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const cards = section.querySelectorAll(
      ".flex.flex-col.justify-center.gap-4.border-2",
    );
    cards.forEach((card) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", function () {
        const value = this.getAttribute("data-value");

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

        this.classList.add("selected-card", "bg-secondary", "border-secondary");
        this.classList.remove("border-gray-300");
        const text = this.querySelector("p");
        if (text) text.classList.add("text-white");

        // Update form data
        if (sectionId === "brand") {
          formData.brand = value;
        } else if (sectionId === "vehicle_type") {
          formData.vehicleType = value;
        } else if (sectionId === "model") {
          formData.model = value;
        } else if (sectionId === "owner-type") {
          formData.ownerType = value;
        }
        saveFormData();

        updateStepMenu();
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
        const value = this.getAttribute("data-value");

        yearButtons.forEach((btn) => {
          btn.classList.remove("selected-year", "bg-secondary", "text-white");
          btn.classList.add("bg-white", "text-black");
        });

        this.classList.add("selected-year", "bg-secondary", "text-white");
        this.classList.remove("bg-white", "text-black");

        formData.modelYear = value;
        saveFormData();

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
        const value = this.getAttribute("data-value");

        colorButtons.forEach((btn) => {
          btn.classList.remove("selected-color", "bg-secondary", "text-white");
          btn.classList.add("bg-white", "text-black");
        });

        this.classList.add("selected-color", "bg-secondary", "text-white");
        this.classList.remove("bg-white", "text-black");

        formData.colour = value;
        saveFormData();

        updateStepMenu();
        setTimeout(() => {
          goToNextStep();
        }, 500);
      });
    });
  }

  // Purchase details validation with longer delay
  function attachPurchaseDetailsListeners() {
    const dateInput = document.getElementById("purchase-date");
    const amountInput = document.getElementById("purchase-amount");

    if (dateInput) {
      dateInput.addEventListener("change", function () {
        formData.purchaseDate = this.value;
        saveFormData();
        updateStepMenu();

        if (isCurrentStepValid()) {
          setTimeout(() => {
            goToNextStep();
          }, 2000); // 2 seconds delay
        }
      });
    }

    if (amountInput) {
      let typingTimer;
      amountInput.addEventListener("input", function () {
        clearTimeout(typingTimer);
        formData.purchaseAmount = this.value;
        saveFormData();
        updateStepMenu();

        // Wait 3 seconds after user stops typing
        typingTimer = setTimeout(() => {
          if (isCurrentStepValid()) {
            goToNextStep();
          }
        }, 3000);
      });
    }
  }

  // Photo Upload Functionality with fixed card size
  function setupPhotoUploads() {
    const uploadInputs = [
      { id: "upload-front", preview: "preview-front", key: "front" },
      { id: "upload-rear", preview: "preview-rear", key: "rear" },
      { id: "upload-right", preview: "preview-right", key: "right" },
      { id: "upload-left", preview: "preview-left", key: "left" },
      {
        id: "upload-dashboard",
        preview: "preview-dashboard",
        key: "dashboard",
      },
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
                <img src="${event.target.result}" alt="Preview" class="w-full h-full object-cover rounded-md">
              `;
              previewContainer.classList.remove("border-gray-300");
              previewContainer.classList.add("border-green-500", "border-2");

              // Store image data
              formData.photos[input.key] = event.target.result;
              saveFormData();

              lucide.createIcons();
              updateStepMenu();
              updatePhotosNextButton();
            };
            reader.readAsDataURL(file);
          }
        });
      }
    });

    // Photos next button
    const photosNextBtn = document.getElementById("photos-next-btn");
    if (photosNextBtn) {
      photosNextBtn.addEventListener("click", function () {
        if (isCurrentStepValid()) {
          goToNextStep();
        }
      });
    }
  }

  // Update photos next button state
  function updatePhotosNextButton() {
    const photosNextBtn = document.getElementById("photos-next-btn");
    if (photosNextBtn) {
      if (isCurrentStepValid()) {
        photosNextBtn.disabled = false;
        photosNextBtn.classList.remove("bg-gray-400", "cursor-not-allowed");
        photosNextBtn.classList.add("bg-secondary");
      } else {
        photosNextBtn.disabled = true;
        photosNextBtn.classList.add("bg-gray-400", "cursor-not-allowed");
        photosNextBtn.classList.remove("bg-secondary");
      }
    }
  }

  function attachInspectionListeners() {
    const dateInput = document.getElementById("inspection-date");
    const branchSelect = document.getElementById("inspection-branch");

    function checkAndProceed() {
      if (isCurrentStepValid()) {
        setTimeout(() => {
          goToNextStep();
        }, 500);
      }
    }

    if (dateInput) {
      dateInput.addEventListener("change", function () {
        formData.inspectionDate = this.value;
        saveFormData();
        updateStepMenu();
        checkAndProceed();
      });
    }

    if (branchSelect) {
      branchSelect.addEventListener("change", function () {
        formData.inspectionBranch = this.value;
        saveFormData();
        updateStepMenu();
        checkAndProceed();
      });
    }
  }

  // Contact form
  function attachContactFormListener() {
    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (isCurrentStepValid()) {
          alert(
            "Form submitted successfully! Your vehicle details have been recorded.",
          );
          console.log("Final Form Data:", JSON.stringify(formData, null, 2));

          // You can send the data to your backend here
          // Example: fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) })
        } else {
          alert("Please fill in all required fields correctly.");
        }
      });

      // Real-time validation for all inputs
      const nameInput = document.getElementById("contact-name");
      const emailInput = document.getElementById("contact-email");

      if (nameInput) {
        nameInput.addEventListener("input", function () {
          formData.contactName = this.value;
          saveFormData();
          updateStepMenu();
        });
      }

      if (emailInput) {
        emailInput.addEventListener("input", function () {
          formData.contactEmail = this.value;
          saveFormData();
          updateStepMenu();
        });
      }
    }
  }

  // Navigate to a specific step
  function navigateToStep(step) {
    const stepIndex = flowOrder.indexOf(step);
    const currentIndex = flowOrder.indexOf(currentStep);

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
      updateBackArrowVisibility();

      // Update photos button state when navigating to photos section
      if (step === "reg-photos") {
        updatePhotosNextButton();
      }
    }
  }

  // Go to next step
  function goToNextStep() {
    if (!isCurrentStepValid()) {
      return;
    }

    completedSteps.add(currentStep);

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

  // Load saved data if exists
  const savedData = localStorage.getItem("vehicleFormData");
  if (savedData) {
    // console.log('Previously saved data found:', savedData);
  }
});
