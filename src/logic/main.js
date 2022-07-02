/**
 * 主逻辑文件，对应播放器界面上的操作
 */
const $ = require("jquery");
global.jQuery = $;
const ui= require("jquery-ui");
const { ipcRenderer }  = require("electron");
const Player = require("./../logic/player");
const utils = require("./../util/utils");
require("./../ui/language").init($, "main");

const Logic = {
	init: () => {

		let isPlay = false;
		let canChgVol = false;
		let canChgPgs = false;

		const doc = $(document);
		const playTitle = $("#play-title");
		// const pgsBox = $("#pgs-box");
		// const pgsBak = $("#pgs-bak");
		const pgsBar = $("#pgs-bar");
		// const pgsBtn = $("#pgs-btn");
		const volBox = $("#vol-box");
		const volBtn = $("#vol-btn");
		const chgVolBtn = $("#chg-volume-btn");
		const stopBtn = $("#stop-btn");
		const backBtn = $("#back-btn");
		const playBtn = $("#play-btn");
		const nextBtn = $("#next-btn");
		const chgPlaySwitchBtn = $("#chg-play-switch-btn");
		const playSwitchList = $("#play-type-list");
		const retweetBtn = $("#retweet-btn");
		const retweetOneBtn = $("#retweet-one-btn");
		const reorderListBtn = $("#reorder-list-btn");
		const randomBtn = $("#random-btn");
		const playListDiv = $("#play-list");
		const currentTimeDiv = $("#currentTime");
		const durationDiv = $("#duration");
		const audio = document.getElementById("audio");
		let player = null;

		volBox.hide();
		playSwitchList.hide();

		let playingTabIndex = null, titles = [];

		function intervalCallback(cutrentTime, duration, index) {

			currentTimeDiv.html(utils.secondToTime(cutrentTime));
			durationDiv.html(utils.secondToTime(duration));

			pgsBar.css({ width: (cutrentTime / duration) * 100 + "%" });
		}

		function playCallback(index, onError) {

			if (onError) {
				stop();
				return;
			}

			isPlay = true;

			playBtn.attr("class", "font-icons font-icons-btn font-icons-pause now-status");
			playingTabIndex = $(`#playing-tab-${index}`);
			playingTabIndex.text("▶");

			playTitle.text(titles[index]);
		}

		function playOrPause () {
			if (isPlay) {
				actions.pause();
			} else {
				actions.play();
			}
		}

		function stop () {
			if (player.isEmpty()) return;
			playingTabIndex.text("");
			isPlay = false;
			playBtn.attr("class", "font-icons font-icons-btn font-icons-play");
			player.stop();
		}

		const actions = {
			playOrPause: playOrPause,
			play: (_index) => {
				if (player.isEmpty()) return;
				if (isPlay) return;
				playingTabIndex.text("");
				playBtn.attr(
					"class", "font-icons font-icons-btn font-icons-pause now-status"
				);
				player.play(playCallback, intervalCallback, _index);
			},
			stop: stop,
			pause: () => {
				if (player.isEmpty()) return;
				playingTabIndex.text("||");
				playBtn.attr(
					"class", "font-icons font-icons-btn font-icons-play now-status"
				);
				isPlay = false;
				player.pause();
			},
			back: () => {
				if (player.isEmpty()) return;
				playingTabIndex.text("");
				player.back(playCallback, intervalCallback);
			},
			next: () => {
				if (player.isEmpty()) return;
				playingTabIndex.text("");
				player.next(playCallback, intervalCallback);
			}
		}

		function createPlayListItem(index, name) {

			let names = name.split(utils.getSeparator());
			name = names[names.length - 1];

			titles.push(name);

			const ul = $(`<ul class="play-list" id="play-list-${index}">
				<li id="playing-tab-${index}"></li><li>${name}</li>
			</ul>`)

			ul.on("dblclick", () => {
				actions.stop();
				actions.play(index);
			});

			playListDiv.append(ul);
		}

		// chgVolBtn.on("click", () => {
		// 	volBox.show();
		// });

		// volBox.on("mousedown", (event) => {
		// 	console.log(event.clientY);
		// 	canChgVol = true;
		// });
		// volBtn.on("mousedown", (event) => {
		// 	console.log(event.clientY);
		// 	canChgVol = true;
		// });
		// volBox.on("mouseup", () => {
		// 	canChgVol = false;
		// 	console.log("mouseup");
		// });
		// volBox.on("mouseout", () => {
		// 	canChgVol = false;
		// 	console.log("mouseout");
		// });
		// doc.on("mouseover", () => {
		// 	canChgVol = false;
		// 	console.log("mouseout");
		// });
		// volBox.on("mousemove", (event) => {
		// 	if (canChgVol) {
		// 		let top = (event.clientY - 89) / 75 * 100;
		// 		if (top > 93) {
		// 			top = 93;
		// 		}
		// 		if (top < 0) {
		// 			top = 0;
		// 		}
		// 		volBtn.css("top", `${top}%`);
		// 	}
		// });

		stopBtn.on("click", actions.stop);
		backBtn.on("click", actions.back);
		nextBtn.on("click", actions.next);
		playBtn.on("click", playOrPause);

		// 播放结束后动作，将所有的播放状态全部置为不播放
		audio.addEventListener("ended", () => {
			playingTabIndex.text("");
			playBtn.attr("class", "font-icons font-icons-btn font-icons-play");
			pgsBar.css({ width: "0%" });
			player.autoNext(playCallback, intervalCallback);
			isPlay = false;
		});

		chgPlaySwitchBtn.on("click", () => {
			playSwitchList.show();
		});
		retweetBtn.on("click", () => {
			playSwitchList.hide();
			chgPlaySwitch("retweet");
		});
		retweetOneBtn.on("click", () => {
			playSwitchList.hide();
			chgPlaySwitch("retweet-one");
		});
		reorderListBtn.on("click", () => {
			playSwitchList.hide();
			chgPlaySwitch("reorder-list");
		});
		randomBtn.on("click", () => {
			playSwitchList.hide();
			chgPlaySwitch("random");
		});

		function chgPlaySwitch(name) {
			chgPlaySwitchBtn.attr(
				"class", `font-icons font-icons-btn font-icons-${name}`
			);
			player.chgPlaySwitch(name);
		}

		// function changeTo(evt) {
		// 	if (!canChange) return;

		// 	let clientX = evt.clientX - 10;
		// 	if (clientX < -3) {
		// 		clientX = -3;
		// 	}
		// 	if (clientX > 430) {
		// 		clientX = 430;
		// 	}

		// 	// pgsBtn.css({ left: clientX });
		// 	pgsBar.css({ width: (evt.clientX / 430) * 100 + "%" });
		// }

		// function unbind () {
		// 	canChange = false;
		// 	// pgsBox.unbind("mousemove");
		// 	// pgsBar.unbind("mousemove");
		// }

		// pgsBtn.on("mousedown", () => {
		// 	canChange = true;
		// 	pgsBox.on("mousemove", changeTo);
		// 	pgsBar.on("mousemove", changeTo);
		// });

		// pgsBak.on("click", (evt) => {
		// 	canChange = true;
		// 	changeTo(evt);
		// 	unbind();
		// });
		// pgsBar.on("click",  (evt) => {
		// 	canChange = true;
		// 	changeTo(evt);
		// 	unbind();
		// });

		// pgsBox.on("mouseout", unbind);
		// pgsBtn.on("mouseup", unbind);

		ipcRenderer.on("chgPlayStatus", (event, method) => {
			actions[method]();
		});

		ipcRenderer.on("sendFiles", (event, files) => {

			player = Player(audio); // 每次打开新文件全部重新载入新的 Player

			player.stop();
			if (playingTabIndex) {
				playingTabIndex.text("");
			}

			titles = [];
			playListDiv.empty();

			// 再将播放列表导入
			for (let i = 0, len = files.length; i < len; i++) {
				createPlayListItem(i, files[i]);
			}

			playBtn.attr(
				"class", "font-icons font-icons-btn font-icons-pause now-status"
			);

			player.start(files, playCallback, intervalCallback);
		});
	}
};

exports = module.exports = Logic;
