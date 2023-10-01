"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") return;
  if (status === "unauthenticated" || !data?.user.isAdmin) return;

  async function handleDelete() {
    const resp = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });

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
      className="flex absolute top-4 right-4 items-center justify-center gap-1 cursor-pointer"
      onClick={handleDelete}
    >
      <RiDeleteBin2Fill />
      <span>Delete</span>
    </div>
  );
};

export default DeleteButton;
