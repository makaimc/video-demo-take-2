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

window.accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1zYXQ7dj0xIn0.eyJqdGkiOiJTSzU1MmU5ZGRkNGYwNTU0NzZmZWIwY2I0MzA2OGRiOGI1LTE0MzUwMTQ2MjMiLCJpc3MiOiJTSzU1MmU5ZGRkNGYwNTU0NzZmZWIwY2I0MzA2OGRiOGI1Iiwic3ViIjoiQUNjYjRjNjk2MzI0NTgxMTRkOGJlYzBlOTgzN2Q3ZGFkYiIsIm5iZiI6MTQzNTAxNDYyMywiZXhwIjoxNDM1MTAxMDIzLCJncmFudHMiOlt7InJlcyI6Imh0dHBzOlwvXC9hcGkudHdpbGlvLmNvbVwvMjAxMC0wNC0wMVwvQWNjb3VudHNcL0FDY2I0YzY5NjMyNDU4MTE0ZDhiZWMwZTk4MzdkN2RhZGJcL1Rva2Vucy5qc29uIiwiYWN0IjpbIlBPU1QiXX0seyJyZXMiOiJzaXA6cXVpY2tzdGFydEBBQ2NiNGM2OTYzMjQ1ODExNGQ4YmVjMGU5ODM3ZDdkYWRiLmVuZHBvaW50LnR3aWxpby5jb20iLCJhY3QiOlsibGlzdGVuIiwiaW52aXRlIl19XX0.q9iIiVFsvsP3GL_zlrNm7hdCp3YviDxEF9t2IgqahLs";

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

