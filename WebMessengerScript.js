
  (function (g, e, n, es, ys) {
    g['_genesysJs'] = e;
    g[e] = g[e] || function () {
      (g[e].q = g[e].q || []).push(arguments)
    };
    g[e].t = 1 * new Date();
    g[e].c = es;
    ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8'; document.head.appendChild(ys);
  })(window, 'Genesys', 'https://apps.usw2.pure.cloud/genesys-bootstrap/genesys.min.js', {
    environment: 'prod-usw2',
    deploymentId: '437d4815-b54b-497f-8229-03eb2b2beb20'
  });

//Set participant data when conversation Resets, automatically	
 Genesys("subscribe", "MessagingService.conversationReset", function ({ data }) { setParticipantData(); alert("conversation reset") });
//Set participant data when conversation cleared by customer
 Genesys("subscribe", "MessagingService.conversationCleared", function ({ data }) { setParticipantData(); alert("conversation cleared") });
Genesys("subscribe", "Messenger.cleared", function(){alert("conversation clearedby messenger plugin")});	
Genesys("subscribe", "Journey.ready", function() {console.log("Journey plugin is ready.")});

///Start-Snippet for palying sound to end user on Message received
Genesys("subscribe", "MessagingService.messagesReceived", function(e) {
    var sound = new Audio("https://cdn.freesound.org/previews/373/373580_2475994-lq.mp3");
    
// OldTrombone - G2 (Trombone_Short_G2_v1_4.wav) by sgossner -- https://freesound.org/s/374936/ -- License: Creative Commons 0

    if (e.data) {
        const respDataObject = e.data || {};
        if (respDataObject.messages[0].direction == "Outbound") 
            {
                sound.play();
            }
        }
    });
///End-Snippet for palying sound to end user on Message received

//Run on page load,Set participant data, clear conversation
setParticipantData();
//ConversationClear();
//AddJourneyRecord();

function AddJourneyRecord() {
	
	Genesys("command", "Journey.record", {
	  eventName: "product_added_test",
	  customAttributes: {
	    price: 15.99
	  },
	  traitsMapper: []
	});
	alert("Journey Record added by Journey Plugin");
}

 function ConversationClear() {
  Genesys("command", "MessagingService.clearConversation", 
    {}, 
    function() {//conversation cleared, and needs to be reset
	  alert("Coversation clear did work")
	    Console.log("Coversation clear did  work")
    /*fulfilled callback*/
    },
    function() {
            alert("Coversation clear did not work")
	    Console.log("Coversation clear did not work")
    /*rejected callback*/
    });
 }
 function setParticipantData() {
   // alert('Attributes Set')
   Genesys("subscribe", "Database.ready", function () {

	    Genesys("command", "Database.set", {
	    messaging: {
		    customAttributes: {
		      department: "Qbaloch-sales",
		      property_type: "Qbaloch-apartment",
		      device: "Qbaloch-mobile"
		    }
		 
	    }
	  });

   });

 }
