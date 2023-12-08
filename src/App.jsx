import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

// createBrowserRouter is used for data fetching/loading with react router
const router = createBrowserRouter([
  {
    //Parent(layout) route
    element: <AppLayout />,

    //error element to display when there is error (e.g fetching data or unknown path)
    errorElement: <Error />,

    //child(nested) routes of applayout..
    //those cocmponents will be rendered inside applayout outlet component
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,

        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,

        errorElement: <Error />,
      },
    ],
  },
]);

// old way - we can't use it to load data or submit data to forms
// <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Home />}></Route>
//     </Routes>
//   </BrowserRouter>
function App() {
  return <RouterProvider router={router}> </RouterProvider>;
}

export default App;
