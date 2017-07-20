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
      print(data.result.fulfillment.messages[0].speech, 'right')
      print(data.result.fulfillment.messages[1].speech, 'right')
      scrollBottom()

      if (data.result.fulfillment.messages[1].speech !== 'Partie terminée.') setTimeout(sendToBraveHero, 1000, data.result.fulfillment.messages[1].speech)
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
      print(data.result.fulfillment.speech, 'left')
      scrollBottom()
      setTimeout(sendToDungeonMaster, 1000, data.result.fulfillment.speech)
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


