import { useContext } from "react";
import AppContext from "../AppContext";

const PageRegister = () => {
  const { siteStatus, toggleStatus } = useContext(AppContext);

  return (
    <div>
      <p>This is the Registration Page </p>
      <p>
        The current status is: <span className="highlight">{siteStatus}</span>
      </p>
    </div>
  );
};

export default PageRegister;
