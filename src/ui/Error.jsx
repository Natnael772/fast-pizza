import { useNavigate, useRouteError } from "react-router-dom";
import Button from "./Button";
import LinkButton from "./LinkButton";

function Error() {
  const navigate = useNavigate();

  //useRouteError returns anything thrown during an action, loader, or rendering.
  const error = useRouteError();
  console.log(error.message);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      {/* <button onClick={() => navigate(-1)}>&larr; Go back</button> */}

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
