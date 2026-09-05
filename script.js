/* =========================================================
   A LITTLE BIRTHDAY WORLD — SCRIPT.JS
   Everything you need to personalize lives in the
   "BIRTHDAY CUSTOMIZATION" block right below. You do not
   need to touch anything past that section.
   ========================================================= */

// ==============================
// BIRTHDAY CUSTOMIZATION
// ==============================
const birthdayConfig = {
    name: "Yayul",              // namanya, muncul di banyak tempat
    age: "21",                   // buat kamu sendiri, nggak ditampilkan otomatis tapi tersedia di bawah
    birthday: "5 September 2005",// muncul di layar "hari ini harimu"
    pin: "0509",                 // kode rahasia di layar pembuka
    sender: "Odi cantik",        // muncul sebagai tanda tangan di bagian akhir
    music: "assets/music.mp3",   // path lagu ulang tahunnya

    // ini pesan default. Ganti kapan saja sesuai kata-kata kamu sendiri.
    message: `Happy birthday, bestie! 💙

Selamat ya, kamu resmi bertambah tua satu tahun lagi. Tenang, umur cuma angka, yang penting kamu tetap cantik dan tetap waras... kalau bisa.

Aku cuma mau bilang, aku beneran bersyukur punya bestie kayak kamu. Semua obrolan random, candaan garing, cerita nggak penting, dan hal-hal random lainnya yang entah kenapa malah jadi kenangan yang paling aku inget.

Aku harap tahun ini banyak hal baik yang datang ke kamu.

Semoga kamu dapet kesempatan yang bikin kamu semangat, orang-orang yang beneran menghargai kamu, hari-hari yang bikin kamu ketawa sampai perut sakit, dan banyak momen yang bakal kamu kangenin nanti.

Semoga kamu terus jadi versi diri kamu yang kamu mau, tapi tetap jadi kamu yang lucu, aneh, dan sedikit berantakan itu. Soalnya itu yang bikin kamu, ya kamu.

Makasih ya udah selalu ada buat semua obrolan random dan kekonyolan kita.

Dan makasih udah jadi salah satu orang yang selalu bisa diajak ngobrol, ketawa, dan diganggu.

Aku beneran senang bisa kenal kamu dan nyebut kamu bestie aku.

Selamat ulang tahun! 💙

Semoga tahun ini penuh sama petualangan random, keputusan yang dipertanyakan, ketawa berlebihan, makanan enak, dan tentunya makin banyak kenangan baru.

Tetap jadi orang paling seru.

Tapi jangan kelewat dewasa juga.

Reputasi kita berdua masih harus dijaga. 😭💙`,

    // dipakai di layar kejutan terakhir — foto yang muncul di bingkai elegan
    finalPhoto: "assets/photos/photo1.jpg"
};

// Tambahin foto sebanyak yang kamu mau — scrapbook dan lightbox bakal
// otomatis menyesuaikan. Minimal 10 slot udah disiapkan di bawah ini.
const photos = [
    { src: "assets/photos/photo1.jpg",  caption: "Peak bestie moment 💙" },
    { src: "assets/photos/photo2.jpg",  caption: "Oke, ini emang bagus sih." },
    { src: "assets/photos/photo3.jpg",  caption: "Entah kenapa kita selalu punya foto random." },
    { src: "assets/photos/photo4.jpg",  caption: "Peak bestie behavior." },
    { src: "assets/photos/photo5.jpg",  caption: "Ini wajib masuk." },
    { src: "assets/photos/photo6.jpg",  caption: "Kenapa kamu lucu banget di sini?" },
    { src: "assets/photos/photo7.jpg",  caption: "Momen chaos bersertifikat." },
    { src: "assets/photos/photo8.jpg",  caption: "Wajah di balik semua kekonyolan." },
    { src: "assets/photos/photo9.jpg",  caption: "Foto ini nggak boleh dilewatkan." },
    { src: "assets/photos/photo10.jpg", caption: "Yang penting bahagia dulu." }
];

// Timeline kenangannya. Tambah, hapus, atau edit bebas —
// tanggal itu opsional, tinggal hapus aja kalau nggak mau dipakai.
const memories = [
    {
        title: "Awal dari segala kekacauan ini.",
        text: "Somewhere di sini ada cerita gimana kita bisa jadi temenan. Sepuluh dari sepuluh, bakal berteman lagi kalau diulang.",
        image: "assets/photos/photo2.jpg"
    },
    {
        title: "Hari random yang tiba-tiba jadi kenangan.",
        text: "Awalnya nggak ada yang spesial. Tapi entah kenapa malah jadi salah satu yang paling diinget.",
        image: "assets/photos/photo5.jpg"
    },
    {
        title: "Somehow, kita masih bertahan sejauh ini.",
        text: "Lewatin hari-hari baik, hari-hari aneh, sama hari-hari yang kita berdua udah nggak inget lagi — tetap masih di sini.",
        image: "assets/photos/photo8.jpg"
    }
];

// ==============================
// END OF CUSTOMIZATION — the rest makes it all work.
// ==============================


(function(){
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     SCREEN NAVIGATION
  --------------------------------------------------------- */
  const screens = Array.from(document.querySelectorAll(".screen"));

  function showScreen(id){
    screens.forEach(s => s.classList.toggle("is-active", s.id === id));
    window.scrollTo({ top: 0, behavior: "auto" });
    runScreenEnter(id);
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-next]");
    if (btn){
      showScreen(btn.getAttribute("data-next"));
    }
  });

  function playFadeSequence(container){
    const lines = Array.from(container.querySelectorAll(".fade-line"))
      .sort((a,b) => (+a.dataset.order || 0) - (+b.dataset.order || 0));
    lines.forEach((line, i) => {
      const delay = prefersReducedMotion ? 0 : i * 550;
      setTimeout(() => line.classList.add("is-shown"), delay);
    });
  }

  function runScreenEnter(id){
    if (id === "screen-today") playFadeSequence(document.getElementById("screen-today"));
    if (id === "screen-gift") playFadeSequence(document.getElementById("screen-gift"));
    if (id === "screen-final") runFinalScreen();
    if (id === "screen-memories") renderMemories();
    if (id === "screen-scrapbook") renderScrapbook();
    if (id === "screen-game") startGame();
    if (id === "screen-letter") startLetter();
  }

  /* ---------------------------------------------------------
     PERSONALIZED TEXT INJECTION
  --------------------------------------------------------- */
  document.getElementById("welcomeHi").textContent = `Hei, ${birthdayConfig.name} 💙`;
  document.getElementById("todayName").textContent = `${birthdayConfig.name.toUpperCase()} 💙`;
  document.getElementById("todayDate").textContent = birthdayConfig.birthday || "";
  document.getElementById("finalName").textContent = birthdayConfig.name.toUpperCase();
  document.getElementById("finalSender").textContent = `— ${birthdayConfig.sender}`;
  document.title = `Happy Birthday, ${birthdayConfig.name} 💙`;

  /* ---------------------------------------------------------
     1. PIN SCREEN
  --------------------------------------------------------- */
  const pinDotsEl = document.getElementById("pinDots");
  const pinDots = Array.from(pinDotsEl.querySelectorAll(".pin-dot"));
  const pinErrorEl = document.getElementById("pinError");
  const envelope = document.getElementById("envelope");
  const sparkleBurst = document.getElementById("envelopeSparkle");
  let enteredPin = "";

  function refreshDots(){
    pinDots.forEach((d, i) => d.classList.toggle("is-filled", i < enteredPin.length));
  }

  function showPinError(msg){
    pinErrorEl.textContent = msg;
    pinErrorEl.classList.add("is-visible");
    pinDotsEl.classList.remove("shake");
    void pinDotsEl.offsetWidth;
    pinDotsEl.classList.add("shake");
  }

  function clearPinError(){
    pinErrorEl.classList.remove("is-visible");
  }

  function spawnSparkles(){
    sparkleBurst.innerHTML = "";
    const count = prefersReducedMotion ? 6 : 16;
    for (let i = 0; i < count; i++){
      const s = document.createElement("span");
      const angle = (Math.PI * 2 * i) / count;
      const dist = 40 + Math.random() * 30;
      s.style.setProperty("--dx", `${Math.cos(angle)*dist}px`);
      s.style.setProperty("--dy", `${Math.sin(angle)*dist}px`);
      s.style.animationDelay = `${Math.random()*0.15}s`;
      sparkleBurst.appendChild(s);
    }
  }

  function checkPin(){
    if (enteredPin.length < 4) return;
    if (enteredPin === String(birthdayConfig.pin)){
      clearPinError();
      envelope.classList.add("is-open");
      spawnSparkles();
      setTimeout(() => showScreen("screen-welcome"), prefersReducedMotion ? 200 : 950);
    } else {
      showPinError("Hmm... salah tuh. Coba lagi 😭");
      setTimeout(() => {
        enteredPin = "";
        refreshDots();
      }, 500);
    }
  }

  document.getElementById("keypad").addEventListener("click", (e) => {
    const key = e.target.closest(".key");
    if (!key) return;
    const val = key.dataset.key;
    clearPinError();
    if (val === "clear"){
      enteredPin = "";
    } else if (val === "back"){
      enteredPin = enteredPin.slice(0, -1);
    } else if (enteredPin.length < 4){
      enteredPin += val;
    }
    refreshDots();
    if (enteredPin.length === 4) checkPin();
  });

  // keyboard support for desktop
  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("screen-pin").classList.contains("is-active")) return;
    if (/^[0-9]$/.test(e.key) && enteredPin.length < 4){
      clearPinError();
      enteredPin += e.key;
      refreshDots();
      if (enteredPin.length === 4) checkPin();
    } else if (e.key === "Backspace"){
      enteredPin = enteredPin.slice(0, -1);
      refreshDots();
    }
  });

  /* ---------------------------------------------------------
     3. MUSIC PLAYER
  --------------------------------------------------------- */
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.src = birthdayConfig.music;
  const playButton = document.getElementById("playButton");
  const playIcon = document.getElementById("playIcon");
  const playLabel = document.getElementById("playLabel");
  const vinyl = document.getElementById("vinyl");
  const tonearm = document.getElementById("tonearm");
  const visualizer = document.getElementById("visualizer");
  const musicToggle = document.getElementById("musicToggle");
  let isPlaying = false;
  let musicStarted = false;

  function setPlayingState(playing){
    isPlaying = playing;
    vinyl.classList.toggle("is-spinning", playing);
    tonearm.classList.toggle("is-down", playing);
    visualizer.classList.toggle("is-active", playing);
    playButton.classList.toggle("is-playing", playing);
    playIcon.textContent = playing ? "❚❚" : "▶";
    playLabel.textContent = playing ? "LAGI MUTER ♫" : "PUTAR ♫";
    musicToggle.classList.toggle("is-muted", !playing);
  }

  playButton.addEventListener("click", () => {
    if (!isPlaying){
      bgMusic.play().catch(() => { /* file may be missing until user adds one */ });
      musicStarted = true;
      musicToggle.hidden = false;
    } else {
      bgMusic.pause();
    }
    setPlayingState(!isPlaying);
  });

  musicToggle.addEventListener("click", () => {
    if (!musicStarted){
      bgMusic.play().catch(() => {});
      musicStarted = true;
    } else if (isPlaying){
      bgMusic.pause();
    } else {
      bgMusic.play().catch(() => {});
    }
    setPlayingState(!isPlaying);
  });

  /* ---------------------------------------------------------
     5. SCRAPBOOK + LIGHTBOX
  --------------------------------------------------------- */
  const scrapbookGrid = document.getElementById("scrapbookGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  let scrapbookRendered = false;

  function renderScrapbook(){
    if (scrapbookRendered) return;
    scrapbookRendered = true;
    photos.forEach((p, i) => {
      const item = document.createElement("button");
      item.className = "scrap-item";
      item.type = "button";
      item.setAttribute("aria-label", p.caption || `Foto ${i+1}`);
      item.innerHTML = `
        <span class="scrap-tape" aria-hidden="true"></span>
        <img class="scrap-photo" src="${p.src}" alt="${p.caption || ''}" loading="lazy">
        <span class="scrap-caption">${p.caption || ""}</span>
      `;
      const img = item.querySelector("img");
      img.addEventListener("error", () => {
        const fallback = document.createElement("div");
        fallback.className = "scrap-photo-fallback";
        fallback.setAttribute("aria-hidden","true");
        fallback.textContent = "✿";
        img.replaceWith(fallback);
      }, { once:true });

      item.addEventListener("click", () => openLightbox(p, img));
      scrapbookGrid.appendChild(item);
    });
  }

  function openLightbox(photoData, imgEl){
    const usableSrc = (imgEl && imgEl.tagName === "IMG") ? imgEl.currentSrc || photoData.src : photoData.src;
    lightboxImg.src = usableSrc;
    lightboxImg.alt = photoData.caption || "";
    lightboxImg.onerror = () => { lightboxImg.style.display = "none"; };
    lightboxImg.onload = () => { lightboxImg.style.display = "block"; };
    lightboxCaption.textContent = photoData.caption || "";
    lightbox.hidden = false;
  }
  document.getElementById("lightboxClose").addEventListener("click", () => lightbox.hidden = true);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.hidden = true; });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) lightbox.hidden = true; });

  /* ---------------------------------------------------------
     6. BOUQUET
  --------------------------------------------------------- */
  const bouquetWrap = document.getElementById("bouquetWrap");
  const openBouquetBtn = document.getElementById("openBouquetBtn");
  const bouquetLines = document.getElementById("bouquetLines");
  const bouquetSparkle = document.getElementById("bouquetSparkle");

  openBouquetBtn.addEventListener("click", () => {
    bouquetWrap.classList.add("is-open");
    spawnFloatingBits(bouquetSparkle, "✿", 10);
    openBouquetBtn.hidden = true;
    bouquetLines.hidden = false;
    setTimeout(() => playFadeSequence(bouquetLines), 300);
  });

  function spawnFloatingBits(container, symbol, count){
    if (prefersReducedMotion) count = Math.min(count, 4);
    for (let i = 0; i < count; i++){
      const bit = document.createElement("span");
      bit.textContent = symbol;
      bit.style.position = "absolute";
      bit.style.left = `${20 + Math.random()*60}%`;
      bit.style.top = `${20 + Math.random()*40}%`;
      bit.style.fontSize = `${10 + Math.random()*10}px`;
      bit.style.color = "var(--sky-blue)";
      bit.style.opacity = "0";
      bit.style.transition = "transform 1.4s ease-out, opacity 1.4s ease-out";
      container.appendChild(bit);
      requestAnimationFrame(() => {
        bit.style.opacity = "1";
        bit.style.transform = `translateY(-${40 + Math.random()*40}px)`;
        setTimeout(() => { bit.style.opacity = "0"; }, 900);
      });
      setTimeout(() => bit.remove(), 1600);
    }
  }

  /* ---------------------------------------------------------
     7. CAKE
  --------------------------------------------------------- */
  const lightCandlesBtn = document.getElementById("lightCandlesBtn");
  const makeWishBtn = document.getElementById("makeWishBtn");
  const candleGroup = document.getElementById("candleGroup");
  const cakeLines = document.getElementById("cakeLines");
  const cakeSmoke = document.getElementById("cakeSmoke");
  const cakePrompt = document.getElementById("cakePrompt");

  lightCandlesBtn.addEventListener("click", () => {
    candleGroup.querySelectorAll(".candle").forEach((c, i) => {
      setTimeout(() => c.setAttribute("data-lit", "1"), i * 220);
    });
    lightCandlesBtn.hidden = true;
    setTimeout(() => { makeWishBtn.hidden = false; }, 700);
    cakePrompt.textContent = "Buat permintaan dulu.";
  });

  makeWishBtn.addEventListener("click", () => {
    candleGroup.querySelectorAll(".candle").forEach(c => c.setAttribute("data-lit", "0"));
    spawnFloatingBits(cakeSmoke, "≈", 5);
    spawnPetalsBurst();
    makeWishBtn.hidden = true;
    cakeLines.hidden = false;
    setTimeout(() => playFadeSequence(cakeLines), 200);
  });

  /* ---------------------------------------------------------
     8. MINI GAME — Catch the blue hearts
  --------------------------------------------------------- */
  const gameField = document.getElementById("gameField");
  const gameScore = document.getElementById("gameScore");
  const gameLines = document.getElementById("gameLines");
  const gameInstruction = document.getElementById("gameInstruction");
  const GAME_TARGET = 8;
  let caughtCount = 0;
  let gameStarted = false;
  let gameSpawnTimer = null;

  function startGame(){
    if (gameStarted) return;
    gameStarted = true;
    let spawned = 0;
    const maxSpawn = 14; // spawns a few extra so it never feels impossible
    gameSpawnTimer = setInterval(() => {
      if (spawned >= maxSpawn || caughtCount >= GAME_TARGET){
        clearInterval(gameSpawnTimer);
        return;
      }
      spawnHeart();
      spawned++;
    }, 550);
  }

  function spawnHeart(){
    if (!gameField.isConnected) return;
    const heart = document.createElement("button");
    heart.className = "floating-heart";
    heart.type = "button";
    heart.setAttribute("aria-label", "Tangkap hati ini");
    heart.textContent = "💙";
    const fieldWidth = gameField.clientWidth || 300;
    heart.style.left = `${Math.random() * (fieldWidth - 50)}px`;
    heart.style.bottom = "0px";
    const duration = 3.4 + Math.random() * 1.2;
    heart.style.animationDuration = `${duration}s`;

    heart.addEventListener("click", () => {
      if (heart.classList.contains("is-caught")) return;
      heart.classList.add("is-caught");
      caughtCount = Math.min(caughtCount + 1, GAME_TARGET);
      gameScore.textContent = `${caughtCount} / ${GAME_TARGET}`;
      setTimeout(() => heart.remove(), 400);
      if (caughtCount >= GAME_TARGET) finishGame();
    });

    heart.addEventListener("animationend", () => heart.remove());
    gameField.appendChild(heart);
  }

  function finishGame(){
    clearInterval(gameSpawnTimer);
    gameInstruction.textContent = "Semua berhasil ditangkap. Mantap.";
    gameLines.hidden = false;
    setTimeout(() => playFadeSequence(gameLines), 200);
  }

  /* ---------------------------------------------------------
     9. MEMORIES
  --------------------------------------------------------- */
  const timelineEl = document.getElementById("timeline");
  let memoriesRendered = false;

  function renderMemories(){
    if (memoriesRendered) return;
    memoriesRendered = true;
    memories.forEach((m, i) => {
      const item = document.createElement("div");
      item.className = "timeline-item";
      const chapterNum = String(i + 1).padStart(2, "0");
      item.innerHTML = `
        <img class="timeline-photo" src="${m.image}" alt="${m.title}" loading="lazy">
        <div>
          <div class="timeline-chapter">Bab ${chapterNum}</div>
          <div class="timeline-title">${m.title}</div>
          <p class="timeline-text">${m.text || ""}</p>
        </div>
      `;
      const img = item.querySelector("img");
      img.addEventListener("error", () => {
        const fallback = document.createElement("div");
        fallback.className = "timeline-photo-fallback";
        fallback.textContent = "✿";
        img.replaceWith(fallback);
      }, { once: true });
      timelineEl.appendChild(item);
    });
  }

  /* ---------------------------------------------------------
     10. LETTER — typewriter
  --------------------------------------------------------- */
  const letterText = document.getElementById("letterText");
  const letterCursor = document.getElementById("letterCursor");
  const letterNextBtn = document.getElementById("letterNextBtn");
  const letterSkipBtn = document.getElementById("letterSkipBtn");
  let letterStarted = false;
  let letterTimer = null;
  const fullLetter = birthdayConfig.message.trim();

  function startLetter(){
    if (letterStarted) return;
    letterStarted = true;
    if (prefersReducedMotion){
      finishLetterInstantly();
      return;
    }
    let i = 0;
    const speed = 18;
    letterTimer = setInterval(() => {
      letterText.textContent = fullLetter.slice(0, i);
      i++;
      if (i > fullLetter.length){
        clearInterval(letterTimer);
        finishLetterUI();
      }
    }, speed);
  }

  function finishLetterInstantly(){
    letterText.textContent = fullLetter;
    finishLetterUI();
  }

  function finishLetterUI(){
    letterCursor.style.display = "none";
    letterNextBtn.hidden = false;
    letterSkipBtn.hidden = true;
  }

  letterSkipBtn.addEventListener("click", () => {
    clearInterval(letterTimer);
    finishLetterInstantly();
  });

  /* ---------------------------------------------------------
     11. GIFT BOX
  --------------------------------------------------------- */
  const giftWrap = document.getElementById("giftWrap");
  const openGiftBtn = document.getElementById("openGiftBtn");
  let giftOpened = false;

  function openGift(){
    if (giftOpened) return;
    giftOpened = true;
    giftWrap.classList.add("is-open");
    document.getElementById("finalPhoto").src = birthdayConfig.finalPhoto;
    setTimeout(() => showScreen("screen-final"), prefersReducedMotion ? 300 : 1100);
  }
  openGiftBtn.addEventListener("click", openGift);
  giftWrap.addEventListener("click", openGift);

  document.getElementById("finalPhoto").addEventListener("error", function(){
    this.replaceWith(Object.assign(document.createElement("div"), {
      className: "final-photo",
      style: "display:flex;align-items:center;justify-content:center;font-size:2.4rem;color:#fff;",
      textContent: "💙",
      "aria-label": "placeholder foto"
    }));
  });

  /* ---------------------------------------------------------
     12. FINAL SURPRISE + CONFETTI + REPLAY
  --------------------------------------------------------- */
  let finalPlayed = false;
  function runFinalScreen(){
    if (finalPlayed) return;
    finalPlayed = true;
    playFadeSequence(document.getElementById("screen-final"));
    setTimeout(() => burstConfetti(), prefersReducedMotion ? 0 : 600);
  }

  document.getElementById("onceMoreBtn").addEventListener("click", () => {
    burstConfetti();
    spawnFloatingBits(document.getElementById("screen-final").querySelector(".stage"), "✿", 6);
  });

  document.getElementById("replayBtn").addEventListener("click", () => {
    window.scrollTo(0,0);
    // reset lightweight state so the journey can be replayed cleanly
    enteredPin = "";
    refreshDots();
    envelope.classList.remove("is-open");
    bouquetWrap.classList.remove("is-open");
    openBouquetBtn.hidden = false;
    bouquetLines.hidden = true;
    Array.from(bouquetLines.querySelectorAll(".fade-line")).forEach(l => l.classList.remove("is-shown"));
    candleGroup.querySelectorAll(".candle").forEach(c => c.setAttribute("data-lit","0"));
    lightCandlesBtn.hidden = false;
    makeWishBtn.hidden = true;
    cakeLines.hidden = true;
    Array.from(cakeLines.querySelectorAll(".fade-line")).forEach(l => l.classList.remove("is-shown"));
    caughtCount = 0;
    gameScore.textContent = `0 / ${GAME_TARGET}`;
    gameField.innerHTML = "";
    gameStarted = false;
    gameLines.hidden = true;
    Array.from(gameLines.querySelectorAll(".fade-line")).forEach(l => l.classList.remove("is-shown"));
    letterText.textContent = "";
    letterCursor.style.display = "inline-block";
    letterStarted = false;
    letterNextBtn.hidden = true;
    letterSkipBtn.hidden = false;
    giftWrap.classList.remove("is-open");
    giftOpened = false;
    finalPlayed = false;
    Array.from(document.getElementById("screen-today").querySelectorAll(".fade-line")).forEach(l => l.classList.remove("is-shown"));
    Array.from(document.getElementById("screen-gift").querySelectorAll(".fade-line")).forEach(l => l.classList.remove("is-shown"));
    Array.from(document.getElementById("screen-final").querySelectorAll(".fade-line")).forEach(l => l.classList.remove("is-shown"));
    showScreen("screen-pin");
  });

  /* confetti canvas */
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  let confettiParticles = [];
  let confettiRAF = null;
  const confettiColors = ["#6fb3e0", "#a9d4f0", "#ffffff", "#e7d9b8", "#2c4a6b"];

  function burstConfetti(){
    if (prefersReducedMotion) return;
    const count = 70;
    for (let i = 0; i < count; i++){
      confettiParticles.push({
        x: canvas.width / 2 + (Math.random()-0.5) * 120,
        y: canvas.height * 0.35,
        vx: (Math.random()-0.5) * 6,
        vy: Math.random() * -6 - 2,
        size: 4 + Math.random() * 5,
        color: confettiColors[Math.floor(Math.random()*confettiColors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random()-0.5) * 10,
        gravity: 0.15 + Math.random()*0.08,
        life: 0
      });
    }
    if (!confettiRAF) animateConfetti();
  }

  function animateConfetti(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    confettiParticles.forEach(p => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vr;
      p.life++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
      ctx.restore();
    });
    confettiParticles = confettiParticles.filter(p => p.y < canvas.height + 40 && p.life < 400);
    if (confettiParticles.length > 0){
      confettiRAF = requestAnimationFrame(animateConfetti);
    } else {
      ctx.clearRect(0,0,canvas.width, canvas.height);
      confettiRAF = null;
    }
  }

  /* ---------------------------------------------------------
     AMBIENT FLOATING PETALS (background, all screens)
  --------------------------------------------------------- */
  const petalLayer = document.getElementById("petalLayer");
  const petalSymbols = ["✿", "❀", "✾"];

  function spawnAmbientPetal(){
    if (prefersReducedMotion) return;
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = petalSymbols[Math.floor(Math.random()*petalSymbols.length)];
    petal.style.left = `${Math.random()*100}%`;
    petal.style.setProperty("--drift", `${(Math.random()-0.5)*140}px`);
    const duration = 9 + Math.random()*8;
    petal.style.animationDuration = `${duration}s`;
    petalLayer.appendChild(petal);
    setTimeout(() => petal.remove(), duration*1000 + 200);
  }

  if (!prefersReducedMotion){
    setInterval(spawnAmbientPetal, 2600);
    spawnAmbientPetal();
  }

  function spawnPetalsBurst(){
    if (prefersReducedMotion) return;
    for (let i=0;i<10;i++){
      setTimeout(spawnAmbientPetal, i*70);
    }
  }

  /* ---------------------------------------------------------
     INITIAL STATE
  --------------------------------------------------------- */
  showScreen("screen-pin");
  gameScore.textContent = `0 / ${GAME_TARGET}`;

})();
