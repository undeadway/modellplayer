/**
 * 播放逻辑，对应播放器的播放逻辑
 */

module.exports = exports = (player) => {

	let playSwitch = "retweet";
	let index = 0;
	let playList = null;
	let counts = 0;
	let listSize = 0;
	let interval = 0;
	let volume = 0.5;
	let stopAt = 0;

	function play(playCb, intervalCb) {
		if (!playList) return;
		if (!player.src) return;

		player.src = playList[index];
		player.volume = volume;
		player.currentTime = stopAt;
		player.play();
		playCb(index);

		interval = setInterval(() => {
			if (intervalCb) {
				intervalCb(player.currentTime, player.duration, index);
			}
		}, 50);
	}

	return {
		isEmpty: () => {
			return counts === 0;
		},
		start: (list, playCb, intervalCb) => {
			playList = list;
			counts = playList.length;
			listSize = counts - 1;
			audio.loop = 0;
			audio.preload = "metadata";
			play(playCb, intervalCb);
		},
		play: (playCb, intervalCb, i) => {

			if (i !== undefined) {
				index = i;
			} 

			play(playCb, intervalCb);
		},
		autoNext: (playCb, intervalCb) => {
			stopAt = player.currentTime = 0;
			switch (playSwitch) {
				case "retweet":
					if (++index > listSize) {
						index = 0;
					}
					break;
				case "retweet-one":
					break;
				case "reorder-list":
					if (++index > listSize) {
						index = 0;
						clearInterval(interval);
						return; // 停止播放的后续操作
					}
					break;
				case "random":
					index = Math.trunc(Math.random() * (listSize + 1))
					break;
			}
			play(playCb, intervalCb);
		},
		chgVolume: (_v) => {
			player.volume = volume = _v;
		},
		next: (playCb, intervalCb) => {
			if (++index > listSize) {
				index = 0;
			}
			stopAt = 0;
			clearInterval(interval);
			play(playCb, intervalCb);
		},
		back: (playCb, intervalCb) => {
			if (--index < 0) {
				index = listSize;
			}
			stopAt = 0;
			clearInterval(interval);
			play(playCb, intervalCb);
		},
		stop: () => {
			player.pause();
			stopAt = player.currentTime = 0;
			clearInterval(interval);
		},
		chgPlaySwitch: (type) => {
			playSwitch = type;
		},
		pause: () => {
			player.pause();
			stopAt = player.currentTime;
			clearInterval(interval);
		}
	}
};