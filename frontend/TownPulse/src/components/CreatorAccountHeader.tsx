import { Form, useActionData } from "react-router-dom";
import { AccountType } from "../util/Types";
import classes from "./CreatorAccount.module.css";
import { BasicResponse } from "../remote/response-types";
import { ReactNode } from "react";

type CreatorAccountHeaderProps = {
  accountType: AccountType;
  city: string;
};

function CreatorAccountHeader({
  accountType,
  city,
}: CreatorAccountHeaderProps) {
  const actionResponse = useActionData() as BasicResponse<string>;

  let mainContent: ReactNode;

  if (accountType === AccountType.TOWN_HALL) {
    mainContent = (
      <div className={classes.container}>
        <h2 className={classes.creatorAccH3}>
          In calitate de reprezentat al primariei orasului {city},puteti accepta
          cererile institutiilor si companiilor care doresc sa obtina cont de
          creator pentru orasul dumnevoastra
        </h2>
      </div>
    );
  } else {
    mainContent = (
      <div className={classes.container}>
        <h3 >
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
            <button className={classes.aplicabuton}>Aplica</button>
          </Form>
        ) : (
          <button style={{height:'40px',marginLeft:'700px'}}className={classes.aplicabuton} disabled>Esti deja creator</button>
        )}
      </div>
    );
  }

  return (
    <>
      {mainContent}
      {actionResponse && (
        <div
          className={`${classes.result} ${
            actionResponse.status ? classes.success : classes.error
          }`}
        >
          <p>{actionResponse.data}</p>
        </div>
      )}
      <hr className={classes.divider} />
    </>
  );
}

export default CreatorAccountHeader;
