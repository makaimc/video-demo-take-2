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
