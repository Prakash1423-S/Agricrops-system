/**
 * AgriCrops Advisory & Q&A Intelligence Engine
 * Parses farmer/user queries regarding crops, how to grow, fertilization, land suitability, and crop balancing.
 */

class AdvisoryEngine {
  constructor(database) {
    this.database = database;
  }

  /**
   * Process a user's natural language question
   * @param {string} query
   * @returns {Object} Structured response with title, badges, markdown-like content, and suggestions
   */
  answerQuery(query) {
    const raw = query.trim().toLowerCase();

    if (!raw) {
      return {
        type: "error",
        title: "Empty Question",
        content: "Please enter a question about any crop, such as *'How to grow Rice?'*, *'Best fertilizer for Wheat'*, *'Which land suits Cotton?'*, or *'How to balance Tomato crops?'*."
      };
    }

    // 1. Detect matching crop
    const detectedCrop = this.findCropInQuery(raw);

    // 2. Detect intent
    const intent = this.detectIntent(raw);

    // If query is asking about soil suitability across crops without specific crop
    if (!detectedCrop && (intent === 'land' || raw.includes('soil') || raw.includes('land') || raw.includes('ph'))) {
      return this.handleGeneralSoilQuery(raw);
    }

    // If query is asking about general crop balancing / fertilizers without specific crop
    if (!detectedCrop && (intent === 'balance' || intent === 'fertilizer')) {
      return this.handleGeneralBalanceQuery(raw);
    }

    // If a crop was found
    if (detectedCrop) {
      return this.generateCropResponse(detectedCrop, intent, raw);
    }

    // Fallback: search keywords across all crops
    const keywordMatches = this.database.filter(c => 
      c.name.toLowerCase().includes(raw) ||
      c.category.toLowerCase().includes(raw) ||
      c.land_soil_suitability.soil_types.some(s => s.toLowerCase().includes(raw))
    );

    if (keywordMatches.length > 0) {
      return {
        type: "multi_crop",
        title: `Found ${keywordMatches.length} Matching Crops for "${query}"`,
        crops: keywordMatches,
        content: `Here are the crops related to your query. Click any crop below or ask specific questions like *"How to grow ${keywordMatches[0].name}?"* or *"Fertilizer for ${keywordMatches[0].name}"*:`
      };
    }

    // General agricultural help response
    return {
      type: "general_help",
      title: "Agro Expert Advisory",
      content: `I couldn't identify the specific crop in **"${query}"**.<br><br>
      You can ask me questions such as:
      <ul>
        <li>🌱 <strong>How to grow:</strong> <em>"How to grow Rice?"</em>, <em>"Wheat cultivation steps"</em></li>
        <li>🧪 <strong>Fertilization:</strong> <em>"What fertilizer is best for Tomato?"</em>, <em>"NPK ratio for Cotton"</em></li>
        <li>🏞️ <strong>Land & Soil Suitability:</strong> <em>"Which land suits Chickpea?"</em>, <em>"Best soil for Sugarcane"</em></li>
        <li>⚖️ <strong>Crop Balancing & Health:</strong> <em>"How to balance nutrients for Potato?"</em>, <em>"Pest control for Mango"</em></li>
      </ul>
      Or browse the <strong>Knowledge Folders</strong> in the left pane to explore individual crop dossiers!`,
      suggestions: [
        "How to grow Rice?",
        "Which land suits Cotton?",
        "Fertilizer schedule for Tomato",
        "How to balance Wheat crop nutrients?"
      ]
    };
  }

  /**
   * Find matching crop from query string
   */
  findCropInQuery(text) {
    const cropAliases = {
      rice: ["rice", "paddy", "oryza"],
      wheat: ["wheat", "gehun", "triticum"],
      maize: ["maize", "corn", "makka", "zea mays"],
      tomato: ["tomato", "tomatoes", "tamatar", "lycopersicon"],
      cotton: ["cotton", "kapas"],
      chickpea: ["chickpea", "gram", "chana", "garbanzo", "cicer"],
      potato: ["potato", "potatoes", "aloo"],
      sugarcane: ["sugarcane", "cane", "ganna"],
      mango: ["mango", "mangoes", "aam"],
      turmeric: ["turmeric", "haldi", "curcuma"],
      onion: ["onion", "onions", "pyaz", "allium"],
      banana: ["banana", "bananas", "kela"]
    };

    for (const [cropId, keywords] of Object.entries(cropAliases)) {
      for (const kw of keywords) {
        // match word boundary
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(text)) {
          return this.database.find(c => c.id === cropId);
        }
      }
    }

    // Fallback simple search
    return this.database.find(c => text.includes(c.name.toLowerCase()));
  }

  /**
   * Detect user intention: grow, fertilizer, land, balance, or comprehensive
   */
  detectIntent(text) {
    const intents = {
      grow: ["how to grow", "grow", "cultivat", "plant", "sow", "sowing", "nursery", "spacing", "harvest", "lifecycle", "yield"],
      fertilizer: ["fertiliz", "fetiliz", "npk", "urea", "manure", "compost", "nutrient", "dap", "potash", "feed", "fym"],
      land: ["which land", "land suit", "soil", "suit for", "ph", "drainage", "ground", "alluvial", "clay", "loam", "black soil", "sand"],
      balance: ["balance", "balancing", "pest", "disease", "protect", "deficiency", "rotation", "companion", "amendment", "cure", "health"]
    };

    let matchedIntent = "comprehensive";
    let highestScore = 0;

    for (const [key, keywords] of Object.entries(intents)) {
      let score = 0;
      for (const kw of keywords) {
        if (text.includes(kw)) {
          score += kw.length;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        matchedIntent = key;
      }
    }

    return matchedIntent;
  }

  /**
   * Generate customized advisory response based on detected crop and intent
   */
  generateCropResponse(crop, intent, rawQuery) {
    const badges = [
      { label: crop.category, color: "blue" },
      { label: `Optimal Temp: ${crop.climate_requirements.optimal_temp}°C`, color: "green" },
      { label: `Soil pH: ${crop.land_soil_suitability.ideal_ph}`, color: "amber" }
    ];

    let title = "";
    let sections = [];
    let suggestions = [];

    switch (intent) {
      case "grow":
        title = `🌱 How to Grow & Cultivate ${crop.name}`;
        sections = [
          {
            heading: "Sowing & Ideal Season",
            content: `<strong>Sowing Time:</strong> ${crop.how_to_grow.sowing_time}<br>
            <strong>Seasons:</strong> ${crop.climate_requirements.seasons.join(", ")}<br>
            <strong>Duration to Maturity:</strong> ${crop.how_to_grow.growth_cycle_days}`
          },
          {
            heading: "Seed Rate & Spacing",
            content: `<strong>Seed Requirement:</strong> ${crop.how_to_grow.seed_rate}<br>
            <strong>Row & Plant Spacing:</strong> ${crop.how_to_grow.spacing}<br>
            <strong>Nursery Protocol:</strong> ${crop.how_to_grow.nursery_prep}`
          },
          {
            heading: "Water & Irrigation Management",
            content: `<strong>Critical Irrigation Stages:</strong> ${crop.how_to_grow.irrigation_stages}<br>
            <strong>Optimal Rainfall / Moisture:</strong> ${crop.climate_requirements.min_rain} - ${crop.climate_requirements.max_rain} mm/month`
          },
          {
            heading: "Harvesting Indicators & Yield",
            content: `<strong>When to Harvest:</strong> ${crop.how_to_grow.harvesting_signs}<br>
            <strong>Expected Yield:</strong> <span class="badge-yield">${crop.expected_yield}</span>`
          }
        ];
        suggestions = [
          `What fertilizer is best for ${crop.name}?`,
          `Which land and soil suits ${crop.name}?`,
          `How to balance pests and soil for ${crop.name}?`
        ];
        break;

      case "fertilizer":
        title = `🧪 Fertilization Protocol for ${crop.name}`;
        sections = [
          {
            heading: "Recommended NPK Formula",
            content: `<div class="npk-box"><strong>Target NPK Ratio:</strong> <span>${crop.fertilization.npk_ratio}</span></div>`
          },
          {
            heading: "Basal Application (At Sowing / Planting)",
            content: crop.fertilization.basal_dose
          },
          {
            heading: "Top Dressing & Split Application",
            content: crop.fertilization.top_dressing
          },
          {
            heading: "Organic Manure & Bio-Fertilizers",
            content: crop.fertilization.organic_options
          },
          {
            heading: "Essential Micronutrients",
            content: crop.fertilization.micronutrients
          }
        ];
        suggestions = [
          `How to grow ${crop.name}?`,
          `Which land suits ${crop.name}?`,
          `How to balance soil and prevent disease in ${crop.name}?`
        ];
        break;

      case "land":
        title = `🏞️ Land & Soil Suitability for ${crop.name}`;
        sections = [
          {
            heading: "Best Suited Soil Types",
            content: `<strong>Recommended Soils:</strong> ${crop.land_soil_suitability.soil_types.join(", ")}<br>
            <strong>Ideal Soil pH:</strong> <mark class="ph-tag">${crop.land_soil_suitability.ideal_ph}</mark>`
          },
          {
            heading: "Drainage & Water Absorption",
            content: crop.land_soil_suitability.drainage
          },
          {
            heading: "Land Preparation & Tillage",
            content: crop.land_soil_suitability.land_prep
          },
          {
            heading: "Topography & Altitude",
            content: `Optimal elevation: ${crop.land_soil_suitability.altitude || "Plains to mid-hills"}`
          }
        ];
        suggestions = [
          `How to fertilize ${crop.name}?`,
          `How to grow ${crop.name}?`,
          `How to balance nutrients for ${crop.name}?`
        ];
        break;

      case "balance":
        title = `⚖️ Crop Balancing, Health & Protection for ${crop.name}`;
        sections = [
          {
            heading: "Soil Health & pH Amendments",
            content: crop.crop_balancing.soil_amendments
          },
          {
            heading: "Nutrient Deficiency Diagnostic & Cures",
            content: crop.crop_balancing.nutrient_deficiency_cures
          },
          {
            heading: "Integrated Pest & Disease Balancing",
            content: crop.crop_balancing.pest_disease_management
          },
          {
            heading: "Companion Crops & Synergies",
            content: `<strong>Beneficial Companion Plants:</strong> ${crop.crop_balancing.companion_plants.join(", ")}`
          },
          {
            heading: "Crop Rotation Strategy",
            content: `<strong>Recommended Rotation:</strong> ${crop.crop_balancing.crop_rotation}`
          }
        ];
        suggestions = [
          `How to grow ${crop.name}?`,
          `Fertilizer schedule for ${crop.name}`,
          `Which land suits ${crop.name}?`
        ];
        break;

      default: // Comprehensive summary
        title = `${crop.icon} Complete Agro Advisory: ${crop.name} (${crop.scientific_name})`;
        sections = [
          {
            heading: "Crop Overview",
            content: crop.summary
          },
          {
            heading: "1. Land & Soil Suitability",
            content: `<strong>Soils:</strong> ${crop.land_soil_suitability.soil_types.join(", ")} | <strong>Ideal pH:</strong> ${crop.land_soil_suitability.ideal_ph}<br>
            <strong>Land Prep:</strong> ${crop.land_soil_suitability.land_prep}`
          },
          {
            heading: "2. How to Grow",
            content: `<strong>Sowing:</strong> ${crop.how_to_grow.sowing_time} (${crop.how_to_grow.growth_cycle_days})<br>
            <strong>Seed Rate & Spacing:</strong> ${crop.how_to_grow.seed_rate} at ${crop.how_to_grow.spacing}<br>
            <strong>Irrigation:</strong> ${crop.how_to_grow.irrigation_stages}`
          },
          {
            heading: "3. Fertilization",
            content: `<strong>NPK Ratio:</strong> ${crop.fertilization.npk_ratio}<br>
            <strong>Basal:</strong> ${crop.fertilization.basal_dose}<br>
            <strong>Top Dressing:</strong> ${crop.fertilization.top_dressing}`
          },
          {
            heading: "4. Crop Balancing & Protection",
            content: `<strong>Soil Amendments:</strong> ${crop.crop_balancing.soil_amendments}<br>
            <strong>Pest Balancing:</strong> ${crop.crop_balancing.pest_disease_management}<br>
            <strong>Rotation:</strong> ${crop.crop_balancing.crop_rotation}`
          },
          {
            heading: "Expected Yield Potential",
            content: `<strong>Yield:</strong> ${crop.expected_yield}`
          }
        ];
        suggestions = [
          `How to grow ${crop.name}?`,
          `Fertilizer schedule for ${crop.name}`,
          `Which land suits ${crop.name}?`,
          `How to balance pests and nutrients in ${crop.name}?`
        ];
        break;
    }

    return {
      type: "crop_detail",
      cropId: crop.id,
      title: title,
      badges: badges,
      sections: sections,
      suggestions: suggestions
    };
  }

  /**
   * Handle generalized soil and land inquiries
   */
  handleGeneralSoilQuery(query) {
    return {
      type: "soil_guide",
      title: "🏞️ Land & Soil Suitability Guide",
      badges: [
        { label: "Soil Science", color: "amber" },
        { label: "pH Diagnostics", color: "blue" }
      ],
      sections: [
        {
          heading: "1. Clayey Loam Soil",
          content: "<strong>Properties:</strong> High water-retention, dense mineral content.<br><strong>Best Crops:</strong> Rice (Paddy), Sugarcane, Banana, Wheat.<br><strong>Balancing Tip:</strong> Incorporate compost or green manure to prevent heavy crusting."
        },
        {
          heading: "2. Alluvial Loam Soil",
          content: "<strong>Properties:</strong> River-deposited, optimal balance of sand, silt, and clay. Highly fertile.<br><strong>Best Crops:</strong> Wheat, Maize, Potato, Tomato, Sugarcane.<br><strong>Balancing Tip:</strong> Maintain organic matter with crop rotation."
        },
        {
          heading: "3. Deep Black Soil (Vertisols / Regur)",
          content: "<strong>Properties:</strong> High moisture retention, swells when wet, self-plowing cracks in dry weather.<br><strong>Best Crops:</strong> Cotton, Chickpea, Sorghum, Wheat.<br><strong>Balancing Tip:</strong> Deep summer plowing to preserve moisture and destroy soil pests."
        },
        {
          heading: "4. Sandy Loam Soil",
          content: "<strong>Properties:</strong> Fast draining, warms quickly in spring, low moisture holding.<br><strong>Best Crops:</strong> Tomato, Potato, Onion, Groundnut, Melons.<br><strong>Balancing Tip:</strong> Frequent light irrigations and heavy organic mulching."
        },
        {
          heading: "5. Soil pH Correction (Balancing)",
          content: "• <strong>Acidic Soils (pH < 5.8):</strong> Add Agricultural Lime (CaCO3) or Dolomite.<br>• <strong>Alkaline Soils (pH > 7.8):</strong> Add Gypsum (CaSO4) and elemental sulfur."
        }
      ],
      suggestions: [
        "Which land suits Rice?",
        "Which land suits Cotton?",
        "What soil is best for Tomato?",
        "How to balance acidic soil?"
      ]
    };
  }

  /**
   * Handle generalized crop balancing and fertilization inquiries
   */
  handleGeneralBalanceQuery(query) {
    return {
      type: "balance_guide",
      title: "⚖️ Crop Balancing & Fertilization Master Rules",
      badges: [
        { label: "Crop Health", color: "green" },
        { label: "NPK Management", color: "blue" }
      ],
      sections: [
        {
          heading: "The 4R Nutrient Stewardship",
          content: "1. <strong>Right Source:</strong> Match fertilizer type to crop needs.<br>2. <strong>Right Rate:</strong> Test soil before applying; avoid nitrogen overload.<br>3. <strong>Right Time:</strong> Apply basal at sowing; split nitrogen at tillering/flowering.<br>4. <strong>Right Place:</strong> Band placement below seeds prevents volatilization."
        },
        {
          heading: "Balancing Nitrogen Overload",
          content: "Too much Nitrogen causes excessive tender foliage, lodging (plants falling), delays fruit ripening, and attracts aphids/blast. Balance with Potassium and Phosphorus."
        },
        {
          heading: "Pest Balancing Through Companion Planting",
          content: "• Plant <strong>Marigold</strong> around tomatoes to stop fruit borers and nematodes.<br>• Intercrop <strong>Cowpea</strong> in cotton as a trap crop for sucking pests.<br>• Sow <strong>Mustard</strong> in wheat (9:1 ratio) to deter aphid outbreaks."
        },
        {
          heading: "Restoring Tired Land with Crop Rotation",
          content: "Never plant the same crop family consecutively. Rotate heavy feeders (Rice, Maize) with soil-restoring legumes (Chickpea, Lentils) that fix atmospheric nitrogen naturally."
        }
      ],
      suggestions: [
        "NPK schedule for Tomato",
        "How to balance Cotton crops?",
        "Fertilizer for Rice",
        "How to grow Chickpea?"
      ]
    };
  }
}
