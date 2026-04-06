<script setup lang="ts">
const companyLinks = [
  "About AlloraCart",
  "Affiliate Program: Join to Earn",
  "Contact us",
  "Careers",
  "Press",
  "Sustainability Program",
]

const customerServiceLinks = [
  "Return and refund policy",
  "Intellectual property policy",
  "Shipping info",
  "Report suspicious activity",
]

const helpLinks = [
  "Support center & FAQ",
  "Safety center",
  "Purchase protection",
  "Sitemap",
  "Partner with us",
]

const legalLinks = ["Terms of use", "Privacy policy", "Your privacy choices", "Ad Choices"]
</script>

<template>
  <footer class="bg-[#151515] text-white/90 mt-12">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Top grid -->
      <div class="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Column 1 -->
        <div>
          <h3 class="text-white font-bold text-lg">Company info</h3>
          <ul class="mt-5 space-y-3 text-sm text-white/70">
            <li v-for="t in companyLinks" :key="t">
              <a href="#" class="hover:text-white transition">{{ t }}</a>
            </li>
          </ul>
        </div>

        <!-- Column 2 -->
        <div>
          <h3 class="text-white font-bold text-lg">Customer service</h3>
          <ul class="mt-5 space-y-3 text-sm text-white/70">
            <li v-for="t in customerServiceLinks" :key="t">
              <a href="#" class="hover:text-white transition">{{ t }}</a>
            </li>
          </ul>
        </div>

        <!-- Column 3 -->
        <div>
          <h3 class="text-white font-bold text-lg">Help</h3>
          <ul class="mt-5 space-y-3 text-sm text-white/70">
            <li v-for="t in helpLinks" :key="t">
              <a href="#" class="hover:text-white transition">{{ t }}</a>
            </li>
          </ul>
        </div>

        <!-- Column 4 -->
        <div>
          <h3 class="text-white font-bold text-lg">Download the Shop In Haven App</h3>

          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <!-- App Store button -->
            <a href="#" class="rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition
                     px-4 py-3 flex items-center gap-3">
              <!-- Apple icon -->
              <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M16.365 1.43c0 1.14-.46 2.2-1.23 3.02-.8.85-2.1 1.5-3.23 1.41-.15-1.1.45-2.25 1.2-3.03.8-.83 2.16-1.45 3.26-1.4z" />
                <path
                  d="M20.21 17.14c-.38.9-.83 1.73-1.36 2.5-.73 1.03-1.33 1.74-2.25 1.76-.88.02-1.16-.52-2.27-.52-1.1 0-1.42.5-2.26.54-.9.03-1.6-.9-2.33-1.92-1.56-2.19-2.76-6.2-1.15-8.92.8-1.36 2.24-2.22 3.8-2.24.87-.02 1.69.58 2.27.58.57 0 1.66-.71 2.8-.61.48.02 1.84.2 2.71 1.5-.07.05-1.62.95-1.6 2.83.02 2.25 1.98 3 2.04 3z" />
              </svg>

              <div class="leading-tight">
                <div class="text-[11px] text-white/70">Download on the</div>
                <div class="font-bold">App Store</div>
              </div>
            </a>

            <!-- Google Play button -->
            <a href="#" class="rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition
                     px-4 py-3 flex items-center gap-3">
              <!-- Play icon -->
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 3.5v17L18.5 12 4 3.5Z" fill="#34A853" />
                <path d="M4 3.5 13 12 4 20.5V3.5Z" fill="#4285F4" />
                <path d="M13 12 18.5 12 15.8 9.9 13 12Z" fill="#FBBC05" />
                <path d="M13 12 15.8 14.1 18.5 12H13Z" fill="#EA4335" />
              </svg>

              <div class="leading-tight">
                <div class="text-[11px] text-white/70">Get it on</div>
                <div class="font-bold">Google Play</div>
              </div>
            </a>
          </div>

          <!-- Social -->
          <h4 class="mt-7 text-white font-bold">Connect with us</h4>
          <div class="mt-3 flex items-center gap-4 text-white/80">
            <!-- Instagram -->
            <a class="hover:text-white transition" href="#" aria-label="Instagram">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.2-2.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </a>

            <!-- Facebook -->
            <a class="hover:text-white transition" href="#" aria-label="Facebook">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M13 22v-8h3l1-4h-4V7.5c0-1.1.3-1.8 1.9-1.8H17V2.1C16.6 2 15.2 2 13.6 2 10.3 2 8 4 8 7.7V10H5v4h3v8h5z" />
              </svg>
            </a>

            <!-- X -->
            <a class="hover:text-white transition" href="#" aria-label="X">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.2L6.5 22H2l7.4-8.5L1 2h6.3l4.4 5.6L18.9 2zm-1.1 18h1.7L6.1 3.9H4.3L17.8 20z" />
              </svg>
            </a>

            <!-- TikTok -->
            <a class="hover:text-white transition" href="#" aria-label="TikTok">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M16 2c.3 2.4 1.7 3.9 4 4v4c-1.5.1-2.9-.4-4-1.2V16a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v4.2a2 2 0 1 0 1 1.7V2h4z" />
              </svg>
            </a>

            <!-- YouTube -->
            <a class="hover:text-white transition" href="#" aria-label="YouTube">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>

            <!-- Pinterest -->
            <a class="hover:text-white transition" href="#" aria-label="Pinterest">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.3-5.5s-.3-.6-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.6-.2 1.1.6 2 1.7 2 2.1 0 3.7-2.2 3.7-5.3 0-2.8-2-4.7-4.8-4.7-3.3 0-5.2 2.5-5.2 5 0 1 .4 2 .9 2.5.1.1.1.2.1.4l-.3 1.1c-.1.4-.3.5-.6.3-1.2-.6-2-2.5-2-4 0-3.3 2.4-6.3 7-6.3 3.7 0 6.6 2.6 6.6 6.1 0 3.6-2.3 6.6-5.5 6.6-1.1 0-2.1-.6-2.4-1.2l-.7 2.7c-.2.9-.8 2-1.2 2.7A10 10 0 0 0 12 22 10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Middle row: security + payments -->
      <div class="pb-10 border-t border-white/10 pt-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Security certification -->
          <div>
            <h4 class="text-white font-bold">Security certification</h4>

            <div class="mt-4 flex flex-wrap gap-3">
              <!-- Badge component style -->
              <div class="h-10 w-24 rounded-lg bg-white border border-white/10 grid place-items-center overflow-hidden">
                <svg viewBox="0 0 120 40" class="h-10 w-24">
                  <rect width="120" height="40" fill="#ffffff"></rect>
                  <text x="60" y="25" text-anchor="middle" font-size="14" font-weight="700" fill="#111827">PCI
                    DSS</text>
                </svg>
              </div>

              <div class="h-10 w-28 rounded-lg bg-white border border-white/10 grid place-items-center overflow-hidden">
                <svg viewBox="0 0 140 40" class="h-10 w-28">
                  <rect width="140" height="40" fill="#ffffff"></rect>
                  <text x="70" y="25" text-anchor="middle" font-size="14" font-weight="700" fill="#1d4ed8">VISA</text>
                  <text x="112" y="25" text-anchor="middle" font-size="12" font-weight="700"
                    fill="#111827">Secure</text>
                </svg>
              </div>

              <div class="h-10 w-32 rounded-lg bg-white border border-white/10 grid place-items-center overflow-hidden">
                <svg viewBox="0 0 160 40" class="h-10 w-32">
                  <rect width="160" height="40" fill="#ffffff"></rect>
                  <circle cx="60" cy="20" r="10" fill="#ef4444"></circle>
                  <circle cx="73" cy="20" r="10" fill="#f59e0b" opacity="0.9"></circle>
                  <text x="110" y="25" text-anchor="middle" font-size="12" font-weight="700" fill="#111827">ID
                    Check</text>
                </svg>
              </div>

              <div class="h-10 w-28 rounded-lg bg-white border border-white/10 grid place-items-center overflow-hidden">
                <svg viewBox="0 0 140 40" class="h-10 w-28">
                  <rect width="140" height="40" fill="#ffffff"></rect>
                  <text x="70" y="25" text-anchor="middle" font-size="14" font-weight="700"
                    fill="#111827">SafeKey</text>
                </svg>
              </div>

              <div class="h-10 w-28 rounded-lg bg-white border border-white/10 grid place-items-center overflow-hidden">
                <svg viewBox="0 0 140 40" class="h-10 w-28">
                  <rect width="140" height="40" fill="#ffffff"></rect>
                  <text x="70" y="25" text-anchor="middle" font-size="14" font-weight="700" fill="#111827">JCB</text>
                  <text x="105" y="25" text-anchor="middle" font-size="12" font-weight="700"
                    fill="#111827">Secure</text>
                </svg>
              </div>
            </div>
          </div>

          <!-- Payments -->
          <div>
            <h4 class="text-white font-bold">We accept</h4>

            <div class="mt-4 flex flex-wrap gap-3">
              <div class="h-10 w-24 rounded-lg bg-white border border-white/10 grid place-items-center overflow-hidden">
                <svg viewBox="0 0 120 40" class="h-10 w-24">
                  <rect width="120" height="40" fill="#ffffff"></rect>
                  <text x="60" y="25" text-anchor="middle" font-size="16" font-weight="800" fill="#1d4ed8">VISA</text>
                </svg>
              </div>

              <div class="h-10 w-28 rounded-lg bg-white border border-white/10 grid place-items-center overflow-hidden">
                <svg viewBox="0 0 140 40" class="h-10 w-28">
                  <rect width="140" height="40" fill="#ffffff"></rect>
                  <circle cx="62" cy="20" r="10" fill="#ef4444"></circle>
                  <circle cx="78" cy="20" r="10" fill="#f59e0b" opacity="0.9"></circle>
                  <text x="105" y="25" text-anchor="middle" font-size="12" font-weight="800"
                    fill="#111827">Master</text>
                </svg>
              </div>

              <div class="h-10 w-28 rounded-lg bg-white border border-white/10 grid place-items-center overflow-hidden">
                <svg viewBox="0 0 140 40" class="h-10 w-28">
                  <rect width="140" height="40" fill="#ffffff"></rect>
                  <text x="70" y="25" text-anchor="middle" font-size="14" font-weight="900" fill="#2563eb">AMEX</text>
                </svg>
              </div>

              <div class="h-10 w-28 rounded-lg bg-white border border-white/10 grid place-items-center overflow-hidden">
                <svg viewBox="0 0 140 40" class="h-10 w-28">
                  <rect width="140" height="40" fill="#ffffff"></rect>
                  <text x="70" y="25" text-anchor="middle" font-size="12" font-weight="900"
                    fill="#111827">Discover</text>
                </svg>
              </div>



              <div class="h-10 w-28 rounded-lg bg-white border border-white/10 grid place-items-center overflow-hidden">
                <svg viewBox="0 0 140 40" class="h-10 w-28">
                  <rect width="140" height="40" fill="#ffffff"></rect>
                  <text x="70" y="25" text-anchor="middle" font-size="12" font-weight="900" fill="#111827">G Pay</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Bottom bar -->
    <div class="border-t border-white/10 py-6 px-6 md:px-8 lg:px-12
         text-xs text-white/60 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
      <p class="tracking-wide">
        © 2026 Allora Cart. All rights reserved.
      </p>
      <div class="flex flex-wrap gap-x-5 gap-y-2">
        <a v-for="t in legalLinks" :key="t" href="#" class="hover:text-white transition">
          {{ t }}
        </a>
      </div>
    </div>

  </footer>
</template>