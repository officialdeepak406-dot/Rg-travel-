/* RG Tempo Traveller - shared INR/USD price display
 *
 * Add the currency switch HTML to each vehicle page:
 * <div class="rg-currency-switch" data-rg-currency-switch role="group" aria-label="Choose price currency">
 *   <button type="button" data-currency="INR" aria-pressed="true">₹ INR</button>
 *   <button type="button" data-currency="USD" aria-pressed="false">$ USD</button>
 * </div>
 *
 * Mark each price with its INR value, for example:
 * <strong data-rg-price data-inr="2200">₹2,200</strong>
 * For per-km prices, wrap just the amount:
 * <strong><span data-rg-price data-inr="21">₹21</span> / km</strong>
 *
 * Set USD_RATE to the exchange rate you want to display. This is an
 * illustrative/manual rate, not a live exchange-rate feed.
 */
(function () {
  "use strict";

  const USD_RATE = 0.011; // Example: ₹1 ≈ US$0.011. Update when needed.
  const STORAGE_KEY = "rgTempoCurrency";

  function formatPrice(inr, currency) {
    if (currency === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(inr * USD_RATE);
    }

    return "₹" + new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0
    }).format(inr);
  }

  function setCurrency(currency) {
    if (currency !== "INR" && currency !== "USD") currency = "INR";

    document.querySelectorAll("[data-rg-currency-switch]").forEach(function (group) {
      group.querySelectorAll("[data-currency]").forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.currency === currency));
      });
    });

    document.querySelectorAll("[data-rg-price][data-inr]").forEach(function (element) {
      const inr = Number(element.dataset.inr);
      if (!Number.isFinite(inr)) return;

      element.textContent = formatPrice(inr, currency);
      element.dataset.displayCurrency = currency;
    });

    try {
      window.localStorage.setItem(STORAGE_KEY, currency);
    } catch (error) {
      // Currency display still works when browser storage is unavailable.
    }
  }

  document.addEventListener("click", function (event) {
    const button = event.target.closest("[data-rg-currency-switch] [data-currency]");
    if (!button) return;
    setCurrency(button.dataset.currency);
  });

  function init() {
    let savedCurrency = "INR";
    try {
      savedCurrency = window.localStorage.getItem(STORAGE_KEY) || "INR";
    } catch (error) {
      // Use INR as the default if storage is unavailable.
    }
    setCurrency(savedCurrency);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
