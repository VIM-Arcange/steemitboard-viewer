// Copyright (c) 2017 Arcange. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
//
var url;
var parser = document.createElement('a');

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) 
{
    var url = info.url || tab.url;

    parser.href = url;

	if((parser.hostname == "steemit.com" ||  parser.hostname == "steemdb.com" ||  parser.hostname == "steemd.com") &&
		url && url.indexOf('@') > 0) 
	{
	  //update icon to SteemitBoard
		chrome.browserAction.setIcon({path:"active.png"});
		chrome.browserAction.setTitle({title: "View this account on SteemitBoard.com"});
	} else {
		// update icon to default
		chrome.browserAction.setIcon({path:"default.png"});
		chrome.browserAction.setTitle({title: "SteemitBoard viewer disabled"});
	}
});

chrome.browserAction.onClicked.addListener(function(tab) 
{
	var newURL; 

	url = tab.url;
	parser.href = url;
	if((parser.hostname == "steemit.com" ||  parser.hostname == "steemdb.com" ||  parser.hostname == "steemd.com") &&
		url && url.indexOf('@') > 0) 
	{
		var str = parser.pathname;
		var nIndex1 = str.indexOf('@');
		var name = str.substring(nIndex1+1);
		var nIndex2 = name.indexOf('/');
		if( nIndex2 > 0 )
		{
			name = name.substring(0,nIndex2);
		}
		newURL = "http://steemitboard.com/@" + name;
		// chrome.tabs.update({url: newURL});
		chrome.tabs.create({ url: newURL });			
	}
});
