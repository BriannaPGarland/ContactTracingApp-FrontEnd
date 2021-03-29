import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default class AccountScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<Text style={styles.header}>Account</Text>
				<View style={styles.mainContent}></View>
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
	header: {
		marginLeft: 16,
		marginBottom: 16,
		fontSize: 22,
		fontWeight: '700',
		color: '#707070',
	},
	mainContent: {
		flex: 1,
		marginHorizontal: 16,
		backgroundColor: 'blue',
	},
});
