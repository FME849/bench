import React, { FC, memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@metacraft/ui';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackParamList } from 'src/stack';

import CommentInput from '../../components/CommentInput';
import BellIcon from '../../components/icons/feather/Bell';
import PinIcon from '../../components/icons/feather/Pin';
import { midnightDream } from '../../utils/colors';
import { Reply } from '../../utils/types/thread';
import UserInfo from '../UserInfo';

import SocialRow from './SocialRow';

type DetailPostStackProp = NavigationProp<StackParamList, 'DetailPost'>;

interface Props {
	avatarUrl: string;
	name: string;
	postedTime: string;
	thread: string;
	nbLikes: number;
	nbComments: number;
	isPinned: boolean;
	isFollowed: boolean;
	isLiked: boolean;
	isShortForm?: boolean;
	replies?: Array<Reply>;
	navigation?: DetailPostStackProp;
}

const Post: FC<Props> = ({
	avatarUrl = '',
	name = '',
	postedTime = '',
	thread = '',
	nbLikes = 0,
	nbComments = 0,
	isPinned = false,
	isFollowed = false,
	isLiked = false,
	isShortForm = true,
	replies = [],
}: Props) => {
	const navigation = useNavigation<DetailPostStackProp>();
	const onThreadPress = () => {
		navigation.navigate('DetailPost', {
			avatarUrl,
			name,
			postedTime,
			thread,
			nbLikes,
			nbComments,
			isPinned,
			isFollowed,
			isLiked,
			replies,
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerRow}>
				<UserInfo
					avatarUrl={avatarUrl}
					name={name}
					postedTime={new Date(postedTime)}
				/>
				<View style={styles.pinAndAlert}>
					<PinIcon size={15} isFilled={isPinned} />
					<BellIcon size={15} isFilled={isFollowed} style={styles.bellIcon} />
				</View>
			</View>
			<TouchableOpacity
				disabled={!isShortForm}
				onPress={onThreadPress}
				style={styles.shortenedTextContainer}
			>
				<Text numberOfLines={isShortForm ? 3 : 0} style={styles.shortenedText}>
					{thread}
				</Text>
			</TouchableOpacity>
			<View style={styles.socialRowContainer}>
				<SocialRow
					nbLikes={nbLikes}
					nbComments={nbComments}
					isLiked={isLiked}
				/>
			</View>
			{isShortForm && (
				<View style={styles.commentInputContainer}>
					<CommentInput />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: midnightDream,
		paddingVertical: 12,
		paddingHorizontal: 16,
		marginTop: 12,
		borderRadius: 5,
	},
	headerRow: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	pinAndAlert: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	bellIcon: {
		marginLeft: 10,
	},
	shortenedTextContainer: {
		marginTop: 7,
	},
	commentInputContainer: {
		marginTop: 8,
	},
	shortenedText: {
		fontSize: 16,
		fontWeight: '400',
		color: 'white',
		lineHeight: 24,
	},
	socialRowContainer: {
		marginTop: 8,
	},
});

export default memo(Post);
