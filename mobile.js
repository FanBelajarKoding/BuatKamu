document.addEventListener("DOMContentLoaded", () => {

  let highestZ = 1;
  let musicStarted = false;
  const audio = document.getElementById("lagu");

  class Paper {
    constructor() {
      this.holdingPaper = false;
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.touchMoveX = 0;
      this.touchMoveY = 0;
      this.prevTouchX = 0;
      this.prevTouchY = 0;
      this.velX = 0;
      this.velY = 0;
      this.rotation = Math.random() * 30 - 15;
      this.currentPaperX = 0;
      this.currentPaperY = 0;
      this.rotating = false;
    }

    init(paper) {

      // 🔥 TOUCH START
      paper.addEventListener("touchstart", (e) => {

        if (this.holdingPaper) return;
        this.holdingPaper = true;

        // ▶️ START MUSIC (ANDROID SAFE)
        if (!musicStarted) {
          audio.play().then(() => {
            musicStarted = true;
          }).catch(err => console.log("Audio blocked:", err));
        }

        paper.style.zIndex = highestZ;
        highestZ += 1;

        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.prevTouchX = this.touchStartX;
        this.prevTouchY = this.touchStartY;
      });

      // 🔥 TOUCH MOVE
      paper.addEventListener("touchmove", (e) => {
        e.preventDefault();

        if (!this.holdingPaper) return;

        this.touchMoveX = e.touches[0].clientX;
        this.touchMoveY = e.touches[0].clientY;

        this.velX = this.touchMoveX - this.prevTouchX;
        this.velY = this.touchMoveY - this.prevTouchY;

        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        this.prevTouchX = this.touchMoveX;
        this.prevTouchY = this.touchMoveY;

        paper.style.transform =
          `translateX(${this.currentPaperX}px)
           translateY(${this.currentPaperY}px)
           rotateZ(${this.rotation}deg)`;
      });

      // 🔥 TOUCH END
      paper.addEventListener("touchend", () => {
        this.holdingPaper = false;
      });

    }
  }

  const papers = Array.from(document.querySelectorAll(".paper"));

  papers.forEach((paper) => {
    const p = new Paper();
    p.init(paper);
  });

});
