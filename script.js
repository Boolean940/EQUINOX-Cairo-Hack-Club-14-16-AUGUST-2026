  (function() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const preloader = document.getElementById('preloader');
                    preloader.classList.add('hidden');
                    setTimeout(() => { if (preloader.parentNode) preloader.parentNode.removeChild(preloader); }, 800);
                }, 900);
            });

            const cursor = document.getElementById('cursor');
            const cursorTrail = document.getElementById('cursor-trail');
            const scrollTrigger = document.getElementById('scrollTrigger');
            const reveals = document.querySelectorAll('.reveal');
            const countdownMini = document.getElementById('countdown-mini');
            let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2, trailX = mouseX, trailY = mouseY, isClicking = false;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                if (cursor) { cursor.style.left = mouseX+'px'; cursor.style.top = mouseY+'px'; }
                // parallax solar disk
                const disk = document.getElementById('solarDisk');
                if (disk && window.scrollY < window.innerHeight) {
                    const dx = (mouseX - window.innerWidth/2) * 0.015;
                    const dy = (mouseY - window.innerHeight/2) * 0.015;
                    disk.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
                }
            });
            document.addEventListener('mousedown', () => {
                isClicking = true;
                cursor.style.transform = 'translate(-50%, -50%) scale(0.45)';
                cursor.style.background = '#fff';
                cursor.style.boxShadow = '0 0 26px rgba(255,255,255,0.8), 0 0 55px rgba(232,200,96,0.6), 0 0 80px rgba(212,168,67,0.4)';
            });
            document.addEventListener('mouseup', () => {
                isClicking = false;
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'var(--gold-bright)';
                cursor.style.boxShadow = '0 0 16px rgba(232,200,96,0.7), 0 0 36px rgba(212,168,67,0.4), 0 0 60px rgba(180,140,60,0.2)';
            });
            function animateTrail() {
                trailX += (mouseX - trailX) * 0.16;
                trailY += (mouseY - trailY) * 0.16;
                cursorTrail.style.left = trailX+'px';
                cursorTrail.style.top = trailY+'px';
                cursorTrail.style.opacity = isClicking ? '0.78' : '0.36';
                cursorTrail.style.width = isClicking ? '8px' : '3.5px';
                cursorTrail.style.height = isClicking ? '8px' : '3.5px';
                requestAnimationFrame(animateTrail);
            }
            animateTrail();

            document.querySelectorAll('.interactive').forEach(el => {
                el.addEventListener('mouseenter', ()=> cursor.classList.add('active'));
                el.addEventListener('mouseleave', ()=> cursor.classList.remove('active'));
            });
            document.querySelectorAll('.interactive-alt').forEach(el => {
                el.addEventListener('mouseenter', ()=> cursor.classList.add('active-alt'));
                el.addEventListener('mouseleave', ()=> cursor.classList.remove('active-alt'));
            });

            scrollTrigger.addEventListener('click', () => {
                document.getElementById('about').scrollIntoView({ behavior:'smooth' });
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
            }, { rootMargin:'0px 0px -30px 0px', threshold:0.08 });
            reveals.forEach(r => observer.observe(r));

            // Countdown
            const eventDate = new Date('2026-08-14T00:00:00+02:00');
            function updateCountdown() {
                const diff = eventDate - new Date();
                if (diff <= 0) {
                    ['days','hours','minutes','seconds'].forEach(id => document.getElementById(id).textContent = '00');
                    if(countdownMini) countdownMini.textContent = 'ALIGNED';
                    return;
                }
                const d = Math.floor(diff/86400000), h = Math.floor((diff%86400000)/3600000), m = Math.floor((diff%3600000)/60000), s = Math.floor((diff%60000)/1000);
                document.getElementById('days').textContent = String(d).padStart(2,'0');
                document.getElementById('hours').textContent = String(h).padStart(2,'0');
                document.getElementById('minutes').textContent = String(m).padStart(2,'0');
                document.getElementById('seconds').textContent = String(s).padStart(2,'0');
                if(countdownMini) countdownMini.textContent = `${String(d).padStart(2,'0')}:${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; 
}
            
setInterval(updateCountdown, 1000);

updateCountdown();

})();