/**
 * AgriCrops System - Main Client Controller
 * Connects Advisory Engine, Folder Explorer, Weather Service, and UI interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Services
  const advisoryEngine = new AdvisoryEngine(CROPS_DATABASE);
  const weatherService = new WeatherService(CROPS_DATABASE, SOIL_TYPES_REFERENCE);

  // Initialize Folder Explorer with file opener callback
  const folderExplorer = new FolderExplorer(
    VAULT_DIRECTORIES,
    CROPS_DATABASE,
    (fileMeta) => handleOpenFile(fileMeta)
  );

  // DOM Elements
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const chatMessagesContainer = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const quickPromptPills = document.querySelectorAll(".quick-prompt-pill");
  const foldersContainer = document.getElementById("folders-container");
  
  // Weather & Recommendation Elements
  const weatherSearchInput = document.getElementById("weather-search-input");
  const btnWeatherSearch = document.getElementById("btn-weather-search");
  const quickLocPills = document.querySelectorAll(".quick-loc-pill");
  const soilSelectFilter = document.getElementById("soil-select-filter");
  const rankedCropsContainer = document.getElementById("ranked-crops-container");

  // Modal Elements
  const fileModalOverlay = document.getElementById("file-modal-overlay");
  const modalDocTitle = document.getElementById("modal-doc-title");
  const modalDocContent = document.getElementById("modal-doc-content");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const btnModalCloseAction = document.getElementById("btn-modal-close-action");
  const btnAskAboutThisCrop = document.getElementById("btn-ask-about-crop");

  let currentModalCrop = null;

  // 1. TAB NAVIGATION
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add("active");
      }

      // Re-render folder explorer when switching to vault tab
      if (targetTab === "vault-tab") {
        folderExplorer.render(foldersContainer);
      }
    });
  });

  // Render initial folder explorer
  folderExplorer.render(foldersContainer);

  // 2. CHAT & ADVISORY SYSTEM
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    // Append user message
    appendUserMessage(query);
    chatInput.value = "";

    // Show thinking / process response
    showBotTypingAndReply(query);
  });

  // Quick Prompt Pills
  quickPromptPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const promptText = pill.getAttribute("data-prompt");
      chatInput.value = promptText;
      chatForm.dispatchEvent(new Event("submit"));
    });
  });

  function appendUserMessage(text) {
    const userMsg = document.createElement("div");
    userMsg.className = "msg-bubble msg-user";
    userMsg.innerHTML = `
      <div class="avatar avatar-user">🧑‍🌾</div>
      <div class="msg-body">${escapeHtml(text)}</div>
    `;
    chatMessagesContainer.appendChild(userMsg);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  function showBotTypingAndReply(query) {
    // Generate structured answer from advisory engine
    const result = advisoryEngine.answerQuery(query);

    const botMsg = document.createElement("div");
    botMsg.className = "msg-bubble msg-bot";

    let bodyHtml = `<div class="avatar avatar-bot">🌾</div><div class="msg-body">`;
    
    if (result.title) {
      bodyHtml += `<div class="response-title">${result.title}</div>`;
    }

    if (result.badges && result.badges.length > 0) {
      bodyHtml += `<div class="response-badges">`;
      result.badges.forEach(b => {
        bodyHtml += `<span class="badge ${b.color}">${b.label}</span>`;
      });
      bodyHtml += `</div>`;
    }

    if (result.content) {
      bodyHtml += `<div>${result.content}</div>`;
    }

    if (result.sections && result.sections.length > 0) {
      result.sections.forEach(sec => {
        bodyHtml += `
          <div class="section-block">
            <h5>${sec.heading}</h5>
            <div>${sec.content}</div>
          </div>
        `;
      });
    }

    // If query returned a list of multiple matching crops
    if (result.crops && result.crops.length > 0) {
      bodyHtml += `<div class="suggestions-row" style="margin-top:0.85rem;">`;
      result.crops.forEach(c => {
        bodyHtml += `<button class="chip-btn" data-ask="Tell me about ${c.name}">${c.icon} ${c.name}</button>`;
      });
      bodyHtml += `</div>`;
    }

    // Follow-up Suggestion Chips
    if (result.suggestions && result.suggestions.length > 0) {
      bodyHtml += `<div class="suggestions-row">`;
      result.suggestions.forEach(s => {
        bodyHtml += `<button class="chip-btn" data-ask="${s}">💡 ${s}</button>`;
      });
      bodyHtml += `</div>`;
    }

    bodyHtml += `</div>`;
    botMsg.innerHTML = bodyHtml;

    chatMessagesContainer.appendChild(botMsg);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    // Bind click events on chips inside response
    botMsg.querySelectorAll(".chip-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const ask = btn.getAttribute("data-ask");
        chatInput.value = ask;
        chatForm.dispatchEvent(new Event("submit"));
      });
    });
  }

  // 3. WEATHER & CLIMATE-BASED RECOMMENDATION
  async function updateWeatherAndRecommendations(locationQuery) {
    const soilType = soilSelectFilter.value;
    
    // Show loading indicator
    document.getElementById("weather-condition-text").textContent = "Fetching weather report...";
    
    const result = await weatherService.fetchWeather(locationQuery);
    const w = result.weather;

    // Update UI Elements
    document.getElementById("weather-temp-val").textContent = w.temperature;
    document.getElementById("weather-icon-symbol").textContent = w.icon || "⛅";
    document.getElementById("weather-condition-text").textContent = w.conditionText;
    document.getElementById("weather-location-text").textContent = `📍 ${w.locationName}`;
    document.getElementById("weather-humidity-val").textContent = `${w.humidity}%`;
    document.getElementById("weather-rain-val").textContent = `${w.precipitation} mm`;
    document.getElementById("weather-wind-val").textContent = `${w.windSpeed} km/h`;
    document.getElementById("weather-minmax-val").textContent = `${w.dailyMin}°C / ${w.dailyMax}°C`;

    // Calculate crop recommendations
    renderRecommendations(soilType);
  }

  function renderRecommendations(selectedSoil) {
    const evaluated = weatherService.evaluateCropsForClimateAndLand(selectedSoil);
    
    let html = "";
    evaluated.forEach(item => {
      const crop = item.crop;
      html += `
        <div class="crop-rec-card">
          <div class="rec-top-row">
            <div class="rec-crop-identity">
              <span class="rec-crop-icon">${crop.icon}</span>
              <div>
                <h4>${crop.name}</h4>
                <span>${crop.scientific_name} • ${crop.category}</span>
              </div>
            </div>
            <div class="rec-score-box">
              <div class="status-badge-text">${item.recommendation}</div>
              <div class="score-badge ${item.statusColor}">${item.score}% Match</div>
            </div>
          </div>
          <div class="rec-reason-text">
            <strong>Suitability Analysis:</strong> ${item.reason}
          </div>
          <div class="rec-metrics-breakdown">
            <span>🌡️ Temperature Match: <strong>${item.tempScore}%</strong></span>
            <span>💧 Moisture Fitness: <strong>${item.rainScore}%</strong></span>
            <span>🏞️ Soil Affinity: <strong>${item.soilScore}%</strong></span>
            <span>⏱️ Season: <strong>${item.seasons.join(", ")}</strong></span>
            <span>🌾 Expected Yield: <strong>${crop.expected_yield}</strong></span>
          </div>
          <button class="btn-view-rec-dossier" data-crop-id="${crop.id}">
            📖 View Complete ${crop.name} Cultivation Dossier →
          </button>
        </div>
      `;
    });

    rankedCropsContainer.innerHTML = html;

    // Bind View Dossier buttons in recommendation list
    rankedCropsContainer.querySelectorAll(".btn-view-rec-dossier").forEach(btn => {
      btn.addEventListener("click", () => {
        const cropId = btn.getAttribute("data-crop-id");
        handleOpenFile({ type: "crop", cropId: cropId });
      });
    });
  }

  // Location search button click
  btnWeatherSearch.addEventListener("click", () => {
    const query = weatherSearchInput.value.trim();
    if (query) updateWeatherAndRecommendations(query);
  });

  weatherSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = weatherSearchInput.value.trim();
      if (query) updateWeatherAndRecommendations(query);
    }
  });

  // Quick Location Pills
  quickLocPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const loc = pill.getAttribute("data-loc");
      const defaultSoil = pill.getAttribute("data-soil");
      weatherSearchInput.value = loc;
      if (defaultSoil) {
        soilSelectFilter.value = defaultSoil;
      }
      updateWeatherAndRecommendations(loc);
    });
  });

  // Soil filter change
  soilSelectFilter.addEventListener("change", () => {
    renderRecommendations(soilSelectFilter.value);
  });

  // Initial load with default preset location
  updateWeatherAndRecommendations("Ludhiana (Punjab)");

  // 4. DOSSIER & FILE MODAL HANDLER
  function handleOpenFile(fileMeta) {
    if (fileMeta.type === "crop") {
      const crop = CROPS_DATABASE.find(c => c.id === fileMeta.cropId);
      if (!crop) return;

      currentModalCrop = crop;
      modalDocTitle.innerHTML = `${crop.icon} ${crop.name} — Comprehensive Agricultural Dossier`;
      
      let content = `
        <div class="markdown-rendered-view">
          <p><strong>Botanical Taxonomy:</strong> <em>${crop.scientific_name}</em> | <strong>Category:</strong> ${crop.category}</p>
          <p>${crop.summary}</p>
          
          <h2>1. Land & Soil Suitability</h2>
          <ul>
            <li><strong>Preferred Soils:</strong> ${crop.land_soil_suitability.soil_types.join(", ")}</li>
            <li><strong>Optimal pH Range:</strong> ${crop.land_soil_suitability.ideal_ph}</li>
            <li><strong>Drainage Requirement:</strong> ${crop.land_soil_suitability.drainage}</li>
            <li><strong>Land Preparation:</strong> ${crop.land_soil_suitability.land_prep}</li>
          </ul>

          <h2>2. How to Grow & Crop Protocol</h2>
          <ul>
            <li><strong>Sowing Season & Time:</strong> ${crop.how_to_grow.sowing_time} (${crop.climate_requirements.seasons.join(", ")})</li>
            <li><strong>Seed Rate:</strong> ${crop.how_to_grow.seed_rate}</li>
            <li><strong>Row & Plant Spacing:</strong> ${crop.how_to_grow.spacing}</li>
            <li><strong>Nursery Protocol:</strong> ${crop.how_to_grow.nursery_prep}</li>
            <li><strong>Irrigation Schedule:</strong> ${crop.how_to_grow.irrigation_stages}</li>
            <li><strong>Growth Duration:</strong> ${crop.how_to_grow.growth_cycle_days}</li>
            <li><strong>Harvest Indicators:</strong> ${crop.how_to_grow.harvesting_signs}</li>
          </ul>

          <h2>3. Fertilization & Nutrient Schedule</h2>
          <div class="npk-box" style="margin-bottom:1rem;">
            <strong>Target NPK Ratio:</strong> ${crop.fertilization.npk_ratio}
          </div>
          <ul>
            <li><strong>Basal Application:</strong> ${crop.fertilization.basal_dose}</li>
            <li><strong>Top Dressing:</strong> ${crop.fertilization.top_dressing}</li>
            <li><strong>Organic Manures:</strong> ${crop.fertilization.organic_options}</li>
            <li><strong>Micronutrient Management:</strong> ${crop.fertilization.micronutrients}</li>
          </ul>

          <h2>4. Crop Balancing & Health Management</h2>
          <ul>
            <li><strong>Soil Health & Amendments:</strong> ${crop.crop_balancing.soil_amendments}</li>
            <li><strong>Nutrient Deficiency Diagnostic:</strong> ${crop.crop_balancing.nutrient_deficiency_cures}</li>
            <li><strong>Integrated Pest & Disease Balancing:</strong> ${crop.crop_balancing.pest_disease_management}</li>
            <li><strong>Companion Crops:</strong> ${crop.crop_balancing.companion_plants.join(", ")}</li>
            <li><strong>Crop Rotation:</strong> ${crop.crop_balancing.crop_rotation}</li>
          </ul>

          <h2>5. Economics & Yield</h2>
          <p><strong>Expected Commercial Yield:</strong> <span class="badge-yield">${crop.expected_yield}</span></p>
        </div>
      `;

      modalDocContent.innerHTML = content;
      btnAskAboutThisCrop.style.display = "inline-block";
      btnAskAboutThisCrop.textContent = `Ask AI Assistant About ${crop.name} →`;
      fileModalOverlay.classList.add("active");

    } else if (fileMeta.type === "doc") {
      // Embedded text/markdown guides
      modalDocTitle.innerHTML = `📄 ${fileMeta.id.replace(/_/g, ' ').toUpperCase()}`;
      btnAskAboutThisCrop.style.display = "none";

      const guideTexts = {
        "rice_guide_md": getRiceGuideMarkdown(),
        "wheat_guide_md": getWheatGuideMarkdown(),
        "tomato_guide_md": getTomatoGuideMarkdown(),
        "soil_npk_md": getSoilNpkMarkdown()
      };

      const mdContent = guideTexts[fileMeta.id] || `<p>Document path: ${fileMeta.path}</p>`;
      modalDocContent.innerHTML = `<div class="markdown-rendered-view">${mdContent}</div>`;
      fileModalOverlay.classList.add("active");
    }
  }

  // Close modal
  function closeModal() {
    fileModalOverlay.classList.remove("active");
    currentModalCrop = null;
  }

  btnCloseModal.addEventListener("click", closeModal);
  btnModalCloseAction.addEventListener("click", closeModal);
  fileModalOverlay.addEventListener("click", (e) => {
    if (e.target === fileModalOverlay) closeModal();
  });

  // Switch to advisory chat when clicking "Ask AI Assistant About this crop"
  btnAskAboutThisCrop.addEventListener("click", () => {
    if (currentModalCrop) {
      closeModal();
      // Switch to Chat tab
      tabButtons[0].click();
      chatInput.value = `Tell me how to grow and fertilize ${currentModalCrop.name}`;
      chatForm.dispatchEvent(new Event("submit"));
    }
  });

  // Side panel category shortcuts
  document.querySelectorAll(".mini-category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const folderId = btn.getAttribute("data-folder");
      // Switch to vault tab and open that folder
      tabButtons[1].click();
      folderExplorer.openFolder(folderId, foldersContainer);
    });
  });

  function escapeHtml(string) {
    const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return String(string).replace(/[&<>"']/g, s => entityMap[s]);
  }

  // Pre-compiled Markdown guides for instant modal rendering
  function getRiceGuideMarkdown() {
    return `
      <h1>🌾 Rice (Paddy) Cultivation Dossier</h1>
      <h2>1. Land & Soil Suitability</h2>
      <p>• <strong>Optimal Soil Type:</strong> Heavy clayey loams and alluvial silty soils capable of retaining surface water.<br>
      • <strong>Ideal pH Range:</strong> 5.5 to 6.8 (tolerant to slightly acidic conditions).<br>
      • <strong>Land Preparation:</strong> Deep summer plowing followed by 2-3 passes of wet puddling to form an impermeable layer (plow sole) at 15-20 cm depth to minimize percolation loss.</p>
      <h2>2. Sowing & Nursery</h2>
      <p>• <strong>Nursery Methods:</strong> Wet bed or Modified Mat Nursery (SRI technique).<br>
      • <strong>Seed Treatment:</strong> Soak seeds in brine solution (10%) to remove unfilled seeds; treat with Carbendazim (2g/kg) and Azospirillum (600g/ha).<br>
      • <strong>Transplanting:</strong> Transplant 21-25 day old seedlings at 2-3 seedlings per hill, spaced 20cm x 15cm.</p>
      <h2>3. Fertilization & Nutrient Schedule</h2>
      <p>• <strong>Standard NPK Dosage:</strong> 120 kg N : 60 kg P2O5 : 40 kg K2O per hectare.<br>
      • <strong>Basal Application:</strong> 100% Phosphorus, 50% Potassium, and 25% Nitrogen applied at final puddling.<br>
      • <strong>Top Dressing:</strong> 50% Nitrogen at 21-25 days (tillering); remaining 25% N and 50% K at panicle initiation (45-50 days).<br>
      • <strong>Micronutrient:</strong> 25 kg Zinc Sulfate (ZnSO4) basal prevents Khaira disease.</p>
      <h2>4. Water Management & Balancing</h2>
      <p>Keep 2-3 cm water layer for first 10 days post transplanting. Alternate wetting and drying (AWD) can save 25-30% irrigation water without reducing yield. Drain 10 days before harvest.</p>
    `;
  }

  function getWheatGuideMarkdown() {
    return `
      <h1>🌾 Wheat Field Management & Nutrition Dossier</h1>
      <h2>1. Land & Soil Suitability</h2>
      <p>• <strong>Optimal Soil:</strong> Well-drained fertile loam, clay loam, and alluvial soils.<br>
      • <strong>Ideal pH:</strong> 6.0 to 7.5.<br>
      • <strong>Drainage:</strong> Highly critical; wheat roots suffocate in standing water within 24-48 hours.</p>
      <h2>2. Critical Irrigation Stages</h2>
      <p>1. <strong>Crown Root Initiation (CRI):</strong> 20-25 days after sowing - MOST CRITICAL irrigation.<br>
      2. <strong>Tillering:</strong> 40-45 days.<br>
      3. <strong>Jointing:</strong> 60-65 days.<br>
      4. <strong>Flowering / Anthesis:</strong> 80-85 days.<br>
      5. <strong>Milking & Dough:</strong> 100-115 days.</p>
      <h2>3. Fertilizer Formulation</h2>
      <p>120 N : 60 P2O5 : 40 K2O (kg/ha). Full P & K with 1/2 N at sowing. Top dress 1/4th N at CRI with first irrigation, and 1/4th N at tillering with second irrigation.</p>
    `;
  }

  function getTomatoGuideMarkdown() {
    return `
      <h1>🍅 Tomato Production & Health Balancing Masterclass</h1>
      <h2>1. Land & Soil Suitability</h2>
      <p>• <strong>Optimal Soil:</strong> Sandy loam rich in organic matter, red loam with deep topsoil.<br>
      • <strong>Ideal pH Range:</strong> 6.0 to 6.8.<br>
      • <strong>Drainage:</strong> Excellent drainage required. Use 15-20 cm raised beds to avoid root rot.</p>
      <h2>2. Growth Protocol</h2>
      <p>• <strong>Nursery:</strong> 25-30 days on seedling plug trays with coco-peat + vermicompost.<br>
      • <strong>Spacing:</strong> 60 cm between rows, 45 cm between plants for bush types; 90cm x 60cm for staked varieties.<br>
      • <strong>Staking:</strong> Staking with bamboo stakes or trellis wire improves yield by 40% and prevents soil-borne diseases.</p>
      <h2>3. Nutrient Schedule & Fertigation</h2>
      <p>180 N : 100 P2O5 : 150 K2O kg/ha. Calcium Nitrate (10-15 kg/ha) prevents Blossom End Rot. Spray 1 g/L Borax at flower initiation to prevent flower drop.</p>
    `;
  }

  function getSoilNpkMarkdown() {
    return `
      <h1>🧪 Soil Balancing, pH Correction & NPK Nutrition Guide</h1>
      <h2>1. Soil pH Diagnostics and Rebalancing</h2>
      <table>
        <tr><th>Soil pH</th><th>Condition</th><th>Correction Method</th></tr>
        <tr><td><strong>&lt; 5.5</strong></td><td>Strongly Acidic</td><td>Apply Agricultural Limestone (CaCO3) at 1.5 - 3.0 t/ha</td></tr>
        <tr><td><strong>6.0 - 7.2</strong></td><td>Ideal / Neutral</td><td>Optimal nutrient uptake; maintain with organic compost</td></tr>
        <tr><td><strong>&gt; 7.8</strong></td><td>Alkaline / Sodic</td><td>Apply Gypsum (CaSO4) + elemental sulfur (200-400 kg/ha)</td></tr>
      </table>
      <h2>2. NPK Nutrient Functions</h2>
      <p>• <strong>Nitrogen (N):</strong> Vegetative growth and leaf vigor. Pale yellow leaves indicate deficiency.<br>
      • <strong>Phosphorus (P):</strong> Root architecture and flowering. Dark purplish foliage indicates deficiency.<br>
      • <strong>Potassium (K):</strong> Disease resistance and fruit sizing. Brown marginal scorch indicates deficiency.</p>
    `;
  }
});
