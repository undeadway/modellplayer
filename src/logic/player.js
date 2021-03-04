/**
 * 播放逻辑，对应播放器的播放逻辑
 */
const { Callbacks } = require("jquery");

module.exports = exports = (player) => {

	let playType = "retweet";
	let index = 0;
	let playList = null;
	let listSize = 0;
	let interval = 0;
	let stopAt = 0;

	function play(callback) {
		if (!playList) return;
		player.src = playList[index];
		if (!player.src) return;
		player.currentTime = stopAt;
		player.play();
		interval = setInterval(() => {
			if (callback) {
				callback(index, player.currentTime, player.duration);
			}
		}, 50);
	}

	return {
		start: (list, callback) => {
			playList = list;
			listSize = playList.length - 1;
			audio.loop = 0;
			audio.preload = "metadata";
			play(callback);
		},
		play: play,
		autoNext: (callback) => {
			switch (playType) {
				case "retweet":
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
			play(callback);
		},
		next: (callback) => {
			if (++index > listSize) {
				index = 0;
			}
			play(callback);
		},
		back: (callback) => {
			if (--index < 0) {
				index = listSize;
			}
			play(callback);
		},
		stop: () => {
			player.pause();
			stopAt = player.currentTime = 0;
			clearInterval(interval);
		},
		changePlayType: (type) => {
			playType = type;
		},
		pause: (callback) => {
			stopAt = player.currentTime;
			player.pause();
			clearInterval(interval);
		}
	}
};