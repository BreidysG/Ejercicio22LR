let speed = 300; // Velocidad predeterminada en milisegundos
let timer = 180; // 3 minutos en segundos
let timerInterval;
let currentIndex = 0;
let lines = [
    "Se escapan de la existencia estas tardes sin brillo ni estrellas! La noche se aproxima:",
    "La niebla ha descendido desde las montañas; un cielo gris y pesado; una llovizna fina y constante",
    "Empapa los árboles desnudos. El sonido de las gotas se adentra hasta",
    "El alma de la naturaleza, como si le susurraran su despedida final.",
    "La claridad se disipa lentamente, dejando tras de sí un sendero de oscuridad.",
    "Los pájaros entonan su última melodía antes de ocultarse en sus refugios.",
    "Una brisa suave roza las hojas, haciendo murmurar a los árboles.",
    "La luna comienza a aparecer tímidamente sobre el horizonte sombrío.",
    "El paisaje se envuelve en una quietud que invita a la introspección.",
    "Todo parece detenerse en este momento de serenidad y contemplación."
    // Agrega más líneas de texto según lo necesites
];


document.getElementById('startBtn').addEventListener('click', startExercise);

function startExercise() {
    // Obtener la velocidad ingresada por el usuario
    const userSpeed = document.getElementById('speed').value;
    speed = parseInt(userSpeed) || 300; // Asignar la velocidad del usuario, o 300ms si no es válida

    document.getElementById("exerciseArea").classList.remove("hidden");
    document.getElementById("p1").classList.add("hidden");
    document.getElementById("div1").classList.add("hidden");
    document.getElementById("timer").classList.remove("hidden");

    // Inicializar el temporizador
    startTimer();

    // Comenzar a mostrar las líneas de texto con el subrayado
    showNextLines();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = `Tiempo restante: ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("¡Tiempo terminado!");
        }
    }, 1000);
}

function showNextLines() {
    const textArea = document.getElementById('textArea');
    textArea.innerHTML = ''; // Limpiar el área de texto antes de mostrar nuevas líneas

    if (currentIndex < lines.length) {
        // Mostrar las siguientes dos líneas de texto
        const line1 = document.createElement('div');
        const line2 = document.createElement('div');
        line1.classList.add('line', 'active');
        line2.classList.add('line', 'active');
        line1.innerText = lines[currentIndex];
        line2.innerText = lines[currentIndex + 1] || ""; // Mostrar la siguiente línea o vacía si no existe
        textArea.appendChild(line1);
        textArea.appendChild(line2);

        // Resaltar la primera línea
        highlightLine(line1, () => {
            // Después de que termine, resaltar la segunda línea
            highlightLine(line2, () => {
                // Avanzar al siguiente par de líneas después de que se resalte la segunda
                currentIndex += 2;

                // Si llegamos al final, reiniciar el ciclo
                if (currentIndex >= lines.length) {
                    currentIndex = 0;
                }

                // Continuar con las siguientes líneas después de un pequeño retraso
                setTimeout(showNextLines, speed);
            });
        });
    }
}

function highlightLine(line, callback) {
    line.classList.add('highlight'); // Añadir el fondo de subrayado
    setTimeout(() => {
        line.classList.remove('highlight'); // Quitar el fondo después de la duración
        callback(); // Llamar a la siguiente acción
    }, speed);
}
