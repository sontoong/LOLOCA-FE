import { useNavigate } from "react-router-dom";

export function useProtectedAction() {
  const navigate = useNavigate();

  function executeOrRedirect(props: handleNavigateProps) {
    const { action, fallbackUrl, testValue } = props;
    if (testValue) {
      action();
    } else {
      navigate(`${fallbackUrl}`);
    }
  }

  return { executeOrRedirect };
}

type handleNavigateProps = {
  action: () => void;
  fallbackUrl: string;
  testValue: boolean;
};
