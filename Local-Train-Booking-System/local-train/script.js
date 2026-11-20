// Local Train Booking System - Core Utilities & Booking Logic

const STATIONS = ["Raipur", "Durg", "Bilaspur", "Raigarh", "Antagarh"];

const TRAIN_ROUTES = [
  { name: "Durg - Raipur Express", route: ["Durg", "Raipur"] },
  { name: "Bilaspur Intercity Express", route: ["Raipur", "Bilaspur"] },
  { name: "Chhattisgarh Passenger", route: ["Durg", "Raipur", "Bilaspur", "Raigarh"] },
  { name: "Antagarh Special Express", route: ["Antagarh", "Durg", "Raipur"] },
  { name: "South East Central Express", route: ["Antagarh", "Durg", "Raipur", "Bilaspur", "Raigarh"] }
];

function findTrain(source, destination) {
  if (!source || !destination) return null;
  const src = source.trim().toLowerCase();
  const dest = destination.trim().toLowerCase();

  // Find a specific route match if available
  const matched = TRAIN_ROUTES.find(t => {
    const lowerRoute = t.route.map(s => s.toLowerCase());
    const srcIdx = lowerRoute.indexOf(src);
    const destIdx = lowerRoute.indexOf(dest);
    return srcIdx !== -1 && destIdx !== -1 && srcIdx !== destIdx;
  });

  if (matched) return matched;

  // Fallback train for any valid pair in STATIONS
  const validSource = STATIONS.some(s => s.toLowerCase() === src);
  const validDest = STATIONS.some(s => s.toLowerCase() === dest);
  if (validSource && validDest && src !== dest) {
    return { name: "Local Passenger Express" };
  }
  return null;
}

function generateSeatNumber() {
  const coaches = ["S1", "S2", "S3", "S4", "D1", "D2"];
  const coach = coaches[Math.floor(Math.random() * coaches.length)];
  const seatNum = Math.floor(Math.random() * 72) + 1;
  return `${coach}-${seatNum}`;
}

function generateTicketNumber() {
  return "TCK" + Math.floor(100000 + Math.random() * 900000).toString();
}

function showFormError(message) {
  alert(message);
}

function validateBooking({ source, destination, date, passengerName }) {
  if (!source || !destination) {
    return "Please enter both source and destination stations.";
  }

  const normalizedSource = STATIONS.find(s => s.toLowerCase() === source.trim().toLowerCase());
  const normalizedDest = STATIONS.find(s => s.toLowerCase() === destination.trim().toLowerCase());

  if (!normalizedSource || !normalizedDest) {
    return `Invalid station entered. Available stations are: ${STATIONS.join(", ")}`;
  }

  if (normalizedSource.toLowerCase() === normalizedDest.toLowerCase()) {
    return "Source and destination stations cannot be the same.";
  }

  if (!date) {
    return "Please select a travel date.";
  }

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  if (date < todayStr) {
    return "Travel date cannot be in the past.";
  }

  if (!passengerName || passengerName.trim().length < 2) {
    return "Please enter a valid passenger name (at least 2 characters).";
  }

  return null; // Valid
}

function handleBookingSubmit(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  const sourceInput = document.getElementById("source");
  const destinationInput = document.getElementById("destination");
  const dateInput = document.getElementById("date");
  const passengerNameInput = document.getElementById("passengerName");
  const passengerTypeEl = document.getElementById("passengerType");

  if (!sourceInput || !destinationInput || !dateInput || !passengerNameInput) {
    showFormError("Required form fields are missing from the page.");
    return false;
  }

  const source = sourceInput.value.trim();
  const destination = destinationInput.value.trim();
  const date = dateInput.value;
  const passengerName = passengerNameInput.value.trim();
  const passengerType = passengerTypeEl ? passengerTypeEl.value : "General";

  const error = validateBooking({ source, destination, date, passengerName });
  if (error) {
    showFormError(error);
    return false;
  }

  const train = findTrain(source, destination);
  if (!train) {
    showFormError("No trains run on that route. Please pick a different source/destination.");
    return false;
  }

  // Find canonical station names for display
  const canonicalSource = STATIONS.find(s => s.toLowerCase() === source.toLowerCase()) || source;
  const canonicalDest = STATIONS.find(s => s.toLowerCase() === destination.toLowerCase()) || destination;

  const bookingDetails = {
    source: canonicalSource,
    destination: canonicalDest,
    date,
    passengerName,
    passengerType,
    train: train.name,
    seatNumber: generateSeatNumber(),
    ticketNumber: generateTicketNumber(),
    bookingTime: new Date().toLocaleString()
  };

  localStorage.setItem("lastBooking", JSON.stringify(bookingDetails));

  // Also record in booking history
  try {
    const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    history.push(bookingDetails);
    localStorage.setItem("bookingHistory", JSON.stringify(history));
  } catch (err) {
    console.error("Failed to save booking history:", err);
  }

  window.location.href = "project_page4.html";
  return true;
}
