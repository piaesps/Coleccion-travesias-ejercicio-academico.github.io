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

// Selecciona todos los contenedores de audio
const audioContainers = document.querySelectorAll('.audio-container');

audioContainers.forEach(container => {
    const audioButton = container.querySelector('.audio-button');
    const audioIcon = container.querySelector('.audioIcon');
    const audio = container.querySelector('.audio');
    const audioControls = container.querySelector('.audio-controls');
    const seekBar = container.querySelector('.seekBar');
    const currentTimeSpan = container.querySelector('.currentTime');
    const durationSpan = container.querySelector('.duration');
    const speedControl = container.querySelector('.speedControl');
    
    // Evento de clic para controlar la reproducción del audio
    audioButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            audioIcon.src = 'img/pausa.png';
            audioControls.style.display = 'block';
        } else {
            audio.pause();
            audioIcon.src = 'img/play.png';
            audioControls.style.display = 'none';
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

    // Control de velocidad del audio
    speedControl.addEventListener('change', function() {
        audio.playbackRate = speedControl.value;
    });
});

// Función para formatear el tiempo en minutos y segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return minutes + ':' + (secs < 10 ? '0' + secs : secs);
}

// Selecciona todos los botones de audio y los elementos de audio
const audioButtons = document.querySelectorAll('.audio-button');
const audios = document.querySelectorAll('audio');

audioButtons.forEach((button, index) => {
    const audio = audios[index];
    const audioIcon = button.querySelector('img');
    const audioControls = document.getElementById(`audioControls${index + 1}`);
    const seekBar = document.getElementById(`seekBar${index + 1}`);
    const currentTimeSpan = document.getElementById(`currentTime${index + 1}`);
    const durationSpan = document.getElementById(`duration${index + 1}`);
    const speedControl = document.getElementById(`speedControl${index + 1}`);

    button.addEventListener('click', function() {
        // Pausar todos los audios
        pauseAllAudios(index);

        if (audio.paused) {
            audio.play();  // Reproduce el audio actual
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

    // Control de velocidad del audio
    speedControl.addEventListener('change', function() {
        audio.playbackRate = speedControl.value;  // Cambia la velocidad de reproducción
    });
});

// Función para pausar todos los audios
function pauseAllAudios(exceptIndex) {
    audios.forEach((audio, index) => {
        if (index !== exceptIndex) {
            audio.pause();  // Pausa el audio si no es el actual
            const audioButton = audioButtons[index];
            const audioIcon = audioButton.querySelector('img');
            audioIcon.src = 'img/play.png';  // Restablece el icono a "Play"
            const audioControls = document.getElementById(`audioControls${index + 1}`);
            audioControls.style.display = 'none';  // Oculta controles de audio
        }
    });
}

// Función para formatear el tiempo en minutos y segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return minutes + ':' + (secs < 10 ? '0' + secs : secs);
}

