module.exports = exports = ( audio) => {

	let playType = "retweet";
	let index = 0;
	let playList = null;
	audio.hide();

	return {
		start: (list) => {
			playList = list;
		},
		stop: () => {

		},
		changePlayType: (type) => {
			playType = type;
		}
	}
};