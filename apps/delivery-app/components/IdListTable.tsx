import { MinimalLocationObject, RouteObject } from "@nx-expo/appwrite";
import { openURL } from "expo-linking";
import { View, Text, StyleSheet, Pressable } from "react-native";

const buildWaypointsUrl = (waypoints: Array<MinimalLocationObject>) => {
	const firstWaypoint = waypoints.shift();
	const lastWaypoint = waypoints.pop();
	const remainingWaypoints = waypoints.map(
		(locationObject: MinimalLocationObject) => ({
			latitude: locationObject.latitude,
			longitude: locationObject.longitude
		})
	);

	const originParam = `origin=${firstWaypoint.latitude},${firstWaypoint.longitude}`;
	const destinationParam = `destination=${lastWaypoint.latitude},${lastWaypoint.longitude}`;
	const waypointsParam = `waypoints=${remainingWaypoints
		.map((waypoint) => `${waypoint.latitude},${waypoint.longitude}`)
		.join('|')}`;

	return `https://www.google.com/maps/dir/?api=1&${destinationParam}&${originParam}&${waypointsParam}`;
};

export const IdListTable = (props: {
	routes: Array<RouteObject>
}) => {
	const handleButtonPress = (route: RouteObject) => {
		const gMapsUrl = buildWaypointsUrl(route.location_pings);
		openURL(gMapsUrl).catch((error) => console.error(error));
	};

	return (
		<View style={styles.tableView}>
			{props.routes.map((route) => (
				<Pressable onPress={() => handleButtonPress(route)}>
					<Text style={styles.text} key={route.$id}>{route.$id}</Text>
				</Pressable>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	tableView: {
		display: "flex",
		gap: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 16,
		lineHeight: 16,
	},
});