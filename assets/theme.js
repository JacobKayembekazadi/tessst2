/**
 * Sloe Fit Theme JavaScript
 * Handles interactivity for mobile menu, bundle selector, and newsletter
 */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      const isOpen = !mobileMenu.classList.contains('hidden');
      
      if (isOpen) {
        // Close menu
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      } else {
        // Open menu
        mobileMenu.classList.remove('hidden');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
    });

    // Close menu when clicking on a link
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // Bundle Selector
  const bundleData = document.getElementById('bundle-data');
  if (bundleData) {
    try {
      const data = JSON.parse(bundleData.textContent);
      const bundles = data.bundles;
      
      const bundleOptions = document.querySelectorAll('.bundle-option');
      const bundleName = document.querySelector('.bundle-name');
      const bundleItems = document.querySelector('.bundle-items');
      const bundleOriginalPrice = document.querySelector('.bundle-original-price');
      const bundlePrice = document.querySelector('.bundle-price');
      const bundleSavings = document.querySelector('.bundle-savings');
      const bundleCta = document.querySelector('.bundle-cta');

      bundleOptions.forEach((option, index) => {
        option.addEventListener('click', function() {
          // Update active state
          bundleOptions.forEach(opt => {
            opt.classList.remove('bg-sloe-bg-default', 'border-sloe-primary', 'ring-2', 'ring-sloe-primary/50');
            opt.classList.add('bg-sloe-bg-default/50', 'border-sloe-bg-border');
          });
          
          this.classList.remove('bg-sloe-bg-default/50', 'border-sloe-bg-border');
          this.classList.add('bg-sloe-bg-default', 'border-sloe-primary', 'ring-2', 'ring-sloe-primary/50');

          // Update bundle details
          const bundle = bundles[index];
          if (bundle) {
            bundleName.textContent = bundle.name + ' Details';
            
            // Update items list
            const items = bundle.items.split(',');
            bundleItems.innerHTML = items.map(item => `
              <div class="flex items-center text-sloe-text-body">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sloe-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-lg">${item.trim()}</span>
              </div>
            `).join('');
            
            bundleOriginalPrice.textContent = 'Retail: $' + bundle.originalPrice;
            bundlePrice.textContent = '$' + bundle.bundlePrice;
            bundleSavings.textContent = 'YOU SAVE $' + bundle.savings;
            
            if (bundleCta && bundle.ctaUrl) {
              bundleCta.href = bundle.ctaUrl;
              bundleCta.textContent = 'Add ' + bundle.name + ' to Cart';
            }
          }
        });
      });
    } catch (e) {
      console.error('Error parsing bundle data:', e);
    }
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMessage = document.getElementById('newsletter-message');
  const newsletterEmail = document.getElementById('newsletter-email');

  if (newsletterForm && newsletterMessage) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = newsletterEmail.value.trim();
      
      // Clear previous messages
      newsletterMessage.classList.add('hidden');
      newsletterMessage.className = 'mt-6 p-4 rounded-btn font-bold';
      
      // Simple validation
      if (!email || !email.includes('@')) {
        newsletterMessage.classList.add('bg-red-500', 'text-white');
        newsletterMessage.textContent = 'Please enter a valid email address.';
        newsletterMessage.classList.remove('hidden');
        
        setTimeout(() => {
          newsletterMessage.classList.add('hidden');
        }, 5000);
        return;
      }

      // In a real Shopify implementation, you would:
      // 1. Use the Customer API to subscribe
      // 2. Or integrate with Klaviyo/Mailchimp
      // For now, simulate success
      setTimeout(() => {
        newsletterMessage.classList.add('bg-sloe-primary', 'text-sloe-text-on-primary');
        newsletterMessage.textContent = `Success! You're on the list for exclusive workouts, ${email}.`;
        newsletterMessage.classList.remove('hidden');
        newsletterEmail.value = '';
        
        setTimeout(() => {
          newsletterMessage.classList.add('hidden');
        }, 5000);
      }, 500);
    });
  }
});
