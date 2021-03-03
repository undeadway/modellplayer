const fs = require("fs");

function openOpenDialog(typeName){

	/*
	 * 因为需要多次打开，所以这里需要用函数来不断引入
	 * 暂时没找到怎么关闭 dialog 或者其他的处理方式
	 */
	const { dialog, ipcMain } = require('electron');

	let options = {
		defaultPath: "",
		buttonLabel: "打开",
		properties: [typeName]
	};

	switch (typeName) {
		case "openFile":

			options.title = "打开文件";
			options.filters = [
				{name: '音频文件', extensions: ["mp3", "aac", "ac3", "m4a"]},
				{name: '无损音频', extensions: ["wav", "ape", "flac"]},
				{name: '索引文件', extensions: ["cue"]}
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
			files = fs.readdirSync(result[0]);
			break;
		default:
	}

	ipcMain.on("sendFiles", (event, arg) => {
		console.log(arg);
		event.sender.send("sendFiles", { files, typeName });
	});
	// ipcMain.on('openWindow', (event, name) => {
	// 	openWindow(name);
	// });
}

module.exports = () => {
	return {
		open: openOpenDialog
	};
};