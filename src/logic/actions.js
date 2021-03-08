module.exports = {
	chgPlayStatus: (window, method) => {
		window.webContents.send("chgPlayStatus", method);
	}
}