'use strict';
/* ===================================================================================================================== */
const burger = document.querySelector('.burger'),
	navBarMenu = document.querySelector('.main-header__menu'),
	body = document.querySelector('body');

burger.addEventListener('click', (event) => {
	burger.classList.toggle('active');
	navBarMenu.classList.toggle('active');
	body.classList.toggle('lock');
});
/* ===================================================================================================================== */
const rowRangeInputRange = document.querySelector('.row-range__input-range'),
	columnOutputRangeOutput = document.querySelector('.column-output__range-output'),
	columnOutputCostOutput = document.querySelector('.column-output__cost-output'),
	columnOutputAverageCostOutput = document.querySelector('.column-output__average-cost-output'),
	rowMultiplieBtns = document.querySelectorAll('.row-multiplie__btn');

const meterCost = [{
		name: 'light',
		cost: 2500,
	},
	{
		name: 'medium',
		cost: 4850,
	},
	{
		name: 'full',
		cost: 9000,
	}
];

let currnetCost = meterCost[1].cost;

for (let cost of rowMultiplieBtns) {
	cost.addEventListener('click', (e) => {
		e.preventDefault();
		for (let item of rowMultiplieBtns) {
			item.classList.remove('cost-btn-active');
		}
		cost.classList.add('cost-btn-active');
		takeActiveCost(cost);
	});
}

const takeActiveCost = currnetActive => {
	const dataAttrValue = currnetActive.dataset.cost;
	const currnetCostFind = meterCost.find(cost => cost.name === dataAttrValue);
	currnetCost = currnetCostFind.cost;
	calculation(rowRangeInputRange.value);
};
rowRangeInputRange.addEventListener('input', () => {
	calculation(rowRangeInputRange.value);
});

const calculation = (rowRangeInputRange = 0) => {
	/* ССО = ПП * ССМ2 */
	let roomArea = rowRangeInputRange;
	let choosePack = currnetCost;
	let averageObjCost;
	averageObjCost = roomArea * choosePack;
	if (averageObjCost < 0) {
		return false;
	} else {
		columnOutputRangeOutput.innerHTML = `${roomArea}м²`;
		columnOutputCostOutput.innerHTML = `${choosePack} тг.`;
		columnOutputAverageCostOutput.innerHTML = `${averageObjCost} тг.`;
	}
}
calculation();
/* ===================================================================================================================== */
let tab = function () {
	let tabNav = document.querySelectorAll('.portfolio__link'),
		tabContent = document.querySelectorAll('.portfolio__tab'),
		tabName;
	tabNav.forEach(item => {
		item.addEventListener('click', selectTabNav)
	});

	function selectTabNav() {
		tabNav.forEach(item => {
			event.preventDefault();
			item.classList.remove('portfolio__link--active');
		});
		this.classList.add('portfolio__link--active');
		tabName = this.getAttribute('data-tab-name');
		selectTabContent(tabName);
	}

	function selectTabContent(tabName) {
		tabContent.forEach(item => {
			item.classList.contains(tabName) ? item.classList.add('portfolio__tab--active') : item.classList.remove('portfolio__tab--active');
		});
	}
};
tab();
/* ===================================================================================================================== */
const slider = document.querySelector('.swiper-container');
let mySwiper = new Swiper(slider, {
	slidesPerView: 2,
	spaceBetween: 15,
	cancelable: false,
	draggable: true,
	scrollbar: {
		el: '.swiper-scrollbar',
		draggable: true,
		dragSize: 32,
	},
	breakpoints: {
		576: {
			slidesPerView: 3,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 4,
			spaceBetween: 10,
		},
		992: {
			slidesPerView: 5,
			spaceBetween: 10,
		},
		1147: {
			slidesPerView: 7,
			spaceBetween: 30,
		}
	}
});
/* ===================================================================================================================== */
const consultationPopup = document.querySelector('.consultation-popup'),
	consultationPopupClose = document.querySelector('.consultation-popup__close'),
	columnServBtn = document.querySelectorAll('.column-serv__btn'),
	columnOutputBtn = document.querySelector('.column-output__btn'),
	consultationPopupForm = document.querySelector('.consultation-popup__form');

columnOutputBtn.addEventListener('click', event => {
	event.preventDefault();
	consultationPopup.classList.add('consultation-popup--active');
	body.classList.add('lock');
	document.addEventListener('keydown', modalCLoseEsc);
	consultationPopup.addEventListener('click', modalClosebtn);
	consultationPopup.addEventListener('click', modalCLose);
});

columnServBtn.forEach((item) => {
	item.addEventListener('click', event => {
		event.preventDefault();
		consultationPopup.classList.add('consultation-popup--active');
		body.classList.add('lock');
		document.addEventListener('keydown', modalCLoseEsc);
		consultationPopup.addEventListener('click', modalClosebtn);
		consultationPopup.addEventListener('click', modalCLose);
	});
});

const modalClosebtn = event => {
	const target = event.target;
	if (target === consultationPopupClose) {
		event.preventDefault();
		consultationPopup.classList.remove('consultation-popup--active');
		body.classList.remove('lock');
		consultationPopupForm.reset();
	}
};
const modalCLose = event => {
	const target = event.target;
	if (target === consultationPopup) {
		consultationPopup.classList.remove('consultation-popup--active');
		body.classList.remove('lock');
		consultationPopupForm.reset();
	}
};
const modalCLoseEsc = event => {
	if (event.code === 'Escape') {
		consultationPopup.classList.remove('consultation-popup--active');
		body.classList.remove('lock');
		consultationPopupForm.reset();
	}
};
/* ===================================================================================================================== */
(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = "max"; //Для MobileFirst поменять на min

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) {
				return -1
			} else {
				return 1
			} //Для MobileFirst поменять
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) {
				return 1
			} else {
				return -1
			}
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());
/* ===================================================================================================================== */