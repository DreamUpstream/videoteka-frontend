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
  props: {
    watchable: {
      type: Object,
      required: true,
    },
    relatedWatchables: {
      type: Array,
      default: () => [],
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
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
    };
  },
};
</script>
