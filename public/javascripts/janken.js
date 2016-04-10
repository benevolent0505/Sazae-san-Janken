var socket = io();
var ownHand = '';
var isSend = false;

socket.on('activity', function(data) {
  document.getElementById('count').textContent = data.count;
});

$('#rock').click(function() {
  ownHand = 'rock';
  socket.emit('janken', { value: ownHand });
  isSend = true;
});
$('#paper').click(function() {
  ownHand = 'paper';
  socket.emit('janken', { value: ownHand });
  isSend = true;
});
$('#scissors').click(function() {
  ownHand = 'scissors';
  socket.emit('janken', { value: ownHand });
  isSend = true;
});

socket.on('opponent', function(hand) {
  if (isSend) {
    decisionAtodashiAndDisplayResult();
  } else {
    var intervalId = sendInterval();

    clearInterval(intervalId);
  }
});

function decisionAtodashiAndDisplayResult() {
  var now = Date.now();
  if (Math.abs(now - hand.timestamp) < 1000) {
    $('#sazae-hand').append('<a id="' + hand.value + '" href="#" class="btn btn-primary-outline btn-lg"><i class="fa fa-hand-' + hand.value + '-o fa-5x"></i></a>');
    document.getElementById('result').textContent = decisionWinLose(hand.value);
  } else {
    console.log('後出し');
  }
}

function sendInterval() {
  var id = setInterval(function() {
    if (isSend) {
      decisionAtodashiAndDisplayResult();
    }
  }, 50);

  return id;
}

function decisionWinLose(opponentHand) {
  var result = '';
  var win = 'あなたの勝ちです！！'
  var lose = 'まけー';
  var draw = 'あいこだね'

  switch(opponentHand) {
    case 'rock':
      if (ownHand == 'paper') {
        result = win;
      } else if (ownHand == 'scissors') {
        result = lose;
      } else {
        result = draw;
      }
      break;
    case 'paper':
      if (ownHand == 'scissors') {
        result = win;
      } else if (ownHand == 'rock') {
        result = lose;
      } else {
        result = draw;
      }
      break;
    case 'scissors':
      if (ownHand == 'rock') {
        result = win;
      } else if (ownHand == 'paper') {
        result = lose;
      } else {
        result = draw;
      }
      break;
    default:
      result = 'error';
      break;
  }

  isSend = false;

  return result;
}
