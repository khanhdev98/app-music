// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

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
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
        name: "Love Yourself",
        singer: "Justin Bieber",
        path:
          "https://data2.chiasenhac.com/stream2/1625/5/1624856-feb13819/128/Love%20Yourself%20-%20Justin%20Bieber.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/53/52821.jpg"
    },
    {
        name: "Holy",
        singer: "Justin Bieber",
        path:
          "https://data.chiasenhac.com/down2/2160/5/2159637-753890c6/128/Holy%20-%20Justin%20Bieber_%20Chance%20The%20Rapper.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/133/132097.jpg"
    },
    {
        name: "What Do You Mean?",
        singer: "Justin Bieber",
        path:
          "https://data22.chiasenhac.com/downloads/1544/5/1543063-0b6c8f27/128/What%20Do%20You%20Mean_%20-%20Justin%20Bieber.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/138/137424.jpg"
    },

    {
        name: "Sorry",
        singer: "Justin Bieber",
        path:
          "https://data2.chiasenhac.com/stream2/1573/5/1572844-1e6028ee/128/Sorry%20-%20Justin%20Bieber.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/49/48130.jpg"
    },

    {
        name: "See You Again",
        singer: "Wiz Khalifa; Charlie Puth",
        path: "https://data17.chiasenhac.com/downloads/1470/5/1469867-9215ae26/128/See%20You%20Again%20-%20Wiz%20Khalifa_%20Charlie%20Put.mp3",
        image: "https://data.chiasenhac.com/data/cover/39/38730.jpg"
    },

    {
      name: "Nắm (EDM Version)",
      singer: "Minh Vương M4U; Hương Ly; DJ",
      path: "https://data.chiasenhac.com/down2/2210/5/2209880-58fc1745/128/Nam%20EDM%20Version_%20-%20Minh%20Vuong%20M4U_%20Huong.mp3",
      image: "https://data.chiasenhac.com/data/cover/151/150896.jpg"
    },

    {
        name: "One Call Away",
        singer: "Charlie Puth",
        path: "https://data22.chiasenhac.com/downloads/1540/5/1539612-330ce8e7/128/One%20Call%20Away%20-%20Charlie%20Puth.mp3",
        image: "https://data.chiasenhac.com/data/cover/46/45246.jpg"
    },

    {
      name: "They Said",
      singer: "Binz; Touliver",
      path: "https://data3.chiasenhac.com/downloads/2109/5/2108627-49eb4c8a/128/They%20Said%20-%20Binz_%20Touliver.mp3",
      image:
        "https://data.chiasenhac.com/data/cover/126/125484.jpg"
    },

    {
        name: "My Heart Will Go On",
        singer: "Celine Dion",
        path: "https://data51.chiasenhac.com/downloads/1002/5/1001533-e48441ea/128/My%20Heart%20Will%20Go%20On%20-%20Celine%20Dion.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/3/2190.jpg"
    },

    {
      name: "Đế Vương",
      singer: "Đình Dũng; ACV",
      path:
        "https://data.chiasenhac.com/down2/2210/5/2209308-306e581d/128/De%20Vuong%20-%20Dinh%20Dung_%20ACV.mp3",
      image: "https://data.chiasenhac.com/data/cover/151/150745.jpg"
    },
    {
      name: "Em Đã Có Người Mới",
      singer: "Tóc Tiên; người cũ",
      path: "https://data.chiasenhac.com/down2/2212/5/2211036-47d685a9/128/Em%20Da%20Co%20Nguoi%20Moi%20-%20Toc%20Tien_%20nguoi%20cu.mp3",
      image:
        "https://data.chiasenhac.com/data/cover/152/151147.jpg"
    },
    {
      name: "Mashup Ái Nộ - Lạc (Remix)",
      singer: "Yling; HuyLee; Masew",
      path: "https://data.chiasenhac.com/down2/2211/5/2210582-aa5c63f0/128/Mashup%20Ai%20No%20-%20Lac%20Remix_%20-%20Yling_%20HuyLe.mp3",
      image:
        "https://data.chiasenhac.com/data/cover/152/151078.jpg"
    },
   
    {
      name: "Váy Cưới (Remix)",
      singer: " HuyLee; Duyn203",
      path: "https://data25.chiasenhac.com/download2/2208/5/2207601-1ea83918/128/Vay%20Cuoi%20Remix_%20-%20HuyLee_%20Duyn203.mp3",
      image:
        "https://data.chiasenhac.com/data/cover/151/150356.jpg"
    },
    {
        name: "Không Bằng",
        singer: "Na",
        path: "https://data25.chiasenhac.com/download2/2204/5/2203557-2bbc08c6/128/Khong%20Bang%20-%20Na.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/150/149127.jpg"
      },
      {
        name: "Kiếp Này Em Gả Cho Anh",
        singer: "Thái Học",
        path: "https://data.chiasenhac.com/down2/2210/5/2209395-3ad170fa/128/Kiep%20Nay%20Em%20Ga%20Cho%20Anh%20-%20Thai%20Hoc.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/151/150765.jpg"
      }
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
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
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
        duration: 10000, // 10 seconds
        iterations: Infinity
        });
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
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(
                (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
            }
        };

        // Xử lý khi tua song
        // Handling when seek
        progress.onchange = function (e) {
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
        randomBtn.onclick = function (e) {
        _this.isRandom = !_this.isRandom;
        _this.setConfig("isRandom", _this.isRandom);
        randomBtn.classList.toggle("active", _this.isRandom);
        };

        // Xử lý lặp lại một song
        // Single-parallel repeat processing
        repeatBtn.onclick = function (e) {
        _this.isRepeat = !_this.isRepeat;
        _this.setConfig("isRepeat", _this.isRepeat);
        repeatBtn.classList.toggle("active", _this.isRepeat);
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
