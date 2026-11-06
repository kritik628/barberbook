const services = [
  { id: 1, name: "Haircut", price: 300, durationMin: 30 },
  { id: 2, name: "Beard trim", price: 150, durationMin: 15 },
  { id: 3, name: "Haircut + beard", price: 400, durationMin: 45 },
];

function findService(id) {
  for (let i = 0; i < services.length; i++) {
    if (services[i].id === id) {
      return services[i];
    }
  }
  return null;
}

function calculateBooking(serviceIds) {
  let totalPrice = 0;
  let totalDuration = 0;

  for (let i = 0; i < serviceIds.length; i++) {
    const service = findService(serviceIds[i]);
    if (service === null) {
      return { error: `Service ${serviceIds[i]} not found` };
    }
    totalPrice += service.price;
    totalDuration += service.durationMin;
  }

  return { totalPrice, totalDuration };
}

const result = calculateBooking([1, 2]);
console.log(result);
console.log(`Total: ₹${result.totalPrice} for ${result.totalDuration} minutes`);
console.log(calculateBooking([1, 99]));