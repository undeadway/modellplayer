/**
 * 播放逻辑，对应播放器的播放逻辑
 */
const utils = require("./../util/utils");

module.exports = exports = (currentTime, duration, player) => {

	let playType = "retweet";
	let index = 0;
	let playList = null;
	let listSize = 0;
	let interval = 0;

	function play() {
		if (!playList) return;
		player.src = playList[index];
		if (!player.src) return;
		player.play();
		interval = setInterval(() => {
			currentTime.text(utils.secondToTime(player.currentTime));
			duration.text(utils.secondToTime(player.duration));
		}, 50);
	}

	return {
		start: (list) => {
			playList = list;
			listSize = playList.length - 1;
			audio.loop = 0;
			audio.preload = "metadata";
			play();
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
			play();
		},
		next: () => {
			if (++index > listSize) {
				index = 0;
			}
			play();
		},
		back: () => {
			if (--index < 0) {
				index = listSize;
			}
			play();
		},
		stop: () => {
			player.pause();
			player.currentTime = 0;
		},
		changePlayType: (type) => {
			playType = type;
		},
		pause: () => {
			player.pause();
		}
	}
};