import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { IdInput } from '../../components/IdInput';

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));

describe("IdInput", () => {
	it("matches snapshot", () => {
		const tree = render(<IdInput />);
		expect(tree).toMatchSnapshot();
	});

	it("text change, route id length is less than 6, router push is not called", () => {
		const text = "12345";
		const tree = render(<IdInput />);
		const textInput = tree.getByPlaceholderText("123456");
		fireEvent.changeText(textInput, { target: { value: text } });
		expect(mockPush).not.toHaveBeenCalled();
	});

	it("text change, route id length is 6, router push is called", async () => {
		const text = "123456";
		const tree = render(<IdInput />);
		const textInput = tree.getByPlaceholderText("123456");
		fireEvent.changeText(textInput, text);
		await waitFor(() => expect(mockPush).toBeCalledWith(`/jobList?routeId=${text}`));
		expect(tree).toMatchSnapshot();
	});

	it("text change, route id length is greater than 6, router push is called", async () => {
		const text = "abcdefghijklmno";
		const tree = render(<IdInput />);
		const textInput = tree.getByPlaceholderText("123456");
		fireEvent.changeText(textInput, { target: { value: text } });
		await waitFor(() => expect(mockPush).toBeCalledWith(`/jobList?routeId=${text}`));
		expect(tree).toMatchSnapshot();
	});

	it("text change, route id is empty, router push is not called", () => {
		const text = "";
		const tree = render(<IdInput />);
		const textInput = tree.getByPlaceholderText("123456");
		fireEvent.changeText(textInput, { target: { value: text } });
		expect(mockPush).not.toHaveBeenCalled();
	});

});