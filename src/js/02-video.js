import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const PLAYER_CURRENT_TIME_KEY = 'videoplayer-current-time'

function createPlayer() {
  const iframe = document.getElementById('vimeo-player');
  return new Player(iframe);
}

function bindVimeoEvents(player) {
  player.on('timeupdate', throttle(event => setVideoProgress(event.seconds), 1000));
  player.on('ended', () => setVideoProgress(0));

  player.on('loaded', () => {
    const currentProgress = getVideoProgress();

    if (!currentProgress) {
      return;
    }

    player.setCurrentTime(currentProgress);
  });
}

function setVideoProgress(position) {
  localStorage.setItem(PLAYER_CURRENT_TIME_KEY, position);
}

function getVideoProgress() {
  return localStorage.getItem(PLAYER_CURRENT_TIME_KEY);
}

function init() {
  const player = createPlayer();
  bindVimeoEvents(player);
}

init();
