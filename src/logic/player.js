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
	let volume = 50;
	let stopAt = 0;
	let errorIndexes = [];

	let playCallback, intervalCallback;

	player.addEventListener("error", () => {
		console.log(player.error);
		errorIndexes.push(index);
		playCallback(index, true);
		_p.next(playCallback, intervalCallback);
	});

	function play(playCb, intervalCb) {
		if (!playList) return;

		if (-1 < errorIndexes.indexOf(index)) {
			_p.next(playCb, intervalCb);
			return;
		}

		playCallback = playCb;
		intervalCallback = intervalCb;

		try {
		player.src = playList[index];
		} catch (e) {
			console.log(e);
		}
		player.volume = volume / 100;
		player.currentTime = stopAt;
		player.play();
		playCb(index);

		interval = setInterval(() => {
			if (intervalCb) {
				intervalCb(player.currentTime, player.duration, index);
			}
		}, 50);
	}

	const _p = {
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
		setVolume: (_v) => {
			volume = _v;
			player.volume = volume / 100;
		},
		getVolume: () => {
			return volume;
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

	return _p;
};