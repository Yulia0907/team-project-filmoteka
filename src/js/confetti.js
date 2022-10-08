

  import confetti from 'canvas-confetti';

export default function showConfetti() {
  confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
    origin: {
    x: Math.random(),
    // since they fall down, start a bit higher than random
    y: Math.random() - 0.2,
  },
  })({ particleCount: 3000, spread: 600, startVelocity: 80, zIndex: 2021}); 
}

