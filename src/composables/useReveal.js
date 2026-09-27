import { onMounted, onUnmounted, ref } from 'vue';

export function useReveal() {
  const observerRef = ref(null);

  onMounted(() => {
    observerRef.value = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerRef.value.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => {
      observerRef.value.observe(el);
    });
  });

  onUnmounted(() => {
    if (observerRef.value) {
      observerRef.value.disconnect();
    }
  });

  return { observerRef };
}
