import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  //useRouteError returns anything thrown during an action, loader, or rendering.
  const error = useRouteError();
  console.log(error.message);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
