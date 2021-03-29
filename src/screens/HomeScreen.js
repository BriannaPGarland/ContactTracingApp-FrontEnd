import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: 'John Smith',
		};
	}

	render() {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<Text style={styles.header}>
					Hello, <Text style={styles.headerName}>{this.state.userName}</Text>
				</Text>
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
		fontWeight: '500',
		color: '#707070',
	},
	headerName: {
		marginLeft: 16,
		marginBottom: 16,
		fontSize: 22,
		color: '#4d97b6',
		fontWeight: '700',
	},
	mainContent: {
		flex: 1,
		marginHorizontal: 16,
		backgroundColor: 'red',
	},
});
