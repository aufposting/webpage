chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var exec = /(https?:\/\/).*?(\w+\.\w+)$/ig.exec(request.msg);
    var protocol = exec[1];
    var domain = '.' +  exec[2];
    console.log(exec);
    chrome.cookies.getAll({
        domain: domain
    }, function(cookies) {
        console.log(cookies);
        for (var i = 0; i < cookies.length; i++) {
            chrome.cookies.remove({
                url: protocol + cookies[i].domain + cookies[i].path,
                name: cookies[i].name
            });
        }
    });
});
