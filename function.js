$( document ).ready(function() {
	initKeyList();
	renderKeyList();
});

var keyList = [];
function initKeyList(){
	for (var i=0; i<26; i++){
		keyList.push(String.fromCharCode(97 + i));
	}
	
	shuffleKeyList();
	//alert(keyList[25]);
	
}

function shuffleKeyList() {
    for (var i = keyList.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = keyList[i];
        keyList[i] = keyList[j];
        keyList[j] = temp;
    }
}

function renderKeyList(){
	for (var i=0; i< keyList.length; i++){
		
		//var random = getRandonNumber(26);
		
		var tabSpan = $('<span/>', {
		    html: i + ' = ' + keyList[i]
		});
		
		/*var messageCenterAnchor = $('<a/>', {
		    href='/user/messages',
		    html: tabSpan
		});*/
		var newListItem = $('<li/>', {
		    html: tabSpan,
		    "id": "li1"
		});    // NOTE: you have to put quotes around "id" for IE..

		$('#key').append(
		    newListItem
		);    
		
		/*$('#key').append(
		    "<li>test </li>"
		); */   
	}
}

function codifyText(){
	
	var text = $('#enteredText').val();
	 $('#enteredText').val('');
	
	for (var i=0; i< text.length; i++){
		
		var tabSpan; var newInputKey;
		
		if (text[i] == ' '){
			//Skip spaces (indicate break in words)
			
			//Add space to code key table row
			tabSpan = $('<span/>', {
			    html: '&nbsp;'
			});
			
			//Add space to answer box table row
			newInputKey = $('<span/>', {
			    html: '&nbsp;'
			});    // NOTE: you have to put quotes around "id" for IE..
		}
		else {
			
			//Add code key (i.e. number) to table row
			var codeKey = $.inArray( text[i], keyList);		
			tabSpan = $('<span/>', {
			    html: codeKey
			});
			
			//var inputID = "answerInput" + i ;
			//Add input box and event to table row
			//var obj = function(inputID, key) { return function() {answerChange(inputID, key);}; }(inputID, codeKey);		
			var obj = function(index, correctChar) { return function() {answerChange(index, correctChar);}; }(i, text[i]);		
			newInputKey = $('<input/>', {
			    type: text,
			    class: "answerBox",
			    maxlength: 1,
			    //keypress: (function (e) { alert(codeKey); }),
				keyup: obj,
			    "id": "answerInput" + i  //+ String(i);
			});    // NOTE: you have to put quotes around "id" for IE..
		}
		
		//alert(keyList.indexOf(text[i]));
		//alert($.inArray( text[i], keyList) );		
		
		var newListItem = $('<td/>', {
		    html: tabSpan,
		    "id": "list" + i
		});    // NOTE: you have to put quotes around "id" for IE..

		$('#codeRow').append(
		    newListItem
		);    						
		
		var newTableCell = $('<td/>', {
		    html: newInputKey,
		    "id": "answerCell" + i// + String(i);
		});    // NOTE: you have to put quotes around "id" for IE..

		$('#answerRow').append(
		    newTableCell
		);    
		
		
		
		var responseCell = $('<span/>', {
		    html: '',
		    "id": "responseCell" + i
		});
		
		var newTableResponseCell = $('<td/>', {
		    html: responseCell,
		    "id": "responseTableCell" + i
		});    // NOTE: you have to put quotes around "id" for IE..

		$('#responseRow').append(
		    newTableResponseCell
		);  
		
	}
}

function answerChange(index, correctChar){
	//alert(key);
	//return;
	var inputVal = $('#answerInput' + index).val();
	//$('#responseCell' + index).text("temp");
	//var temp = $('#responseCell' + index).val();
	
	if (inputVal != ''){
		if (inputVal == correctChar) {
			//alert($('#responseCell' + index).val());	
			//$('#responseCell' + index).text('y');
			$('#responseCell' + index).removeClass("cross"); 
			$('#responseCell' + index).addClass("tick"); 
			//var s = '';
		}
		else{
			$('#responseCell' + index).removeClass("tick"); 
			$('#responseCell' + index).addClass("cross"); 
		}
	}
}