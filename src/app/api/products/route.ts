import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");
  try {
    const produts = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });
    return new NextResponse(JSON.stringify(produts), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: `Error: ${error}`,
      }),
      { status: 500 }
    );
  }
};
