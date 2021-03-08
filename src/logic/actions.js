/**
 * 这里是各种动作的集合
 */
module.exports = {
	chgPlayStatus: (window, method) => {
		window.webContents.send("chgPlayStatus", method);
	}
}