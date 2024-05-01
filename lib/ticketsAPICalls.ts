interface ITicket {
  _id?: string;
  threadID: string;
  title: string;
  description: string;
  status: string;
  timestamp: string;
  attachments?: {
    filename: string;
    data: Buffer;
  };
}

export async function getTicketDetails(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      cache: "no-store",
    });
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

export async function getTicketsByThread(threadid: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/tickets/bythread/${threadid}`,
      {
        cache: "no-store",
      }
    );
    const tickets: ITicket[] = await res.json();
    return tickets;
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
