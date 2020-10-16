// CONTROL DE COOKIES
function controlcookies() {
  ;(localStorage.controlcookie = localStorage.controlcookie || 0),
    localStorage.controlcookie++,
    cookiesms.classList.add('ocultar-cookies')
}
localStorage.controlcookie > 0 && cookiesms.classList.add('ocultar-cookies')

// FUNCIÓN CARGAR ARCHIVOS SCRIPTS
function loadScript(url, callback) {
	var s = document.createElement('script');
	s.onload = callback;
	s.src = url;
	document.querySelector('head').appendChild(s);
}

// SCROLL BEHAVIOR SMOOTH EN NAVEGADORES INCOMPATIBLES (SAFARI) IMPORTANDO smoothscroll.min.js
if(!('scrollBehavior' in document.documentElement.style)){
	function smoothScroll(){
		var anchorOffset = 48;
		var links = document.querySelectorAll('[href^="#"]');
		links.forEach(link => {
			link.addEventListener('click', click => {
				click.preventDefault();
				var target = document.querySelector(link.getAttribute('href'));
				target.scrollIntoView({behavior:'smooth'});
				//target.setAttribute('tabindex', '-1');
				//target.focus();
			});
		});
	}
	loadScript('/js/smooth-scroll.min.js', smoothScroll);
}
// FUNCIÓN SCROLL-SHOT
function scrollShot(windowMarginTop, windowMarginBottom, selectorCSS, doAfterPre, doBefore = () => undefined, doAfterPost = 0){
	const callbackScroll = (entries, observer) =>
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				doAfterPre(entry.target);
				if(!doAfterPost){
					observer.unobserve(entry.target);
				}
			} else if(doAfterPost) {
				doAfterPost(entry.target);
			}
		});
	const observerScroll = new IntersectionObserver(callbackScroll, {
		rootMargin: windowMarginTop + ' 0px ' + windowMarginBottom + ' 0px'
	});
	document.querySelectorAll(selectorCSS).forEach(nodo => {
		observerScroll.observe(nodo);
		doBefore(nodo);
	});
}
// APARECER CON SCROLL HACIA ARRIBA
scrollShot(
  '-15%',
  '-15%',
  '[data-showup]',
  nodo => nodo.classList.remove('showup'),
  nodo => nodo.classList.add('showup')
)

// LAZY-LOAD DATA-SRC
scrollShot(
	'0px',
	'0px',
	'[data-src]',
	nodo => {
		nodo.src = nodo.dataset.src;
		if(nodo.dataset.srcset) nodo.srcset = nodo.dataset.srcset;
		if(nodo.dataset.sizes) nodo.sizes = nodo.dataset.sizes;
		nodo.classList.remove('lazyload');
	},
	nodo => {
		nodo.classList.add('lazyload');
		var width = nodo.getAttribute('width') || '100%';
		var height = nodo.getAttribute('height') || '100%';
		nodo.setAttribute('src', `data:image/svg+xml,%3csvg%20width='${width}'%20height='${height}'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20fill='none'%20stroke='gray'%20stroke-width='1'%20stroke-miterlimit='10'%20cx='8'%20cy='8'%20r='7.5'/%3e%3cpolyline%20fill='none'%20stroke='gray'%20stroke-width='1'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-miterlimit='10'%20points='8,3 8,8 10,10'/%3e%3c/svg%3e`);
	}
);

// LAZY-LOAD DATA-STYLE
scrollShot(
	'0px',
	'160px',
	'[data-style]',
	nodo => nodo.style = nodo.dataset.style
);
// Variables
const burger = document.querySelector('.navbar-burger')
const navbar = document.querySelector('.navbar')
const burgerTarget = document.getElementById(burger.dataset.target)
const navbarItemsTab = document.querySelectorAll('.navbar-item.is-tab')
const modalOpen = document.querySelectorAll('[aria-label="modal"][data-target]')
const modalClose = document.querySelectorAll('[aria-label="close"], .modal-background')

// Navbar burguer click
function toggleMenu(){
  burger.classList.toggle('is-active')
  burgerTarget.classList.toggle('is-active')
  navbar.classList.toggle('is-transparent')
}
burger.addEventListener('click', toggleMenu)

// Navbar links click (close menu)
function closeMenu(){
  burger.classList.remove('is-active')
  burgerTarget.classList.remove('is-active')
  navbar.classList.add('is-transparent')
}
navbar.addEventListener('click', e => {
  if (e.target.tagName == 'A'
  && e.target.ariaLabel != 'menu'
  && window.innerWidth < 1024) {
    closeMenu()
  }
})

// Shot Top Scroll
setTimeout( () => {
  if(window.innerWidth >= 1024){
    console.log(window.innerWidth)
    scrollShot(
      '0px',
      '0px',
      '.shot-top-scroll',
      () => navbar.classList.add('is-transparent', 'py-4-desktop', 'is-size-5'),
      () => undefined,
      () => navbar.classList.remove('is-transparent', 'py-4-desktop', 'is-size-5')
    )
  // } else {
  //   navbar.classList.add('is-transparent', 'py-4-desktop', 'is-size-5')
  }
}, 100)

// Navbar Scroll Spy
scrollShot(
  '-50%',
  '-50%',
  'section.section[id],header.hero',
  e => {
    navbarItemsTab.forEach( item => item.classList.remove('is-active') )
    const navbarItemTabId = document.querySelector('.navbar-item.is-tab[href="#'+e.id+'"]')
    const navbarItemTabButtonId = document.querySelector('.navbar-item.is-tab > [href="#'+e.id+'"]')
    navbarItemTabId && navbarItemTabId.classList.add('is-active')
    navbarItemTabButtonId && navbarItemTabButtonId.parentNode.classList.add('is-active')
  },
  () => undefined,
  () => undefined
)

// Modal
//// Open modal
modalOpen.forEach( e => {
  e.addEventListener('click', () => {
    document.getElementById(e.dataset.target)
      .classList.toggle('is-active')
  })
})
//// Close modal
modalClose.forEach( e => {
  e.addEventListener('click', () => {
    document.querySelector('.modal.is-active')
      .classList.remove('is-active')
  })
})