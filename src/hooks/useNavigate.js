import { useNavigate as _useNavigate } from "react-router-dom";

const useNavigate = () => {
  const navigate = _useNavigate();

  return {
    goHome: () => navigate("/"),
    goTest: () => navigate("/test"),
  };
};
export default useNavigate;
