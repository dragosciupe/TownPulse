import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "../util/Constants";

export function checkFieldForError(
  field: string,
  value: string,
  password: string = ""
): string {
  switch (field) {
    case "username": {
      if (value.length < MIN_USERNAME_LENGTH)
        return `Username needs to be at least ${MIN_USERNAME_LENGTH} characters long`;

      if (value.length > MAX_USERNAME_LENGTH)
        return `Username needs to be at most ${MAX_USERNAME_LENGTH} characters long`;

      return "";
    }

    case "password": {
      if (value.length < MIN_PASSWORD_LENGTH)
        return `Password needs to be at least ${MIN_PASSWORD_LENGTH} characters long`;

      return "";
    }

    case "confirmPassword": {
      if (value != password) return "The passwords should be the same";

      return "";
    }

    case "city": {
      if (value.length === 0) return "City is mandatory";

      return "";
    }

    case "email": {
      if (value.length === 0) return "Email is mandatory";

      return "";
    }

    default: {
      return "";
    }
  }
}
