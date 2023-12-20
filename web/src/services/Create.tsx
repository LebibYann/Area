import { useEffect, useState } from "react";
import { useLogin} from "../utils";
import ServicesList from "./ServicesList";
import "./Create.css"
import '../components/Button.css';


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
    <section className="create-container">
      {!display ? (
        <section className="menu-container">
          <h1 className="title">Create</h1>
          <section onClick={() => updateDisplay()} className="area-container">
            <span>If this</span>
          </section>
          <div className="separator"></div>
          <div className="separator"></div>
          <section onClick={() => updateDisplay()} className="area-container">
            <span>Then that</span>
          </section>
        </section>
      ) : (
        <section className="services-container">
          <button onClick={() => updateDisplay()} className="button white-button border">Back</button>
          <ServicesList />
        </section>
      )}
    </section>
  );
};

export default Create;
