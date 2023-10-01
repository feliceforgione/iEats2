import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const produt = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return new NextResponse(JSON.stringify(produt), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: `Error: ${error}`,
      }),
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const session = await getAuthSession();

  if (session?.user.isAdmin) {
    try {
      await prisma.product.delete({
        where: {
          id,
        },
      });
      return new NextResponse(JSON.stringify("Product has been deleted"), {
        status: 200,
      });
    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          message: `Error: ${error}`,
        }),
        { status: 500 }
      );
    }
  }
  return new NextResponse(
    JSON.stringify({
      message: `Not authorized`,
    }),
    { status: 403 }
  );
};
