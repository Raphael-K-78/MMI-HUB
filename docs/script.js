
function sortItems(items) {
    return items.sort((a, b) => {
      const isAFile = !a.is_dir;
      const isBFile = !b.is_dir;
      const aIsReadme = isAFile && a.name.toLowerCase() === "readme.md";
      const bIsReadme = isBFile && b.name.toLowerCase() === "readme.md";
  
      // README.md a la priorité la plus haute
      if (aIsReadme && !bIsReadme) return -1;
      if (!aIsReadme && bIsReadme) return 1;
  
      // Si les deux sont fichiers, on les trie par nom
      if (isAFile && isBFile) {
        return a.name.localeCompare(b.name);
      }
  
      // Un fichier doit apparaître avant un dossier
      if (isAFile && !isBFile) return -1;
      if (!isAFile && isBFile) return 1;
  
      // Si ce sont deux dossiers, tri alphabétique
      return a.name.localeCompare(b.name);
    });
  }
  

  function buildTree(tree, isRoot = false) {
    const container = document.createElement("div");
    const sortedItems = sortItems(tree);
  
    sortedItems.forEach(item => {
      if (item.is_dir) {
        // Pour un dossier, on recherche s'il contient un README.md
        let readmeItem = null;
        if (item.children && item.children.length > 0) {
          readmeItem = item.children.find(child => !child.is_dir && child.name.toLowerCase() === "readme.md");
        }
  
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        summary.textContent = item.name + "/";
  
        // Ajoute un événement sur le summary pour charger le README.md s'il existe
        if (readmeItem) {
          summary.onclick = (e) => {
            e.stopPropagation(); // empêcher le toggling du details
            loadMarkdown(readmeItem.path);
          };
        }
  
        details.appendChild(summary);
        
        // Ajoute les enfants du dossier
        if (item.children && item.children.length > 0) {
          details.appendChild(buildTree(item.children));
        }
        container.appendChild(details);
      } else {
        // Pour un fichier : on affiche le lien uniquement pour les fichiers Markdown
        if (item.name.toLowerCase().endsWith('.md')) {
          const link = document.createElement("a");
          link.textContent = item.name;
          link.href = "#";
          link.className = "file-link";
          link.onclick = (e) => {
            e.preventDefault();
            loadMarkdown(item.path);
          };
          container.appendChild(link);
        }
      }
    });
  
    return container;
  }
  
  // Charge la liste des fichiers via file.php et affiche l'arborescence
  function loadFileList() {
    fetch('file.php')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          document.getElementById('fileList').innerText = data.error;
          return;
        }
        const fileListDiv = document.getElementById('fileList');
        fileListDiv.innerHTML = "";
        
        // Si dans le dossier racine existe un README.md, le charger immédiatement
        const rootReadme = data.find(item => !item.is_dir && item.name.toLowerCase() === "readme.md");
        if (rootReadme) {
          loadMarkdown(rootReadme.path);
        }
  
        fileListDiv.appendChild(buildTree(data, true));
      })
      .catch(err => {
        document.getElementById('fileList').innerText = "Erreur lors du chargement de la liste des fichiers.";
        console.error(err);
      });
  }
  
  // Charge et affiche le contenu Markdown converti en HTML via marked.js
  function loadMarkdown(filePath) {
    fetch(filePath)
      .then(response => response.text())
      .then(text => {
        document.getElementById('filename').innerHTML = filePath.substr(4);
        document.getElementById('content').innerHTML = marked.parse(text);
      })
      .catch(err => {
        document.getElementById('content').innerText = "Erreur lors du chargement du fichier !";
        console.error(err);
      });
  }
  
  // Initialisation au chargement de la page
  loadFileList();
  