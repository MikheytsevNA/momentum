import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>404 Page not found.</p>
    </div>
  );
}
