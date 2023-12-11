import { Link } from "react-router-dom";
// div  text-stone-200

function CartOverview() {
  return (
    <div className="flex items-center justify-between gap-10 bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6 md:text-base ">
        {/* <p className="space-x-4 font-semibold text-orange-900 sm:text-green-500  md:text-yellow-500 lg:text-red-500"> */}
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      {/* <a href="#">Open cart &rarr;</a> */}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
