import { useDispatch, useSelector } from "react-redux";
import { verifyAuthTokenStore } from "./features/account";
import { useEffect } from "react";
import Loading from "./components/Loader";

export default function App({ children }) {
  const { loaded, authorized } = useSelector(({ account }) => account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAuthTokenStore());
  }, [authorized]);

  return !loaded ? <Loading /> : children;
}
