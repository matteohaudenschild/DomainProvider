const form = document.getElementById("domain-form");
const input = document.getElementById("domain-input");
const planSelect = document.getElementById("plan-select");
const result = document.getElementById("search-result");

const takenDomains = new Set([
  "beispiel.de",
  "meinedomain.de",
  "startup.io",
  "designstudio.com",
  "agentur.de",
]);

const planDetails = {
  basic: { name: "Starter", price: "4,90 €" },
  growth: { name: "Growth", price: "9,90 €" },
  premium: { name: "Premium", price: "19,90 €" },
};

const normalizeDomain = (value) => value.trim().toLowerCase();

const renderResult = (content, status) => {
  result.classList.remove("success", "error");
  if (status) {
    result.classList.add(status);
  }
  result.innerHTML = content;
};

const isValidDomain = (value) => /^(?!-)[a-z0-9-]{2,63}(?<!-)\.[a-z]{2,}$/.test(value);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const domain = normalizeDomain(input.value);
  const plan = planDetails[planSelect.value];

  if (!isValidDomain(domain)) {
    renderResult(
      `<strong>Bitte gib eine gültige Domain ein.</strong><p>Beispiel: meineidee.de</p>`,
      "error"
    );
    return;
  }

  if (takenDomains.has(domain)) {
    renderResult(
      `<strong>${domain} ist leider schon vergeben.</strong>
       <p>Wir können ähnliche Domains reservieren oder andere TLDs prüfen.</p>`,
      "error"
    );
    return;
  }

  renderResult(
    `<strong>${domain} ist verfügbar!</strong>
     <p>Monatlicher Preis im Paket <strong>${plan.name}</strong>: ${plan.price} / Monat.</p>
     <button class="primary">Jetzt verkaufen</button>`,
    "success"
  );
});

renderResult(
  "Gib eine Domain ein, um die Verfügbarkeit zu prüfen und einen monatlichen Preis zu erhalten.",
  null
);
