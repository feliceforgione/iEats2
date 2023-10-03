"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

type Props = {
  id: string;
  type: "products";
};

const DeleteButton = ({ id, type }: Props) => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") return;
  if (status === "unauthenticated" || !data?.user.isAdmin) return;

  async function handleDelete() {
    const resp = await fetch(
      `http://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/${type}/${id}`,
      {
        method: "DELETE",
      }
    );

    if (resp.status == 200) {
      router.push("/menu");
      toast.success("Product deleted");
    } else {
      const data = await resp.json();
      toast.error(data.message);
    }
  }

  return (
    <div
      className="flex absolute top-4 right-4 items-center justify-center gap-1 cursor-pointer text-red-700 font-bold "
      onClick={handleDelete}
    >
      <RiDeleteBin2Fill />
      <span>Delete</span>
    </div>
  );
};

export default DeleteButton;
