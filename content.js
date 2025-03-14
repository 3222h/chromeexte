function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function goToYouTubeHome() {
  const logo = document.querySelector('a#logo');
  if (logo) logo.click();
}

async function playRandomVideo() {
  await scrollPage();
  const videos = document.querySelectorAll('ytd-rich-item-renderer a#thumbnail');
  if (videos.length) {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    randomVideo.click();
    await waitForVideoToLoad();
    await autoPlayVideo();
    window.dispatchEvent(new MouseEvent('mousemove'));
  }
}

async function waitForVideoToLoad() {
  await new Promise(resolve => setTimeout(resolve, getRandomInterval(2000, 5000)));
}

async function autoPlayVideo() {
  const video = document.querySelector('video');
  if (video && video.paused) {
    video.play();
    window.dispatchEvent(new MouseEvent('mousemove'));
  }
}

async function likeVideo() {
  const likeButton = document.querySelector('ytd-toggle-button-renderer #button');
  if (likeButton && !likeButton.ariaPressed && Math.random() > 0.5) likeButton.click();
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
    window.dispatchEvent(new MouseEvent('mousemove'));
  }
}

async function skipVideo(seconds) {
  const video = document.querySelector('video');
  if (video) video.currentTime += seconds;
}

async function browseShorts() {
  window.location.href = 'https://www.youtube.com/shorts/';
  await waitForVideoToLoad();

  const shorts = document.querySelectorAll('ytd-reel-video-renderer');
  for (const short of shorts) {
    short.click();
    await waitForVideoToLoad();
    await autoPlayVideo();
    window.dispatchEvent(new MouseEvent('mousemove'));
    const video = document.querySelector('video');
    if (video) {
      const duration = video.duration;
      const watchTime = duration * (getRandomInterval(40, 60) / 100);
      await new Promise(resolve => setTimeout(resolve, watchTime * 1000));
      const likeButton = document.querySelector('ytd-toggle-button-renderer #button');
      if (likeButton && Math.random() > 0.5) likeButton.click();
    }
  }
}

async function loopActions() {
  while (true) {
    await goToYouTubeHome();
    await playRandomVideo();
    await likeVideo();
    await playPauseVideo();
    await scrollPage();
    await skipVideo(getRandomInterval(5, 10));
    await skipVideo(-getRandomInterval(5, 10));
    await browseShorts();
  }
}

loopActions();
