"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

type Props = {
  id: string;
  type: "products" | "categories";
};

const DeleteButton = ({ id, type }: Props) => {
  const { data, status } = useSession();
  const router = useRouter();

  if (
    status === "loading" ||
    status === "unauthenticated" ||
    !data?.user.isAdmin
  )
    return " ";

  function handleConfirmation() {
    confirmAlert({
      title: "Confirm to submit",
      message: `Are you sure you want to delete ${type} page?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(),
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  }

  async function handleDelete() {
    const resp = await fetch(
      `http://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/${type}/${id}`,
      {
        method: "DELETE",
      }
    );

    if (resp.status == 200) {
      router.push("/menu");
      toast.success(`${type} Page deleted`);
    } else {
      const data = await resp.json();
      toast.error(data.message);
    }
  }

  return (
    <div
      className="flex  items-center justify-center gap-2 text-red-800 font-bold md:justify-end cursor-pointer "
      onClick={handleConfirmation}
    >
      <RiDeleteBin2Fill />
      <span>{`Delete ${type} Page`}</span>
    </div>
  );
};

export default DeleteButton;
