$(document).ready(function() {
  var socketServer = 'http://localhost:3000/';
  var scoket = io.connect(socketServer);
  
  socket.on('echo', function(data) {
    console.log('socket echo = ' + JSON.stringify(data));
    $('#dht-display').text(data.temp +"C, " + data.humi + "%");
    $('range-display').text(data.range);
  });
});
