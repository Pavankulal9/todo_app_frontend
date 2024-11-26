import Loading from "./Loading";
import useVerifyRefreshToken from "../hooks/useVerifyRefreshToken";

const PersistLogin = ({ children }) => {
  const refreshToken = useVerifyRefreshToken();

  return <>{refreshToken ? <Loading /> : <>{children}</>}</>;
};

export default PersistLogin;
