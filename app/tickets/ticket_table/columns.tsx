"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
/*import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";*/

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Eye } from "lucide-react";
import { convertUnixToEpoch } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Ticket = {
  _id: string;
  status: "pending" | "working" | "completed" | "canceled";
  title: string;
  description: string;
  timestamp: string;
};

export const columns: ColumnDef<Ticket>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let backgroundColor = "";
      let color = "";
      switch (row.getValue("status")) {
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

      return (
        <Badge
          className="capitalize"
          variant="default"
          style={{ backgroundColor, color }}
        >
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize w-48">
        {convertUnixToEpoch(row.getValue("timestamp"))}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize w-64">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const description: string = row.getValue("description");
      const maxWords = 10; // Numero massimo di parole da visualizzare

      // Funzione per troncare la descrizione
      const truncateDescription = (text: string, limit: number) => {
        const words = text.split(" ");
        if (words.length > limit) {
          return words.slice(0, limit).join(" ") + "...";
        }
        return text;
      };

      return (
        <div className="w-96">{truncateDescription(description, maxWords)}</div>
      );
    },
  },
  /*{
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },*/

  /*{
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(ticket._id)}
            >
              Copy ticket ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },*/
  {
    id: "view",
    enableHiding: false,
    cell: ({ row }) => {
      const ticketID = (row.original as Ticket)._id;

      return (
        <Button>
          <Eye className="mr-2 h-4 w-4" />
          <Link href={`tickets/${ticketID}`}>Go to ticket details</Link>
        </Button>
      );
    },
  },
];
