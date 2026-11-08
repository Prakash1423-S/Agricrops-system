/**
 * AgriCrops Knowledge Base & Crop Repository
 * Comprehensive Agricultural Dataset with Growth, Fertilization, Soil, Balancing, and Climate Data
 */

const CROPS_DATABASE = [
  {
    id: "rice",
    name: "Rice (Paddy)",
    scientific_name: "Oryza sativa",
    category: "Cereals & Grains",
    folder: "Cereals_and_Grains",
    icon: "🌾",
    summary: "A staple cereal grain requiring flooded conditions or consistent high moisture, thriving in clayey and alluvial soils.",
    climate_requirements: {
      seasons: ["Kharif", "Summer / Boro"],
      min_temp: 20,
      max_temp: 38,
      optimal_temp: 25,
      min_rain: 100, // mm per month or total 1000-1500mm
      max_rain: 350,
      humidity_range: "60% - 85%",
      sunlight_hours: "6 - 8 hours daily"
    },
    land_soil_suitability: {
      soil_types: ["Clayey Loam", "Alluvial", "Silty Clay"],
      ideal_ph: "5.5 - 6.8",
      drainage: "Low to moderate drainage (able to hold standing water during early stages)",
      land_prep: "Deep plowing followed by puddling (churning wet soil) 2-3 times to create an impermeable layer.",
      altitude: "0 - 1800m above sea level"
    },
    how_to_grow: {
      sowing_time: "June-July (Kharif) or Nov-Feb (Rabi/Boro depending on region)",
      seed_rate: "20-25 kg/hectare for transplanted paddy; 40-50 kg/ha for direct seeding",
      spacing: "20 cm x 15 cm between hills",
      nursery_prep: "Raise seedlings in wet or dry bed nursery for 21-25 days before transplanting 2-3 seedlings per hill.",
      irrigation_stages: "Maintain 2-5 cm standing water from transplanting till dough stage; drain 10 days before harvest.",
      growth_cycle_days: "110 - 150 days",
      harvesting_signs: "80-85% of panicles turn golden yellow and grains feel hard when pressed with teeth."
    },
    fertilization: {
      npk_ratio: "120:60:40 kg/ha (N:P2O5:K2O)",
      basal_dose: "Apply 100% of Phosphorus, 50% of Potassium, and 25% of Nitrogen at final puddling.",
      top_dressing: "Split remaining Nitrogen: 50% at active tillering (3 weeks) and 25% at panicle initiation (6-7 weeks). Apply remaining 50% Potassium at panicle stage.",
      organic_options: "Incorporate 10-12 tonnes/ha Farm Yard Manure (FYM) or green manure (Dhaincha/Sesbania) 2 weeks before transplanting.",
      micronutrients: "Apply Zinc Sulphate (25 kg/ha) at transplanting to prevent Khaira disease."
    },
    crop_balancing: {
      soil_amendments: "If soil pH is below 5.5, apply agricultural lime (1.5-2 t/ha). If alkaline (>8.0), apply gypsum and sulfur.",
      nutrient_deficiency_cures: "Zinc deficiency causes rusty brown spots; spray 0.5% ZnSO4 + 0.25% lime. Nitrogen deficiency (yellowing lower leaves); top dress urea immediately.",
      pest_disease_management: "Monitor for Brown Plant Hopper (BPH), Stem Borer, and Blast. Use Neem oil (3ml/L) or Trichoderma viride. Avoid excessive nitrogen which worsens blast.",
      companion_plants: ["Azolla (water fern for bio-nitrogen)", "Duckweed", "Sesbania (border)"],
      crop_rotation: "Rotate with Pulses (Chickpea, Lentil, Green Gram) or Mustard to restore soil nitrogen and disrupt weed cycles."
    },
    expected_yield: "4.5 - 6.5 metric tonnes / hectare"
  },
  {
    id: "wheat",
    name: "Wheat",
    scientific_name: "Triticum aestivum",
    category: "Cereals & Grains",
    folder: "Cereals_and_Grains",
    icon: "🌾",
    summary: "Cool-season staple cereal grain that produces high yields in well-drained fertile loamy soils with moderate moisture.",
    climate_requirements: {
      seasons: ["Rabi (Winter)"],
      min_temp: 10,
      max_temp: 28,
      optimal_temp: 18,
      min_rain: 25,
      max_rain: 100,
      humidity_range: "40% - 65%",
      sunlight_hours: "7 - 9 hours of clear sunshine"
    },
    land_soil_suitability: {
      soil_types: ["Well-drained Loam", "Clay Loam", "Alluvial Loam"],
      ideal_ph: "6.0 - 7.5",
      drainage: "Excellent internal drainage; highly sensitive to waterlogging.",
      land_prep: "Plow twice with disc harrow, followed by cultivator and leveling plank to achieve a fine crumbly seedbed.",
      altitude: "0 - 3000m above sea level"
    },
    how_to_grow: {
      sowing_time: "First fortnight of November (ideal for timely sown varieties)",
      seed_rate: "100 kg/ha for normal sowing; 125 kg/ha for late sowing",
      spacing: "20-22.5 cm row-to-row spacing, 4-5 cm seed depth",
      nursery_prep: "Direct seeded using seed-cum-fertilizer drill into moist soil.",
      irrigation_stages: "Crucial stages: Crown Root Initiation (CRI at 21 days), Tillering (40-45 d), Late Jointing (60-65 d), Flowering (80-85 d), Milking (100-105 d), Dough stage (115-120 d).",
      growth_cycle_days: "120 - 145 days",
      harvesting_signs: "Leaves and spikes turn yellow-brown, straw becomes dry and brittle, grain moisture drops below 14%."
    },
    fertilization: {
      npk_ratio: "120:60:40 kg/ha (N:P2O5:K2O) for irrigated; 60:30:20 for rainfed",
      basal_dose: "Half Nitrogen + full Phosphorus + full Potassium applied below seeds at sowing.",
      top_dressing: "First top dress: 25% Nitrogen at first irrigation (CRI stage); second 25% at second irrigation (Tillering stage).",
      organic_options: "Apply 10 tonnes well-rotted compost per hectare during first land preparation.",
      micronutrients: "Foliar spray of 0.5% Zinc sulphate at 30 and 45 days if deficiency symptoms appear."
    },
    crop_balancing: {
      soil_amendments: "Correct salinity with gypsum if EC > 4 dS/m. Ensure soil organic carbon is above 0.5%.",
      nutrient_deficiency_cures: "Sulfur deficiency causes yellowing of young leaves; apply Gypsum (200 kg/ha).",
      pest_disease_management: "Watch for Yellow/Brown Rust and Termites. Seed treatment with Carbendazim (2g/kg seed). For rust, spray Propiconazole 25 EC (0.1%).",
      companion_plants: ["Mustard (intercropped at 9:1 ratio)", "Chickpea"],
      crop_rotation: "Paddy-Wheat, Maize-Wheat, Cotton-Wheat, or Green Gram-Wheat systems."
    },
    expected_yield: "4.0 - 5.5 metric tonnes / hectare"
  },
  {
    id: "maize",
    name: "Maize (Corn)",
    scientific_name: "Zea mays",
    category: "Cereals & Grains",
    folder: "Cereals_and_Grains",
    icon: "🌽",
    summary: "Queen of cereals with immense yield potential, cultivated across tropical and temperate zones in fertile, aerated soils.",
    climate_requirements: {
      seasons: ["Kharif", "Rabi", "Spring"],
      min_temp: 18,
      max_temp: 35,
      optimal_temp: 24,
      min_rain: 50,
      max_rain: 180,
      humidity_range: "50% - 75%",
      sunlight_hours: "8 - 10 hours daily"
    },
    land_soil_suitability: {
      soil_types: ["Deep Fertile Loam", "Sandy Loam", "Silt Loam"],
      ideal_ph: "5.8 - 7.2",
      drainage: "Good drainage is essential; maize cannot tolerate water stagnation for more than 12 hours.",
      land_prep: "Deep plowing (20-25 cm) followed by 2-3 harrowings and ridge & furrow formation.",
      altitude: "Sea level up to 2500m"
    },
    how_to_grow: {
      sowing_time: "Kharif: June-July; Rabi: October-November; Spring: February",
      seed_rate: "18-20 kg/ha for grain maize; 25 kg/ha for sweet corn/baby corn",
      spacing: "60 cm between rows x 20 cm between plants",
      nursery_prep: "Direct seeding into furrows or on ridges at 4-5 cm depth.",
      irrigation_stages: "Knee-high stage (30-35 days), Tasseling (50-55 days), Silking (65-70 days), and Grain Filling (80-85 days).",
      growth_cycle_days: "90 - 120 days",
      harvesting_signs: "Husk leaves dry up, turn papery white, and a black abscission layer forms at the grain tip."
    },
    fertilization: {
      npk_ratio: "150:75:40 kg/ha (N:P2O5:K2O) for hybrid maize",
      basal_dose: "1/3rd Nitrogen, all Phosphorus, and all Potassium at sowing.",
      top_dressing: "1/3rd Nitrogen at knee-high stage (30 DAS) and 1/3rd Nitrogen at tasseling/silking stage.",
      organic_options: "Vermicompost at 2.5 t/ha or FYM at 12 t/ha incorporated during field preparation.",
      micronutrients: "Zinc Sulphate (25 kg/ha) is critical; maize is an indicator crop for zinc deficiency."
    },
    crop_balancing: {
      soil_amendments: "Apply biofertilizers like Azospirillum and Phosphobacteria as seed treatment (600g/ha).",
      nutrient_deficiency_cures: "Purpling of leaf margins indicates Phosphorus deficiency (apply DAP/Rock phosphate).",
      pest_disease_management: "Fall Armyworm (FAW) is a major pest. Apply Emamectin Benzoate 5 SG or Bacillus thuringiensis (Bt). Use pheromone traps.",
      companion_plants: ["Beans / Cowpea (Three Sisters method)", "Squash / Pumpkin"],
      crop_rotation: "Maize - Chickpea, Maize - Mustard, Maize - Potato - Green Gram."
    },
    expected_yield: "6.0 - 8.5 metric tonnes / hectare (hybrids)"
  },
  {
    id: "tomato",
    name: "Tomato",
    scientific_name: "Solanum lycopersicum",
    category: "Vegetables & Greens",
    folder: "Vegetables_and_Greens",
    icon: "🍅",
    summary: "Popular high-value vegetable crop demanding rich organic matter, warm days, cool nights, and strict moisture control.",
    climate_requirements: {
      seasons: ["Warm season / Mild winter", "Spring", "Autumn"],
      min_temp: 15,
      max_temp: 32,
      optimal_temp: 21,
      min_rain: 40,
      max_rain: 120,
      humidity_range: "50% - 70%",
      sunlight_hours: "7 - 8 hours of direct sun"
    },
    land_soil_suitability: {
      soil_types: ["Sandy Loam rich in humus", "Red Loam", "Black Soil with good aeration"],
      ideal_ph: "6.0 - 7.0",
      drainage: "High drainage; roots suffocate quickly in stagnant water and succumb to damping off.",
      land_prep: "Fine tilth preparation, incorporate compost, make raised beds 15 cm high and 1m wide with drip irrigation.",
      altitude: "0 - 1500m"
    },
    how_to_grow: {
      sowing_time: "Autumn crop: June-August; Spring crop: Nov-Dec; Hill crop: March-April",
      seed_rate: "100-150 g/ha for hybrids; 400-500 g/ha for open-pollinated",
      spacing: "60 cm x 45 cm for determinate; 90 cm x 60 cm for indeterminate varieties",
      nursery_prep: "Sow in seedling trays with coco peat, vermiculite, and perlite. Transplant after 25-30 days when 4-5 true leaves appear.",
      irrigation_stages: "Regular uniform watering. Avoid fluctuating moisture to prevent Blossom End Rot and fruit cracking.",
      growth_cycle_days: "90 - 130 days",
      harvesting_signs: "Harvest at breaker stage (pink blush at blossom end) for distance marketing, or fully ripe for local use."
    },
    fertilization: {
      npk_ratio: "180:100:150 kg/ha (N:P2O5:K2O)",
      basal_dose: "50% Nitrogen, 100% Phosphorus, 50% Potassium applied into raised beds.",
      top_dressing: "Apply remaining N and K in 4 equal splits at 15-day intervals through fertigation or manual hoeing.",
      organic_options: "Neem cake (250 kg/ha) + Vermicompost (3 t/ha) + Trichoderma viride.",
      micronutrients: "Calcium and Boron are vital. Spray 0.2% Calcium Nitrate and 0.1% Borax during flowering to stop flower drop."
    },
    crop_balancing: {
      soil_amendments: "Maintain soil organic matter above 1.5%. Mulch with silver-black plastic or dry straw to conserve moisture and suppress weeds.",
      nutrient_deficiency_cures: "Blossom End Rot (black sunken patch on fruit bottom) is caused by Calcium deficiency and erratic watering; foliar spray CaCl2 (0.5%).",
      pest_disease_management: "Early Blight, Late Blight, Whitefly (curls leaves), and Fruit Borer. Use yellow sticky traps, spray Neem oil, and prune lower diseased foliage.",
      companion_plants: ["Marigold (repels root-knot nematodes)", "Basil (enhances flavor & repels flies)", "Garlic"],
      crop_rotation: "Never plant after other solanaceous crops (Potato, Brinjal, Chilli); rotate with Legumes, Sweet corn, or Cabbage."
    },
    expected_yield: "50 - 80 metric tonnes / hectare (hybrids)"
  },
  {
    id: "cotton",
    name: "Cotton",
    scientific_name: "Gossypium hirsutum",
    category: "Cash Crops & Fibers",
    folder: "Cash_Crops_and_Fibers",
    icon: "🧶",
    summary: "White Gold cash crop requiring warm climates, deep moisture-retentive black soils, and sunny, dry harvesting periods.",
    climate_requirements: {
      seasons: ["Kharif (Summer/Monsoon)"],
      min_temp: 21,
      max_temp: 40,
      optimal_temp: 28,
      min_rain: 50,
      max_rain: 120,
      humidity_range: "50% - 65%",
      sunlight_hours: "8 - 10 hours of bright sunlight; frost-free minimum 200 days"
    },
    land_soil_suitability: {
      soil_types: ["Deep Black Cotton Soil (Vertisols)", "Alluvial Loam with moisture retention"],
      ideal_ph: "6.5 - 8.2",
      drainage: "Good surface and internal drainage; resists drought but hates water stagnation.",
      land_prep: "Deep summer plowing (30 cm) with mould-board plow to destroy weed rhizomes and bollworm pupae.",
      altitude: "Sea level to 1000m"
    },
    how_to_grow: {
      sowing_time: "April-May (North India) or June-July (Central/South India with monsoon onset)",
      seed_rate: "2.5-3.0 kg/ha for Bt Hybrids; 10-12 kg/ha for non-Bt varieties",
      spacing: "90 cm x 60 cm or 120 cm x 45 cm for Bt hybrids",
      nursery_prep: "Direct dibbling of delinted and treated seeds at 3-5 cm depth into moist soil.",
      irrigation_stages: "Square formation (35-40 d), Flowering (60-70 d), and Boll development (80-110 d). Critical to stop watering when bolls burst.",
      growth_cycle_days: "150 - 180 days",
      harvesting_signs: "Bolls burst open completely, exposing fluffy white lint. Pick in morning hours when dew dries."
    },
    fertilization: {
      npk_ratio: "120:60:60 kg/ha (N:P2O5:K2O) for Bt cotton",
      basal_dose: "20% N, full P, and 50% K at time of sowing.",
      top_dressing: "Split remaining N: 40% at squaring and 40% at flowering along with remaining 50% K.",
      organic_options: "10 t/ha Farmyard manure + 500 kg castor cake or neem cake.",
      micronutrients: "Foliar spray of 1% Magnesium Sulphate + 0.5% Urea at 50 and 70 days to prevent leaf reddening."
    },
    crop_balancing: {
      soil_amendments: "High potassium balance prevents premature defoliation. In sodic soils, treat with gypsum.",
      nutrient_deficiency_cures: "Leaf reddening (Magnesium/Nitrogen imbalance) cured by 1% MgSO4 spray. Boron deficiency causes boll shedding (spray 0.1% Borax).",
      pest_disease_management: "Sucking pests (Aphids, Jassids, Thrips, Whiteflies) and Pink Bollworm. Install pheromone traps (5/acre). Conserve predatory ladybugs and lacewings.",
      companion_plants: ["Cowpea (trap crop)", "Marigold (border)", "Castor (attracts Spodoptera)"],
      crop_rotation: "Cotton - Wheat, Cotton - Chickpea, or Cotton - Fallow."
    },
    expected_yield: "2.5 - 3.5 metric tonnes seed cotton / hectare"
  },
  {
    id: "chickpea",
    name: "Chickpea (Gram)",
    scientific_name: "Cicer arietinum",
    category: "Pulses & Legumes",
    folder: "Pulses_and_Legumes",
    icon: "🧆",
    summary: "Premier legume and protein powerhouse that fixes atmospheric nitrogen, perfect for low-moisture winter cultivation.",
    climate_requirements: {
      seasons: ["Rabi (Winter)"],
      min_temp: 10,
      max_temp: 30,
      optimal_temp: 20,
      min_rain: 20,
      max_rain: 60,
      humidity_range: "30% - 50%",
      sunlight_hours: "7 - 8 hours daily"
    },
    land_soil_suitability: {
      soil_types: ["Clay Loam", "Sandy Loam with good subsoil moisture", "Medium Black Soil"],
      ideal_ph: "6.0 - 7.5",
      drainage: "Very sensitive to poor aeration and excess moisture; requires loose, friable seedbed.",
      land_prep: "Rough seedbed is preferred over fine powder to avoid crusting after light winter showers.",
      altitude: "0 - 2000m"
    },
    how_to_grow: {
      sowing_time: "Mid-October to first week of November",
      seed_rate: "60-75 kg/ha for Desi types; 80-100 kg/ha for Kabuli types",
      spacing: "30 cm row-to-row x 10 cm plant-to-plant; depth 7-10 cm to access residual moisture",
      nursery_prep: "Direct seeded. Inoculate seeds with Rhizobium culture and PSB (Phosphorus Solubilizing Bacteria).",
      irrigation_stages: "Pre-sowing irrigation, then only 1 or 2 light irrigations at pre-flowering (45 days) and pod development (70 days). Never irrigate during peak blooming.",
      growth_cycle_days: "100 - 130 days",
      harvesting_signs: "Plants turn yellowish-brown, leaves drop off, and pods produce a rattling sound when shaken."
    },
    fertilization: {
      npk_ratio: "20:40:20 kg/ha (N:P2O5:K2O) + 20 kg Sulfur/ha",
      basal_dose: "All fertilizers applied basal at sowing 4-5 cm below the seed line.",
      top_dressing: "Top dressing of Nitrogen is NOT needed as nodules fix N. Foliar spray of 2% Urea at pod fill boosts protein.",
      organic_options: "Vermicompost at 2 t/ha; Rhizobium leguminosarum bio-inoculant.",
      micronutrients: "Molybdenum and Iron are crucial for nitrogenase enzymes. Spray 0.05% Sodium molybdate if soil is deficient."
    },
    crop_balancing: {
      soil_amendments: "Sulfur application (20 kg/ha through gypsum) increases nodulation and protein yield by 20%.",
      nutrient_deficiency_cures: "Iron chlorosis on calcareous soils: spray 0.5% FeSO4.",
      pest_disease_management: "Helicoverpa pod borer and Fusarium wilt. Install 'T'-shaped bird perches (50/ha) and spray NPV (Nuclear Polyhedrosis Virus) or neem seed kernel extract (NSKE 5%).",
      companion_plants: ["Mustard (intercrop 4:1)", "Linseed", "Coriander"],
      crop_rotation: "Paddy - Chickpea, Maize - Chickpea, Pearlmillet - Chickpea."
    },
    expected_yield: "1.8 - 2.8 metric tonnes / hectare"
  },
  {
    id: "potato",
    name: "Potato",
    scientific_name: "Solanum tuberosum",
    category: "Vegetables & Greens",
    folder: "Vegetables_and_Greens",
    icon: "🥔",
    summary: "Heavy yielding tuber crop thriving in cool conditions, requiring loose, aerated soils rich in potassium.",
    climate_requirements: {
      seasons: ["Rabi (Winter) / Hill Summer"],
      min_temp: 12,
      max_temp: 25,
      optimal_temp: 18,
      min_rain: 30,
      max_rain: 90,
      humidity_range: "60% - 80%",
      sunlight_hours: "6 - 7 hours daily (short days favor tuberization)"
    },
    land_soil_suitability: {
      soil_types: ["Loose Sandy Loam", "Silt Loam rich in organic matter"],
      ideal_ph: "5.2 - 6.5 (slightly acidic prevents potato scab)",
      drainage: "Exceptional drainage is compulsory; tubers rot rapidly in waterlogged soils.",
      land_prep: "Deep cultivation (25-30 cm) to eliminate hardpans, followed by earthing up ridges.",
      altitude: "Plains in winter, Hills at 1500-2500m in summer"
    },
    how_to_grow: {
      sowing_time: "Mid-October to early November in plains; March-April in hills",
      seed_rate: "2.5 - 3.0 metric tonnes/ha of healthy, disease-free sprouted seed tubers (35-50g each)",
      spacing: "60 cm ridge-to-ridge x 20 cm tuber-to-tuber",
      nursery_prep: "Pre-sprout tubers in diffused light for 10-15 days until sturdy green sprouts form.",
      irrigation_stages: "Keep soil consistently moist (70% field capacity). Critical at stolon formation (20 d), tuber initiation (40 d), and tuber bulking (60 d). Stop water 10 days before dehaulming.",
      growth_cycle_days: "90 - 110 days",
      harvesting_signs: "Foliage turns yellow and senesces. Dehaulm (cut vines) 10-12 days before harvest to harden the tuber skin."
    },
    fertilization: {
      npk_ratio: "150:80:120 kg/ha (N:P2O5:K2O)",
      basal_dose: "50% Nitrogen, 100% Phosphorus, and 50% Potassium applied at planting in furrows.",
      top_dressing: "Remaining 50% N and 50% K applied at first earthing-up (30-35 days after planting).",
      organic_options: "Well-decomposed cattle manure (25-30 t/ha) applied 3 weeks prior.",
      micronutrients: "Zinc and Magnesium. Potassium deficiency causes blackening of boiled potatoes."
    },
    crop_balancing: {
      soil_amendments: "Maintain acidic pH (5.2-6.0) to suppress Streptomyces scabies. Avoid liming immediately before potato.",
      nutrient_deficiency_cures: "Potassium promotes starch translocation; use Muriate of Potash (MOP) or Sulfate of Potash (SOP).",
      pest_disease_management: "Late Blight (Phytophthora infestans) is the deadliest threat. Prophylactic spray of Mancozeb (0.2%) before foggy weather.",
      companion_plants: ["Horseradish", "Bush Beans", "Marigold"],
      crop_rotation: "Rotate with Maize, Legumes, or Mustard. Never follow Tomato or Pepper."
    },
    expected_yield: "25 - 40 metric tonnes / hectare"
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    scientific_name: "Saccharum officinarum",
    category: "Cash Crops & Fibers",
    folder: "Cash_Crops_and_Fibers",
    icon: "🎋",
    summary: "High-biomass perennial grass and sweetener source requiring long sunshine hours, copious water, and deep fertile loam.",
    climate_requirements: {
      seasons: ["Spring / Autumn Planting (Year-round)"],
      min_temp: 20,
      max_temp: 38,
      optimal_temp: 27,
      min_rain: 100,
      max_rain: 250,
      humidity_range: "70% - 85%",
      sunlight_hours: "8 - 10 hours daily"
    },
    land_soil_suitability: {
      soil_types: ["Deep Fertile Loam", "Clayey Loam", "Alluvial Deep Soils"],
      ideal_ph: "6.5 - 7.8",
      drainage: "Good drainage; high water table (>1m) and waterlogging reduce sucrose content.",
      land_prep: "Deep subsoiling followed by 2 cross-plowings, ridging at 90-120 cm width.",
      altitude: "0 - 1000m"
    },
    how_to_grow: {
      sowing_time: "Spring (Feb-March) or Autumn (Oct-Nov)",
      seed_rate: "35,000 - 40,000 three-budded setts / hectare (approx. 7-8 tonnes setts)",
      spacing: "90 cm to 120 cm row-to-row spacing",
      nursery_prep: "Treat setts with Carbendazim (1g/L) and hot water (52°C for 30 mins) to kill red-rot spores.",
      irrigation_stages: "Germination (1-45 d, 4 irrigations), Formative (45-120 d, every 8-10 days), Grand growth (120-270 d, every 12-15 days), Maturation (withhold 1 month prior to harvest).",
      growth_cycle_days: "300 - 365 days (10 - 12 months)",
      harvesting_signs: "Brix hydrometer reading reaches 18-20%, leaves dry up, stalk makes metallic ringing sound when tapped."
    },
    fertilization: {
      npk_ratio: "250:100:120 kg/ha (N:P2O5:K2O)",
      basal_dose: "Apply 25% Nitrogen, all Phosphorus, and 50% Potassium in furrows during planting.",
      top_dressing: "Apply 50% N at tillering (60 days) and 25% N + 50% K at earthing up (120-150 days). Stop N by 5th month.",
      organic_options: "Pressmud (sugar mill waste) at 10-15 t/ha or FYM at 25 t/ha + Trash mulching.",
      micronutrients: "Iron and Zinc deficiency is common in alkaline soils; spray 1% Ferrous Sulphate + 0.5% ZnSO4."
    },
    crop_balancing: {
      soil_amendments: "Soil trash mulching (10 cm thick) conserves 30% water, suppresses weeds, and recycles organic carbon.",
      nutrient_deficiency_cures: "Excess late nitrogen creates watery juice with poor recovery; strictly complete N application before grand growth.",
      pest_disease_management: "Early shoot borer, Top borer, and Red rot. Release Trichogramma egg parasitoids (50,000/ha). Use resistant cultivars.",
      companion_plants: ["Potato, Green gram, or Soybean intercropped in wide row spacing"],
      crop_rotation: "Sugarcane (Plant crop) - Sugarcane (Ratoon) - Wheat / Rice - Green Manure."
    },
    expected_yield: "80 - 120 metric tonnes cane / hectare"
  },
  {
    id: "mango",
    name: "Mango",
    scientific_name: "Mangifera indica",
    category: "Fruits & Orchards",
    folder: "Fruits_and_Orchards",
    icon: "🥭",
    summary: "King of fruits requiring distinct dry seasons for flower bud triggering, deep soils, and warm tropical sunshine.",
    climate_requirements: {
      seasons: ["Perennial Orchard"],
      min_temp: 18,
      max_temp: 42,
      optimal_temp: 27,
      min_rain: 50,
      max_rain: 200,
      humidity_range: "50% - 75%",
      sunlight_hours: "9 - 10 hours daily"
    },
    land_soil_suitability: {
      soil_types: ["Deep alluvial loam", "Red loamy soils with gravelly substratum"],
      ideal_ph: "5.5 - 7.5",
      drainage: "Requires at least 2 to 2.5 meters depth of well-drained soil without impenetrable hard pans.",
      land_prep: "Dig pits of 1m x 1m x 1m during summer; expose to sun, then fill with 50kg compost + 1kg SSP + topsoil.",
      altitude: "0 - 900m"
    },
    how_to_grow: {
      sowing_time: "Monsoon onset (July-August) or spring (Feb-March under irrigation)",
      seed_rate: "100 plants/ha for traditional (10m x 10m); 400-500 plants/ha for High Density (5m x 5m)",
      spacing: "10m x 10m (Standard) or 5m x 5m (High Density Orchard)",
      nursery_prep: "Propagated by veneer grafting, epicotyl grafting, or inarching on sturdy local rootstocks.",
      irrigation_stages: "Regular watering during early establishment; withhold water 2 months before flowering to induce flower buds; resume watering after fruit set until maturity.",
      growth_cycle_days: "Perennial (First commercial bearing at 4-5 years; fruit develops in 100-120 days from bloom)",
      harvesting_signs: "Fruit shoulders rise above the stem attachment, skin color lightens from dark olive to light yellowish green, specific gravity 1.01-1.02."
    },
    fertilization: {
      npk_ratio: "For bearing tree (10+ yrs): 1000g N, 500g P2O5, 1000g K2O per tree per year",
      basal_dose: "Apply 50% N, full P, and 50% K immediately after monsoon or harvest along with 50kg farmyard manure.",
      top_dressing: "Apply remaining 50% N and 50% K during fruit development stage (February-March).",
      organic_options: "Castor cake (5 kg/tree), vermicompost (20 kg/tree), VAM fungi.",
      micronutrients: "Spray Borax (0.2%) to prevent internal fruit necrosis; Zinc sulphate (0.5%) for little-leaf disorder."
    },
    crop_balancing: {
      soil_amendments: "Maintain basin mulching with dry leaves or sugarcane trash (15 cm thick) to preserve root zone moisture.",
      nutrient_deficiency_cures: "Paclobutrazol application (3-5 ml/meter tree canopy) balances vegetative vigor and stimulates uniform off-season or regular flowering.",
      pest_disease_management: "Mango Hopper, Fruit Fly, and Powdery Mildew. Spray Wettable Sulfur (0.2%) for mildew; install Methyl Eugenol pheromone traps for fruit fly.",
      companion_plants: ["Cowpea, Papaya, Turmeric, or Ginger grown as intercrops in young orchards"],
      crop_rotation: "Not applicable (Perennial orchard lasting 40-60 years)."
    },
    expected_yield: "10 - 18 metric tonnes / hectare for mature orchard"
  },
  {
    id: "turmeric",
    name: "Turmeric",
    scientific_name: "Curcuma longa",
    category: "Spices & Plantation",
    folder: "Spices_and_Plantation",
    icon: "🫚",
    summary: "Golden spice and medicinal rhizome demanding warm humid tropical weather, high organic matter, and shade tolerance.",
    climate_requirements: {
      seasons: ["Kharif (Monsoon crop)"],
      min_temp: 20,
      max_temp: 35,
      optimal_temp: 26,
      min_rain: 120,
      max_rain: 300,
      humidity_range: "70% - 90%",
      sunlight_hours: "Partial shade to open sunlight (benefits from 20-30% shade)"
    },
    land_soil_suitability: {
      soil_types: ["Well-drained Sandy Loam", "Clay Loam rich in humus", "Red Alluvial Soil"],
      ideal_ph: "5.5 - 7.0",
      drainage: "Zero tolerance for stagnant water; raised beds or ridges are essential to stop rhizome rot.",
      land_prep: "Deep plowing (30 cm), prepare raised beds 15 cm high, 1.2 m wide, with 50 cm spacing between beds.",
      altitude: "0 - 1500m"
    },
    how_to_grow: {
      sowing_time: "April to June with pre-monsoon showers",
      seed_rate: "2000 - 2500 kg/ha of mother or primary finger rhizomes (25-35g with 2 healthy buds)",
      spacing: "30 cm x 20 cm or 25 cm x 25 cm on raised beds",
      nursery_prep: "Treat seed rhizomes with Mancozeb (3g/L) for 30 minutes and shade dry before planting at 5 cm depth.",
      irrigation_stages: "Water immediately after planting, then at 7-10 day intervals depending on rainfall. Vital during rhizome enlargement (90-150 days).",
      growth_cycle_days: "210 - 270 days (7 - 9 months)",
      harvesting_signs: "Leaves turn yellow and dry up completely, collapsing onto the ground."
    },
    fertilization: {
      npk_ratio: "120:60:120 kg/ha (N:P2O5:K2O)",
      basal_dose: "All Phosphorus + 25% Nitrogen + 25% Potassium in bed preparation.",
      top_dressing: "Split remaining N and K in 3 equal parts at 30, 60, and 90 days after planting coinciding with earthing up.",
      organic_options: "Incorporate 25-30 tonnes/ha Farm Yard Manure + 2 tonnes neem cake + heavy green leaf mulching (15 tonnes/ha).",
      micronutrients: "Spray 0.5% Ferrous Sulphate and 0.5% Zinc Sulphate at 60 and 90 days."
    },
    crop_balancing: {
      soil_amendments: "Mulching with green leaves (3 times: at planting, 40 days, and 80 days) is the secret to turmeric; it regulates soil temp and prevents weeds.",
      nutrient_deficiency_cures: "Curcumin content increases when potassium and sulfur are balanced; avoid excess nitrogen which produces watery watery rhizomes.",
      pest_disease_management: "Rhizome Rot (Pythium) and Shoot Borer (Conogethes punctiferalis). Soil drenching with Trichoderma harzianum or Copper Oxychloride.",
      companion_plants: ["Maize (border shade)", "Chilli", "Arhar / Pigeon pea"],
      crop_rotation: "Rotate with Rice, Sugarcane, Banana, or Maize. Avoid planting after Ginger or Potato."
    },
    expected_yield: "20 - 25 metric tonnes fresh rhizomes / hectare (4-5 t cured dry)"
  },
  {
    id: "onion",
    name: "Onion",
    scientific_name: "Allium cepa",
    category: "Vegetables & Greens",
    folder: "Vegetables_and_Greens",
    icon: "🧅",
    summary: "High-consumption bulb vegetable requiring cool early vegetative growth and warm, dry weather for bulb maturation.",
    climate_requirements: {
      seasons: ["Rabi (Winter)", "Kharif", "Late Kharif"],
      min_temp: 13,
      max_temp: 30,
      optimal_temp: 20,
      min_rain: 30,
      max_rain: 90,
      humidity_range: "50% - 70%",
      sunlight_hours: "10 - 12 hours (photoperiod sensitive)"
    },
    land_soil_suitability: {
      soil_types: ["Well-drained Sandy Loam", "Silt Loam with organic matter"],
      ideal_ph: "6.0 - 7.5",
      drainage: "High drainage; shallow root system (15-20 cm) rots easily if soil becomes heavy or waterlogged.",
      land_prep: "Fine crumbly tilth, flat beds or broad bed furrows (BBF) 1.2m wide.",
      altitude: "0 - 2000m"
    },
    how_to_grow: {
      sowing_time: "Rabi: Oct-Nov nursery, Dec-Jan transplant; Kharif: May-June nursery, July-Aug transplant",
      seed_rate: "8 - 10 kg/ha for seedlings; 250 kg/ha for sets",
      spacing: "15 cm row-to-row x 10 cm plant-to-plant",
      nursery_prep: "Grow seedlings on raised nursery beds for 6-7 weeks until pencil-thick before transplanting.",
      irrigation_stages: "Frequent shallow irrigations (every 7-8 days). Stop water 10-15 days before harvest to initiate curing.",
      growth_cycle_days: "120 - 150 days",
      harvesting_signs: "50% of the plant tops fall over (neck break). Leaves dry out and bulb outer scales become papery."
    },
    fertilization: {
      npk_ratio: "100:50:50 kg/ha (N:P2O5:K2O) + 30 kg/ha Sulfur",
      basal_dose: "50% N, full P, and full K at transplanting.",
      top_dressing: "Remaining 50% N applied in two splits: at 30 days and 45 days after transplanting. No nitrogen after 60 days to prevent thick necks.",
      organic_options: "15-20 t/ha FYM or 5 t/ha poultry manure.",
      micronutrients: "Sulfur is essential for pungent allyl propyl disulfide compounds and pungency. Spray 0.2% Boron."
    },
    crop_balancing: {
      soil_amendments: "Sulfur fertilization (30-40 kg/ha elemental sulfur or gypsum) deepens bulb color, increases storage life and pungency.",
      nutrient_deficiency_cures: "Nitrogen excess causes 'bull-head' or thick necks that won't store. Potassium deficiency causes premature drying of leaf tips.",
      pest_disease_management: "Thrips (scratches leaves causing silvery streaks) and Purple Blotch (Alternaria porri). Spray Neem oil or Fipronil for thrips; Mancozeb for blotch.",
      companion_plants: ["Carrot (repels onion fly)", "Beetroot", "Lettuce"],
      crop_rotation: "Rotate with Legumes, Maize, Wheat, or Cabbage. Avoid Solanaceae and other alliums."
    },
    expected_yield: "25 - 35 metric tonnes / hectare"
  },
  {
    id: "banana",
    name: "Banana",
    scientific_name: "Musa acuminata",
    category: "Fruits & Orchards",
    folder: "Fruits_and_Orchards",
    icon: "🍌",
    summary: "Fast-growing giant herbaceous perennial demanding tropical warmth, heavy nutrition (especially potash), and continuous water.",
    climate_requirements: {
      seasons: ["Perennial (year-round planting)"],
      min_temp: 18,
      max_temp: 38,
      optimal_temp: 27,
      min_rain: 120,
      max_rain: 300,
      humidity_range: "75% - 90%",
      sunlight_hours: "8 - 10 hours daily; windbreaks required against storms"
    },
    land_soil_suitability: {
      soil_types: ["Deep fertile Alluvial Loam", "Clay Loam with abundant organic matter"],
      ideal_ph: "6.0 - 7.5",
      drainage: "At least 1 meter deep well-aerated soil; water stagnation causes Panama wilt.",
      land_prep: "Deep plowing, prepare pits 50 cm x 50 cm x 50 cm with 10 kg FYM + 250g neem cake + 20g carbofuran/trichoderma.",
      altitude: "Sea level to 1200m"
    },
    how_to_grow: {
      sowing_time: "June-July (monsoon) or Sept-Oct; Tissue culture plants can be planted year-round",
      seed_rate: "2500 - 3000 plants/ha (1.8m x 1.8m or 1.5m x 1.5m paired rows)",
      spacing: "1.8 m x 1.8 m (Grand Naine variety) or 1.5 m x 1.5 m",
      nursery_prep: "Use healthy sword suckers (1.5 - 2 kg) or primary-hardened tissue cultured disease-free plantlets.",
      irrigation_stages: "Drip irrigation is standard (15-20 liters/plant/day during vegetative, 20-25 L during flowering/bunch fill).",
      growth_cycle_days: "300 - 365 days (10 - 12 months for first harvest)",
      harvesting_signs: "Angles on fruit fingers become rounded, dried floral parts drop off easily, dwarf leaf turns yellow."
    },
    fertilization: {
      npk_ratio: "200:60:300 grams N:P2O5:K2O per plant over the cycle",
      basal_dose: "All Phosphorus at 30 days after planting.",
      top_dressing: "Nitrogen and Potassium split into 6-8 micro-doses via drip fertigation from 2nd month to shooting stage.",
      organic_options: "15-20 kg FYM/plant + 1 kg vermicompost + Pseudomonas fluorescens.",
      micronutrients: "Spray 0.2% Zinc Sulphate, 0.1% Boric Acid, and 0.5% Ferrous Sulphate at 4th and 6th month."
    },
    crop_balancing: {
      soil_amendments: "High potassium:nitrogen ratio (1.5:1) after shooting thickens finger skin, reduces finger drop, and boosts sugar content.",
      nutrient_deficiency_cures: "Potassium deficiency shows as yellowing and curling downwards of older leaves. Nitrogen deficiency stuns leaf emergence.",
      pest_disease_management: "Sigatoka leaf spot, Panama Wilt (Fusarium), and Pseudostem Borer. Deleaf yellow spotted leaves, bag bunches with blue polyethylene covers.",
      companion_plants: ["Cowpea or French bean intercrop in first 4 months"],
      crop_rotation: "Banana (Plant) - Banana (1st Ratoon) - Rice / Sunnhemp green manure."
    },
    expected_yield: "60 - 90 metric tonnes / hectare (Tissue Culture Grand Naine)"
  }
];

// Folder directory structure representing the knowledge vault
const VAULT_DIRECTORIES = [
  {
    name: "Cereals & Grains",
    folder: "Cereals_and_Grains",
    icon: "🌾",
    description: "Staple food crops including Rice, Wheat, Maize, Millets, and Barley with complete seasonal guides.",
    crops: ["rice", "wheat", "maize"]
  },
  {
    name: "Pulses & Legumes",
    folder: "Pulses_and_Legumes",
    icon: "🧆",
    description: "Nitrogen-fixing protein crops like Chickpea, Lentil, Pigeon Pea, and Soybean.",
    crops: ["chickpea"]
  },
  {
    name: "Cash Crops & Fibers",
    folder: "Cash_Crops_and_Fibers",
    icon: "🧶",
    description: "High-value industrial and commercial crops including Cotton, Sugarcane, and Jute.",
    crops: ["cotton", "sugarcane"]
  },
  {
    name: "Vegetables & Greens",
    folder: "Vegetables_and_Greens",
    icon: "🍅",
    description: "Nutritive horticultural vegetables including Tomato, Potato, Onion, and leafy greens.",
    crops: ["tomato", "potato", "onion"]
  },
  {
    name: "Fruits & Orchards",
    folder: "Fruits_and_Orchards",
    icon: "🥭",
    description: "Perennial and subtropical fruit orchards including Mango, Banana, and Citrus groves.",
    crops: ["mango", "banana"]
  },
  {
    name: "Spices & Plantation",
    folder: "Spices_and_Plantation",
    icon: "🫚",
    description: "High-margin spice rhizomes and plantation crops like Turmeric, Ginger, and Pepper.",
    crops: ["turmeric"]
  },
  {
    name: "Soil & Fertilizers Vault",
    folder: "Soil_and_Fertilizers",
    icon: "🧪",
    description: "Comprehensive charts on NPK balancing, soil pH amendments, organic manure, and micronutrients.",
    crops: []
  }
];

// Standard Soil Profiles for Suitability and Rebalancing
const SOIL_TYPES_REFERENCE = {
  "Clayey Loam": {
    ph_range: [5.5, 7.5],
    drainage: "Moderate to Slow",
    water_retention: "Very High",
    best_crops: ["Rice (Paddy)", "Sugarcane", "Wheat", "Banana"],
    characteristics: "Rich in mineral nutrients, high clay content, requires aeration and organic matter to prevent compaction."
  },
  "Alluvial Loam": {
    ph_range: [6.0, 7.8],
    drainage: "Good",
    water_retention: "High",
    best_crops: ["Wheat", "Rice", "Maize", "Sugarcane", "Potato", "Mango"],
    characteristics: "Deposited by rivers, most fertile and balanced soil type with optimal silt, sand, and clay balance."
  },
  "Deep Black Soil (Vertisols)": {
    ph_range: [6.8, 8.5],
    drainage: "Slow when wet, cracks when dry",
    water_retention: "Extremely High",
    best_crops: ["Cotton", "Chickpea", "Wheat", "Maize"],
    characteristics: "Self-plowing, swells when wet and shrinks when dry, rich in calcium and magnesium carbonate."
  },
  "Sandy Loam": {
    ph_range: [5.8, 7.0],
    drainage: "Very Fast",
    water_retention: "Low to Moderate",
    best_crops: ["Tomato", "Potato", "Onion", "Turmeric", "Maize"],
    characteristics: "Warm, light, loose texture, easy root penetration, requires regular organic mulching and frequent irrigation."
  },
  "Red Soil": {
    ph_range: [5.0, 6.8],
    drainage: "Rapid",
    water_retention: "Moderate",
    best_crops: ["Turmeric", "Mango", "Pulses", "Millets", "Cotton"],
    characteristics: "Formed by weathering of crystalline rocks, rich in iron oxides, generally low in nitrogen and phosphorus."
  }
};
