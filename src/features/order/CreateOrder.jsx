import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  console.log(withPriority);

  const username = useSelector((state) => state.user.username);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  console.log(navigation.state);

  const formErrors = useActionData();

  // const cart = fakeCart;

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  console.log(totalPrice);

  if (!cart.length) return <EmptyCart />;

  return (
    // <Form method="POST" action="/order/new">
    <Form method="POST" className="mx-6">
      <div className="py-6">
        <h2 className="mb-8 text-xl font-semibold">
          Ready to order? Let's go!
        </h2>
      </div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">First Name</label>
        <div className="grow">
          <input
            type="text"
            name="customer"
            defaultValue={username}
            className="input w-full"
            required
          />
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Phone number</label>

        <div className="grow">
          <input type="tel" name="phone" className="input w-full" required />

          {formErrors?.phone && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Address</label>
        <div className="grow">
          <input type="text" name="address" className="input w-full" required />
        </div>
      </div>

      <div className="mb-12 flex items-center gap-5">
        <input
          type="checkbox"
          name="priority"
          id="priority"
          className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          value={withPriority}
          onChange={(e) => setWithPriority(e.target.checked)}
        />
        <label className="font-medium" htmlFor="priority">
          Want to give your order priority?
        </label>
      </div>

      <div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        {/* <button
          disabled={isSubmitting}
          className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
        >
          {isSubmitting ? "Placing order..." : "Order now"}
        </button> */}

        <Button type="primary" disabled={isSubmitting}>
          {isSubmitting
            ? "Placing order..."
            : `Order now from ${formatCurrency(totalPrice)}`}
        </Button>
      </div>
    </Form>
  );
}

export async function action({ request }) {
  //handle post request with no js(handleSubmit), only react router(it looks like the way html works)
  //without having to create states for the form datas
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data.cart);

  const errors = {};
  console.log(!isValidPhone(data.phone));

  if (!isValidPhone(data.phone))
    errors.phone =
      "Please give us your current phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  //create new order
  const newOrder = await createOrder(order);
  console.log(newOrder);

  // clear cart
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
