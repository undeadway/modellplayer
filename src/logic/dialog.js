/**
 * 对话框，对应界面上所有的对话框操作
 */

const fs = require("fs");
const utils = require("./../util/utils");

function openOpenDialog(window, typeName){

	/*
	 * 因为需要多次打开，所以这里需要用函数来不断引入
	 * 暂时没找到怎么关闭 dialog 或者其他的处理方式
	 */
	const { dialog, BrowserWindow } = require('electron');

	let options = {
		defaultPath: "",
		buttonLabel: "打开",
		properties: [typeName]
	};

	switch (typeName) {
		case "openFile":

			options.title = "打开文件";
			options.filters = [
				{name: '有损压缩', extensions: ["mp3", "ogg"]},
				{name: '无损压缩', extensions: ["mp3", "aac", "m4a"]},
				{name: '无损音频', extensions: ["wav", "ape", "ac3", "flac"]}
			];

			break;
		case "openDirectory":
			options.title = "打开文件夹";
			break;
		default:
	}

	let result = dialog.showOpenDialogSync(options);
	let files = null;

	switch (typeName) {
		case "openFile":
			files = result;
			break;
		case "openDirectory":
			let folderName = result[0];
			files = fs.readdirSync(folderName);

			files = files.map(item => {
				return folderName + utils.getSeparator() + item;
			});

			break;
		default:
	}

	if (!files || files.length === 0) return;

	window.webContents.send("sendFiles", files);
}

module.exports = {
	open: openOpenDialog
};