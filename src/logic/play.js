/**
 * 播放逻辑，对应播放器的播放逻辑
 */
module.exports = exports = (audio) => {

	let playType = "retweet";
	let index = 0;
	let playList = null;
	let listSize = 0;
	audio.hide();

	return {
		start: (list) => {
			playList = list;
			listSize = playList.length - 1;
			this.play();
		},
		play: () => {
			switch (playType) {
				case "retweet":
					index++;
					break;
				case "retweet-one":
					break;
				case "reorder-list":
					if (++index === listSize) {
						return; // 停止播放的后续操作
					}
					break;
				case "random":
					index = Math.trunc(Math.random() * (listSize + 1))
					break;
			}
		},
		next: () => {
			if (++index > listSize) {
				index = 0;
			}
		},
		back: () => {
			if (--index < 0) {
				index = listSize;
			}
		},
		stop: () => {
			index = 0;
		},
		changePlayType: (type) => {
			playType = type;
		},
		pause: () => {

		}
	}
};