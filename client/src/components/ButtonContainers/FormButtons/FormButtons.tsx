import "./FormButtonsStyle.scss";

import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";

export function FormButtons() {
  return (
    <div className="form_container flex">
      <form className="form flex">
        <Button text="Join" width="130px" fontSize="1rem" onClick={() => {}} />
        <Input width="130px" />
        <Button text="Create" width="280px" fontSize="1rem" onClick={() => {}} />
      </form>
    </div>
  );
}
