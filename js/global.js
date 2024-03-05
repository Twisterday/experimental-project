import { preloadImages } from './utils.js';

let lenis;

const contentElements = [...document.querySelectorAll('.content__sticky')];
const totalContentElements = contentElements.length;

const initSmoothScrolling = () => {
	lenis = new Lenis({
		lerp: 0.2,
		smoothWheel: true
	});

	lenis.on('scroll', () => ScrollTrigger.update());

	const scrollFn = (time) => {
		lenis.raf(time);
		requestAnimationFrame(scrollFn);
	};
	requestAnimationFrame(scrollFn);
};

const scroll = () => {

	contentElements.forEach((el, position) => {

		const isLast = position === totalContentElements - 1;
		const inner = el.querySelector('.content__inner');

		gsap.timeline({
			scrollTrigger: {
				trigger: el,
				start: 'top top',
				end: '+=200%',
				scrub: true
			}
		})
			.set(inner, {
				transformOrigin: '50% 0%'
			})
			.to(inner, {
				ease: 'power1',
				startAt: { filter: 'brightness(100%)' },
				filter: 'brightness(30%)',
				scale: 0.9,
				rotationX: -90,
				yPercent: isLast ? 100 : 0
			}, 0);

	});

};

const init = () => {
	initSmoothScrolling();
	scroll();
};

preloadImages('.content__img').then(() => {
	document.body.classList.remove('loading');
	init();
});
