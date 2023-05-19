import { TrackerPrompt } from "../../components/TrackerPrompt";
import { screen, render, waitFor } from '@testing-library/react-native';

const mockRequestPermissions = jest.fn();
const mockStartLocationTracking = jest.fn();
const mockStopLocationTracking = jest.fn();

jest.mock('@nx-expo/location', () => ({
  requestPermissions: () => new Promise((res, err) => mockRequestPermissions(res, err)),
  startLocationTracking: () => new Promise((res, err) => mockStartLocationTracking(res, err)),
  stopLocationTracking: () => new Promise(() => mockStopLocationTracking()),
}));

describe("TrackerPrompt", () => {
  it("renders you must accept tracking", () => {
    const tree = render(<TrackerPrompt />);
    expect(tree).toMatchSnapshot();
    expect(screen.queryByText('You must accept tracking')).toBeTruthy();
  });

  it("requests permissions on render", () => {
    render(<TrackerPrompt />);
    expect(mockRequestPermissions).toHaveBeenCalled();
  });

  it("error setting location", async () => {
    mockRequestPermissions.mockImplementation((_, err) => {
      err({ message: 'error setting location' });
    });
    const tree = render(<TrackerPrompt />);
    expect(mockRequestPermissions).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.queryByText(`You aren't being tracked...\nerror setting location`)).toBeTruthy());
    expect(tree).toMatchSnapshot();
  });

  it("location tracking permission is granted, location tracking is started", async () => {
    mockRequestPermissions.mockImplementation((res) => {
      res();
    });
    mockStartLocationTracking.mockImplementation((res) => {
      res();
    });
    const tree = render(<TrackerPrompt />);
    await waitFor(() =>
      expect(mockStartLocationTracking).toHaveBeenCalled());
    await waitFor(() =>
      expect(screen.queryByText('You are being tracked...')).toBeTruthy());
    expect(tree).toMatchSnapshot();
  });

  it("location tracking permission is granted, error tracking location", async () => {
    mockRequestPermissions.mockImplementation((res) => {
      res();
    });
    mockStartLocationTracking.mockImplementation((_, err) => {
      err({ message: 'error tracking location' });
    });
    const tree = render(<TrackerPrompt />);
    await waitFor(() => {
      expect(mockStartLocationTracking).toHaveBeenCalled();
      expect(screen.queryByText(`You aren't being tracked...\nerror tracking location`)).toBeTruthy();
    });
    expect(tree).toMatchSnapshot();
  });

  it("when component unmounts, location tracking is stopped", () => {
    const { unmount } = render(<TrackerPrompt />);
    unmount();
    expect(mockStopLocationTracking).toHaveBeenCalled();
  });

});