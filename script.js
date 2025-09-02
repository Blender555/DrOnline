document.addEventListener('DOMContentLoaded', function(){
    var yearEl = document.getElementById('year');
    if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('mainNav');
    if(toggle && nav){
        toggle.addEventListener('click', function(){
            var expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('show');
        });
    }

    // Card spotlight hover effect
    document.querySelectorAll('.card').forEach(function(card){
        card.addEventListener('mousemove', function(e){
            var rect = this.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            var y = ((e.clientY - rect.top) / rect.height) * 100;
            this.style.setProperty('--x', x + '%');
            this.style.setProperty('--y', y + '%');
        });
    });

    // Scroll reveal animations
    var revealEls = document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window){
        var observer = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.15});
        revealEls.forEach(function(el){ observer.observe(el); });
    } else {
        revealEls.forEach(function(el){ el.classList.add('in-view'); });
    }

    // Simple Lightbox for Our Work
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightboxImage');
    var lbCap = document.getElementById('lightboxCaption');
    document.querySelectorAll('.work-card').forEach(function(card){
        card.addEventListener('click', function(){
            var full = card.getAttribute('data-full');
            var caption = card.querySelector('figcaption') ? card.querySelector('figcaption').textContent : '';
            if(lb && lbImg){
                lbImg.src = full;
                lbImg.alt = caption || 'Work preview';
                if(lbCap){ lbCap.textContent = caption; }
                lb.setAttribute('aria-hidden', 'false');
                lb.classList.add('open');
            }
        });
    });
    if(lb){
        lb.addEventListener('click', function(e){
            if(e.target.hasAttribute('data-close') || e.target === lb){
                lb.classList.remove('open');
                lb.setAttribute('aria-hidden', 'true');
            }
        });
    }
});

