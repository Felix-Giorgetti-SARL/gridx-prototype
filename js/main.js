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
  https://css-tricks.com/animating-number-counters/
*/

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const counterElems = document.querySelectorAll('.animCounter');
function counterAnimate(entries, observer) {
  entries.forEach((entry) => {

    const elem = entry.target;
    let endValue = elem.getAttribute('data-counter');
    // const obj = document.getElementById("value");

    if (entry.intersectionRatio >= threshold) {
			//observer.unobserve(elem);
      animateValue(elem, 0, endValue, 1000);

		} else {
			// elem.classList.remove(isAnimated);
      // elem.innerHTML = '0'
			// modifiedElem.innerHTML = "Back to start"
		}
  })
}

const counterObserver = new IntersectionObserver(counterAnimate, { threshold });
for (const counter of counterElems) {
	counterObserver.observe(counter);
}

/*------------------------------------------------------------------
  Icons animation
*/

const iconsBlock = document.querySelector('.icons-block');

function iconsAnimate(entries, observer) {
  entries.forEach((entry) => {
    const elem = entry.target;
    if (entry.intersectionRatio >= threshold) {
      elem.classList.add('anim');
    } else {
      elem.classList.remove('anim');
    }
  })
}

const iconsBlockObserver = new IntersectionObserver(iconsAnimate, { threshold });
if (iconsBlock) {
  iconsBlockObserver.observe(iconsBlock);
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

/*------------------------------------------------------------------
  Parallax Building
*/
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

/*------------------------------------------------------------------
  Logo opacity to 0 on scroll
*/
const fadeBox = basicScroll.create({
    elem: document.querySelector('.fadeBox'),
    from: 'middle-middle',
    to: 'middle-top',
    // inside: (instance, percentage, props) => console.log('fadeBox is animating'),
    // outside: (instance, percentage, props) => console.log('fadeBox is not animating'),
    props: {
      '--o': {
        from: .99,
        to: .01
      }
    }
  })

fadeBox.start()

/*------------------------------------------------------------------
  Building scale on scroll
*/
  const scaleBox = basicScroll.create({
    elem: document.querySelector('.scaleBox'),
    from: 'middle-bottom',
    to: 'bottom-top',
    // inside: (instance, percentage, props) => console.log('scaleBox is animating'),
    // outside: (instance, percentage, props) => console.log('scaleBox is not animating'),
    props: {
      '--s': {
        from: 1,
        to: 1.1
      }
    }
  })

scaleBox.start()