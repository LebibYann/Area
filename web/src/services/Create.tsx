import { useEffect, useState } from "react";
import { useLogin} from "../utils";
import ServicesList from "./ServicesList";

const Create = (): JSX.Element => {
  const isLogged = useLogin();
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (!isLogged) {
      window.location.replace("/login");
    }
  });

  const updateDisplay = () => {
    setDisplay(!display);
  };

  return (
    <section>
      {!display ? (
        <section>
          <section onClick={() => updateDisplay()}>
            <span>If this</span>
            <button>Add</button>
          </section>
          <div></div>
          <div></div>
          <section onClick={() => updateDisplay()}>
            <span>Then that</span>
            <button>Add</button>
          </section>
        </section>
      ) : (
        <ServicesList />
      )}
    </section>
  );
};

export default Create;
