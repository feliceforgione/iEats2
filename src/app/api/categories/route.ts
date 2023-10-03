import prisma from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: `Error: ${error}`,
      }),
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const category = await prisma.category.create({
      data: body,
    });
    return new NextResponse(JSON.stringify(category), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        message: `Error: ${error}`,
      }),
      { status: 500 }
    );
  }
};
