let [milliseconds, seconds, minutes] = [0, 0, 0];
let display = document.getElementById('display');
let timer = null;
let running = false;
let paused = false;
let startStopBtn = document.getElementById('startStopBtn');
let lapList = document.getElementById('laps');

function stopwatch() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }

    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = Math.floor(milliseconds / 10);
    ms = ms < 10 ? "0" + ms : ms;

    display.textContent = `${m}:${s}:${ms}`;
}

function startStop() {
    if (!running) {
        timer = setInterval(stopwatch, 10);
        startStopBtn.textContent = 'Pause';
        startStopBtn.classList.remove('start');
        startStopBtn.classList.add('pause');
        running = true;
        paused = false;
    } else if (running && !paused) {
        clearInterval(timer);
        startStopBtn.textContent = 'Resume';
        startStopBtn.classList.remove('pause');
        startStopBtn.classList.add('start');
        paused = true;
    } else if (paused) {
        timer = setInterval(stopwatch, 10);
        startStopBtn.textContent = 'Pause';
        startStopBtn.classList.remove('start');
        startStopBtn.classList.add('pause');
        paused = false;
    }
}

function reset() {
    clearInterval(timer);
    [milliseconds, seconds, minutes] = [0, 0, 0];
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('pause');
    startStopBtn.classList.add('start');
    running = false;
    paused = false;
    lapList.innerHTML = ''; // Clear laps
}

function addLap() {
    if (running && !paused) {
        let li = document.createElement('li');
        li.textContent = display.textContent;
        lapList.appendChild(li);
    }
}

startStopBtn.addEventListener('click', startStop);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', addLap);


