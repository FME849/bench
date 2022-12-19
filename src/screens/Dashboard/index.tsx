import React, { FC, useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	ImageBackground,
	Modal,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { Text } from '@metacraft/ui';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ControllerRow from 'components/ControllerRow';
import ScrollLayout from 'components/layouts/Scroll';
import Post from 'components/Post';
import SearchModal from 'components/SearchModal';
import { RootParamList } from 'stacks/shared';
import { blackPearl, blueWhale, grey } from 'utils/colors';
import { MAX_WIDTH } from 'utils/constants';
import * as queries from 'utils/graphql/query';
import { onEdit } from 'utils/helper';
import { threads } from 'utils/mockupData';
import resources from 'utils/resources';
import { Thread } from 'utils/types/thread';

type StackProp = NavigationProp<RootParamList>;

export const BuildDashboard: FC = () => {
	const [simpleThreads, setSimpleThreads] = useState<Array<Thread>>([]);
	const navigation = useNavigation<StackProp>();
	const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
	const { data } = useQuery(queries.feedThreads);
	const onAvatarPress = () => {
		navigation.navigate('SignIn');
	};

	const onQuickThreadPress = () => {
		onEdit({
			isThreadEditing: true,
		});
	};

	const onSearchPress = () => {
		setIsSearchModalVisible(true);
	};
	const onCloseSearchModal = () => {
		setIsSearchModalVisible(false);
	};

	useEffect(() => {
		setTimeout(() => {
			setSimpleThreads(threads);
		}, 1000);
	}, []);

	return (
		<ScrollLayout
			style={styles.mainContainer}
			contentContainerStyle={{ width: '100%' }}
		>
			<ImageBackground
				source={resources.bannerBackground}
				style={styles.bannerContainer}
			>
				<Text style={styles.bannerTitle}>Welcome to Metacraft Bench</Text>
				<Text style={styles.bannerSubText}>
					A virtual game-centric social collaboration platform where Game devs,
					devs, Fictional storytellers, artists, or simply anyone interested in
					joining opensource game development process
				</Text>
			</ImageBackground>
			<FlatList
				style={styles.container}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<View>
						<Modal visible={isSearchModalVisible} animationType={'slide'}>
							<SearchModal onCancelSearchModal={onCloseSearchModal} />
						</Modal>
						<ControllerRow
							onAvatarPress={onAvatarPress}
							onSearchPress={onSearchPress}
						/>
						<TouchableOpacity
							style={styles.quickThreadContainer}
							onPress={onQuickThreadPress}
						>
							<Text style={styles.placeHolderText}>
								What{"'"}s your thoughts
							</Text>
						</TouchableOpacity>
						<View style={styles.activityIndicatorContainer}>
							{simpleThreads.length === 0 && <ActivityIndicator />}
						</View>
					</View>
				}
				ListFooterComponent={<View style={styles.footer} />}
				data={data?.feedThreads}
				renderItem={({ item }) => <Post item={item} />}
				keyExtractor={(item) => item.id}
			/>
		</ScrollLayout>
	);
};

export default BuildDashboard;

const styles = StyleSheet.create({
	placeHolderText: {
		color: grey,
		fontSize: 16,
		fontWeight: '400',
	},
	footer: { height: 24 },
	activityIndicatorContainer: {
		marginTop: 5,
	},
	container: {
		width: '100%',
		maxWidth: MAX_WIDTH,
		alignSelf: 'center',
		paddingTop: 32,
		paddingHorizontal: 15,
		backgroundColor: blackPearl,
	},
	quickThreadContainer: {
		marginTop: 10,
		backgroundColor: blueWhale,
		justifyContent: 'center',
		paddingLeft: 15,
		paddingVertical: 14,
		borderRadius: 10,
	},
	mainContainer: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: blackPearl,
		width: '100%',
	},
	bannerContainer: {
		paddingVertical: 40,
		alignItems: 'center',
	},
	bannerTitle: {
		fontSize: 30,
		fontWeight: '600',
		marginBottom: 10,
	},
	bannerSubText: {
		maxWidth: 800,
		textAlign: 'center',
	},
});
