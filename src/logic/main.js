require("./../util/ui_init");
const $ = require("jquery");

exports.init = () => {

	let plaing = false
	let index = 0
	let isPlayTypeListShown = false
	const playTypeUl = $("#play-type-ul");

	function createPlayListItem (index, name, timeLong) {
		return $(`<ul class="play-file" id="play-list-${index}">
			<li>▶</li><li>${name}</li><li>${timeLong}</li>
		</ul>`);
	}

	const playList = [];

	const pgsBar = $("#psg-bar");
	const pgsBtn = $("#psg-btn");
	const stopBtn = $("#stop-btn");
	const backBtn = $("#back-btn");
	const playBtn = $("#play-btn");
	const nextBtn = $("#next-btn");

	stopBtn.on("click", () => {
		playing = false;
		playBtn.attr("class", "font-icons font-icons-btn font-icons-play");
	});
	backBtn.on("click", () => {
		index--;
		if (index < 0) {
			index = 0;
		}
		alert(index);
	})
	playBtn.on("click", () => {
		
		if(plaing) {
			playBtn.attr("class", "font-icons font-icons-btn font-icons-pause now-status");
		} else {
			playBtn.attr("class", "font-icons font-icons-btn font-icons-play now-status");
		}
		plaing = !plaing;
	});
	backBtn.on("click", () => {
		index++;
		if (index >= playList.length) {
			if (playType === '') {
				playing = false;
				stopBtn.attr("class", "font-icons font-icons-btn font-icons-play now-status");
				playBtn.attr("class", "font-icons font-icons-btn font-icons-play");
				index = 0;
			} else {
				index = 0;
			}
		}
		alert(index);
	})
}