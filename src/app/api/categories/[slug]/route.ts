import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  const session = await getAuthSession();

  if (session?.user.isAdmin) {
    try {
      await prisma.category.delete({
        where: {
          slug,
        },
      });
      return new NextResponse(JSON.stringify("Category has been deleted"), {
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
