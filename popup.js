
function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

function addTableRow(tbl, o) {
    var tr = document.createElement('tr');

    var td2 = document.createElement('td');
    td2.className = "dataNumItems";
    td2.innerHTML = "" + o.numItems;
    tr.appendChild(td2);

    var td3 = document.createElement('td');
    td3.className = "dataDateStr";
    td3.innerHTML = o.dateStr;
    tr.appendChild(td3);

    var td1 = document.createElement('td');
    td1.className = "dataAlbumName";
    var t = document.createElement('a');    // anchor
    t.setAttribute('href',o.href);
    t.innerHTML = o.albumName;
    td1.appendChild(t);
    tr.appendChild(td1);

    tbl.appendChild(tr);
}

function tsort(o1,o2) {
    return o1.albumName.localeCompare(o2.albumName);
}

function sendGetAlbumList(tab) {
    renderStatus('getting album list...');
    chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
        //console.log('sgal response: ' + response.farewell);  // why missing this?
        console.log('sgal response: ' + response);
        console.dir(response.t);
        renderStatus(response.t.length + ' Albums:');

        var tbl = document.getElementById('albumTable');
        response.t.sort(tsort).map(function(o) {
            addTableRow(tbl, o);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
  renderStatus('Getting album list...');

  var queryInfo = { active: true, currentWindow: true };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    sendGetAlbumList(tab);
  });
});
    // Query filter - https://developer.chrome.com/extensions/tabs#method-query
    // invokes the callback function with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.

    // See https://developer.chrome.com/extensions/tabs#type-Tab
    //var url = tab.url;
