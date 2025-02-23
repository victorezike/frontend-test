<template>
  <div class="search-input">
    <div class="input-container">
      <div class="search-icon">
        <SearchIcon />
      </div>
      <input
        v-model="inputValue"
        @keyup.enter="handleSearch"
        :placeholder="placeholder"
        class="input-field"
        type="text"
        aria-label="Search for photo"
      />
      <button
        class="clear-button"
        @click="clearInput"
        v-show="inputValue"
        aria-label="Clear search"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import SearchIcon from './SearchIcon.vue';

export default defineComponent({
  name: 'SearchInput',
  components: { SearchIcon },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Search free high-resolution photos',
    },
  },
  emits: ['update:modelValue', 'search'],
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value: string) => emit('update:modelValue', value),
    });

    const handleSearch = () => {
      emit('search', inputValue.value);
    };

    const clearInput = () => {
      inputValue.value = '';
      emit('search', '');
    };

    return {
      inputValue,
      handleSearch,
      clearInput,
    };
  },
});
</script>

<style scoped lang="scss">
.search-input {
  --input-height: 56px;
  --border-radius: 8px;
  --padding: 16px;
  --transition-speed: 0.2s;

  position: relative;
  width: 100%;

  .input-container {
    position: relative;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;

    .search-icon {
      position: absolute;
      left: 16px;
      color: #a1a0a0;
      pointer-events: none;
      svg {
        width: 24px;
        height: 24px;
      }
    }

    .input-field {
      width: 100%;
      height: var(--input-height);
      padding: var(--padding);
      padding-right: calc(var(--input-height) + var(--padding));
      padding-left: 56px;
      font-size: 1.1rem;
      border: 2px solid #e0e0e0;
      border-radius: var(--border-radius);
      transition:
        border-color var(--transition-speed) ease,
        box-shadow var(--transition-speed) ease;

      &:focus {
        outline: none;
        border-color: #4d90fe;
        box-shadow: 0 0 0 3px rgba(77, 144, 254, 0.15);
      }
      &:focus ~ .search-icon {
        color: #4d90fe; // Match focus color
      }
    }

    .clear-button {
      position: absolute;
      right: 0;
      top: 0;
      height: var(--input-height);
      width: var(--input-height);
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #757575;
      cursor: pointer;
      transition: color var(--transition-speed) ease;

      &:hover {
        color: #212121;
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(33, 33, 33, 0.1);
      }
    }
  }
}
</style>
