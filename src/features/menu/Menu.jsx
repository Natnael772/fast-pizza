import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  return <></>;
}

//render as you fetch strategy
//rendering and fetching happens at the same time here
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
