var DUNGEONMASTERTOKEN = '3f3b7c1262d349798abe21548b5204bb'
var BRAVEHEROTOKEN, SESSIONID
var baseUrl = 'https://api.api.ai/api/'
function sendToDungeonMaster(speech) {
  jQuery.ajax({
    type: "POST",
    url: baseUrl + "query?v=20150910",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + DUNGEONMASTERTOKEN
    },
    data: JSON.stringify({ q: speech, lang: "fr" , sessionId:SESSIONID}),
    success: function(data) {
      console.log(data.resul.fulfillment.messages[0])
      console.log(data.resul.fulfillment.messages[1])
      print(data.resul.fulfillment.messages[0], 'right')
      print(data.resul.fulfillment.messages[1], 'right')
      scrollBottom()

      if (data.resul.fulfillment.messages[1] !== 'Partie terminée') setTimeout(sendToBraveHero, 1000, data.resul.fulfillment.messages[1])
    },
    error: function() {
      console.log("Internal Server Error from Master");
    }
  });
}

function sendToBraveHero(speech) {
  jQuery.ajax({
    type: "POST",
    url: baseUrl + "query?v=20150910",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + BRAVEHEROTOKEN
    },
    data: JSON.stringify({ q: speech, lang: "fr" , sessionId:SESSIONID}),
    success: function(data) {
      console.log(data.resul.fulfillment.speech)
      print(data.resul.fulfillment.speech, 'left')
      scrollBottom()
      setTimeout(sendToDungeonMaster, 1000, data.resul.fulfillment.speech)
      sendToDungeonMaster(data.resul.fulfillment.speech)
    },
    error: function() {
      console.log("Internal Server Error from Hero");
    }
  });
}

function print(speech, where) {
  var message = '<div class="message"><p class="' + where + '">' + speech + '</p></div>'
  jQuery("#text").append(message)
}

function scrollBottom() {
  jQuery('#text').scrollTop(jQuery('#text').prop("scrollHeight"));
}


