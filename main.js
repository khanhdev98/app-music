// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played


// những việc phải làm
// render song
// scroll top
// play/ pause /seek
// cd rotate
// next/ prev
// random
// next/ repeat when ended
// Active song
// Scroll active song into view
// play song when click
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [

    {
      name: "Baby",
      singer: "Justin Bieber",
      path:
        "./atssets/path/Baby - Justin Bieber.mp3",
      image:
        "https://data.chiasenhac.com/data/cover/3/2024.jpg"
    },

    {
        name: "Love Yourself",
        singer: "Justin Bieber",
        path:
          "./atssets/path/Love Yourself - Justin Bieber.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/53/52821.jpg"
    },
    {
        name: "Holy",
        singer: "Justin Bieber",
        path:
          "https://data.chiasenhac.com/down2/2160/1/2159637-753890c6/128/Holy%20-%20Justin%20Bieber_%20Chance%20The%20Rapper.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/133/132097.jpg"
    },
    {
        name: "What Do You Mean?",
        singer: "Justin Bieber",
        path:
        "./atssets/path/What Do You Mean_ - Justin Bieber.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/138/137424.jpg"
    },

    {
        name: "Sorry",
        singer: "Justin Bieber",
        path:
          "./atssets/path/Sorry - Justin Bieber.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/49/48130.jpg"
    },

    {
        name: "See You Again",
        singer: "Wiz Khalifa; Charlie Puth",
        path: "./atssets/path/See You Again - Wiz Khalifa_ Charlie Put.mp3",
        image: "https://data.chiasenhac.com/data/cover/39/38730.jpg"
    },

    {
        name: "One Call Away",
        singer: "Charlie Puth",
        path: "./atssets/path/One Call Away - Charlie Puth.mp3",
        image: "https://data.chiasenhac.com/data/cover/46/45246.jpg"
    },

    {
      name: "They Said",
      singer: "Binz; Touliver",
      path: "https://data3.chiasenhac.com/downloads/2109/1/2108627-49eb4c8a/128/They%20Said%20-%20Binz_%20Touliver.mp3",
      image:
        "https://data.chiasenhac.com/data/cover/126/125484.jpg"
    },

    {
        name: "My Heart Will Go On",
        singer: "Celine Dion",
        path: "./atssets/path/My Heart Will Go On - Celine Dion.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/3/2190.jpg"
    },
    {
      name: "My Heart Will Go On",
      singer: "Celine Dion",
      path: "https://data51.chiasenhac.com/downloads/1002/5/1001533-e48441ea/128/My%20Heart%20Will%20Go%20On%20-%20Celine%20Dion.mp3",
      image:
        "https://data.chiasenhac.com/data/cover/3/2190.jpg"
    },
    {
      name: "Reality",
      singer: "Lost Frequencies; Janieck Devy",
      path: "./atssets/path/Reality - Lost Frequencies_ Janieck Devy.mp3",
      image:
          "https://data.chiasenhac.com/data/cover/46/45328.jpg"
    },
    {
      name: "That Girl",
      singer: "Celine Dion",
      path: "https://data3.chiasenhac.com/downloads/1740/1/1739574-04b9b9a9/128/That%20Girl%20-%20Olly%20Murs.mp3",
      image:
        "https://data.chiasenhac.com/data/cover/66/65717.jpg"
    },
    {
      name: "Sugar",
      singer: "Maroon 5",
      path: "./atssets/path/Sugar - Maroon 5.mp3",
      image:
        "https://data.chiasenhac.com/data/cover/29/28216.jpg"
    },
   
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },


  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý CD quay / dừng
        // Handle CD spins / stops
        const cdThumbAnimate= cdThumb.animate([{ transform: "rotate(360deg)"}], {
          duration: 20000, // 10 seconds
          iterations: Infinity
        })
        cdThumbAnimate.pause();

        // Xử lý phóng to / thu nhỏ CD
        // Handles CD enlargement / reduction
     
        document.onscroll = function () {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const newCdWidth = cdWidth - scrollTop;

          cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
          cd.style.opacity = newCdWidth / cdWidth;
        };

        // Xử lý khi click play
        // Handle when click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        // Khi song được play
        // When the song is played
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        };

    // Khi song bị pause
    // When the song is pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
            };

        // Khi tiến độ bài hát thay đổi
        // When the song progress changes
      /** 3. SEEK */
    // Thêm eventListener timeupdate thay vì sử dung ontimeupdate:
    audio.ontimeupdate = function () {
      if (audio.duration) {
        progress.value = Math.floor((audio.currentTime / audio.duration) * 100);
      }
    }
   
    progress.oninput = function (e) {
      
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    

        // Khi next song
        // When next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        // Khi prev song
        // When prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        // Xử lý bật / tắt random song
        // Handling on / off random song
        // trước hết thêm class active vào btn-repeat
        // và btn-random bên file html
        //<div class="btn btn-repeat active">
        // <div class="btn btn-random active">
        randomBtn.onclick = function (e) {
        
          _this.isRandom = !_this.isRandom
          randomBtn.classList.remove("active", _this.isRandom);
          _this.setConfig("isRandom", _this.isRandom);
          randomBtn.classList.toggle("active", _this.isRandom);

          _this.isRepeat = false;
          repeatBtn.classList.remove("active");
        };

        // Xử lý lặp lại một song
        // Single-parallel repeat processing
        repeatBtn.onclick = function (e) {
          _this.isRepeat = !_this.isRepeat
          _this.setConfig("isRepeat", _this.isRepeat);
          repeatBtn.classList.toggle("active", _this.isRepeat);

          _this.isRandom = false;
          randomBtn.classList.remove("active");
        };

        // Xử lý next song khi audio ended
        // Handle next song when audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        // Lắng nghe hành vi click vào playlist
        // Listen to playlist clicks
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");

            if (songNode || e.target.closest(".option")) {
                // Xử lý khi click vào song
                // Handle when clicking on the song
                if (songNode) {
                _this.currentIndex = Number(songNode.dataset.index);
                _this.loadCurrentSong();
                _this.render();
                audio.play();
                }

                // Xử lý khi click vào song option
                // Handle when clicking on the song option
                if (e.target.closest(".option")) {
                }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    const h4Element = $("header h4")
    h4Element.textContent = this.currentSong.singer;
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

 
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();

