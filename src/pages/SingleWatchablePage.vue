<template>
  <div class="watchable-page">
    <div class="page-title">{{ watchable.title }}</div>
    <q-media-player
      class="media-player"
      :sources="watchable.video"
      dense
      radius="1rem"
      :tracks="watchable.tracks"
    />
    <div class="description-block">
      <div class="description-text">{{ watchable.description }}</div>
      <div class="description-footer">
        <span
          ><div class="rating">
            {{ watchable.rating }}
            <q-icon name="star" class="star-icon" />
            IMDB
          </div></span
        >
        <span class="rating-year">| {{ watchable.year }}</span>
      </div>
    </div>
    <div class="carousel-title">
      {{ isSeries ? "Other episodes" : "Related movies" }}
    </div>
    <!-- BROKEN -->
    <!-- <div class="carousel">
      <button @click="shiftLeft" class="carousel-button carousel-button--left">
        &lt;
      </button>
      <div class="carousel-items">
        <WatchableBlock
          v-for="watchable in relatedWatchables"
          :key="watchable.id"
          :watchable="watchable"
          :style="{ transform: `translateX(-${carouselPosition * 25}%)` }"
        />
      </div>
      <button
        @click="shiftRight"
        class="carousel-button carousel-button--right"
      >
        &gt;
      </button>
    </div> -->
  </div>
</template>

<style scoped>
.watchable-page {
  padding: 10px;
  color: #fff;
}

.star-icon {
  color: yellow;
}
.rating-year {
  margin-left: 10px;
  color: #270000;
}

.page-title {
  font-size: 24px;
  margin: 10px;
  margin-left: 20px;
  text-align: left;

  width: 80%;
  margin: 20px auto;
}

.media-player {
  width: 80%;
  margin: 20px auto;
}

.description-block {
  background-color: #dedede;
  color: #000000;
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.description-footer {
  display: flex;
  margin-top: 10px;
  justify-content: center;
}

.carousel-title {
  font-size: 24px;
  margin: 10px;
  margin-left: 20px;
  width: 80%;
  margin: 20px auto;
}

/* CAROUSEL IS BROKEN ATM */
.carousel {
  position: relative;
  overflow: hidden;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
}

.carousel-button--left {
  left: 10px;
}

.carousel-button--right {
  right: 10px;
}

.carousel-items {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 400%; /* for showing 4 items at once */
}

.carousel-items > * {
  flex: 1 0 25%; /* adjusted to fit 4 items per view */
  max-height: 300px; /* limit the height of the block */
  overflow: hidden; /* to handle overflow content */
  margin-right: 10px;
}

/* .carousel {
  width: 80%;
  margin: 20px auto;
} */
</style>
<script>
import { ref } from "vue";
import WatchableBlock from "components/WatchableBlock.vue";

export default {
  components: {
    // WatchableBlock,
  },
  //    UNCOMMENT WHEN REAL DATA WILL BE USED
  //   props: {
  //     watchable: {
  //       type: Object,
  //       required: true,
  //     },
  //     relatedWatchables: {
  //       type: Array,
  //       default: () => [],
  //     },
  //     isSeries: {
  //       type: Boolean,
  //       default: false,
  //     },
  //   },
  methods: {
    // DOES NOT WORK
    shiftLeft() {
      if (this.carouselPosition > 0) {
        this.carouselPosition -= 4; // Move 4 items at once
        if (this.carouselPosition < 0) {
          this.carouselPosition = 0; // Ensure it doesn't go below 0
        }
      }
    },
    shiftRight() {
      if (this.carouselPosition < this.relatedWatchables.length - 4) {
        this.carouselPosition += 4; // Move 4 items at once
      } else {
        // When less than 4 items are left
        this.carouselPosition = this.relatedWatchables.length - 4;
      }
    },
  },
  data() {
    return {
      carouselPosition: 0,
      // TEST DATA. SHOULD BE REPLACED WITH REAL DATA FROM BACKEND
      relatedWatchables: [
        {
          id: 1,
          title: "The Witcher",
          rating: 9,
          image:
            "https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
          year: 2019,
        },
        {
          id: 2,
          title: "Stranger Things",
          rating: 8.5,
          image:
            "https://m.media-amazon.com/images/M/MV5BMDRjYWI5NTMtZTYzZC00NTg4LWI3NjMtNmI3MTdhMWQ5MGJlXkEyXkFqcGdeQXVyNTg4MDc4Mg@@._V1_FMjpg_UX1000_.jpg",
          year: 2016,
        },
        {
          id: 3,
          title: "The Mandalorian",
          rating: 8.7,
          image:
            "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
          year: 2019,
        },
        {
          id: 4,
          title: "The Witcher",
          rating: 9,
          image:
            "https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
          year: 2019,
        },
        {
          id: 5,
          title: "Stranger Things",
          rating: 8.5,
          image:
            "https://m.media-amazon.com/images/M/MV5BMDRjYWI5NTMtZTYzZC00NTg4LWI3NjMtNmI3MTdhMWQ5MGJlXkEyXkFqcGdeQXVyNTg4MDc4Mg@@._V1_FMjpg_UX1000_.jpg",
          year: 2016,
        },
        {
          id: 6,
          title: "The Mandalorian",
          rating: 8.7,
          image:
            "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
          year: 2019,
        },
      ],

      isSeries: false,

      watchable: {
        id: 1,
        title: "The Witcher",
        rating: 9,
        image:
          "https://m.media-amazon.com/images/M/MV5BMDEwOWVlY2EtMWI0ZC00OWVmLWJmZGItYTk3YjYzN2Y0YmFkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
        year: 2019,
        description:
          "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts. Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts. Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts. Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
        video: [
          {
            src: "http://ftp.nluug.nl/pub/graphics/blender/demo/movies/ToS/tears_of_steel_720p.mov",
            type: "video/mp4",
          },
        ],
        tracks: [
          {
            src: "media/TearsOfSteel/TOS-en.vtt",
            kind: "subtitles",
            srclang: "en",
            label: "English",
          },
          {
            src: "media/TearsOfSteel/TOS-de.vtt",
            kind: "subtitles",
            srclang: "de",
            label: "German",
          },
          {
            src: "media/TearsOfSteel/TOS-es.vtt",
            kind: "subtitles",
            srclang: "es",
            label: "Spanish",
          },
          {
            src: "media/TearsOfSteel/TOS-fr-Goofy.vtt",
            kind: "subtitles",
            srclang: "fr",
            label: "French",
          },
          {
            src: "media/TearsOfSteel/TOS-it.vtt",
            kind: "subtitles",
            srclang: "it",
            label: "Italian",
          },
          {
            src: "media/TearsOfSteel/TOS-nl.vtt",
            kind: "subtitles",
            srclang: "nl",
            label: "Dutch",
          },
        ],
      },
    };
  },
};
</script>
