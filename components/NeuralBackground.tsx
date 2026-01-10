
import React, { useEffect, useRef } from 'react';

/**
 * NeuralBackground v16.0 - Interactive Physics & Trajectory Manipulation
 * Звезды реагируют на курсор, меняя направление движения.
 */
const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width: number;
    let height: number;
    let dpr: number;
    let neurons: Neuron[] = [];
    
    let currentTimeScale = 1.0;
    const targetTimeScale = { value: 1.0 };

    const settings = {
      neuronCount: 85, 
      connectionDistance: 400,
      mouseRadius: 250, 
      repulsionStrength: 0.15, // Сила отталкивания
      friction: 0.96, // Трение для стабилизации скорости
      baseSpeedLimit: 0.4, 
      colors: {
        bg: '#020617',
        primary: '99, 102, 241', 
        secondary: '224, 242, 254',
        line: '129, 140, 248'
      }
    };

    const mouse = { x: -2000, y: -2000, active: false };

    class Neuron {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      baseVx: number = 0;
      baseVy: number = 0;
      z: number = 0; 
      opacity: number = 0;
      phase: 'appearing' | 'stable' | 'dissolving' = 'appearing';
      life: number = 0;
      maxLife: number = 0;
      twinkle: number = Math.random() * Math.PI * 2;

      constructor(gx?: number, gy?: number) {
        this.reset(gx, gy, true);
      }

      reset(gx?: number, gy?: number, initial = false) {
        this.x = gx ?? Math.random() * width;
        this.y = gy ?? Math.random() * height;
        this.z = 0.2 + Math.random() * 0.8;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.1 + Math.random() * settings.baseSpeedLimit) * this.z;
        this.baseVx = Math.cos(angle) * speed;
        this.baseVy = Math.sin(angle) * speed;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        
        this.maxLife = 800 + Math.random() * 1200;
        this.life = initial ? Math.random() * this.maxLife : 0;
        this.phase = 'appearing';
        this.opacity = initial ? 1 : 0;
      }

      update(timeScale: number) {
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const mRadiusSq = settings.mouseRadius * settings.mouseRadius;
          
          if (distSq < mRadiusSq) {
            const dist = Math.sqrt(distSq);
            // Вектор отталкивания
            const force = (settings.mouseRadius - dist) / settings.mouseRadius;
            const pushX = (dx / dist) * force * settings.repulsionStrength;
            const pushY = (dy / dist) * force * settings.repulsionStrength;
            
            this.vx += pushX;
            this.vy += pushY;
          }
        }

        // Применяем трение к текущей скорости, чтобы она стремилась к базовой
        this.vx = this.vx * settings.friction + this.baseVx * (1 - settings.friction);
        this.vy = this.vy * settings.friction + this.baseVy * (1 - settings.friction);

        this.x += this.vx * timeScale;
        this.y += this.vy * timeScale;

        // Бесшовный перенос через границы экрана
        const margin = 100;
        if (this.x < -margin) this.x = width + margin;
        if (this.x > width + margin) this.x = -margin;
        if (this.y < -margin) this.y = height + margin;
        if (this.y > height + margin) this.y = -margin;

        this.life++;
        if (this.life > this.maxLife) this.phase = 'dissolving';

        if (this.phase === 'appearing') {
          this.opacity += 0.005;
          if (this.opacity >= 1) { this.opacity = 1; this.phase = 'stable'; }
        } else if (this.phase === 'dissolving') {
          this.opacity -= 0.005;
          if (this.opacity <= 0) this.reset();
        }
      }

      draw() {
        const twinkleVal = 0.8 + Math.sin(Date.now() * 0.002 + this.twinkle) * 0.2;
        const size = (0.8 + this.z * 1.8) * twinkleVal;
        
        // Звезды светятся ярче при взаимодействии
        const interactionAlpha = mouse.active && Math.sqrt((this.x-mouse.x)**2 + (this.y-mouse.y)**2) < 150 ? 1.2 : 1;
        const alpha = this.opacity * this.z * 0.5 * interactionAlpha;

        ctx!.beginPath();
        const grad = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, size * 12);
        grad.addColorStop(0, `rgba(${settings.colors.secondary}, ${alpha})`);
        grad.addColorStop(0.3, `rgba(${settings.colors.primary}, ${alpha * 0.3})`);
        grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
        ctx!.fillStyle = grad;
        ctx!.arc(this.x, this.y, size * 12, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const initNeurons = () => {
      neurons = [];
      const rows = 9;
      const cols = 7;
      const cellW = width / cols;
      const cellH = height / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          neurons.push(new Neuron(c * cellW + Math.random() * cellW, r * cellH + Math.random() * cellH));
        }
      }
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNeurons();
    };

    const animate = () => {
      ctx.fillStyle = settings.colors.bg;
      ctx.fillRect(0, 0, width, height);

      currentTimeScale += (targetTimeScale.value - currentTimeScale) * 0.05;

      ctx.globalCompositeOperation = 'screen';
      
      // Отрисовка связей
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const n1 = neurons[i];
          const n2 = neurons[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = settings.connectionDistance * settings.connectionDistance;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / settings.connectionDistance) * Math.min(n1.opacity, n2.opacity) * 0.25;
            
            ctx.beginPath();
            const lineGrad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
            lineGrad.addColorStop(0, `rgba(${settings.colors.line}, 0)`);
            lineGrad.addColorStop(0.5, `rgba(${settings.colors.line}, ${alpha})`);
            lineGrad.addColorStop(1, `rgba(${settings.colors.line}, 0)`);
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 0.8;
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      neurons.forEach(n => {
        n.update(currentTimeScale);
        n.draw();
      });

      ctx.globalCompositeOperation = 'source-over';
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-[#020617]" 
    />
  );
};

export default NeuralBackground;
