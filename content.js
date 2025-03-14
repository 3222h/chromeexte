function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function goToYouTubeHome() {
  if (window.location.href !== 'https://www.youtube.com/') {
    window.location.href = 'https://www.youtube.com/';
    await waitForVideoToLoad();
  }
}

async function playRandomVideo() {
  await scrollPage();
  const videos = document.querySelectorAll('ytd-rich-item-renderer a#thumbnail');
  if (videos.length) {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    randomVideo.click();
    await waitForVideoToLoad();
    await autoPlayVideo();
  }
}

async function waitForVideoToLoad() {
  await new Promise(resolve => setTimeout(resolve, getRandomInterval(2000, 5000)));
}

async function autoPlayVideo() {
  const video = document.querySelector('video');
  if (video && video.paused) {
    video.play();
  }
}

async function likeVideo() {
  const likeButton = document.querySelector('ytd-toggle-button-renderer #button');
  if (likeButton && likeButton.getAttribute('aria-pressed') === 'false' && Math.random() > 0.5) {
    likeButton.click();
  }
}

async function scrollPage() {
  const scrollAmount = getRandomInterval(500, 1000);
  window.scrollBy(0, scrollAmount);
  await new Promise(resolve => setTimeout(resolve, getRandomInterval(1000, 2000)));
  window.scrollBy(0, -scrollAmount);
  await new Promise(resolve => setTimeout(resolve, getRandomInterval(1000, 2000)));
}

async function playPauseVideo() {
  const video = document.querySelector('video');
  if (video) {
    video.pause();
    await new Promise(resolve => setTimeout(resolve, getRandomInterval(1000, 3000)));
    video.play();
  }
}

async function skipVideo(seconds) {
  const video = document.querySelector('video');
  if (video) video.currentTime += seconds;
}

async function browseShorts() {
  if (window.location.href !== 'https://www.youtube.com/shorts/') {
    window.location.href = 'https://www.youtube.com/shorts/';
    await waitForVideoToLoad();
  }
}

async function loopActions() {
  while (true) {
    try {
      console.log('Starting automation loop...');
      await new Promise(resolve => setTimeout(resolve, 5000));

      await goToYouTubeHome();
      await playRandomVideo();
      await likeVideo();
      await playPauseVideo();
      await scrollPage();
      await skipVideo(getRandomInterval(5, 10));
      await skipVideo(-getRandomInterval(5, 10));
      await browseShorts();
    } catch (error) {
      console.error('Error in automation loop:', error);
    }
  }
}
