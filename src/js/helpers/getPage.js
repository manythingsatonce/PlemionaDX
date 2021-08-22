/**
 * Extract from the link to the name of the page on which the user is located.
 *
 * @returns {String}
 */
export function getPage() {
	const urlString = window.location.href;
	// eslint-disable-next-line compat/compat
	const url = new URL(urlString);
	const page = url.searchParams.get('screen');

	return page;
}
