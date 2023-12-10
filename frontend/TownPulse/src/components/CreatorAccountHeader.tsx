import { Form, useActionData } from "react-router-dom";
import { AccountType } from "../util/Types";
import classes from "./CreatorAccountHeader.module.css";
import { BasicResponse } from "../remote/response-types";

type CreatorAccountHeaderProps = {
  accountType: AccountType;
  city: string;
};

function CreatorAccountHeader({
  accountType,
  city,
}: CreatorAccountHeaderProps) {
  const creatorAccountResponse = useActionData() as BasicResponse<string>;

  if (accountType === AccountType.TOWN_HALL) {
    return (
      <div className={classes.container}>
        <h3>
          In calitate de reprezentat al primariei orasului {city},puteti accepta
          cererile institutiilor si companiilor care doresc sa obtina cont de
          creator pentru orasul dumnevoastra
        </h3>

        <hr className={classes.divider} />
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <h3>
          Puteti aplica pentru un cont de creator pentru orasul {city}
          <br />
          Ca si creator aveti dreptul de a posta eventimente pentru locatarii
          orasului dumneavoastra
          <br /> <br /> <br />
          Nota: Primaria orasului dumneavoastra poate accepta / refuza cererea
          dumneavoastra la libera alegere.
        </h3>

        {accountType === AccountType.NORMAL ? (
          <Form method="POST">
            <button>Aplica</button>
          </Form>
        ) : (
          <button disabled>Esti deja creator</button>
        )}

        {creatorAccountResponse && (
          <div
            className={`${classes.result} ${
              creatorAccountResponse.status ? classes.success : classes.error
            }`}
          >
            <p>{creatorAccountResponse.data}</p>
          </div>
        )}
        <hr className={classes.divider} />
      </div>
    );
  }
}

export default CreatorAccountHeader;
