// Display-only data. The real price will always come from the backend.
const services = {
  haircut: { name: "Haircut", price: 300, durationMin: 30 },
  beard: { name: "Beard trim", price: 150, durationMin: 15 },
  combo: { name: "Haircut + beard", price: 400, durationMin: 45 },
};

const form = document.getElementById("booking-form");
const serviceSelect = document.getElementById("service");
const dateInput = document.getElementById("date");
const slotsBox = document.getElementById("slots");
const timeInput = document.getElementById("time");
const summary = document.getElementById("summary");
const message = document.getElementById("message");

// Simulates a server call: a Promise that settles after 800 ms
function fetchSlots(date) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!date) {
        reject(new Error("No date chosen"));
        return;
      }
      resolve(["10:00", "10:30", "11:00", "14:00", "16:30"]);
    }, 800);
  });
}

async function loadSlots() {
  timeInput.value = "";
  slotsBox.textContent = "Loading slots...";
  try {
    const slots = await fetchSlots(dateInput.value);
    slotsBox.innerHTML = "";
    slots.forEach((slot) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = slot;
      btn.addEventListener("click", () => {
        timeInput.value = slot;
        message.textContent = `Selected ${slot}`;
      });
      slotsBox.appendChild(btn);
    });
  } catch (err) {
    slotsBox.textContent = "Could not load slots: " + err.message;
  }
}

function updateSummary() {
  const s = services[serviceSelect.value];
  summary.textContent = s ? `${s.name}: ₹${s.price}, ${s.durationMin} min` : "";
}

serviceSelect.addEventListener("change", updateSummary);
dateInput.addEventListener("change", loadSlots);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!timeInput.value) {
    message.textContent = "Please pick a time slot.";
    return;
  }
  const booking = {
    service: serviceSelect.value,
    barber: form.elements["barber"].value,
    date: dateInput.value,
    time: timeInput.value,
  };
  console.log("Booking payload:", JSON.stringify(booking));
  message.textContent = "Booking prepared (not sent, no backend yet).";
});