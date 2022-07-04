const fs = require("fs");

function chgToSecondType (time) {
	if (!time) return 0;
	if (time.indexOf(":") <= 0) return 0;
	let t = time.split(":");
	// 0:0:0:00
}

function Track (fn, type, title, index00, index01) {

	this.getFileName =() => {
		return fn;
	}
	this.getType = () => {
		return type;
	}
	this.getTitle =() => {
		return title;
	}
	this.getIndex00 =() => {
		return chgToSecondType(index00);
	}
	this.getIndex01 =() => {
		return chgToSecondType(index01);
	}
}

function getTrack(fn, type, track) {
	let track = file.match(/TRACK /)[1];
	let title = file.match(/TITLE (.)+\n/);//[1];
	if (title !== null) {
		title = title[1];
	}
	let index00 = file.match(/INDEX 00 (.)+\n/);//[1];
	if (index00 !== null) {
		index00 = index00[1];
	}
	let index01 = file.match(/index 01 (.)+\n/);//[1];
	if (index01 !== null) {
		index01 = index01[1];
	}
	let track = new Track(fn, type, title, index00, index01);
	return track;
}

function getTraks(file) {
	
	let [, fn, type] = file.match(/FILE "(.)+" (.)+/)[1];

	let tracks = file.split("FILE");

	let output = [];
	for (let track of tracks) {
		output.push(getTrack(fn, type, track));
	}

	return output;
}

exports = module.exports = {
	isCueFile: (objs) => {
		let chk = objs.filter(obj => {obj instanceof Track});
		return chk.length === objs.length;
	},
	import: (fn) => {
		const cue = fs.readFileSync(fn);
		const files = cue.match(/(FILE(.)+)+?/g);
		if (files.length === 0) {
			throw new Error("不正确的 cue 格式，请确认文件没有被损坏");
		}

		let tracks = [];

		for (let file of files) {
			tracks = tracks.concat(getTraks(file));
		}
	},
	export: () => {

	}
}