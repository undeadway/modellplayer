require("./../util/ui_init");
const $ = require("jquery");

const { ipcRenderer, remote } = require('electron');
const { getInitData, mustInput, post, success } = require("../util/tools");

exports.main = () => {

	let plaing = false
	let index = 0
	let isPlayTypeListShown = false
	const playTypeUl = $("#play-type-ul");

	function createPlayListItem (index, name, timeLong) {
		return $(`<ul class="play-file" id="play-list-${index}}">
			<li>▶</li><li>${name}}</li><li>${timeLong}</li>
		</ul>`);
	}
	
	return {
		changeVolume: () => {

		},
		changePlayType: () => {

		},
		selectPlayType: () => {

		},
		play: (ele) => {

		},
		next : () => {

		},
		back: () => {

		},
		stop: () => {

		}
	}
}