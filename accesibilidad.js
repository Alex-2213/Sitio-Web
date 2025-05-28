document.addEventListener("DOMContentLoaded", () => {
  // Crear menú de accesibilidad
  const menu = document.createElement("div");
  menu.innerHTML = `
    <button id="toggle-ajustes" class="menu-btn" aria-label="Ajustes de accesibilidad">⚙ Ajustes</button>
    <div class="submenu" id="submenu-ajustes" aria-hidden="true">
      <button onclick="cambiarTamanoFuente(1)" aria-label="Aumentar tamaño de fuente">A+ Aumentar Fuente</button>
      <button onclick="cambiarTamanoFuente(-1)" aria-label="Disminuir tamaño de fuente">A- Disminuir Fuente</button>
      <button onclick="cambiarFuente()" aria-label="Cambiar tipo de fuente">Cambiar Fuente</button>
      <button onclick="alternarModoOscuro()" aria-label="Alternar modo oscuro">Modo Oscuro</button>
      <button onclick="modoAltoContraste()" aria-label="Alternar alto contraste">Alto Contraste</button>
      <button onclick="modoDaltonismo()" aria-label="Alternar modo para daltonismo">Modo Daltonismo</button>
      <button onclick="cambiarCursor()" aria-label="Cambiar tamaño de cursor">Cursor Grande</button>
      <button onclick="quitarImagenes()" aria-label="Mostrar/ocultar imágenes">Quitar Imágenes</button>
      <button onclick="sobresaltarLinks()" aria-label="Resaltar enlaces">Resaltar Links</button>
      <button onclick="activarEstiloAccesible()" aria-label="Activar estilo accesible recomendado">Estilo Accesible</button>
      <button onclick="activarEstiloNormal()" aria-label="Activar estilo normal">Estilo Normal</button>
      <button onclick="restablecerOriginal()" aria-label="Restablecer configuración original">Restablecer</button>
    </div>
  `;
  document.getElementById("menu-accesibilidad").appendChild(menu);

  // Controlador del menú
  const toggleBtn = document.getElementById("toggle-ajustes");
  const submenu = document.getElementById("submenu-ajustes");

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", !isExpanded);
    submenu.setAttribute("aria-hidden", isExpanded);
    submenu.style.display = isExpanded ? "none" : "block";
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) {
      toggleBtn.setAttribute("aria-expanded", "false");
      submenu.setAttribute("aria-hidden", "true");
      submenu.style.display = "none";
    }
  });

  // Cargar preferencias guardadas
  cargarPreferencias();
});

// Variables globales
let tamañoActual = 1;
const fuentes = ['Arial, sans-serif', 'Verdana, sans-serif', "'Courier New', monospace", "'OpenDyslexic', sans-serif"];
let indiceFuente = 0;
let imagenesOcultas = false;
let linksResaltados = false;

// Cargar preferencias del localStorage
function cargarPreferencias() {
  if (localStorage.getItem('tamañoFuente')) {
    tamañoActual = parseFloat(localStorage.getItem('tamañoFuente'));
    document.body.style.fontSize = tamañoActual + 'em';
  }
  if (localStorage.getItem('indiceFuente')) {
    indiceFuente = parseInt(localStorage.getItem('indiceFuente'));
    document.body.style.fontFamily = fuentes[indiceFuente];
  }
  if (localStorage.getItem('modoOscuro') === 'activado') {
    document.body.classList.add('modo-oscuro');
  }
  if (localStorage.getItem('altoContraste') === 'activado') {
    document.body.classList.add('alto-contraste');
  }
  if (localStorage.getItem('daltonismo') === 'activado') {
    document.body.classList.add('daltonismo');
  }
  if (localStorage.getItem('cursorGrande') === 'activado') {
    document.body.classList.add('cursor-grande');
  }
}

// Funciones de accesibilidad
function cambiarTamanoFuente(factor) {
  tamañoActual += factor * 0.25;
  tamañoActual = Math.max(0.5, Math.min(3, tamañoActual));
  document.body.style.fontSize = tamañoActual + 'em';
  localStorage.setItem('tamañoFuente', tamañoActual.toString());
}

function cambiarFuente() {
  indiceFuente = (indiceFuente + 1) % fuentes.length;
  document.body.style.fontFamily = fuentes[indiceFuente];
  localStorage.setItem('indiceFuente', indiceFuente.toString());
}

function alternarModoOscuro() {
  document.body.classList.toggle('modo-oscuro');
  if (document.body.classList.contains('modo-oscuro')) {
    localStorage.setItem('modoOscuro', 'activado');
  } else {
    localStorage.removeItem('modoOscuro');
  }
}

function modoAltoContraste() {
  document.body.classList.toggle('alto-contraste');
  if (document.body.classList.contains('alto-contraste')) {
    localStorage.setItem('altoContraste', 'activado');
  } else {
    localStorage.removeItem('altoContraste');
  }
}

function modoDaltonismo() {
  document.body.classList.toggle('daltonismo');
  if (document.body.classList.contains('daltonismo')) {
    localStorage.setItem('daltonismo', 'activado');
  } else {
    localStorage.removeItem('daltonismo');
  }
}

function cambiarCursor() {
  document.body.classList.toggle('cursor-grande');
  if (document.body.classList.contains('cursor-grande')) {
    localStorage.setItem('cursorGrande', 'activado');
  } else {
    localStorage.removeItem('cursorGrande');
  }
}

function quitarImagenes() {
  const imagenes = document.querySelectorAll('img, picture, video, iframe, figure');
  imagenesOcultas = !imagenesOcultas;
  imagenes.forEach(img => {
    if (imagenesOcultas) {
      img.setAttribute('data-original-display', window.getComputedStyle(img).display);
      img.style.display = 'none';
    } else {
      const originalDisplay = img.getAttribute('data-original-display') || 'block';
      img.style.display = originalDisplay;
    }
  });
  if (imagenesOcultas) {
    localStorage.setItem('imagenesOcultas', 'true');
  } else {
    localStorage.removeItem('imagenesOcultas');
  }
}

function sobresaltarLinks() {
  const links = document.querySelectorAll('a, [role="link"], [tabindex="0"]');
  linksResaltados = !linksResaltados;
  links.forEach(link => {
    if (linksResaltados) {
      link.style.backgroundColor = 'yellow';
      link.style.color = 'black';
      link.style.textDecoration = 'underline';
      link.style.padding = '2px 4px';
      link.style.borderRadius = '3px';
      link.setAttribute('data-original-bg', link.style.backgroundColor);
      link.setAttribute('data-original-color', link.style.color);
    } else {
      link.style.backgroundColor = link.getAttribute('data-original-bg') || '';
      link.style.color = link.getAttribute('data-original-color') || '';
      link.style.textDecoration = link.getAttribute('data-original-decoration') || '';
      link.style.padding = '';
    }
  });
  if (linksResaltados) {
    localStorage.setItem('linksResaltados', 'true');
  } else {
    localStorage.removeItem('linksResaltados');
  }
}

function restablecerOriginal() {
  tamañoActual = 1;
  document.body.style.fontSize = '';
  localStorage.removeItem('tamañoFuente');
  indiceFuente = 0;
  document.body.style.fontFamily = '';
  localStorage.removeItem('indiceFuente');
  document.body.classList.remove('modo-oscuro', 'alto-contraste', 'daltonismo', 'cursor-grande');
  localStorage.removeItem('modoOscuro');
  localStorage.removeItem('altoContraste');
  localStorage.removeItem('daltonismo');
  localStorage.removeItem('cursorGrande');
  const elementosMultimedia = document.querySelectorAll('img, picture, video, iframe, figure');
  elementosMultimedia.forEach(el => {
    const originalDisplay = el.getAttribute('data-original-display') || 'block';
    el.style.display = originalDisplay;
  });
  localStorage.removeItem('imagenesOcultas');
  imagenesOcultas = false;
  const elementosInteractivos = document.querySelectorAll('a, [role="link"], [tabindex="0"]');
  elementosInteractivos.forEach(el => {
    el.style.backgroundColor = el.getAttribute('data-original-bg') || '';
    el.style.color = el.getAttribute('data-original-color') || '';
    el.style.textDecoration = el.getAttribute('data-original-decoration') || '';
    el.style.padding = '';
  });
  localStorage.removeItem('linksResaltados');
  linksResaltados = false;
}

// NUEVAS FUNCIONES PARA ACTIVAR ESTILOS
function activarEstiloNormal() {
  restablecerOriginal();
}

function activarEstiloAccesible() {
  tamañoActual = 1.5;
  document.body.style.fontSize = tamañoActual + 'em';
  localStorage.setItem('tamañoFuente', tamañoActual.toString());

  indiceFuente = 0;
  document.body.style.fontFamily = 'Arial, sans-serif';
  localStorage.setItem('indiceFuente', indiceFuente.toString());

  document.body.classList.add('alto-contraste');
  localStorage.setItem('altoContraste', 'activado');

  document.body.classList.add('cursor-grande');
  localStorage.setItem('cursorGrande', 'activado');

  if (!imagenesOcultas) quitarImagenes();
  if (!linksResaltados) sobresaltarLinks();
}

// Hacer las funciones accesibles globalmente
window.cambiarTamanoFuente = cambiarTamanoFuente;
window.cambiarFuente = cambiarFuente;
window.alternarModoOscuro = alternarModoOscuro;
window.modoAltoContraste = modoAltoContraste;
window.modoDaltonismo = modoDaltonismo;
window.cambiarCursor = cambiarCursor;
window.quitarImagenes = quitarImagenes;
window.sobresaltarLinks = sobresaltarLinks;
window.restablecerOriginal = restablecerOriginal;
window.activarEstiloNormal = activarEstiloNormal;
window.activarEstiloAccesible = activarEstiloAccesible;
