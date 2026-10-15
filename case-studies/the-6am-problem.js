(() => {
  const video = document.querySelector('#caseVideo');
  const acts = [...document.querySelectorAll('[data-start]')];
  const status = document.querySelector('#cueStatus');
  let pendingTime = null;
  const selectAct = button => acts.forEach(act => {
    const selected = act === button;
    act.classList.toggle('selected', selected);
    act.setAttribute('aria-pressed', String(selected));
  });
  const seek = time => {
    if (video.readyState < 1) { pendingTime = time; video.load(); return; }
    video.currentTime = Math.min(time, Math.max(0, video.duration - .1));
    pendingTime = null;
  };
  acts.forEach(button => button.addEventListener('click', () => {
    video.pause();
    selectAct(button);
    seek(Number(button.dataset.start));
    status.textContent = `${button.querySelector('strong').textContent} cued. Press Play to watch.`;
  }));
  video.addEventListener('loadedmetadata', () => { if (pendingTime !== null) seek(pendingTime); });
  video.addEventListener('timeupdate', () => {
    if (pendingTime !== null) return;
    const current = [...acts].reverse().find(act => video.currentTime >= Number(act.dataset.start));
    if (current) selectAct(current);
  });
  video.addEventListener('error', () => { document.querySelector('#filmError').hidden = false; status.textContent = 'Video unavailable. The three-act story remains available above.'; });
  window.addEventListener('pagehide', () => video.pause());
  const cuts = {
    full: ['1:22 / Awareness', 'Reach people who do not know the brand.', 'The full story introduces the morning problem to new audiences, with video views as the intended use.'],
    '45': ['45 seconds / Consideration', 'Carry the story into the middle of the funnel.', 'A shorter version supports audiences moving from initial awareness toward consideration.'],
    '30': ['30 seconds / Sales test', 'Test the main sales creative.', 'The proposed primary sales cut tests whether a problem-first story can bring in buyers that discount-first ads miss.'],
    '15': ['15 seconds / Retargeting', 'Make the story work in a shorter placement.', 'The shortest version is intended for Reels, Stories and retargeting.']
  };
  const buttons = [...document.querySelectorAll('[data-cut]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    const [label, title, copy] = cuts[button.dataset.cut];
    const panel = document.querySelector('#cutPanel');
    panel.querySelector('.eyebrow').textContent = label;
    panel.querySelector('h3').textContent = title;
    panel.querySelector('p:last-child').textContent = copy;
  }));
})();
