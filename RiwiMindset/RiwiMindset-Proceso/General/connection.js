// Envia el nuevo evento al servidor
export const response = await fetch("http://localhost:4002/events", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newEvent),
});