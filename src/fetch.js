function fetch(req) {
  return function(onError, onSuccess) {
    
    var promise = window.fetch(req).then(function(res){
      return res.text()
    })
      .then(onSuccess)
      .catch(onError)
    return function(cancelError, cancelerError, cancelerSuccess) {
      console.log(promise)
      cancelerSuccess()
    };
  }
}
exports._fetch = fetch
