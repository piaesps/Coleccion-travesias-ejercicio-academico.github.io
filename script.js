// Selecciona todos los elementos que deben aparecer con el scroll
const secciones = document.querySelectorAll('.left, .right, .indice, .ficha, .row, .rowtit, .intro, .cierre');

// Función para mostrar los elementos al hacer scroll
function mostrarAlDesplazar() {
    const triggerBottom = window.innerHeight * 0.8; // 80% de la altura de la ventana

    secciones.forEach(seccion => {
        const topPos = seccion.getBoundingClientRect().top;

        if (topPos < triggerBottom) {
            seccion.classList.add('show'); // Añade la clase para hacer visible el elemento
        } else {
            seccion.classList.remove('show'); // Elimina la clase si no está visible
        }
    });
}

// Escucha el evento de scroll
window.addEventListener('scroll', mostrarAlDesplazar);

// Llama a la función al cargar la página
mostrarAlDesplazar();

// Selecciona el botón, el icono y el audio
const audioButton = document.getElementById('audioButton');
const audioIcon = document.getElementById('audioIcon');
const audio = document.getElementById('audio');
const audioControls = document.getElementById('audioControls');
const seekBar = document.getElementById('seekBar');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
const speedControl = document.getElementById('speedControl'); 

// Evento de clic para controlar la reproducción del audio
audioButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();  // Reproduce el audio
        audioIcon.src = 'img/pausa.png';  // Cambia el icono a "Pause"
        audioControls.style.display = 'block';
        speedControl.style.display = 'block';
    } else {
        audio.pause();  // Pausa el audio
        audioIcon.src = 'img/play.png';  // Cambia el icono a "Play"
        audioControls.style.display = 'none';
        speedControl.style.display = 'none';
    }
});

// Actualiza el tiempo total del audio cuando está listo
audio.addEventListener('loadedmetadata', function() {
    durationSpan.textContent = formatTime(audio.duration);
});

// Actualiza la barra de progreso mientras el audio se reproduce
audio.addEventListener('timeupdate', function() {
    const value = (audio.currentTime / audio.duration) * 100;
    seekBar.value = value;
    currentTimeSpan.textContent = formatTime(audio.currentTime);
});

// Controla el avance manual del audio cuando se arrastra la barra
seekBar.addEventListener('input', function() {
    const time = (seekBar.value / 100) * audio.duration;
    audio.currentTime = time;
});

// Función para formatear el tiempo en minutos y segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return minutes + ':' + (secs < 10 ? '0' + secs : secs);
}
// Control de velocidad del audio
speedControl.addEventListener('change', function() {
    audio.playbackRate = speedControl.value;  // Cambia la velocidad de reproducción
});


// Función para la lupa de zoom
function iniciarZoom(img, lupa) {
    var factorZoom = 3; // Factor de zoom

    // Cuando el ratón pasa por la imagen
    img.addEventListener("mousemove", moverLupa);

    // Ajustar el fondo dentro de la lupa usando la imagen
    lupa.style.backgroundImage = `url(${img.src})`;
    lupa.style.backgroundRepeat = "no-repeat";
    lupa.style.backgroundSize = (img.width * factorZoom) + "px " + (img.height * factorZoom) + "px";

    // Función que mueve la lupa
    function moverLupa(event) {
        var x, y;
        var rect = img.getBoundingClientRect();

        // Calcular la posición del mouse en la imagen
        x = event.clientX - rect.left; // Usar clientX en lugar de pageX para que funcione bien con el rectángulo
        y = event.clientY - rect.top;   // Usar clientY en lugar de pageY para que funcione bien con el rectángulo

        // Limitar el movimiento de la lupa dentro de la imagen
        if (x > img.width - lupa.offsetWidth / 2) { x = img.width - lupa.offsetWidth / 2; }
        if (x < lupa.offsetWidth / 2) { x = lupa.offsetWidth / 2; }
        if (y > img.height - lupa.offsetHeight / 2) { y = img.height - lupa.offsetHeight / 2; }
        if (y < lupa.offsetHeight / 2) { y = lupa.offsetHeight / 2; }

        // Mover la lupa
        lupa.style.left = (x - lupa.offsetWidth / 2) + "px";
        lupa.style.top = (y - lupa.offsetHeight / 2) + "px";

        // Mover la imagen dentro de la lupa
        lupa.style.backgroundPosition = `-${(x * factorZoom - lupa.offsetWidth / 2)}px -${(y * factorZoom - lupa.offsetHeight / 2)}px`;
    }

    // Mostrar la lupa cuando el mouse entra en la imagen
    img.addEventListener("mouseenter", function() {
        lupa.style.display = "block"; // Mostrar la lupa al entrar
    });

    // Ocultar la lupa cuando el mouse sale de la imagen
    img.addEventListener("mouseleave", function() {
        lupa.style.display = "none"; // Ocultar la lupa al salir
    });
}

// Llamar a la función con los elementos
window.onload = function() {
    var img = document.getElementById("imagen");
    var lupa = document.getElementById("lupa");
    iniciarZoom(img, lupa);
};
