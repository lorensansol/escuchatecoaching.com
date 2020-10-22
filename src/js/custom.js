// Variables
const navbar = document.querySelector('.navbar')
const burger = document.querySelector('.navbar-burger')
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