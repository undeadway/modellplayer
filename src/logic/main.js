/**
 * 主逻辑文件，对应播放器界面上的操作
 */
const $ = require("jquery");
const { ipcRenderer }  = require("electron");
const _Player = require("./../logic/player");

const Logic = {
	init: () => {

		let canChange = false;
		let playing = false;

		const pgsBox = $("#pgs-box");
		const pgsBak = $("#pgs-bak");
		const pgsBar = $("#pgs-bar");
		const pgsBtn = $("#pgs-btn");
		const stopBtn = $("#stop-btn");
		const backBtn = $("#back-btn");
		const playBtn = $("#play-btn");
		const nextBtn = $("#next-btn");
		const changePlayTypeBtn = $("#change-play-type-btn");
		const playTypeList = $("#play-type-list");
		const retweetBtn = $("#retweet-btn");
		const retweetOneBtn = $("#retweet-one-btn");
		const reorderListBtn = $("#reorder-list-btn");
		const randomBtn = $("#random-btn");
		const playListDiv = $("#play-list");

		const player = _Player(
			$("#currentTime"),
			$("#duration"),
			document.getElementById("audio")
		);

		function createPlayListItem(index, name, timeLong) {
			playListDiv.append($(`<ul class="play-list" id="play-list-${index}">
					<li id="playing-${index}"></li><li>${name}</li><li>${timeLong}</li>
				</ul>`));
		}

		stopBtn.on("click", () => {
			playing = false;
			playBtn.attr("class", "font-icons font-icons-btn font-icons-play");
			player.stop();
		});
		backBtn.on("click", () => {
			index--;
			if (index < 0) {
				index = 0;
			}
			player.back();
		});
		playBtn.on("click", () => {
			if (playing) {
				playBtn.attr(
					"class",
					"font-icons font-icons-btn font-icons-pause now-status"
				);
				player.pause();
			} else {
				playBtn.attr(
					"class",
					"font-icons font-icons-btn font-icons-play now-status"
				);
				player.play();
			}
			playing = !playing;
		});
		nextBtn.on("click", () => {
			index++;
			if (index >= playList.length) {
				if (playType === "") {
					playing = false;
					stopBtn.attr(
						"class",
						"font-icons font-icons-btn font-icons-play now-status"
					);
					playBtn.attr("class", "font-icons font-icons-btn font-icons-play");
					index = 0;
				} else {
					index = 0;
				}
			}
			player.next();
		});

		playTypeList.hide();
		changePlayTypeBtn.on("click", () => {
			playTypeList.show();
		});

		retweetBtn.on("click", () => {
			playTypeList.hide();
			changePlayType("retweet");
		});

		retweetOneBtn.on("click", () => {
			playTypeList.hide();
			changePlayType("retweet-one");
		});

		reorderListBtn.on("click", () => {
			playTypeList.hide();
			changePlayType("reorder-list");
		});

		randomBtn.on("click", () => {
			playTypeList.hide();
			changePlayType("random");
		});

		function changePlayType(name) {
			changePlayTypeBtn.attr(
				"class",
				`font-icons font-icons-btn font-icons-${name}`
			);
			player.changePlayType(name);
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

			pgsBtn.css({ left: clientX });
			pgsBar.css({ width: (evt.clientX / 430) * 100 + "%" });
		}

		function unbind () {
			canChange = false;
			pgsBox.unbind("mousemove");
			pgsBar.unbind("mousemove");
		}

		pgsBtn.on("mousedown", () => {
			canChange = true;
			pgsBox.on("mousemove", changeTo);
			pgsBar.on("mousemove", changeTo);
		});

		pgsBak.on("click", (evt) => {
			canChange = true;
			changeTo(evt);
			unbind();
		});
		pgsBar.on("click",  (evt) => {
			canChange = true;
			changeTo(evt);
			unbind();
		});

		pgsBox.on("mouseout", unbind);
		pgsBtn.on("mouseup", unbind);

		ipcRenderer.on("sendFiles", (event, files) => {

			// 再将播放列表导入
			for (let i = 0, len = files.length; i < len; i++) {
				createPlayListItem(i, files[i], "");
			}

			player.start(files);
			playing = true;
		});
	}
};

exports = module.exports = Logic;
