import SkippingBuilding from './components/skippingBuilding';

import { getPage } from './helpers/getPage';

import { COMPONENTS_TO_LOAD } from './constants';

class View {
	constructor() {}

	/**
	 * A javascript initialization function on the page.
	 *
	 * @returns {Void}
	 */
	init() {
		const page = getPage();

		this._loadComponents(page);
	}

	/**
	 * Loads components depending on the page on which the user is located.
	 *
	 * @param {String} page - The page on which the user is located.
	 *
	 * @private
	 * @returns {Void}
	 */
	_loadComponents(page) {
		const arrayOfComponents = [];

		switch (true) {
			case COMPONENTS_TO_LOAD.MAIN === page:
				arrayOfComponents.push(new SkippingBuilding());
				break;
			default:
				console.log(`Sorry, we are out of ${page}.`);
		}

		if (arrayOfComponents.length) {
			for (let i = 0; i < arrayOfComponents.length; i += 1) {
				arrayOfComponents[i].init();
			}
		}
	}
}

export default View;
