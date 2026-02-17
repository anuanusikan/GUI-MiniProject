<template>
  <div class="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
    <div class="flex gap-10 whitespace-nowrap px-4 py-3 text-sm font-semibold text-white/80 animate-marquee">
      <span class="inline-flex items-center gap-2">
        <span class="text-[#f5d26a]">★</span> Free Delivery on $50+
      </span>

      <span class="inline-flex items-center gap-2">
        <span class="text-[#ff3b3b]">●</span> Flash Deals Every Day
      </span>

      <span class="inline-flex items-center gap-2">
        <span class="text-[#f5d26a]">★</span> Gifts & Promotions Weekly
      </span>

      <span class="inline-flex items-center gap-2">
        <span class="text-[#ff3b3b]">●</span> Secure Checkout Guaranteed
      </span>

      <span class="inline-flex items-center gap-2">
        <span class="text-[#f5d26a]">★</span> Premium Picks Collection
      </span>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(40%) }
  100% { transform: translateX(-100%) }
}

.animate-marquee {
  animation: marquee 18s linear infinite;
}
</style>