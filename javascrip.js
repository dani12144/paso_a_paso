function calcular() {
  const n1 = parseFloat(document.getElementById('nota1').value);
  const n2 = parseFloat(document.getElementById('nota2').value);
  const peso1 = 0.33;  // Primer corte = 33%
  const peso2 = 0.33;  // Segundo corte = 33%
  const peso3 = 0.34;  // Tercer corte = 34%
  const meta = 3.0;

  if (isNaN(n1) || isNaN(n2) || n1 < 0 || n1 > 5 || n2 < 0 || n2 > 5) {
    document.getElementById('resultado').innerText = "Por favor ingresa notas válidas entre 0 y 5.";
    return;
  }

  // Cálculo de la nota necesaria en el tercer corte
  const n3 = (meta - (n1 * peso1 + n2 * peso2)) / peso3;

  let mensaje = "";
  
  if (n3 > 5) {
    // CASO 1: Nota imposible - El botón explota
    mensaje = `Aun sacando 5.0 no alcanzarías 3.0 😞 (Necesitarías ${n3.toFixed(2)}).`;
    document.getElementById('resultado').innerText = mensaje;
    explodeButton();
    
  } else if (n3 < 0) {
    // CASO 2: Ya tienes más de 3.0 - Corazones en todo el fondo
    mensaje = `Ya tienes más de 3.0 🎉 (Tu nota puede ser incluso ${n3.toFixed(2)}).`;
    document.getElementById('resultado').innerText = mensaje;
    createBackgroundHearts();
    
  } else {
    // CASO 3: Nota alcanzable
    mensaje = `Necesitas sacar exactamente ${n3.toFixed(2)} en el tercer corte para obtener 3.0.`;
    document.getElementById('resultado').innerText = mensaje;
    createBackgroundHearts(); // También celebramos porque es posible
  }
}

function explodeButton() {
  const btn = document.getElementById('calcBtn');
  btn.classList.add('explosion');
  
  for (let i = 0; i < 15; i++) {
    createExplosionFragment(btn);
  }
  
  createSadFaces(); // Caritas tristes
  
  // Hacer desaparecer el botón después de la animación
  setTimeout(() => {
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0)';
    
    // Volver a aparecer después de 2 segundos
    setTimeout(() => {
      btn.classList.remove('explosion');
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1)';
    }, 2000);
  }, 500);
}

// --- Crear fragmentos de explosión ---
function createExplosionFragment(button) {
  const fragment = document.createElement('div');
  fragment.className = 'explosion-fragment';
  
  const rect = button.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  
  fragment.style.left = startX + 'px';
  fragment.style.top = startY + 'px';
  
  // Dirección aleatoria
  const angle = Math.random() * Math.PI * 2;
  const distance = 80 + Math.random() * 120;
  const endX = startX + Math.cos(angle) * distance;
  const endY = startY + Math.sin(angle) * distance;
  
  fragment.style.setProperty('--endX', endX + 'px');
  fragment.style.setProperty('--endY', endY + 'px');
  
  document.body.appendChild(fragment);
  
  setTimeout(() => fragment.remove(), 800);
}

// --- Crear corazones en todo el fondo ---
function createBackgroundHearts() {
  const heartCount = 30; // Cantidad de corazones
  
  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      createRandomHeart();
    }, i * 100); // Aparecen escalonados
  }
}

// --- Crear un corazón en posición aleatoria ---
function createRandomHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart background-heart';
  
  const colors = ['#ff4081', '#f50057', '#ff1744', '#ff6e40', '#ff80ab', '#e91e63'];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  
  // Posición aleatoria en la pantalla
  const startX = Math.random() * window.innerWidth;
  const startY = window.innerHeight + 20; // Empiezan desde abajo
  
  heart.style.left = startX + 'px';
  heart.style.top = startY + 'px';
  
  // Tamaño aleatorio
  const size = 20 + Math.floor(Math.random() * 25);
  heart.style.width = size + 'px';
  heart.style.height = (size * 0.9) + 'px';
  
  // Duración aleatoria
  const duration = 2 + Math.random() * 2;
  heart.style.animationDuration = duration + 's';
  
  document.body.appendChild(heart);
  
  heart.addEventListener('animationend', () => heart.remove());
}

// --- Hearts on click effect (efecto original) ---
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('calcBtn');
  if (!btn) return;

  btn.addEventListener('click', function (ev) {
    for (let i = 0; i < 7; i++) {
      createHeart(ev, btn);
    }
  });
});

function createHeart(ev, button) {
  const heart = document.createElement('div');
  heart.className = 'heart';

  const colors = ['#ff4081', '#f50057', '#ff1744', '#ff6e40', '#ff80ab'];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];

  const rect = button.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  const jitterX = (Math.random() - 0.5) * 40;
  const jitterY = (Math.random() - 0.5) * 10;

  heart.style.left = (startX + jitterX) + 'px';
  heart.style.top = (startY + jitterY) + 'px';

  const size = 14 + Math.floor(Math.random() * 12);
  heart.style.width = size + 'px';
  heart.style.height = (size * 0.9) + 'px';

  const delay = Math.random() * 120;
  heart.style.animationDelay = delay + 'ms';

  document.body.appendChild(heart);

  heart.addEventListener('animationend', () => heart.remove());
}

// --- Crear caritas tristes en todo el fondo ---
function createSadFaces() {
  const faceCount = 25;
  
  for (let i = 0; i < faceCount; i++) {
    setTimeout(() => {
      createRandomSadFace();
    }, i * 120);
  }
}

function createRandomSadFace() {
  const face = document.createElement('div');
  face.className = 'sad-face';
  face.textContent = '😞';
  
  const startX = Math.random() * window.innerWidth;
  const startY = window.innerHeight + 50;
  
  face.style.left = startX + 'px';
  face.style.top = startY + 'px';
  
  const size = 30 + Math.floor(Math.random() * 30);
  face.style.fontSize = size + 'px';
  
  const duration = 2.5 + Math.random() * 2;
  face.style.animationDuration = duration + 's';
  
  document.body.appendChild(face);
  face.addEventListener('animationend', () => face.remove());
}