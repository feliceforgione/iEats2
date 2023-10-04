"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SALESTAXRATE: number = 0.08375;
const FREE_DELIVERY_CUTOFF: number = 25;
const DELIVERY_FEE: number = 5;

function CartPage() {
  const { products, removeFromCart, totalItems, totalPrice } = useCartStore();
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [checkoutTotal, setCheckoutTotal] = useState<number>(0);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setTaxAmount(Number(totalPrice) * Number(SALESTAXRATE));
    setCheckoutTotal(
      totalPrice >= FREE_DELIVERY_CUTOFF
        ? taxAmount + Number(totalPrice)
        : taxAmount + Number(totalPrice) + DELIVERY_FEE
    );
  }, [totalPrice, taxAmount]);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  async function handleCheckout() {
    if (!session) {
      router.push("/login");
    } else {
      try {
        const resp = await fetch(`http://localhost:3000/api/orders`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            userEmail: session.user.email,
            products,
            price: totalPrice,
            status: "Not Paid",
          }),
        });

        const data = await resp.json();
        router.push(`/pay/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row">
      {/* Cart Items */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:w-2/3 lg:h-full 2xl:w-1/2 lg:px-20 xl:px-30">
        {products.map((product) => (
          <div
            className="flex items-center justify-between mb-4 "
            key={product.id}
          >
            {product.img && (
              <Image src={product.img} alt="" width={100} height={100} />
            )}
            <div className="w-96">
              <h1 className="font-bold text-xl uppercase">
                {product.title} x{product.quantity}
              </h1>
              <span>{product.optionTitle}</span>
            </div>
            <h2 className="font-bold">{product.price}</h2>
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(product)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      {/* Payment Section */}
      <div className="flex flex-col justify-center gap-3 h-1/2 p-4 bg-orange-100 lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-30 2xl:text-xl 2xl:gap-5">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>${Number(totalPrice).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          {totalPrice >= FREE_DELIVERY_CUTOFF ? (
            <span className="text-green-600 font-bold">FREE</span>
          ) : (
            <span>${DELIVERY_FEE.toFixed(2)}</span>
          )}
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-bold">${checkoutTotal.toFixed(2)}</span>
        </div>
        <button
          className="bg-red-600 text-white p-3 rounded-lg"
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default CartPage;
