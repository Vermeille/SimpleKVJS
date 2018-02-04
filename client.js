class KVClient {
  constructor(url) {
    this.base_url = url
  }
  
  get(url) {
    return new Promise(resolve => {
      var xmlhttp = new XMLHttpRequest();
      url = url.replace('?', '');
      url = url.replace('&', '');
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          resolve(this.responseText);
        }
      };
      xmlhttp.open("GET", this.base_url + url, true);
      xmlhttp.send();
    });
  }
  
  set(url, data) {
    return new Promise(resolve => {
      var xmlhttp = new XMLHttpRequest();
      var params = "data=" + encodeURIComponent(data);
      url = url.replace('?', '');
      url = url.replace('&', '');
      xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              resolve(this.responseText);
          }
      };
      xmlhttp.open("POST", this.base_url + url, true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(params);
    });
  }
  
  getJson(url) {
    return store.get(url).then(t => JSON.parse(t));
  }

  setJson(url, data) {
    return store.set(url, JSON.stringify(data));
  }
}
