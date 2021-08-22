import { SKIPPING_BUILDING_INTERVAL } from '../constants';

class SkippingBuilding {
	constructor() {}

	/**
	 * Initiates a search for opportunities to accelerate the construction of buildings.
	 *
	 * @returns {Void}
	 */
	init() {
		this._searchInstantBuild();
	}

	/**
	 * Looks for the possibility of completing the construction.
	 *
	 * @private
	 * @returns {Void}
	 */
	_searchInstantBuild() {
		setInterval(() => {
			const [button] = document.getElementsByClassName('btn-instant-free');

			if (button) {
				const { display } = button.style;

				if (display !== 'none') {
					this._instantBuild(button);
				}
			}
		}, SKIPPING_BUILDING_INTERVAL);
	}

	/**
	 * Completes construction immediately.
	 *
	 * @param {Element} button - Button to be pressed to complete construction.
	 *
	 * @private
	 * @returns {Void}
	 */
	_instantBuild(button) {
		button.click();
	}
}

export default SkippingBuilding;
