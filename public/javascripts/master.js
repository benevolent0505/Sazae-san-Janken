var socket = io();
var ownHand = '';
var isMaster = false;
var isSend = false;

socket.on('activity', function(data) {
  document.getElementById('count').textContent = data.count;
});

$('#submit').click(function() {
  if (md5($('#pass').val()) == 'b45fa09e60f2e4877f4444ebe76ad674') {
    isMaster = true;
    $('#check-master-form').hide();
  }
});

$('#rock').click(function() {
  ownHand = 'rock';
  socket.emit('janken', { value: ownHand, master: true });
  isSend = true;
});
$('#paper').click(function() {
  ownHand = 'paper';
  socket.emit('janken', { value: ownHand, master: true });
  isSend = true;
});
$('#scissors').click(function() {
  ownHand = 'scissors';
  socket.emit('janken', { value: ownHand, master: true });
  isSend = true;
});

socket.on('opponent', function(hand) {
  console.log(hand.id);
  decisionWinLose(hand.value);
});


function decisionWinLose(opponentHand) {
  var result = '';

  switch(opponentHand) {
    case 'rock':
      if (ownHand == 'paper') {
        result = 'win';
      } else if (ownHand == 'scissors') {
        result = 'lose';
      } else {
        console.log(ownHand);
        result = 'draw';
      }
      break;
    case 'paper':
      if (ownHand == 'scissors') {
        result = 'win';
      } else if (ownHand == 'rock') {
        result = 'lose';
      } else {
        console.log(ownHand);
        result = 'draw';
      }
      break;
    case 'scissors':
      if (ownHand == 'rock') {
        result = 'win';
      } else if (ownHand == 'paper') {
        result = 'lose';
      } else {
        result = 'draw';
      }
      break;
    default:
      result = 'error';
      break;
  }

  isSend = false;

  return result;
}
