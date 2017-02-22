//more hacky stuff

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

chrome.extension.onConnect.addListener(function(port) {
	console.assert(port.name == "randomtaskgetter");
	var task = JSON.parse(localStorage.tasks).randomElement();
	console.log(task);
	port.onMessage.addListener(function(msg) {
		if (msg.request == "SendTask")
		port.postMessage({todo: task});
	});
});