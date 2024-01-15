import { type ReactNode } from "react";
import Register from "../components/Register.tsx";
import Login from "../components/Login.tsx";
import { checkFieldForError, saveAuthToken } from "../util/Methods.ts";
import { useSearchParams, json, redirect } from "react-router-dom";
import {
  type LoginAccountRequest,
  type RegisterAccountRequest,
} from "../remote/request-types.ts";
import { saveUserData } from "../util/Methods.ts";
import { UserData } from "../util/Types.ts";

function AuthenticationPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  let content: ReactNode;

  if (mode === "login") {
    content = <Login />;
  } else {
    content = <Register />;
  }

  return <>{content}</>;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
    city: data.get("city"),
    email: data.get("email"),
  };

  let response: Response;
  if (mode === "login") {
    const loginRequest: LoginAccountRequest = {
      username: authData.username,
      password: authData.password,
    };

    response = await fetch("http://localhost:3000/loginAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginRequest),
    });

    let parsedResponse: {
      userData: UserData;
      authToken: string;
    } = await response.json();
    if (typeof parsedResponse === "object") {
      saveUserData(parsedResponse.userData);
      saveAuthToken(parsedResponse.authToken);
      console.log(`Recieved jwt is ${parsedResponse.authToken}`);
      return redirect("/");
    }

    return json(parsedResponse);
  } else {
    const registerRequest: RegisterAccountRequest = {
      username: authData.username,
      password: authData.password,
      city: authData.city,
      email: authData.email,
    };

    const validationErrors = {
      status: "form-errors",
      username:
        checkFieldForError("username", authData.username) !== "" ? true : false,
      password:
        checkFieldForError("password", authData.password) !== "" ? true : false,
      confirmPassword:
        checkFieldForError(
          "confirmPassword",
          authData.password,
          authData.confirmPassword
        ) !== ""
          ? true
          : false,
      city: checkFieldForError("city", authData.city) !== "" ? true : false,
      email: checkFieldForError("email", authData.email) !== "" ? true : false,
    };

    if (Object.values(validationErrors).find((v) => v === true)) {
      return json(validationErrors);
    }

    response = await fetch("http://localhost:3000/registerAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerRequest),
    });

    const parsedResponse = await response.text();
    if (response.ok) return json({ success: true, message: parsedResponse });
    if (!response.ok) return json({ success: false, message: parsedResponse });
  }
}
