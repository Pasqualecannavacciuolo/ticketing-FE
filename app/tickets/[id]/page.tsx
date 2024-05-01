"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { getTicketDetails } from "@/lib/ticketsAPICalls";

import { convertUnixToEpoch } from "@/lib/utils";

interface IParams {
  id: string;
}

interface ITicket {
  _id?: string;
  title: string;
  description: string;
  status: string;
  timestamp: string;
  attachments?: {
    filename: string;
    data: Buffer;
  }[];
}

export default function TicketDetails({ params }: { params: IParams }) {
  const { id } = params;

  const [ticket, setTicket] = useState<ITicket>({
    title: "",
    description: "",
    status: "",
    timestamp: "",
  });

  const [status, setStatus] = useState("");
  const handleStatusChange = (newStatus: string) => {
    console.log(newStatus);
    setStatus(newStatus);
  };

  const [unixTimestamp, setUnixTimestamp] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setStatus(ticket.status);
    if (ticket.timestamp) {
      setUnixTimestamp(convertUnixToEpoch(ticket.timestamp));
    }
  }, [ticket.status, ticket.timestamp]);

  // Function to fetch the tickets data from the API
  const fetchData = async () => {
    try {
      const response = await getTicketDetails(id);
      setTicket(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Setting the style of the badge based on the status text
  let backgroundColor = "";
  let color = "";
  switch (ticket.status) {
    case "completed":
      backgroundColor = "#A6FFA1"; // Colore di sfondo per lo stato completed
      color = "#222";
      break;
    case "working":
      backgroundColor = "#FFDEA1"; // Colore di sfondo per lo stato working
      color = "#222";
      break;
    case "pending":
      backgroundColor = "#C6C2C2"; // Colore di sfondo per lo stato pending
      color = "#222";
      break;
    case "canceled":
      backgroundColor = "#FFA5A1"; // Colore di sfondo per lo stato completed
      color = "#222";
      break;
    default:
      backgroundColor = "transparent"; // Colore di sfondo predefinito
  }

  // Converting Buffer Data in a base65 string for the image
  let images: string[] = [];

  if (ticket.attachments) {
    if (ticket.attachments[0]?.data) {
      ticket.attachments.forEach((element) => {
        let base64data =
          "data:image/jpeg;base64," +
          Buffer.from(element.data, "base64").toString("base64");
        images.push(base64data);
      });
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-12 lg:p-24">
      <div className="container mx-auto py-6 sm:py-10">
        <h1 className="scroll-m-20 text-md sm:text-4xl lg:text-5xl font-extrabold tracking-tight w-full">
          {ticket.title}
        </h1>
        <p className="text-zinc-500 my-3 sm:my-5">{unixTimestamp}</p>
        <div className="flex flex-row">
          {/* TICKET STATUS */}
          <Badge
            className="capitalize mb-3 sm:mb-5"
            variant="default"
            style={{ backgroundColor, color }}
          >
            {ticket.status}
          </Badge>

          {/* SELECTION TO CHANGE TICKET STATUS */}
          <Select onValueChange={(newValue) => handleStatusChange(newValue)}>
            <SelectTrigger className="w-[180px] h-[30px] mb-3 sm:mb-5 mx-5 sm:mx-5">
              <SelectValue className="capitalize" placeholder="Change status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="capitalize">{status}</SelectLabel>
                <SelectItem className="capitalize" value="Working">
                  Working
                </SelectItem>
                <SelectItem className="capitalize" value="Completed">
                  Completed
                </SelectItem>
                <SelectItem className="capitalize" value="Canceled">
                  Canceled
                </SelectItem>
                <SelectItem className="capitalize" value="Pending">
                  Pending
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* SHOWING THE IMAGE ONLY IF IT IS PRESENT IN THE TICKET */}
        {images.length > 0 && (
          <PhotoProvider>
            <h3 className="my-1 sm:my-3 scroll-m-20 text-2xl font-semibold tracking-tight">
              Attachments
            </h3>
            <div style={{ display: "flex" }}>
              {images.map((base64data, index) => (
                <div
                  key={index}
                  style={{
                    marginRight: "10px",
                    width: "100px",
                    height: "100px",
                    overflow: "hidden",
                  }}
                >
                  <PhotoView src={base64data}>
                    <Image
                      width={100}
                      height={100}
                      src={base64data}
                      alt={`attachment image ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      className="cursor-pointer hover:cursor-pointer"
                    />
                  </PhotoView>
                </div>
              ))}
            </div>
          </PhotoProvider>
        )}

        <h3 className="mt-3 sm:mt-5 scroll-m-20 text-2xl font-semibold tracking-tight">
          Ticket description
        </h3>
        <p className="w-full sm:w-98 mt-1 sm:mt-3">{ticket.description}</p>
      </div>
    </main>
  );
}
