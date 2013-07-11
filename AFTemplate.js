(function () {
	var escapeMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': '&quot;',
		"'": '&#39;'
	};

	// Moustache.js escapeHTML function
	function escapeHTML(string) { 
		return String(string).replace(/&(?!\w+;)|[<>"']/g, function (s) {
			return escapeMap[s] || s;
		});
	}

	function transformEcho(all, escaped, code) {
		return "\";\nout += "+(escaped==='=' ? '' : 'escapeHTML')+"(" +
			code.replace(/\\\"/g, '"').replace(/\\n/g, "\n")
			+ ");\nout += \"";
	}

	function transformJavaScript(all, code) {
		return "\";\n" + 
			code.replace(/\\\"/g, '"').replace(/\\n/g, "\n")
			+ "\nout += \"";
	}

	function transformTpl(tpl) {
		return "out += \"" + 
			tpl.replace(/"/g, "\\\"").
			replace(/\n/g, "\\n").
			replace(/\{%(=|#)([\s\S]*?)%\}/g, transformEcho).
			replace(/\{%([\s\S]*?)%\}/g, transformJavaScript) + "\";\n";
	}

	this.AFTemplate = function Template(tpl) {
		var process = new Function(["obj", "escapeHTML"],
			"var out = \"\"; with(obj) {"+transformTpl(tpl)+"}return out;");

		return function(obj) {
			return process(obj, escapeHTML);
		}
	};

	var cacheAFT = {};

	this.AFT = function(id, data) {
		if (cacheAFT.hasOwnProperty(id)) {
			return cacheAFT[id](data);
		}
		else {
			var p = this.AFTemplate(document.getElementById(id).innerHTML);
			cacheAFT[id] = p;
			return p(data);
		}
	};
})()