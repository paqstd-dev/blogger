import { Triangle } from "react-loader-spinner";

export default function Loading({ fullpage = true }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: fullpage && "100vh" }}
    >
      <Triangle height="300" width="300" color="black" ariaLabel="loading" />
    </div>
  );
}
