import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ICredentials } from "../../../appwrite/src/lib/auth/loginEmailSession";
import { LoginScreen } from "../../native/Screens/Login";
import { Button } from "react-native";
import React from "react";

const mockEmailLogin = jest.fn();
const mockLogin = jest.fn();
const mockWobbleButton = (props) => <Button {...props} />;

jest.mock('@nx-expo/appwrite', () => ({
    emailLogin: (args) => new Promise(() => mockEmailLogin(args)),
}));

jest.mock("../../native/WobbleButton/index", () => ({
    WobbleButton: (props) => mockWobbleButton(props),
}));

jest.mock("@nx-expo/context", () => ({
    useLoggedIn: () => ({ logIn: mockLogin }),
}));

describe("Login Screen", () => {
    it("matches snapshot", () => {
        const tree = render(<LoginScreen />);
        expect(tree).toMatchSnapshot();
    });

    it("button pressed, emailLogin called with correct email and password", async () => {
        const creds: ICredentials = {
            email: "test@email.com",
            password: "password"
        };
        const tree = render(<LoginScreen />);
        const emailInput = tree.getByTestId("email");
        const passwordInput = tree.getByTestId("password");
        const button = tree.getByRole("button");
        fireEvent.changeText(emailInput, creds.email);
        fireEvent.changeText(passwordInput, creds.password);
        fireEvent.press(button);
        await waitFor(() => expect(mockEmailLogin).toBeCalledWith(creds));
    });
});