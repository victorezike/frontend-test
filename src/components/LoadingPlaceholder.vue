<template>
  <div class="placeholder">
    <div class="shimmer"></div>
    <div class="text-placeholder-container">
      <div class="text-placeholder author-placeholder"></div>
      <div class="text-placeholder location-placeholder"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LoadingPlaceholder",
};
</script>

<style scoped lang="scss">
.placeholder {
  width: 100%;
  aspect-ratio: 2 / 3;
  background: #f3f3f3;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

.text-placeholder-container {
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.text-placeholder {
  background: rgba(200, 200, 200, 0.4);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  height: 16px;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 1.5s infinite;
  }
}

.author-placeholder {
  width: 50%;
  height: 18px;
}

.location-placeholder {
  width: 40%;
  height: 14px;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
