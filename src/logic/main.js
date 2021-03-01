require("./../util/ui_init");
const $ = require("jquery");

exports.init = () => {

	let plaing = false
	let index = 0
	let playType = 'retweet';

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
	const changePlayTypeBtn = $("#change-play-type-btn");
	const playTypeList = $("#play-type-list");
	const retweetBtn = $("#retweet-btn");
	const retweetOneBtn = $("#retweet-one-btn");
	const reorderListBtn = $("#reorder-list-btn");
	const randomBtn = $("#random-btn");

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
	nextBtn.on("click", () => {
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
		changePlayTypeBtn.attr("class", `font-icons font-icons-btn font-icons-${name}`);
	}
}