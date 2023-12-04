import { useRef, useState, useEffect } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { checkFieldForError } from "../util/Methods.ts";

import classes from "./Auth.module.css";

type FieldEdits = {
  username: boolean;
  password: boolean;
  confirmPassword: boolean;
  city: boolean;
  email: boolean;
};

const initialEditState: FieldEdits = {
  username: false,
  password: false,
  confirmPassword: false,
  city: false,
  email: false,
};

function Register() {
  const [fieldEdits, setFieldEdits] = useState<FieldEdits>(initialEditState);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const actionData: any = useActionData();

  const isSubmitting = navigation.state === "submitting";
  const formErrors = actionData && actionData.status;
  const registerResponse = formErrors
    ? undefined
    : (actionData as { success: boolean; message: string });

  useEffect(() => {
    if (registerResponse && registerResponse.success) {
      form.current?.reset();
      setFieldEdits({
        username: false,
        password: false,
        confirmPassword: false,
        city: false,
        email: false,
      });
    }
  }, [registerResponse]);

  if (formErrors && !Object.values(fieldEdits).find((v) => v === true)) {
    setFieldEdits({
      ...(actionData as FieldEdits),
    });
  }

  function handleFieldEdit(field: string, didEdit: boolean) {
    setFieldEdits((curFields) => {
      return {
        ...curFields,
        [field]: didEdit,
      };
    });
  }

  return (
    <div className={classes.container}>
      <Form ref={form} method="post">
        <div className={classes.input_block}>
          <div>
            <label htmlFor="username">Enter a username</label>
          </div>
          <input
            ref={username}
            id="username"
            name="username"
            type="text"
            onFocus={() => handleFieldEdit("username", false)}
            onBlur={() => handleFieldEdit("username", true)}
          />
          {fieldEdits.username && (
            <p className={classes.error}>
              {checkFieldForError("username", username.current!.value)}
            </p>
          )}
        </div>

        <div className={classes.input_block}>
          <div>
            <label htmlFor="password">Enter a password</label>
          </div>
          <input
            ref={password}
            id="password"
            name="password"
            type="password"
            onFocus={() => handleFieldEdit("password", false)}
            onBlur={() => handleFieldEdit("password", true)}
          />
          {fieldEdits.password && (
            <p className={classes.error}>
              {checkFieldForError("password", password.current!.value)}
            </p>
          )}
        </div>

        <div className={classes.input_block}>
          <div>
            <label htmlFor="confirmPassword">Confirm your password</label>
          </div>
          <input
            ref={confirmPassword}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onFocus={() => handleFieldEdit("confirmPassword", false)}
            onBlur={() => handleFieldEdit("confirmPassword", true)}
          />
          {fieldEdits.confirmPassword && (
            <p className={classes.error}>
              {checkFieldForError(
                "confirmPassword",
                confirmPassword.current!.value,
                password.current!.value
              )}
            </p>
          )}
        </div>

        <div className={classes.input_block}>
          <div>
            <label htmlFor="city">Enter your city</label>
          </div>
          <input
            ref={city}
            id="city"
            name="city"
            type="text"
            onFocus={() => handleFieldEdit("city", false)}
            onBlur={() => handleFieldEdit("city", true)}
          />
          {fieldEdits.city && (
            <p className={classes.error}>
              {checkFieldForError("city", city.current!.value)}
            </p>
          )}
        </div>

        <div className={classes.input_block}>
          <div>
            <label htmlFor="email">Enter your email</label>
          </div>
          <input
            ref={email}
            id="email"
            name="email"
            type="text"
            onFocus={() => handleFieldEdit("email", false)}
            onBlur={() => handleFieldEdit("email", true)}
          />
          {fieldEdits.email && (
            <p className={classes.error}>
              {checkFieldForError("email", email.current!.value)}
            </p>
          )}
        </div>

        <div className={classes.actions}>
          <Link to="?mode=login">Go to login</Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register account"}
          </button>
        </div>
      </Form>
      {registerResponse && (
        <p
          className={
            registerResponse.success
              ? classes.register_success
              : classes.register_error
          }
        >
          {registerResponse.message}
        </p>
      )}
    </div>
  );
}

export default Register;
