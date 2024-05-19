const button = document.getElementById('birthdayButton');
const message = document.getElementById('birthdayMessage');
const explosion = document.getElementById('explosion');
const fireworksContainer = document.getElementById('fireworksContainer');
const dinosaurs = document.getElementById('dinosaurs');
const audio = new Audio('techhhhhhhhhhhh.mp3'); // Замените 'birthday_song.mp3' на путь к вашей аудио-файлу

button.addEventListener('click', () => {
    button.classList.add('hidden');
    startExplosion();
});

function startExplosion() {
    explosion.classList.remove('hidden');
    setTimeout(() => {
        explosion.classList.add('hidden');
        startColorChange();
        showMessage();
        startFireworks();
        enlargeMessage();
    }, 1800);
}

function startColorChange() {
    let colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'];
    let index = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length;
    }, 200);
}

function showMessage() {
    setTimeout(() => {
        message.classList.remove('hidden');
        audio.play(); // Воспроизводим песню
    }, 1000);
}

function enlargeMessage() {
    setTimeout(() => {
        message.style.transform = 'translate(-50%, -50%) scale(1)';
        message.style.opacity = '1';
        dinosaurs.style.opacity = '1';
        dinosaurs.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 1000);
}

function startFireworks() {
    for (let i = 0; i < 10; i++) {
        createFirework();
    }

    function createFirework() {
        const firework = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        firework.setAttribute('class', 'firework');
        firework.setAttribute('viewBox', '0 0 200 200');
        firework.innerHTML = `
            <circle cx="100" cy="100" r="2" fill="${getRandomColor()}">
                <animate attributeName="r" from="2" to="100" dur="1s" begin="0s" fill="freeze" />
                <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" fill="freeze" />
            </circle>`;
        fireworksContainer.appendChild(firework);

        gsap.fromTo(firework, { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
            {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                duration: 2,
                ease: 'power1.out',
                onComplete: () => {
                    firework.remove();
                    createFirework();
                }
            });
    }
}

function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'];
    return colors[Math.floor(Math.random() * colors.length)];
}
