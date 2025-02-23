<template>
  <div class="photo-item" :style="{ gridRowEnd: `span ${rowSpan}` }" @click="$emit('click')">
    <div class="photo-image-wrapper" ref="imageWrapper">
      <img
        :src="photo.urls.small"
        :alt="photo.alt_description"
        class="photo-image"
        loading="lazy"
        @load="calculateRowSpan"
      />
    </div>
    <div class="image-overlay">
      <div class="text-content">
        <p class="author">{{ photo.user.name }}</p>
        <p class="location">{{ location }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';

export default defineComponent({
  name: 'PhotoGridItem',
  props: {
    photo: {
      type: Object as () => {
        urls: { small: string };
        alt_description: string;
        user: { name: string; location?: string };
      },
      required: true,
    },
  },
  setup(props) {
    const rowSpan = ref(0);
    const baseRowHeight = 11;
    const rowGap = 34;
    const imageWrapper = ref<HTMLDivElement | null>(null);

    const calculateRowSpan = () => {
      nextTick(() => {
        const img = imageWrapper.value?.querySelector('img') as HTMLImageElement;
        if (!img || img.naturalWidth === 0) return;

        const containerWidth = img.parentElement?.clientWidth || 250;
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const calculatedHeight = containerWidth * aspectRatio;

        rowSpan.value = Math.ceil((calculatedHeight + rowGap) / (baseRowHeight + rowGap));
      });
    };

    return {
      rowSpan,
      location: props.photo.user.location || 'Unknown',
      imageWrapper,
      calculateRowSpan,
    };
  },
});
</script>


<style scoped lang="scss">
.photo-item {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;

  .photo-image-wrapper {
    width: 100%;
    height: 100%;
    display: block;

    .photo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(to top, rgb(0, 0, 0), transparent);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 50%;

    .text-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .author {
      font-weight: 600;
      margin: 0;
    }

    .location {
      font-size: 0.85rem;
      opacity: 0.8;
      margin: 0;
    }
  }
}
</style>
