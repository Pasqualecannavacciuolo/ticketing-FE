import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Funzione helper per convertire Unix Timestamp in Epoch
export function convertUnixToEpoch(unixTimestamp: string): string {
  const unixTime = parseInt(unixTimestamp);
  // Convert the timestamp to a Date object
  const date = new Date(unixTime); // Convert milliseconds to seconds

  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric", // 4-digit year
    month: "long", // Full name of the month
    day: "numeric", // Day of the month
    hour: "numeric", // Hour (24-hour clock)
    minute: "numeric", // Minute
    second: "numeric", // Second
    hour12: false, // Use 24-hour clock
  };

  // Format the date as needed
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
}

// Funzione per estrarre le immagini dall'array attachments
export function extractImagesFromAttachments(jsonData: any) {
  const images: any[] = [];
  let base64data: string = "data:image/jpeg;base64,";
  jsonData.attachments!.data.forEach(
    (
      attachment:
        | WithImplicitCoercion<string>
        | { [Symbol.toPrimitive](hint: "string"): string }
    ) => {
      base64data += Buffer.from(attachment, "base64").toString("base64");
      images.push(base64data);
    }
  );
  return images;
}
