import { Form, Link, useNavigation, useActionData } from "react-router-dom";

import classes from "./Auth.module.css";

function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const loginResponse = useActionData() as string;

  return (
    <div className={classes.container}>
      <Form method="post">
        <div className={classes.input_block}>
          <div>
            <label htmlFor="username">Enter a username</label>
          </div>
          <input id="username" name="username" type="text" required />
        </div>

        <div className={classes.input_block}>
          <div>
            <label htmlFor="password">Enter a password</label>
          </div>
          <input id="password" name="password" type="password" required />
        </div>

        <div className={classes.actions}>
          <Link to="?mode=register">Go to register</Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </div>
      </Form>
      <p className={classes.register_error}>{loginResponse}</p>
    </div>
  );
}

export default Login;
