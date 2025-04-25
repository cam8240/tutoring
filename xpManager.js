// xpManager.js

// Core XP data
let xp = 0;
let level = 1;

// Load from localStorage
function loadXP() {
  const storedXp    = localStorage.getItem('xp');
  const storedLevel = localStorage.getItem('level');
  if (storedXp)    xp    = parseInt(storedXp,   10);
  if (storedLevel) level = parseInt(storedLevel,10);
}

// Save to localStorage
function saveXP() {
  localStorage.setItem('xp',    xp);
  localStorage.setItem('level', level);
}

// Animate XP UI
function animateXP(newXp, newLevel, unlockedBadgeName) {
  // ← use the argument newLevel here, not the old global `level`
  const threshold = newLevel * 100;
  const pct       = (newXp / threshold) * 100;

  document.getElementById('xpBar').style.width        = pct + '%';
  document.getElementById('xpPoints').textContent    = `${newXp} / ${threshold} XP`;

  const levelLabel = document.getElementById('levelLabel');
  levelLabel.textContent = `Level ${newLevel}`;

  if (unlockedBadgeName) {
    levelLabel.classList.remove('levelPop');
    void levelLabel.offsetWidth;
    levelLabel.classList.add('levelPop');

    const badge = document.createElement('div');
    badge.className     = 'badge';
    badge.textContent   = `Unlocked: ${unlockedBadgeName}`;
    document.getElementById('badgeContainer').appendChild(badge);

    setTimeout(() => badge.remove(), 3000);
  }
}

// Add XP and handle level-up
function addXP(amount = 10) {
  xp += amount;
  const threshold = level * 100;
  if (xp >= threshold) {
    xp -= threshold;
    level++;
    // pass the *new* level into animateXP
    animateXP(xp, level, `Level ${level} Unlocked`);
  } else {
    animateXP(xp, level);
  }
  saveXP();
}

// Inject XP HTML into container
function renderXP(containerId = 'xpContainer') {
  loadXP(); // make sure we’ve pulled the latest values
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <div id="levelLabel" class="levelPop">Level ${level}</div>
    <div id="xpBarContainer">
      <div id="xpBar" style="width: 0;"></div>
    </div>
    <div id="xpPoints">${xp} / ${level * 100} XP</div>
    <div id="badgeContainer"></div>
  `;
  animateXP(xp, level);
}

// Expose XP methods
window.xpManager = {
  loadXP,
  saveXP,
  addXP,
  renderXP,
  animateXP,
  get xp()    { return xp;    },
  get level() { return level; }
};
