import { NextResponse } from "next/server";
import rentalData from "@/data/rental-fleet.json";

export async function GET() {
  return NextResponse.json(rentalData);
}
