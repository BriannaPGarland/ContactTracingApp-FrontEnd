import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AddFriendModal from '../components/addFriendModal';

export default class FriendScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addFriendModalVisible: false,
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
					hasCovid: true,
					lastName: 'Smith',
				},
			],
		};
		this.toggleAddFriendModal = this.toggleAddFriendModal.bind(this);
	}

	async fetchFriend() {
		// Get friend data
		const token = await AsyncStorage.getItem('auth-token');
		axios({ method: 'get', url: 'https://traq-server.herokuapp.com/api/friends/', headers: { 'x-auth-token': token } })
			.then((res) => {
				this.setState({ friends: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	toggleAddFriendModal() {
		this.setState({ addFriendModalVisible: !this.state.addFriendModalVisible });
	}

	render() {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}>Friends</Text>
					<TouchableOpacity onPress={this.toggleAddFriendModal}>
						<AntDesign name='adduser' size={24} color='#4d97b6' />
						<Modal visible={this.state.addFriendModalVisible}>
							<AddFriendModal toggleVisibility={this.toggleAddFriendModal} />
						</Modal>
					</TouchableOpacity>
				</View>

				<View style={styles.mainContent}>
					<FlatList
						data={this.state.demo}
						renderItem={({ item }) => (
							<View style={styles.cardMainContainer}>
								<View>
									<Text style={styles.cardText}>{`${item.firstName} ${item.lastName}`}</Text>
									<Text style={styles.cardSubText}>{item.hasCovid ? 'infected' : ''}</Text>
								</View>
								<View style={[styles.cardAlert, { backgroundColor: item.hasCovid ? '#FF0000' : '#00FF00' }]}></View>
							</View>
						)}
						keyExtractor={(item) => item._id}
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
	cardAlert: {
		marginRight: 16,
		height: 32,
		width: 32,
		borderRadius: 16,
		backgroundColor: 'green',
	},
});
