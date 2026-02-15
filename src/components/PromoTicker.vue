<script setup lang="ts">
type PromoItem = {
  icon: string
  text: string
  tone?: "sale" | "delivery" | "gift" | "secure" | "new"
}

const items: PromoItem[] = [
  { icon: "🔥", text: "Mega Sale: Up to 50% OFF selected items", tone: "sale" },
  { icon: "🎁", text: "Free Gifts on orders over $75", tone: "gift" },
  { icon: "🚚", text: "FREE Delivery on orders over $50", tone: "delivery" },
  { icon: "💳", text: "Secure Payments • Visa • Mastercard • Apple Pay", tone: "secure" },
  { icon: "⭐", text: "Top Rated Picks added weekly", tone: "new" },
  { icon: "🎉", text: "Limited-time Promotions — Don’t miss out!", tone: "sale" },
]
</script>

<template>
  <section class="mb-6">
    <div
      class="rounded-2xl overflow-hidden border
             border-gray-200 dark:border-white/10
             bg-white/80 dark:bg-gray-900/50
             backdrop-blur-xl shadow-sm"
    >
      <!-- Header -->
      <div
        class="px-4 py-2.5 flex items-center gap-2
               border-b border-gray-100 dark:border-white/10
               bg-gradient-to-r from-indigo-50 via-white to-purple-50
               dark:from-indigo-950/40 dark:via-gray-900/40 dark:to-purple-950/40"
      >
        <span
          class="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest
                 text-indigo-700 dark:text-indigo-300"
        >
          <span class="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
          UPDATES
        </span>
        <span class="text-xs text-gray-600 dark:text-gray-300/80">
          Sales • gifts • delivery • promos
        </span>
      </div>

      <!-- Ticker -->
      <div class="relative">
        <div class="ticker-track">
          <!-- row A -->
          <div class="ticker-row">
            <div
              v-for="(it, i) in items"
              :key="'a' + i"
              class="ticker-chip"
              :class="it.tone ? `tone-${it.tone}` : ''"
            >
              <span class="ticker-icon">{{ it.icon }}</span>
              <span class="ticker-text">{{ it.text }}</span>
            </div>
          </div>

          <!-- row B (duplicate for seamless loop) -->
          <div class="ticker-row" aria-hidden="true">
            <div
              v-for="(it, i) in items"
              :key="'b' + i"
              class="ticker-chip"
              :class="it.tone ? `tone-${it.tone}` : ''"
            >
              <span class="ticker-icon">{{ it.icon }}</span>
              <span class="ticker-text">{{ it.text }}</span>
            </div>
          </div>
        </div>

        <!-- Elegant fade edges -->
        <div
          class="pointer-events-none absolute inset-y-0 left-0 w-12
                 bg-gradient-to-r from-white dark:from-gray-900/60 to-transparent"
        ></div>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 w-12
                 bg-gradient-to-l from-white dark:from-gray-900/60 to-transparent"
        ></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth ticker */
.ticker-track {
  display: flex;
  width: max-content;
  animation: ticker 22s linear infinite;
}
.ticker-track:hover {
  animation-play-state: paused;
}

.ticker-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.9rem 0.75rem;
}

/* Chip base (LIGHT MODE) */
.ticker-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  white-space: nowrap;

  padding: 0.6rem 0.95rem;
  border-radius: 9999px;

  border: 1px solid rgba(99, 102, 241, 0.18);
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.08),
    rgba(147, 51, 234, 0.06)
  );

  color: rgba(17, 24, 39, 0.92);
  box-shadow: 0 1px 0 rgba(17, 24, 39, 0.04);
}

/* DARK MODE: higher contrast + clearer borders */
:global(.dark) .ticker-chip {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.18),
    rgba(147, 51, 234, 0.14)
  );
  color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
}

/* Icon + text */
.ticker-icon {
  font-size: 1.05rem;
  line-height: 1;
  filter: saturate(1.1);
}

.ticker-text {
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.1px;
}

/* Tone accents (subtle but premium) */
.tone-sale {
  border-color: rgba(239, 68, 68, 0.22);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.10), rgba(147, 51, 234, 0.06));
}
:global(.dark) .tone-sale {
  border-color: rgba(239, 68, 68, 0.28);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.22), rgba(147, 51, 234, 0.12));
}

.tone-delivery {
  border-color: rgba(34, 197, 94, 0.22);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.10), rgba(99, 102, 241, 0.06));
}
:global(.dark) .tone-delivery {
  border-color: rgba(34, 197, 94, 0.28);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.18), rgba(99, 102, 241, 0.12));
}

.tone-gift {
  border-color: rgba(236, 72, 153, 0.22);
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.10), rgba(147, 51, 234, 0.06));
}
:global(.dark) .tone-gift {
  border-color: rgba(236, 72, 153, 0.28);
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.18), rgba(147, 51, 234, 0.12));
}

.tone-secure {
  border-color: rgba(59, 130, 246, 0.22);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.10), rgba(16, 185, 129, 0.06));
}
:global(.dark) .tone-secure {
  border-color: rgba(59, 130, 246, 0.28);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(16, 185, 129, 0.12));
}

.tone-new {
  border-color: rgba(245, 158, 11, 0.22);
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(99, 102, 241, 0.06));
}
:global(.dark) .tone-new {
  border-color: rgba(245, 158, 11, 0.28);
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(99, 102, 241, 0.12));
}

/* Animation */
@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Mobile polish: slightly taller chips + easier reading */
@media (max-width: 640px) {
  .ticker-row {
    padding: 0.85rem 0.6rem;
    gap: 0.6rem;
  }
  .ticker-chip {
    padding: 0.65rem 0.95rem;
  }
  .ticker-text {
    font-size: 0.95rem;
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
  }
}
</style>