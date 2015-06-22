var previewMedia = new Twilio.LocalMedia();
Twilio.getUserMedia().then(
  function(mediaStream) {
    previewMedia.addStream(mediaStream);
    previewMedia.attach('#local-media');
  },
  function(error) {
    console.log('unable to access mic and camera', error);
  }
);

window.accessToken = "twilio video access token";

var activeConversation;
var endpoint = new Twilio.Endpoint(accessToken);
endpoint.listen().then(function() {
  endpoint.on('invite', function(invite) {
    invite.accept().then(conversationStarted);
  });
});

document.getElementById('button-invite').onclick = function() {
  var inviteTo = document.getElementById('invite-to').value;

  var options = {}.localMedia = previewMedia;
  endpoint.createConversation(inviteTo, options).then(function(conversation) {
    activeConversation = conversation;
    conversation.on('participantConnected', function(participant) {
      participant.media.attach('#remote-media');
    });
  });
}

