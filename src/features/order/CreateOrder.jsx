import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
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
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  console.log(navigation.state);

  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    // <Form method="POST" action="/order/new">
    <Form method="POST">
      <div>
        <h2>Ready to order? Let's go!</h2>
        <label>First Name</label>
        <input type="text" name="customer" required />
      </div>

      <div>
        <label>Phone number</label>
        <div>
          <input type="tel" name="phone" required />
        </div>
        {formErrors?.phone && <p>{formErrors.phone}</p>}
      </div>

      <div>
        <label>Address</label>
        <div>
          <input type="text" name="address" required />
        </div>
      </div>

      <div>
        <input
          type="checkbox"
          name="priority"
          id="priority"
          // value={withPriority}
          // onChange={(e) => setWithPriority(e.target.checked)}
        />
        <label htmlFor="priority">Want to yo give your order priority?</label>
      </div>

      <div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <button disabled={isSubmitting}>
          {isSubmitting ? "Placing order..." : "Order now"}
        </button>
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
    priority: data.priority === "on",
  };

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;