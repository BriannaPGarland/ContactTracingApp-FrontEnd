import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default class FriendScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<Text style={styles.placeholderText}>Friend Screen</Text>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		height: '100%',
		width: '100%',
		backgroundColor: 'white',
	},
	placeholderText: {
		alignSelf: 'center',
		fontSize: 32,
		fontWeight: '900',
	},
});
