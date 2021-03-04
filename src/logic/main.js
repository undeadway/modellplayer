/**
 * 主逻辑文件，对应播放器界面上的操作
 */
const $ = require("jquery");
const { ipcRenderer }  = require("electron");
const _Player = require("./../logic/player");
const utils = require("./../util/utils");


const Logic = {
	init: () => {

		let canChange = false;
		let playing = false;

		const playTitle = $("#play-title");
		const pgsBox = $("#pgs-box");
		const pgsBak = $("#pgs-bak");
		const pgsBar = $("#pgs-bar");
		// const pgsBtn = $("#pgs-btn");
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
		let playingTabIndex = null;
		let titles = [];

		const player = _Player(audio);

		function createPlayListItem(index, name) {

			name = name.split(utils.getSeparator());
			name = name[name.length - 1];

			titles.push(name);
			playListDiv.append($(`<ul class="play-list" id="play-list-${index}">
					<li id="playing-tab-${index}"></li><li>${name}</li>
				</ul>`));
		}

		stopBtn.on("click", () => {
			playing = false;
			playBtn.attr("class", "font-icons font-icons-btn font-icons-play");
			player.stop(playCallback);
		});
		backBtn.on("click", () => {
			player.back(playCallback);
		});
		playBtn.on("click", () => {
			if (playing) {
				playBtn.attr(
					"class",
					"font-icons font-icons-btn font-icons-pause now-status"
				);
				playingTabIndex.text("");
				player.pause(playCallback);
			} else {
				playBtn.attr(
					"class",
					"font-icons font-icons-btn font-icons-play now-status"
				);
				player.play(playCallback);
			}
			playing = !playing;
		});
		nextBtn.on("click", () => {
			// index++;
			// if (index >= playList.length) {
			// 	if (playSwitch === "") {
			// 		playing = false;
			// 		stopBtn.attr(
			// 			"class",
			// 			"font-icons font-icons-btn font-icons-play now-status"
			// 		);
			// 		playBtn.attr("class", "font-icons font-icons-btn font-icons-play");
			// 		index = 0;
			// 	} else {
			// 		index = 0;
			// 	}
			// }
			playingTabIndex.text("");
			player.next(playCallback);
		});

		// 播放结束后动作
		audio.addEventListener("ended", () => {
			playingTabIndex.text("");
			play.autoNext();
			pgsBar.css({ width: "0%" });
		});

		playSwitchList.hide();
		chgPlaySwitchBtn.on("click", () => {
			playSwitchList.show();
		});

		retweetBtn.on("click", () => {
			playSwitchList.hide();
			changeplaySwitch("retweet");
		});

		retweetOneBtn.on("click", () => {
			playSwitchList.hide();
			changeplaySwitch("retweet-one");
		});

		reorderListBtn.on("click", () => {
			playSwitchList.hide();
			changeplaySwitch("reorder-list");
		});

		randomBtn.on("click", () => {
			playSwitchList.hide();
			changeplaySwitch("random");
		});

		function playCallback(index, cutrentTime, duration) {
			currentTimeDiv.html(utils.secondToTime(cutrentTime));
			durationDiv.html(utils.secondToTime(duration));

			pgsBar.css({ width: (cutrentTime / duration) * 100 + "%" });
			playingTabIndex = $(`#playing-tab-${index}`);
			playingTabIndex.text("▶");

			playTitle.text(titles[index]);
		}

		function changeplaySwitch(name) {
			chgPlaySwitchBtn.attr(
				"class",
				`font-icons font-icons-btn font-icons-${name}`
			);
			player.changeplaySwitch(name);
		}

		function changeTo(evt) {
			if (!canChange) return;

			let clientX = evt.clientX - 10;
			if (clientX < -3) {
				clientX = -3;
			}
			if (clientX > 430) {
				clientX = 430;
			}

			// pgsBtn.css({ left: clientX });
			pgsBar.css({ width: (evt.clientX / 430) * 100 + "%" });
		}

		function unbind () {
			canChange = false;
			// pgsBox.unbind("mousemove");
			// pgsBar.unbind("mousemove");
		}

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

		ipcRenderer.on("sendFiles", (event, files) => {

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

			player.start(files, playCallback);
			playing = true;
		});
	}
};

exports = module.exports = Logic;
