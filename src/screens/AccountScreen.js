import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default class AccountScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}>Account</Text>
					<TouchableOpacity onPress={this.props.didLogout}>
						<AntDesign name='logout' size={24} color='#4d97b6' />
					</TouchableOpacity>
				</View>
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
	headerContainer: {
		marginHorizontal: 16,
		marginBottom: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	header: {
		fontSize: 22,
		fontWeight: '700',
		color: '#707070',
	},
	mainContent: {
		flex: 1,
		marginHorizontal: 16,
	},
});
