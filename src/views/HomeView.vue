<template>
  <div class="app">
    <div class="top-header">
      <div class="top-header-inner container">
        <SearchInput
          v-model="searchQuery"
          @search="handleSearch"
          placeholder="Search for photo"
          class="main-search"
        />
      </div>
    </div>

    <div class="container">
      <div class="container-inner">
        <div class="photo-grid">
          <template v-if="loading">
            <LoadingPlaceholder v-for="n in 8" :key="n" />
          </template>

          <template v-else-if="photos.length > 0">
            <PhotoGridItem
              v-for="(photo, index) in photos"
              :key="photo.id"
              :photo="photo"
              @click="openModal(photo, index)"
            />
          </template>

          <div v-else class="no-results">
            <div class="no-results-content">
              <span class="no-results-icon">📷</span>
              <h2 class="no-results-title">No photos found</h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PhotoModal
      v-if="selectedPhoto"
      :photo="selectedPhoto"
      :photos="photos"
      :currentIndex="currentIndex"
      @close="selectedPhoto = null"
      @update:index="updateIndex"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import PhotoModal from '../components/PhotoModal.vue';
import PhotoGridItem from '../components/PhotoGridItem.vue';
import SearchInput from '../components/SearchInput.vue';
import LoadingPlaceholder from '../components/LoadingPlaceholder.vue';

import { unsplashApi } from '../api';
import type { UnsplashPhotoData } from '../interfaces';

export default defineComponent({
  name: 'HomeView',
  components: { PhotoGridItem, LoadingPlaceholder, PhotoModal, SearchInput },

  setup() {
    const photos = ref<UnsplashPhotoData[]>([]);
    const searchQuery = ref('');
    const loading = ref(true);
    const selectedPhoto = ref<UnsplashPhotoData | null>(null);
    const currentIndex = ref<number>(0); // Ensure it's a number

    const fetchAfricanPhotos = async () => {
      loading.value = true;
      try {
        const response = await unsplashApi.searchPhotos('africa', 8);
        photos.value = response;
      } catch (error) {
        console.error('API Error:', error);
        photos.value = [];
      } finally {
        loading.value = false;
      }
    };

    const openModal = (photo: UnsplashPhotoData, index: number) => {
      selectedPhoto.value = photo;
      currentIndex.value = index;
    };

    const updateIndex = (index: number) => {
      if (index >= 0 && index < photos.value.length) {
        currentIndex.value = index;
        selectedPhoto.value = photos.value[index];
      }
    };

    const handleSearch = (query: string) => {
      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        window.location.href = `/search?query=${trimmedQuery}`;
      } else {
        window.location.href = '/';
      }
    };

    onMounted(fetchAfricanPhotos);

    return {
      photos,
      searchQuery,
      loading,
      selectedPhoto,
      currentIndex,
      openModal,
      updateIndex,
      handleSearch,
    };
  },
});
</script>



<style scoped lang="scss">
.app {
  width: 100%;
  min-height: 100dvh;
  position: relative;

  .top-header {
    background: var(--color-header-bg);
    height: var(--header-height);

    &-inner {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}

.main-search {
  margin: 0 auto;
}

.container {
  position: relative;

  &-inner {
    position: relative;
    max-width: var(--container-max-width);
    margin-inline: auto;
    margin-top: var(--spacing-container-top);
    padding-bottom: var(--spacing-container-bottom);

    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(var(--grid-min-column), 1fr));
      grid-auto-rows: calc(var(--grid-auto-rows-base) * 5);
      width: 100%;
      row-gap: var(--grid-row-gap);
      column-gap: var(--grid-column-gap);

      .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: var(--no-results-padding);
        min-height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;

        &-content {
          max-width: 500px;
          margin: 0 auto;
        }

        &-icon {
          font-size: var(--no-results-icon-size);
          display: block;
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }

        &-title {
          font-size: var(--text-size-md);
          color: var(--color-text-primary);
          margin-bottom: 1rem;
        }

        &-message {
          color: var(--color-text-secondary);
          font-size: var(--text-size-sm);
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
