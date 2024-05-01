export async function getTicketDetails(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`);
    const ticket = await res.json();
    return ticket;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Errore durante il recupero dei dettagli del ticket:",
        error.message
      );
      throw error; // Opzionale: puoi gestire l'errore qui o lanciarlo per gestirlo altrove
    }
  }
}
