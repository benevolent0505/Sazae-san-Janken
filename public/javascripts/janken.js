var socket = io();
var ownHand = '';
var isSend = false;
var id = '';

socket.on('activity', function(data) {
  document.getElementById('count').textContent = data.count;
});

$('#rock').click(function() {
  sendHand('rock');
});
$('#paper').click(function() {
  sendHand('paper');
});
$('#scissors').click(function() {
  sendHand('scissors');
});

socket.on('opponent', function(hand) {
  $('#sazae-hand').empty();
  $('#sazae-hand').append('<a href="#" class="btn btn-primary-outline btn-lg"><i class="fa fa-hand-' + hand.value + '-o fa-5x"></i></a>');

  if (isSend) {
    dumpResult();
  } else {
    id = setTimeout(function() {
      console.log('timeout');
      document.getElementById('result').textContent = '後出しじゃん';
    }, 1000);
  }
});

function dumpResult() {
  var now = Date.now();
  if (Math.abs(now - hand.timestamp) < 1000) {
    document.getElementById('result').textContent = decisionWinLose(hand.value);
  } else {
    console.log('sabun');
    document.getElementById('result').textContent = '後出しじゃん';
  }
}

function sendHand(hand) {
  socket.emit('janken', { value: hand });
  isSend = true;
  clearTimeout(id);
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
