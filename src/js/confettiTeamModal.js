import confetti from 'canvas-confetti';

export default function showConfetti() {
  confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
  })({ particleCount: 3000, spread: 600, startVelocity: 80, zIndex: 2022}); 
}

