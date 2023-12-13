import React from "react";
import Button from "../../ui/Button";

export default function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  return (
    <div className="md:1 flex items-center gap-1 md:gap-3">
      <Button type="round">-</Button>
      <span className="gap-2 text-sm font-medium md:gap-3">
        {currentQuantity}
      </span>
      <Button type="round">+</Button>
    </div>
  );
}
