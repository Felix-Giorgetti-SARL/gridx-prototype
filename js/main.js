/*------------------------------------------------------------------
    IntersectionObserver
    https://codepen.io/Riccardello/pen/abqyMyr
------------------------------------------------------------------*/

const targets = document.querySelectorAll(".chapter");
// const isAnimated = "is-animated";
const threshold = 0.4;

const modifiedElem = document.getElementById("modifiedElement");

function callback(entries, observer) {
	entries.forEach((entry) => {
		let elem = entry.target;
    let modifier = elem.getAttribute('data-scrolltarget');
    let parent = elem.closest('.container');
    let imageActive = parent.querySelector('.modifiedElement img.active');
    let images = parent.querySelectorAll('.modifiedElement img');

		if (entry.intersectionRatio >= threshold) {
			// elem.classList.add(isAnimated);
			//observer.unobserve(elem);
			imageActive.classList.remove('active');
      images[modifier].classList.add('active');

		} else {
			// elem.classList.remove(isAnimated);
			// modifiedElem.innerHTML = "Back to start"
		}
	});
}

const observer = new IntersectionObserver(callback, { threshold });
for (const target of targets) {
	observer.observe(target);
}

/*------------------------------------------------------------------
  Counter anim
*/

const counterElems = document.querySelectorAll('.animCounter');
function counterAnimate(entries, observer) {
  entries.forEach((entry) => {
    let elem = entry.target;
    let modifier = elem.getAttribute('data-counter');
    console.log(elem)

    if (entry.intersectionRatio >= threshold) {
			//observer.unobserve(elem);
      for (let i = 0; i <= modifier; i++) {
        elem.innerHTML =++i
      }

		} else {
			// elem.classList.remove(isAnimated);
      elem.innerHTML = '0'
			// modifiedElem.innerHTML = "Back to start"
		}
  })
}

const counterObserver = new IntersectionObserver(counterAnimate, { threshold });
for (const counter of counterElems) {
	counterObserver.observe(counter);
}

/*------------------------------------------------------------------
    Basic-scroll
------------------------------------------------------------------*/
/*------------------------------------------------------------------
  Enter in view animation
*/

document.querySelectorAll('.enterAnim').forEach((elem) => {

	basicScroll.create({
		elem: elem,
		from: 'top-bottom',
		to: 'bottom-bottom',
		direct: true,
		props: {
			'--translate': {
				from: '30%',
				to: '0'
			},
      '--opacity': {
          from: 0.01,
          to: 1
      },
      '--scale': {
          from: 0.9,
          to: 1
      }
		}
	}).start()

})


document.querySelectorAll('.scene').forEach((elem) => {

	const modifier = elem.getAttribute('data-modifier')

	basicScroll.create({
		elem: elem,
		from: 0,
		to: 'bottom-top',
		direct: true,
		props: {
			'--translateY': {
				from: '0',
				to: `${ 10 * modifier }px`
			}
		}
	}).start()

})

const fadeBox = basicScroll.create({
    elem: document.querySelector('.fadeBox'),
    from: 'bottom-middle',
    to: 'bottom-top',
    // inside: (instance, percentage, props) => console.log('fadeBox is animating'),
    // outside: (instance, percentage, props) => console.log('fadeBox is not animating'),
    props: {
      '--o': {
        from: .99,
        to: .01
      }
    }
  })

  const scaleBox = basicScroll.create({
    elem: document.querySelector('.scaleBox'),
    from: 'middle-bottom',
    to: 'bottom-top',
    // inside: (instance, percentage, props) => console.log('scaleBox is animating'),
    // outside: (instance, percentage, props) => console.log('scaleBox is not animating'),
    props: {
      '--s': {
        from: 1,
        to: 1.06
      }
    }
  })

scaleBox.start()
fadeBox.start()