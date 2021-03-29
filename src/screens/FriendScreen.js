import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default class FriendScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}>Friends</Text>
					<TouchableOpacity>
						<AntDesign name='adduser' size={24} color='#4d97b6' />
					</TouchableOpacity>
				</View>

				<View style={styles.mainContent}>
					<FlatList
						ListEmptyComponent={
							<View style={styles.listEmptyContainer}>
								<AntDesign name='frowno' size={32} color='#4d97b6' />
								<Text style={styles.listEmptyText}>You currently don't have any friends, add some to keep safe!</Text>
							</View>
						}
					/>
				</View>
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
	listEmptyContainer: {
		width: '70%',
		alignSelf: 'center',
		marginTop: 32,
		justifyContent: 'center',
		alignItems: 'center',
	},
	listEmptyText: {
		marginTop: 16,
		textAlign: 'center',
		color: '#1a1b1b',
		fontSize: 16,
		fontWeight: '500',
	},
});
