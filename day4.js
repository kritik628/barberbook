const services = [
  { id: 1, name: "Haircut", price: 300, durationMin: 30 },
  { id: 2, name: "Beard trim", price: 150, durationMin: 15 },
  { id: 3, name: "Haircut + beard", price: 400, durationMin: 45 },
];

const barbers = [
  { id: 1, name: "Ravi", available: true, services: [1, 2, 3] },
  { id: 2, name: "Imran", available: false, services: [1, 3] },
  { id: 3, name: "Aman", available: true, services: [1, 2] },
];


const findService = (id) => services.find((s) => s.id === id);


const availableBarbers = barbers.filter((b) => b.available);


const barbersFor = (serviceId) =>
  barbers.filter((b) => b.available && b.services.includes(serviceId));


const menu = services.map((s) => `${s.name} - ₹${s.price} (${s.durationMin} min)`);


const totalMenuValue = services.reduce((sum, s) => sum + s.price, 0);


const calculateBooking = (serviceIds) => {
  const chosen = serviceIds.map(findService);
  if (chosen.includes(undefined)) {
    return { error: "Unknown service" };
  }
  const totalPrice = chosen.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = chosen.reduce((sum, s) => sum + s.durationMin, 0);
  return { totalPrice, totalDuration };
};


const { name, price } = findService(1);
const newBarber = { ...barbers[0], id: 4, name: "Karan" };
const allBarbers = [...barbers, newBarber];


const sum = (...nums) => nums.reduce((a, b) => a + b, 0);

console.log("Available:", availableBarbers.map((b) => b.name));
console.log("Barbers for beard trim:", barbersFor(2).map((b) => b.name));
console.log(menu);
console.log("Menu value:", totalMenuValue);
console.log(calculateBooking([1, 2]));
console.log(calculateBooking([1, 99]));
console.log(name, price);
console.log("Original count:", barbers.length, "New count:", allBarbers.length);
console.log(sum(1, 2, 3, 4));