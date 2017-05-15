define(function(require, exports, module) {

	function req(options) {
		if(typeof options === 'string') {
			options = {
				url: options
			};
		}
		if(options.data){
			options.data = encodeFormData(options.data); 
		}
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			//xhr.open('GET', url);

			xhr.open(options.method || 'GET', options.url, true);
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
			// Set request headers if provided.
			Object.keys(options.headers || {}).forEach(function(key) {
				xhr.setRequestHeader(key, options.headers[key]);
			});
			xhr.onload = function() {
				if(xhr.status === 200) {
					resolve(xhr.responseText);
				} else {
					reject(new Error(xhr.statusText));
				}
			};

			xhr.onerror = function() {
				reject(new Error("Network Error"));
			};

			//xhr.send();
			xhr.send(options.data || void 0);
		});
	}

	function encodeFormData(data) {
		if(!data) return '';
		var pairs = [];
		for(var name in data) {
			if(!data.hasOwnProperty(name)) continue;
			if(typeof data[name] === 'function') continue;
			var value = data[name].toString();
			name = encodeURIComponent(name.replace('%20', '+'));
			value = encodeURIComponent(value.replace('%20', '+'));
			pairs.push(name + '=' + value);
		}
		return pairs.join('&');
	}
	
	return req;
});