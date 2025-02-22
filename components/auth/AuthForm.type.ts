export type TSignInValues = {
  email: string;
  password: string;
};

export type TSignUpValues = {
  name: string;
  email: string;
  password: string;
};

export type TFormValues = {
  name?: string;
  email: string;
  password: string;
};

export type TAuthFormProps = {
  title: string;
  fields: {
    name: keyof TFormValues;
    label: string;
    placeholder: string;
    type?: string;
  }[];
  primaryButton: { text: string; onPress: (values: TFormValues) => void };
  secondaryButton: { text: string; onPress: () => void };
  errorMessage: string | null;
};

export enum EAuthTypes {
  SIGNUP = "Zarejestruj się",
  SIGNIN = "Zaloguj się",
}

export enum EAuthErrorMessages {
  SIGNIN = "Niepoprawny login lub hasło",
  SIGNUP = "Nie udało się utworzyć konta, spróbuj ponownie",
}
