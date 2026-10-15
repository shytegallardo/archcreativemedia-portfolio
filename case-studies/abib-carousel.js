(() => {
  const slides = [
    ['Hook', 'Your concealer isn’t the problem.', 'Stop the scroll with a pain she knows.', 'Zoom into the creases; a circle pops on.'],
    ['Struggle', '4 concealers. 2 primers. 1 setting spray. Still creased by lunch.', 'Make her feel seen.', 'The last line slides in.'],
    ['Cause', 'It’s the skin underneath.', 'Reveal the proposed cause behind the frustration.', 'The skin drifts; the explanation fades in.'],
    ['Fix', '10 minutes before makeup.', 'Show the fix and how easy it is.', 'A timer counts down from 10:00 to “makeup-ready”.'],
    ['Proof', 'Same concealer. Prepped skin.', 'Present the concept’s before/after framing; imagery is AI-generated, not measured results.', 'A wipe reveals the “Patch first” side.'],
    ['Offer', 'Prep, then conceal.', 'Give the offer and the next step.', 'A badge drops in; Shop Now pulses.']
  ];
  const $ = s => document.querySelector(s);
  const buttons = [...document.querySelectorAll('[data-slide]')];
  let index = 0;
  function render(next) {
    index = Math.max(0, Math.min(slides.length - 1, next));
    const [stage, headline, job, motion] = slides[index];
    $('#slideImage').src = `../assets/images/abib/abib-slide-${index + 1}.png`;
    $('#slideImage').alt = `Slide ${index + 1}: ${headline}`;
    $('#slideCount').textContent = `${index + 1} / ${slides.length}`;
    $('#slideStage').textContent = `0${index + 1} / ${stage}`;
    $('#slideHeadline').textContent = headline;
    $('#slideJob').textContent = job;
    $('#slideMotion').textContent = motion;
    $('#slidePrev').disabled = index === 0;
    $('#slideNext').disabled = index === slides.length - 1;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.slide) === index)));
  }
  buttons.forEach(button => button.addEventListener('click', () => render(Number(button.dataset.slide))));
  $('#slidePrev').addEventListener('click', () => render(index - 1));
  $('#slideNext').addEventListener('click', () => render(index + 1));
  $('#slideExplorer').addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); render(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); render(index - 1); }
  });
  const hooks = ['Your concealer isn’t the problem.', 'Stop blaming your concealer.', 'Why your under-eye makeup looks worse by noon.'];
  const hookButtons = [...document.querySelectorAll('[data-hook]')];
  hookButtons.forEach(button => button.addEventListener('click', () => {
    $('#hookText').textContent = hooks[Number(button.dataset.hook)];
    hookButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  }));
})();

(() => {
  const video = document.querySelector('#abibVideo');
  video.addEventListener('error', () => { document.querySelector('#abibVideoError').hidden = false; });
  window.addEventListener('pagehide', () => { video.pause(); });
})();
