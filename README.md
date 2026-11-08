# 🌾 AgriCrops Pro — Smart Agricultural Intelligence & Crop Advisory System

An end-to-end, full-featured agricultural decision-support web application designed for farmers, agronomists, and researchers.

---

## 🚀 Quick Launch (Immediate Zero-Install Setup)

You can launch and use the application immediately on Windows:
1. **PowerShell (Recommended):** Open PowerShell in this folder and run:
   ```powershell
   .\run.ps1
   ```
   Or open directly with one command:
   ```powershell
   Start-Process index.html
   ```
2. **Method 2 (Instant Batch):** Double-click [`start_app.bat`](file:///c:/Users/praka/Downloads/agricrops%20system/start_app.bat) or double-click [`index.html`](file:///c:/Users/praka/Downloads/agricrops%20system/index.html). It will open instantly in your default web browser (Edge, Chrome, Firefox).
3. **Method 3 (Python Server):** Run `python backend/server.py` in your terminal and visit `http://localhost:8000`.
4. **Method 4 (Node.js Server):** Run `node backend/server.js` in your terminal and visit `http://localhost:8000`.

---

## 🌟 Key Application Features

### 1. 💬 Agro AI Advisor (Crop Q&A Engine)
Ask any question in natural language about any crop, and receive structured, actionable agronomic advice:
- **🌱 How to Grow:**
  - Optimal sowing windows and calendar seasons
  - Seed rate and precise spacing (row-to-row, plant-to-plant)
  - Nursery management (plug trays, SRI technique, grafting)
  - Critical irrigation stages & water requirement
  - Harvesting indicators and yield projections
- **🧪 Fertilization Protocols:**
  - Recommended NPK ratio (e.g. 120:60:40 for Rice/Wheat, 180:100:150 for Tomato)
  - Basal application at sowing
  - Top dressing split schedule (active tillering, panicle/flowering stages)
  - Organic manures (FYM, Vermicompost, Green manure)
  - Micronutrient deficiency management (Zinc, Boron, Calcium, Iron, Sulfur)
- **🏞️ Land & Soil Suitability:**
  - Matching soil types: Alluvial Loam, Clayey Loam, Deep Black Vertisol, Sandy Loam, Red Soil
  - Ideal soil pH range (e.g., 5.5 - 6.8 for Rice, 6.0 - 7.5 for Wheat)
  - Drainage criteria, aeration, and tillage protocols
- **⚖️ Crop Balancing & Health Protection:**
  - Soil amendments for acidic (liming) or alkaline (gypsum & sulfur) conditions
  - Integrated pest and disease balancing (IPM) with biological controls
  - Nutrient deficiency diagnostics and emergency corrective sprays
  - Companion planting synergies (e.g., Marigold border for Tomato root-knot nematodes)
  - Sustainable crop rotation cycles to restore nitrogen and soil structure

### 2. 🗂️ Knowledge Vault & Interactive Folder Explorer
A real, interactive directory and file system browser inside the application:
- **Clickable Folders:** Clicking any folder (e.g. `📁 Cereals & Grains`, `📁 Vegetables & Greens`, `📁 Soil & Fertilizers Vault`) opens that folder smoothly to reveal its internal dossiers and guide files.
- **Dossier & Document Inspection:** Clicking any dossier opens a detailed modal reader with the full crop dossier or markdown cultivation guides.
- **Breadcrumb Navigation:** Easily navigate back to the root vault or switch between categories.

### 3. 🌦️ Live Weather Station & Climate-Based Crop Matcher
- **Live Meteorological Data:** Integrated with the free global Open-Meteo API (requires no API keys) to provide real-time temperature, humidity, precipitation rate, wind speed, and 7-day temperature trends.
- **City Search & Quick Presets:** Search any city in the world or pick one of the quick presets (Punjab, Maharashtra, Bengaluru, California, Nairobi).
- **Land & Soil Type Selection:** Choose your land/soil texture (Alluvial Loam, Clayey Loam, Deep Black Soil, Sandy Loam, Red Soil).
- **Automated Agro-Climatic Suitability Algorithm:**
  - Computes a mathematical Suitability Score (0% to 100%) for each crop based on thermal tolerance, moisture requirements, and soil affinity.
  - Generates ranked cards with recommendations: `🌟 Highly Recommended`, `✅ Good / Recommended`, `⚠️ Moderate / Needs Irrigation Care`, or `❌ Not Advisable Currently`.
  - Explains the exact agronomic reason why each crop is suited or unsuited to the current weather and land.

### 4. ⚖️ Soil Diagnostic, Balancing & Rebalancer Matrix
- Adjust your soil pH on an interactive slider (from 4.0 strongly acidic to 9.0 strongly alkaline).
- Select your land texture and any observed deficiency (Nitrogen, Phosphorus, Potassium, Zinc, or Calcium).
- Click **"Calculate Soil Rebalancing Formula"** to generate exact metric amendment amounts (limestone vs. gypsum/sulfur) and retrieve the best crops tailored for that adjusted soil.

---

## 📂 Project Directory Structure

```
agricrops system/
│
├── index.html                           # Main Web Application Interface
├── start_app.bat                        # Windows 1-Click Launcher (opens in browser)
├── README.md                            # Comprehensive Documentation
│
├── css/
│   └── styles.css                       # Responsive agricultural UI theme & styles
│
├── js/
│   ├── crops_data.js                    # Scientific dataset of crops, soils, & directories
│   ├── advisory_engine.js               # Q&A intelligence & natural query parser
│   ├── weather_service.js               # Open-Meteo live weather + climate crop matcher
│   ├── folder_explorer.js               # Interactive folder and dossier file explorer
│   └── app.js                           # Core application controller & event binders
│
├── data/
│   └── knowledge_vault/                 # Physical folders & guide files
│       ├── Cereals_and_Grains/
│       │   ├── rice_cultivation_guide.md
│       │   └── wheat_management_dossier.md
│       ├── Vegetables_and_Greens/
│       │   └── tomato_masterclass.md
│       └── Soil_and_Fertilizers/
│           └── soil_balancing_and_npk_formulas.md
│
└── backend/
    ├── server.py                        # Python REST backend server
    ├── server.js                        # Node.js backend server
    └── api_routes.json                  # API schema & catalog specifications
```

---

## 💡 Example Questions You Can Ask

- *"How to grow Rice?"*
- *"What fertilizer is best for Wheat?"*
- *"Which land suits Cotton?"*
- *"How to balance Tomato nutrients and pests?"*
- *"How to balance acidic soil?"*
- *"Which crops suit clayey soil?"*
- *"Best fertilizer schedule for Sugarcane"*
- *"How to grow Maize and when to harvest?"*
