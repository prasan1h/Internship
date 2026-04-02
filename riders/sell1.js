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
    registrationNumber: null,
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


  function setupHeroButton() {
    const startSellingBtn = document.getElementById("start-selling-btn");
    const heroSection = document.getElementById("hero-section");
    const benefitsSection = document.getElementById("benefits-section");
    const sellFormSection = document.getElementById("sell-form-section");
    
    if (startSellingBtn) {
      startSellingBtn.addEventListener("click", function() {

        if (heroSection) heroSection.classList.add("hidden");
        if (benefitsSection) benefitsSection.classList.add("hidden");
        

        if (sellFormSection) sellFormSection.classList.remove("hidden");
        

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

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
  }

  document.getElementById("clear").addEventListener("click", delFormData);

  function delFormData() {

    localStorage.removeItem("vehicleFormData");

    formData.brand = null;
    formData.vehicleType = null;
    formData.model = null;
    formData.modelYear = null;
    formData.colour = null;
    formData.purchaseDate = null;
    formData.purchaseAmount = null;
    formData.ownerType = null;
    formData.registrationNumber = null;
    formData.photos = {
      front: null,
      rear: null,
      right: null,
      left: null,
      dashboard: null,
    };
    formData.inspectionDate = null;
    formData.inspectionBranch = null;
    formData.contactName = null;
    formData.contactMobile = null;
    formData.contactEmail = null;
    
    // Clear completed steps
    completedSteps.clear();
    
    // Remove all visual selections from cards
    document.querySelectorAll('.selected-card').forEach(card => {
      card.classList.remove('selected-card', 'border-secondary', 'bg-blue-50');
      card.classList.add('border-gray-300');
    });
    
    document.querySelectorAll('.selected-year').forEach(year => {
      year.classList.remove('selected-year', 'border-secondary', 'bg-blue-50');
      year.classList.add('border-gray-300');
    });
    
    document.querySelectorAll('.selected-color').forEach(color => {
      color.classList.remove('selected-color', 'border-secondary', 'bg-blue-50');
      color.classList.add('border-gray-300');
    });
    
    // Clear all input fields
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], input[type="number"]');
    inputs.forEach(input => {
      input.value = '';
    });
    
    // Clear select fields
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      select.value = '';
    });
    
    // Reset photo previews
    const photoInputs = [
      { preview: "preview-front", key: "front" },
      { preview: "preview-rear", key: "rear" },
      { preview: "preview-right", key: "right" },
      { preview: "preview-left", key: "left" },
      { preview: "preview-dashboard", key: "dashboard" },
    ];
    
    photoInputs.forEach(photo => {
      const previewContainer = document.getElementById(photo.preview);
      if (previewContainer) {
        previewContainer.innerHTML = `
          <div class="text-center">
            <i data-lucide="upload" class="w-12 h-12 mx-auto mb-2 text-gray-400"></i>
            <p class="text-sm text-gray-500">Click to upload</p>
          </div>
        `;
        previewContainer.classList.remove("border-green-500", "border-2");
        previewContainer.classList.add("border-gray-300");
      }
      
      // Clear file inputs
      const fileInput = document.getElementById(`upload-${photo.key}`);
      if (fileInput) {
        fileInput.value = '';
      }
    });
    
    // Hide custom model input if visible
    const customInput = document.getElementById("custom-model-input");
    if (customInput) {
      customInput.classList.add("hidden");
    }
    
    // Reset purchase button
    const purchaseNextBtn = document.getElementById("purchase-next-btn");
    if (purchaseNextBtn) {
      purchaseNextBtn.disabled = true;
      purchaseNextBtn.className = "px-8 py-3 bg-gray-400 text-white font-semibold rounded-md transition-all cursor-not-allowed disabled:bg-gray-400 disabled:cursor-not-allowed";
    }
    
    // Reset photos button
    const photosNextBtn = document.getElementById("photos-next-btn");
    if (photosNextBtn) {
      photosNextBtn.disabled = true;
      photosNextBtn.className = "px-8 py-3 bg-gray-400 text-white font-semibold rounded-md transition-all cursor-not-allowed disabled:bg-gray-400 disabled:cursor-not-allowed";
    }
    
    // Recreate lucide icons
    lucide.createIcons();
    
    // Go back to brand section (first step)
    navigateToStep("brand");
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
      '[id^="brand"], [id^="vehicle"], [id^="model"], [id^="owner"], [id^="purchase-details"], [id^="reg-photos"], [id^="inspection-details"], [id^="contact-info"]',
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
      const customInput = document.getElementById("custom-model-name");
      return selectedCard !== null || (customInput && customInput.value.trim().length > 0);
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
      const regNumber = document.getElementById("registration-number");
      return hasImage !== null && regNumber && regNumber.value.trim().length > 0;
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

    // Back arrow
    const backArrow = document.getElementById("back-arrow-container");
    if (backArrow) {
      backArrow.addEventListener("click", goToPreviousStep);
    }

    // Brand selection
    setupCardSelection("brand", "brand");

    // Vehicle type selection
    setupCardSelection("vehicle_type", "vehicleType");

    // Model selection
    setupModelSelection();

    // Year selection
    setupYearSelection();

    // Color selection
    setupColorSelection();

    // Purchase details
    setupPurchaseDetails();

    // Owner type
    setupCardSelection("owner-type", "ownerType");

    // Photos and registration
    setupPhotoUploads();

    // Inspection details
    attachInspectionListeners();

    // Contact form
    attachContactFormListener();
  }

  // Generic card selection setup
  function setupCardSelection(sectionId, dataKey) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const cards = section.querySelectorAll('[data-value]');
    cards.forEach((card) => {
      card.addEventListener("click", function () {
        // Remove selection from all cards
        cards.forEach((c) => {
          c.classList.remove("selected-card", "border-secondary", "bg-blue-50");
          c.classList.add("border-gray-300");
        });

        // Add selection to clicked card
        this.classList.add("selected-card", "border-secondary", "bg-blue-50");
        this.classList.remove("border-gray-300");

        // Update form data
        formData[dataKey] = this.dataset.value;
        saveFormData();
        updateStepMenu();

        // Auto-advance after 800ms
        setTimeout(() => {
          if (isCurrentStepValid()) {
            goToNextStep();
          }
        }, 800);
      });
    });
  }

  // Setup model selection with Others option
  function setupModelSelection() {
    const modelSection = document.getElementById("model");
    if (!modelSection) return;

    const modelCards = modelSection.querySelectorAll('[data-value]');
    const customInput = document.getElementById("custom-model-input");
    const customModelName = document.getElementById("custom-model-name");
    const othersCard = document.getElementById("others-model-card");

    modelCards.forEach((card) => {
      card.addEventListener("click", function() {
        const modelValue = this.dataset.value;
        
        // Remove all selections
        modelCards.forEach(c => {
          c.classList.remove("selected-card", "border-secondary", "bg-blue-50");
          c.classList.add("border-gray-300");
        });
        
        // Mark this as selected
        this.classList.add("selected-card", "border-secondary", "bg-blue-50");
        this.classList.remove("border-gray-300");
        
        if (modelValue === "Others") {
          // Show custom input
          customInput.classList.remove("hidden");
          customModelName.focus();
          formData.model = null; // Clear until user types
        } else {
          // Hide custom input
          customInput.classList.add("hidden");
          customModelName.value = "";
          formData.model = modelValue;
          saveFormData();
          updateStepMenu();
          
          setTimeout(() => {
            if (isCurrentStepValid()) {
              goToNextStep();
            }
          }, 800);
        }
      });
    });
    
    // Handle custom model input
    if (customModelName) {
      customModelName.addEventListener("input", function() {
        formData.model = this.value.trim() || null;
        saveFormData();
        updateStepMenu();
        
        if (this.value.trim().length > 0) {
          clearTimeout(this.typingTimer);
          this.typingTimer = setTimeout(() => {
            if (isCurrentStepValid()) {
              goToNextStep();
            }
          }, 1200);
        }
      });
    }
  }

  // Year selection with static HTML
  function setupYearSelection() {
    const yearSection = document.getElementById("model-year");
    if (!yearSection) return;

    const yearCards = yearSection.querySelectorAll('[data-value]');
    
    yearCards.forEach((yearCard) => {
      yearCard.addEventListener("click", function () {
        // Remove all selections
        yearCards.forEach((y) => {
          y.classList.remove("selected-year", "border-secondary", "bg-blue-50");
          y.classList.add("border-gray-300");
        });

        // Mark this as selected
        this.classList.add("selected-year", "border-secondary", "bg-blue-50");
        this.classList.remove("border-gray-300");

        formData.modelYear = this.dataset.value;
        saveFormData();
        updateStepMenu();

        setTimeout(() => {
          if (isCurrentStepValid()) {
            goToNextStep();
          }
        }, 800);
      });
    });
  }

  // Color selection
  function setupColorSelection() {
    const colorSection = document.getElementById("vehicle-colour");
    if (!colorSection) return;

    const colorCards = colorSection.querySelectorAll('[data-value]');
    colorCards.forEach((card) => {
      card.addEventListener("click", function () {
        colorCards.forEach((c) => {
          c.classList.remove("selected-color", "border-secondary", "bg-blue-50");
          c.classList.add("border-gray-300");
        });

        this.classList.add("selected-color", "border-secondary", "bg-blue-50");
        this.classList.remove("border-gray-300");

        formData.colour = this.dataset.value;
        saveFormData();
        updateStepMenu();

        setTimeout(() => {
          if (isCurrentStepValid()) {
            goToNextStep();
          }
        }, 800);
      });
    });
  }

  // Purchase details with Continue button
  function setupPurchaseDetails() {
    const dateInput = document.getElementById("purchase-date");
    const amountInput = document.getElementById("purchase-amount");
    const purchaseNextBtn = document.getElementById("purchase-next-btn");

    function updatePurchaseButton() {
      if (dateInput && dateInput.value && amountInput && amountInput.value) {
        purchaseNextBtn.disabled = false;
        purchaseNextBtn.className = "px-8 py-3 bg-secondary text-white font-semibold rounded-md hover:opacity-90 transition-all cursor-pointer";
      } else {
        purchaseNextBtn.disabled = true;
        purchaseNextBtn.className = "px-8 py-3 bg-gray-400 text-white font-semibold rounded-md transition-all cursor-not-allowed disabled:bg-gray-400 disabled:cursor-not-allowed";
      }
    }

    if (dateInput) {
      dateInput.addEventListener("change", function () {
        formData.purchaseDate = this.value;
        saveFormData();
        updateStepMenu();
        updatePurchaseButton();
      });
    }

    if (amountInput) {
      amountInput.addEventListener("input", function () {
        formData.purchaseAmount = this.value;
        saveFormData();
        updateStepMenu();
        updatePurchaseButton();
      });
    }

    if (purchaseNextBtn) {
      purchaseNextBtn.addEventListener("click", function() {
        if (isCurrentStepValid()) {
          goToNextStep();
        }
      });
    }
  }

  // Photo Upload Functionality with Remove button
  function setupPhotoUploads() {
    const regNumberInput = document.getElementById("registration-number");
    if (regNumberInput) {
      regNumberInput.addEventListener("input", function() {
        this.value = this.value.toUpperCase();
        formData.registrationNumber = this.value;
        saveFormData();
        updateStepMenu();
        updatePhotosNextButton();
      });
    }

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
      const previewContainer = document.getElementById(input.preview);
      
      if (fileInput && previewContainer) {
        // Click on preview to open file dialog
        previewContainer.addEventListener("click", function() {
          fileInput.click();
        });
        
        fileInput.addEventListener("change", function (e) {
          const file = e.target.files[0];
          if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (event) {
              previewContainer.innerHTML = `
                <div class="relative w-full h-full">
                  <img src="${event.target.result}" alt="Preview" class="w-full h-full object-cover rounded-md">
                  <button class="remove-photo-btn absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all text-sm font-semibold shadow-lg" data-key="${input.key}">
                    Remove
                  </button>
                </div>
              `;
              previewContainer.classList.remove("border-gray-300");
              previewContainer.classList.add("border-green-500", "border-2");

              // Store image data
              formData.photos[input.key] = event.target.result;
              saveFormData();

              // Attach remove button listener
              const removeBtn = previewContainer.querySelector(".remove-photo-btn");
              if (removeBtn) {
                removeBtn.addEventListener("click", function(e) {
                  e.stopPropagation();
                  removePhoto(input.key, input.preview, input.id);
                });
              }

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

  // Remove photo function
  function removePhoto(key, previewId, inputId) {
    const previewContainer = document.getElementById(previewId);
    const fileInput = document.getElementById(inputId);
    
    if (previewContainer) {
      previewContainer.innerHTML = `
        <div class="text-center">
          <i data-lucide="upload" class="w-12 h-12 mx-auto mb-2 text-gray-400"></i>
          <p class="text-sm text-gray-500">Click to upload</p>
        </div>
      `;
      previewContainer.classList.remove("border-green-500", "border-2");
      previewContainer.classList.add("border-gray-300");
    }
    
    if (fileInput) {
      fileInput.value = "";
    }
    
    formData.photos[key] = null;
    saveFormData();
    updateStepMenu();
    updatePhotosNextButton();
    lucide.createIcons();
  }

  // Update photos next button state
  function updatePhotosNextButton() {
    const photosNextBtn = document.getElementById("photos-next-btn");
    if (!photosNextBtn) return;
    
    const frontPreview = document.getElementById("preview-front");
    const hasImage = frontPreview && frontPreview.querySelector("img");
    const regNumber = document.getElementById("registration-number");
    const hasRegNumber = regNumber && regNumber.value.trim().length > 0;
    
    // Enable button only if both front photo AND registration number are filled
    if (hasImage && hasRegNumber) {
      photosNextBtn.disabled = false;
      photosNextBtn.className = "px-8 py-3 bg-secondary text-white font-semibold rounded-md hover:opacity-90 transition-all";
    } else {
      photosNextBtn.disabled = true;
      photosNextBtn.className = "px-8 py-3 bg-gray-400 text-white font-semibold rounded-md transition-all cursor-not-allowed disabled:bg-gray-400 disabled:cursor-not-allowed";
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
      
      // Scroll to top smoothly on every step change
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      // Update photos button state when navigating to photos section
      if (step === "reg-photos") {
        setTimeout(() => {
          updatePhotosNextButton();
        }, 100);
      }
      
      // Update purchase button state when navigating to purchase section
      if (step === "purchase-details") {
        setTimeout(() => {
          const dateInput = document.getElementById("purchase-date");
          const amountInput = document.getElementById("purchase-amount");
          const purchaseNextBtn = document.getElementById("purchase-next-btn");
          
          if (dateInput && dateInput.value && amountInput && amountInput.value) {
            purchaseNextBtn.disabled = false;
            purchaseNextBtn.className = "px-8 py-3 bg-secondary text-white font-semibold rounded-md hover:opacity-90 transition-all cursor-pointer";
          }
        }, 100);
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

  // Setup hero button first
  setupHeroButton();
  
  // Initialize the form
  init();

  // Load saved data if exists
  const savedData = localStorage.getItem("vehicleFormData");
  if (savedData) {
    // console.log('Previously saved data found:', savedData);
  }
});