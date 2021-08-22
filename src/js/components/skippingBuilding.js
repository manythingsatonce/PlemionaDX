import { SKIPPING_BUILDING_INTERVAL } from '../constants';

class SkippingBuilding {
	constructor() {
		this._observedConstruction = {
			building: '',
			level: 0,
			accelerated: true,
		};
	}

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

				if (this._observedConstruction.accelerated) {
					this._getBuildingDetails(button);
				}

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

		this._observedConstruction.accelerated = true;
	}

	/**
	 * Extracts data about the building, the construction of which is to be accelerated.
	 *
	 * @param {Element} button - Button to be pressed to complete construction.
	 *
	 * @private
	 * @returns {Void}
	 */
	_getBuildingDetails(button) {
		const parent = button.closest('.lit');
		const [column] = parent.querySelectorAll('.lit-item');
		const data = column.innerText;
		const [building] = data.split('\n');
		const level = parseFloat(data.replace(/^\D+/g, ''));

		this._observedConstruction.accelerated = false;
		this._observedConstruction.building = building;
		this._observedConstruction.level = level;
	}
}

export default SkippingBuilding;
