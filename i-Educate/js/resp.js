burger = document.querySelector('.burger')
navbar = document.querySelector('.navbar')
rightNav = document.querySelector('.rightNav')
navList = document.querySelector('.navlist')
rightNav = document.querySelector('.rightNav')

// console.log(navbar)
burger.addEventListener('click', ()=>{
// navbar.classList.toggle('v-class-res');
rightNav.classList.toggle('v-class-res')
navList.classList.toggle('v-class-res');
navbar.classList.toggle('h-nav-res');

})