<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <button class="nav-button left" @click.stop="prevPhoto">❮</button>

    <div class="modal-content">
      <div class="image-wrapper">
        <img :src="photo.urls.regular" :alt="photo.alt_description" />
      </div>
      <div class="modal-info">
        <p class="author">{{ photo.user.name }}</p>
        <p class="location">{{ location }}</p>
      </div>
    </div>

    <button class="nav-button right" @click.stop="nextPhoto">❯</button>
    <button class="close-button" @click="closeModal">×</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'PhotoModal',
  props: {
    photo: {
      type: Object as () => {
        urls: { regular: string };
        alt_description: string;
        user: { name: string; location?: string };
      },
      required: true,
    },
    photos: {
      type: Array as () => {
        urls: { regular: string };
        alt_description: string;
        user: { name: string; location?: string };
      }[],
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
  },
  emits: ['close', 'update:index'],

  setup(props, { emit }) {
    const location = computed(() => props.photo.user.location || 'Unknown Location');

    const closeModal = () => {
      emit('close');
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    const prevPhoto = () => {
      const prevIndex = props.currentIndex > 0 ? props.currentIndex - 1 : props.photos.length - 1;
      emit('update:index', prevIndex);
    };

    const nextPhoto = () => {
      const nextIndex = props.currentIndex < props.photos.length - 1 ? props.currentIndex + 1 : 0;
      emit('update:index', nextIndex);
    };

    onMounted(() => document.addEventListener('keydown', handleEscapeKey));
    onUnmounted(() => document.removeEventListener('keydown', handleEscapeKey));

    return {
      location,
      closeModal,
      prevPhoto,
      nextPhoto,
    };
  },
});
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(139, 138, 138, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;

  .modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    border-radius: 10px;
    overflow: hidden;

    .image-wrapper img {
      max-height: 80vh;
      max-width: 100%;
    }

    .modal-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 24px 40px;
      background: #fff;

      .author {
        font-size: 1.2rem;
        margin-bottom: 8px;
        font-weight: bold;
        color: #1e1d1d;
      }

      .location {
        font-size: 14px;
        color: gray;
      }
    }
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.7);
    border: none;
    padding: 12px 16px;
    font-size: 24px;
    cursor: pointer;
    border-radius: 50%;
    color: #333;
    transition: 0.2s;
    z-index: 1000;

    &.left {
      left: 20px;
    }

    &.right {
      right: 20px;
    }

    &:hover {
      background: white;
    }
  }

  .close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 0 8px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
