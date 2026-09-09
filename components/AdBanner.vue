<template>
  <div v-if="adContent" class="ad-banner-wrapper my-4">
    <div class="ad-container d-inline-block p-2 bg-light border rounded shadow-sm overflow-hidden" v-html="adContent"></div>
    <div class="text-muted smallest-text mt-1">Sponsor</div>
  </div>
</template>

<script setup>
const props = defineProps({
  position: { type: String, required: true } // 'top', 'sidebar', 'bottom'
});

const supabase = useSupabaseClient();
const adContent = ref('');

const fetchAd = async () => {
  const { data } = await supabase
    .from('settings')
    .select('content')
    .eq('id', `adsterra_${props.position}`)
    .single();
  
  if (data) {
    adContent.value = data.content;
    
    // Process scripts after DOM update
    nextTick(() => {
      const wrapper = document.querySelector('.ad-container');
      if (wrapper) {
        const scripts = wrapper.querySelectorAll('script');
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
          newScript.appendChild(document.createTextNode(oldScript.innerHTML));
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      }
    });
  }
};

onMounted(fetchAd);
</script>

<style scoped>
.smallest-text { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; }
.ad-banner-wrapper { text-align: center; }
</style>
