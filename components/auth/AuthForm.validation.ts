import { z } from "zod";

const signUpSchema = z.object({
  name: z
    .string()
    .min(
      4,
      "Nazwa użytkownika jest wymagana i musi składać się z conajmniej 4 znaków"
    )
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Nazwa użytkownika nie może zawierać znaków specjalnych (oprócz '-' oraz '_')"
    ),
  email: z
    .string()
    .min(1, "Adres email jest wymagany")
    .email("Nieprawidłowy format adresu email"),
  password: z
    .string()
    .min(4, "Hasło musi mieć conajmniej 8 znaków")
    .max(24, "Hasło może mieć co najwyżej 24 znaki")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      "Hasło musi zawierać co najmniej 1 wielką literę, 1 małą literę, 1 cyfrę i 1 znak specjalny"
    ),
});

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Adres email jest wymagany")
    .email("Nieprawidłowy format adresu email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

export { signUpSchema, signInSchema };
