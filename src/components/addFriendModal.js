import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image, Modal, AsyncStorage, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';

export default class AddFriendModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			demo: [
				{
					_id: '606b354e35e0b200157590df',
					dateJoined: '2021-04-05T16:05:34.772Z',
					email: 'jayden@me.com',
					firstName: 'Jayden',
					friends: [],
					hasCovid: false,
					lastName: 'Pereira',
				},
				{
					_id: '606218cd8cd7b200157a66f6',
					dateJoined: '2021-03-29T18:13:33.820Z',
					email: 'john@domain.com',
					firstName: 'John',
					friends: [],
					hasCovid: false,
					lastName: 'Smith',
				},
				{
					_id: '606b36ba35e0b200157590e1',
					dateJoined: '2021-04-05T16:11:38.911Z',
					email: 'hello@me.com',
					firstName: 'Hello',
					friends: [],
					hasCovid: false,
					lastName: 'World',
				},
				{
					_id: '606b363835e0b200157590e0',
					dateJoined: '2021-04-05T16:09:28.419Z',
					email: 'dev@me.com',
					firstName: 'testing',
					friends: [],
					hasCovid: false,
					lastName: 'signup',
				},
			],
		};

		this.fetchUsers();
	}

	async fetchUsers() {
		// Get user data and set progress bar on status
		const token = await AsyncStorage.getItem('auth-token');
		axios({ method: 'get', url: 'https://traq-server.herokuapp.com/api/users/', headers: { 'x-auth-token': token } })
			.then((res) => {
				this.setState({ users: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async addFriend(userID) {
		// Get user data and set progress bar on status
		const token = await AsyncStorage.getItem('auth-token');
		axios({ method: 'post', url: `https://traq-server.herokuapp.com/api/add-friend/${userID}`, headers: { 'x-auth-token': token } })
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}>Add Friends</Text>
					<TouchableOpacity onPress={this.props.toggleVisibility}>
						<AntDesign name='close' size={24} color='#4d97b6' />
					</TouchableOpacity>
				</View>

				<FlatList
					data={this.state.demo}
					renderItem={({ item }) => (
						<View style={styles.cardMainContainer}>
							<View>
								<Text style={styles.cardText}>{`${item.firstName} ${item.lastName}`}</Text>
								<Text style={styles.cardSubText}>{item.email}</Text>
							</View>
							<TouchableOpacity
								onPress={() => {
									this.addFriend(item._id);
								}}
							>
								<AntDesign name='pluscircleo' size={36} color='#4d97b6' style={styles.cardIcon} />
							</TouchableOpacity>
						</View>
					)}
					keyExtractor={(item) => item._id}
				/>
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
	cardMainContainer: {
		height: 100,
		marginBottom: 10,
		width: '100%',
		backgroundColor: '#f4f4f4',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	cardText: {
		marginLeft: 16,
		fontSize: 22,
		fontWeight: '500',
	},
	cardSubText: {
		marginLeft: 16,
		fontSize: 18,
		fontWeight: '300',
	},
	cardIcon: {
		marginRight: 16,
	},
});
