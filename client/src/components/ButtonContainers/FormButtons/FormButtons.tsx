import "./FormButtonsStyle.scss";

import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";

export function FormButtons() {
  return (
    <div className="form_container flex">
      <form className="form flex">
        <Button text="Join" width="150px" fontSize="1.5rem" onClick={() => {}} />
        <Input width="150px" />
        <Button text="Create" width="320px" fontSize="1.5rem" onClick={() => {}} />
      </form>
    </div>
  );
}
