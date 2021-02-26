const { app, BrowserWindow, ipcMain, Menu } = require('electron');

let mainWindow; //, booksWindow, userOrgWindow, exportsWindow;

exports.init = () => {

	app.on('ready', function () {

		const appmenu = require("./appmenu");

		mainWindow = new BrowserWindow({
			width: AppConfig.ui.main.width, height: AppConfig.ui.main.height,
			transparent: true,
			webPreferences: {
				nativeWindowOpen: true,
				nodeIntegration: true
			},
			minimizable: false,
			maximizable: false,
			icon: `./../..${AppConfig.base.ico[16]}`
		});

		// mainWindow.setMenu(null);
		mainWindow.loadURL(__dirname + '/../../res/html/main.html');

		const menu = Menu.buildFromTemplate(appmenu);
		Menu.setApplicationMenu(menu);

		// 当 window 被关闭，这个事件会被发出
		mainWindow.on('closed', function () {
			// 取消引用 window 对象，如果你的应用支持多窗口的话，
			// 通常会把多个 window 对象存放在一个数组里面，
			// 但这次不是。
			mainWindow = null;
		});
	});
}

// function createMainwindow() {

// 	const appmenu = require("./appmenu");

// 	let mainWindow = new BrowserWindow({
// 		width: AppConfig.ui.index.width,
// 		height: AppConfig.ui.index.height,
// 		minimizable: false,
// 		maximizable: false,
// 		webPreferences: {
// 			nodeIntegration: true
// 		},
// 		icon: `./../..${AppConfig.base.ico[16]}`
// 	});

// 	mainWindow.loadURL(__dirname + '/../../res/html/index.html');

// 	mainWindow.on('closed', function () {
// 		// 取消引用 window 对象，如果你的应用支持多窗口的话，
// 		// 通常会把多个 window 对象存放在一个数组里面，
// 		// 但这次不是。
// 		if (booksWindow) {
// 			booksWindow.close();
// 		}
// 		if (userOrgWindow) {
// 			userOrgWindow.close();
// 		}
// 		if (exportsWindow) {
// 			exportsWindow.close();
// 		}
// 		mainWindow = null;
// 	});

// 	const menu = Menu.buildFromTemplate(appmenu);
// 	Menu.setApplicationMenu(menu);

// 	if (mainWindow) {
// 		mainWindow.close();
// 	}
// };

// function createBooksWindow() {

// 	booksWindow = new BrowserWindow({
// 		width: AppConfig.ui.books.width,
// 		height: AppConfig.ui.books.height,
// 		// frame: false,
// 		transparent: true,
// 		webPreferences: {
// 			nativeWindowOpen: true,
// 			nodeIntegration: true
// 		},
// 		minimizable: false,
// 		maximizable: false,
// 		icon: `./../..${AppConfig.base.ico[16]}`
// 	});
// 	booksWindow.loadURL(__dirname + '/../../res/html/books.html');

// 	// 当 window 被关闭，这个事件会被发出
// 	booksWindow.on('closed', function () {
// 		// 取消引用 window 对象，如果你的应用支持多窗口的话，
// 		// 通常会把多个 window 对象存放在一个数组里面，
// 		// 但这次不是。
// 		booksWindow = null;
// 	});

// 	booksWindow.setMenu(null);
// 	booksWindow.hide();
// }

// function createUserOrgWindow() {

// 	userOrgWindow = new BrowserWindow({
// 		width: AppConfig.ui.user_org.width,
// 		height: AppConfig.ui.user_org.height,
// 		// frame: false,
// 		transparent: true,
// 		webPreferences: {
// 			nativeWindowOpen: true,
// 			nodeIntegration: true
// 		},
// 		minimizable: false,
// 		maximizable: false,
// 		icon: `./../..${AppConfig.base.ico[16]}`
// 	});
// 	userOrgWindow.loadURL(__dirname + '/../../res/html/user_org.html');

// 	// 当 window 被关闭，这个事件会被发出
// 	userOrgWindow.on('closed', function () {
// 		// 取消引用 window 对象，如果你的应用支持多窗口的话，
// 		// 通常会把多个 window 对象存放在一个数组里面，
// 		// 但这次不是。
// 		userOrgWindow = null;
// 	});

// 	userOrgWindow.setMenu(null);
// 	userOrgWindow.hide();
// }

// function createExportsWindow() {

// 	exportsWindow = new BrowserWindow({
// 		width: AppConfig.ui.exports.width,
// 		height: AppConfig.ui.exports.height,
// 		// frame: false,
// 		transparent: true,
// 		webPreferences: {
// 			nativeWindowOpen: true,
// 			nodeIntegration: true
// 		},
// 		minimizable: false,
// 		maximizable: false,
// 		icon: `./../..${AppConfig.base.ico[16]}`
// 	});

// 	exportsWindow.loadURL(__dirname + '/../../res/html/exports.html');

// 	exportsWindow.on('closed', function () {
// 		// 取消引用 window 对象，如果你的应用支持多窗口的话，
// 		// 通常会把多个 window 对象存放在一个数组里面，
// 		// 但这次不是。
// 		exportsWindow = null;
// 	});

// 	exportsWindow.setMenu(null);
// 	exportsWindow.hide();
// }

// function openBooksWindow() {
// 	booksWindow.show();
// }

// function openUserOrgWindow() {
// 	userOrgWindow.show();
// }

// function openExportsWindow() {
// 	exportsWindow.show();
// }

// function openWindow(name) {
// 	switch (name) {
// 		case 'books':
// 			if (!booksWindow) {
// 				createBooksWindow();
// 			}
// 			openBooksWindow();
// 			break;
// 		case 'user_org':
// 			if (!userOrgWindow) {
// 				createUserOrgWindow();
// 			}
// 			openUserOrgWindow();
// 			break;
// 		case 'exports':
// 			if (!exportsWindow) {
// 				createExportsWindow();
// 			}
// 			openExportsWindow();
// 			break;
// 	}
// }

// exports.openWindow = openWindow;

// ipcMain.on('showMainPage', () => {
// 	//mainWindow.hide();
// 	// createMainwindow();
// 	// createBooksWindow();
// 	// createUserOrgWindow();
// 	// createExportsWindow();
// });

// ipcMain.on('openWindow', (event, name) => {
// 	openWindow(name);
// });