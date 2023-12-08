import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  return (
    <div>
      <h1>Something went wrong 😢</h1>

      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
