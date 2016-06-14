
function getAlbumsInfoArray() {
    var links = document.getElementsByTagName('A'); 
    console.log('links length: ' + links.length);
    var s = ''; 
    var t = [];
    for (var i = 0; i< links.length; i++) {
        if (/\b(album|share)\b/.test(links[i].href)) {
            var albumName = links[i].children[2].children[0].innerText;

            itStr = links[i].innerText;
            lfIndex = itStr.indexOf('\n');            
            dotIndex = itStr.indexOf('\267');
            dateStr = itStr.substring(lfIndex+1,dotIndex-2);
            numItems = parseInt(itStr.substring(dotIndex+2));
            //console.log(albumName + '\t' + links[i].href);
            t.push( { 
                albumName: albumName, 
                href: links[i].href,
                dateStr: dateStr,
                numItems: numItems
                } );
        }
    }
    console.dir(t);
    return t;
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log("in addListener");
    console.log(sender.tab ?  "i'm in a content script:" + sender.tab.url : "from the extension");

    var t = getAlbumsInfoArray();
    sendResponse({farewell: "goodbye", t:t});

    //if (request.greeting == "hello")  // don't really have to check this
    return true;
});
