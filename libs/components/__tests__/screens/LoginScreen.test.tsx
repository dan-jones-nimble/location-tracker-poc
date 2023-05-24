import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ICredentials } from "../../../appwrite/src/lib/auth/loginEmailSession";
import { LoginScreen } from "../../native/Screens/Login";

const mockWobbleButton = jest.fn();
const mockEmailLogin = jest.fn();

jest.mock('@nx-expo/appwrite', () => ({
    emailLogin: (args) => new Promise(() => mockEmailLogin(args)),
    // emailLogin: (args) => new Promise((res, err) => mockEmailLogin(args, res, err)),
}));

describe("Login Screen", () => {
    it("matches snapshot", () => {
        const tree = render(<LoginScreen />);
        expect(tree).toMatchSnapshot();
    });

    it("email & password input is submitted", async () => {
        mockEmailLogin.mockImplementation((res) => res());
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
        // expect(tree).toMatchSnapshot();
    });

    it("email & password input is submitted, error is thrown", async () => {
        mockEmailLogin.mockImplementation((_, err) => {
            err({ message: 'error logging in' });
        });
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
        await waitFor(() => expect(mockEmailLogin).rejects.toBe(true));
    });
});