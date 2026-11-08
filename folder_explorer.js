/**
 * AgriCrops Interactive Folder & Knowledge Vault Explorer
 * Manages the interactive folder hierarchy: clicking a folder opens its contents,
 * files, and detailed cultivation dossiers.
 */

class FolderExplorer {
  constructor(directories, cropDatabase, onOpenFileCallback) {
    this.directories = directories;
    this.cropDatabase = cropDatabase;
    this.onOpenFile = onOpenFileCallback;
    this.activeFolderId = null;
    this.currentPath = ["Knowledge Vault"];
    
    // File documents registry inside folders
    this.folderDocuments = {
      "Cereals_and_Grains": [
        { id: "rice", type: "crop", name: "Rice (Paddy) - Complete Dossier.crop", ext: "crop", icon: "🌾", cropId: "rice" },
        { id: "rice_guide_md", type: "doc", name: "rice_cultivation_guide.md", ext: "md", icon: "📄", path: "data/knowledge_vault/Cereals_and_Grains/rice_cultivation_guide.md" },
        { id: "wheat", type: "crop", name: "Wheat - Production Manual.crop", ext: "crop", icon: "🌾", cropId: "wheat" },
        { id: "wheat_guide_md", type: "doc", name: "wheat_management_dossier.md", ext: "md", icon: "📄", path: "data/knowledge_vault/Cereals_and_Grains/wheat_management_dossier.md" },
        { id: "maize", type: "crop", name: "Maize (Corn) - Hybrid Protocol.crop", ext: "crop", icon: "🌽", cropId: "maize" }
      ],
      "Pulses_and_Legumes": [
        { id: "chickpea", type: "crop", name: "Chickpea (Gram) - Nitrogen Fixing Guide.crop", ext: "crop", icon: "🧆", cropId: "chickpea" }
      ],
      "Cash_Crops_and_Fibers": [
        { id: "cotton", type: "crop", name: "Cotton - Bt Cultivation Protocol.crop", ext: "crop", icon: "🧶", cropId: "cotton" },
        { id: "sugarcane", type: "crop", name: "Sugarcane - Sugar Yield Optimization.crop", ext: "crop", icon: "🎋", cropId: "sugarcane" }
      ],
      "Vegetables_and_Greens": [
        { id: "tomato", type: "crop", name: "Tomato - High Yield Polyhouse & Open Field.crop", ext: "crop", icon: "🍅", cropId: "tomato" },
        { id: "tomato_guide_md", type: "doc", name: "tomato_masterclass.md", ext: "md", icon: "📄", path: "data/knowledge_vault/Vegetables_and_Greens/tomato_masterclass.md" },
        { id: "potato", type: "crop", name: "Potato - Tuber Nutrition & Blight Control.crop", ext: "crop", icon: "🥔", cropId: "potato" },
        { id: "onion", type: "crop", name: "Onion - Bulb Storage & Curing Guide.crop", ext: "crop", icon: "🧅", cropId: "onion" }
      ],
      "Fruits_and_Orchards": [
        { id: "mango", type: "crop", name: "Mango - Orchard Management & Pruning.crop", ext: "crop", icon: "🥭", cropId: "mango" },
        { id: "banana", type: "crop", name: "Banana - Drip Fertigation & Grand Naine Protocol.crop", ext: "crop", icon: "🍌", cropId: "banana" }
      ],
      "Spices_and_Plantation": [
        { id: "turmeric", type: "crop", name: "Turmeric - Curcumin Enhancement & Mulching.crop", ext: "crop", icon: "🫚", cropId: "turmeric" }
      ],
      "Soil_and_Fertilizers": [
        { id: "soil_npk_md", type: "doc", name: "soil_balancing_and_npk_formulas.md", ext: "md", icon: "🧪", path: "data/knowledge_vault/Soil_and_Fertilizers/soil_balancing_and_npk_formulas.md" }
      ]
    };
  }

  /**
   * Render the folder explorer into the target container
   */
  render(containerElement) {
    if (!containerElement) return;

    let html = `
      <div class="explorer-card">
        <div class="explorer-header">
          <div class="explorer-title">
            <span class="folder-header-icon">🗂️</span>
            <div>
              <h3>Agricultural Knowledge Vault & Folders</h3>
              <p class="subtitle">Click any folder to open and explore crop dossiers, soil guides, and cultivation files.</p>
            </div>
          </div>
          <div class="explorer-actions">
            <button class="btn-sm btn-outline" id="btn-root-vault">
              <span>🏠 Root Vault</span>
            </button>
          </div>
        </div>

        <!-- Breadcrumb Navigation -->
        <div class="explorer-breadcrumbs" id="explorer-breadcrumbs">
          ${this.renderBreadcrumbs()}
        </div>

        <!-- Main Explorer Content View -->
        <div class="explorer-body">
          <div class="explorer-grid" id="explorer-items-container">
            ${this.activeFolderId ? this.renderFolderContents(this.activeFolderId) : this.renderRootFolders()}
          </div>
        </div>
      </div>
    `;

    containerElement.innerHTML = html;
    this.bindEvents(containerElement);
  }

  /**
   * Render breadcrumb bar
   */
  renderBreadcrumbs() {
    let crumbs = `<span class="crumb active" data-folder="">Knowledge Vault</span>`;
    if (this.activeFolderId) {
      const folderObj = this.directories.find(d => d.folder === this.activeFolderId);
      if (folderObj) {
        crumbs += ` <span class="crumb-separator">/</span> <span class="crumb active-leaf">${folderObj.name}</span>`;
      }
    }
    return crumbs;
  }

  /**
   * Render top-level category folders
   */
  renderRootFolders() {
    return this.directories.map(dir => {
      const fileCount = (this.folderDocuments[dir.folder] || []).length;
      return `
        <div class="folder-tile" data-folder-id="${dir.folder}" role="button" tabindex="0">
          <div class="folder-visual">
            <div class="folder-tab"></div>
            <div class="folder-front">
              <span class="folder-emoji">${dir.icon}</span>
            </div>
          </div>
          <div class="folder-info">
            <h4 class="folder-name">${dir.name}</h4>
            <span class="folder-badge">${fileCount} ${fileCount === 1 ? 'file' : 'files'}</span>
            <p class="folder-desc">${dir.description}</p>
          </div>
          <div class="folder-action-hint">
            <span>Click to Open Folder →</span>
          </div>
        </div>
      `;
    }).join("");
  }

  /**
   * Render contents of an opened folder
   */
  renderFolderContents(folderId) {
    const files = this.folderDocuments[folderId] || [];
    const folderObj = this.directories.find(d => d.folder === folderId);

    if (files.length === 0) {
      return `
        <div class="empty-folder-state">
          <span class="empty-icon">📂</span>
          <p>This folder is currently empty.</p>
          <button class="btn-sm btn-primary" id="btn-back-to-vault">← Back to All Folders</button>
        </div>
      `;
    }

    let filesHtml = `
      <div class="opened-folder-banner">
        <button class="btn-back-crumb" id="btn-back-to-vault">
          ← Back to Folders
        </button>
        <span class="opened-folder-title">${folderObj ? folderObj.name : folderId}</span>
        <span class="files-count-badge">${files.length} items</span>
      </div>
      <div class="files-list-view">
    `;

    filesHtml += files.map(file => {
      let metaText = "";
      if (file.type === "crop") {
        const crop = this.cropDatabase.find(c => c.id === file.cropId);
        metaText = crop ? `${crop.category} • pH ${crop.land_soil_suitability.ideal_ph} • ${crop.climate_requirements.seasons[0]}` : "Crop Dossier";
      } else {
        metaText = "Cultivation Document • Markdown Guide";
      }

      return `
        <div class="file-item-row" data-file-id="${file.id}" data-file-type="${file.type}" data-crop-id="${file.cropId || ''}" data-file-path="${file.path || ''}">
          <div class="file-icon-box">
            <span class="file-icon">${file.icon}</span>
          </div>
          <div class="file-details">
            <h4 class="file-title">${file.name}</h4>
            <p class="file-meta">${metaText}</p>
          </div>
          <div class="file-action">
            <button class="btn-open-file">Open Dossier</button>
          </div>
        </div>
      `;
    }).join("");

    filesHtml += `</div>`;
    return filesHtml;
  }

  /**
   * Bind click listeners for folder opening and file loading
   */
  bindEvents(container) {
    // Click folder tile to open
    const folderTiles = container.querySelectorAll(".folder-tile");
    folderTiles.forEach(tile => {
      tile.addEventListener("click", () => {
        const folderId = tile.getAttribute("data-folder-id");
        this.openFolder(folderId, container);
      });
    });

    // Back to root vault
    const backBtn = container.querySelector("#btn-back-to-vault");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        this.openFolder(null, container);
      });
    }

    const rootBtn = container.querySelector("#btn-root-vault");
    if (rootBtn) {
      rootBtn.addEventListener("click", () => {
        this.openFolder(null, container);
      });
    }

    // Breadcrumb root click
    const crumb = container.querySelector('.crumb[data-folder=""]');
    if (crumb) {
      crumb.addEventListener("click", () => {
        this.openFolder(null, container);
      });
    }

    // Open file items
    const fileRows = container.querySelectorAll(".file-item-row");
    fileRows.forEach(row => {
      row.addEventListener("click", () => {
        const fileId = row.getAttribute("data-file-id");
        const fileType = row.getAttribute("data-file-type");
        const cropId = row.getAttribute("data-crop-id");
        const filePath = row.getAttribute("data-file-path");

        if (typeof this.onOpenFile === "function") {
          this.onOpenFile({ id: fileId, type: fileType, cropId: cropId, path: filePath });
        }
      });
    });
  }

  /**
   * Open or navigate to folder
   */
  openFolder(folderId, container) {
    this.activeFolderId = folderId;
    this.render(container);
  }
}
