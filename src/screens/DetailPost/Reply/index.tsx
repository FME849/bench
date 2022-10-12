import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@metacraft/ui';
import Avatar from 'components/Avatar';

import ThumbsUpNumber from '../../../components/ThumbsUpNumber/index';
import UserInfo from '../../../components/UserInfo';
import { grey, midnightDream, yellow } from '../../../utils/colors';
import { Reply as ReplyType } from '../../../utils/types/thread';

interface Props {
	name: string;
	avatarUrl: string;
	postedTime: string;
	thread: string;
	nbLikes: number;
	originReply?: ReplyType;
	onReplyPress: () => void;
	isActive: boolean;
}

const Reply: FC<Props> = ({
	avatarUrl = '',
	name = '',
	postedTime = '',
	thread = '',
	nbLikes = 0,
	originReply,
	onReplyPress,
	isActive = false,
}: Props) => {
	return (
		<View style={styles.container}>
			{originReply && (
				<View style={styles.originalReplyContainer}>
					<View style={styles.directionContainer} />
					<View style={styles.originalShortReplyContainer}>
						<Avatar uri={originReply.avatarUrl} size={16} />
						<Text style={styles.nameText}>{originReply.name}</Text>
						<View style={styles.originalReplyContentContainer}>
							<Text numberOfLines={1} style={styles.originalReplyContent}>
								{originReply.content}
							</Text>
						</View>
					</View>
				</View>
			)}
			<View
				style={[styles.mainReplyContainer, isActive && styles.activeBorder]}
			>
				<UserInfo
					avatarUrl={avatarUrl}
					name={name}
					postedTime={new Date(postedTime)}
				/>
				<View style={styles.textContainer}>
					<Text style={styles.text}>{thread}</Text>
				</View>
				<View style={styles.socialContainer}>
					<ThumbsUpNumber number={nbLikes} />
					<TouchableOpacity onPress={onReplyPress}>
						<Text style={styles.replyText}>Reply</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	activeBorder: {
		borderWidth: 1,
		borderColor: yellow,
		borderRadius: 5,
	},
	replyText: {
		marginLeft: 35,
		fontSize: 13,
		fontWeight: '400',
		fontStyle: 'normal',
		lineHeight: 15,
		color: grey,
	},
	container: {
		flex: 1,
		paddingTop: 10,
		borderRadius: 6,
	},
	mainReplyContainer: {
		paddingHorizontal: 14,
		paddingVertical: 10,
		backgroundColor: midnightDream,
	},
	text: {
		color: 'rgba(255,255,255,0.6)',
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 21,
	},
	textContainer: {
		marginTop: 3,
	},
	socialContainer: {
		marginTop: 14,
		flexDirection: 'row',
	},
	originalReplyContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 18,
		marginHorizontal: 14,
	},
	directionContainer: {
		borderWidth: 0.5,
		borderColor: 'rgba(255,255,255,0.7)',
		borderBottomColor: 'transparent',
		borderRightColor: 'transparent',
		borderRadius: 5,
		borderBottomLeftRadius: 0,
		width: 25,
		height: 25,
		marginLeft: 11,
	},
	originalShortReplyContainer: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 5,
		height: 39,
		marginTop: -21,
		marginLeft: -3,
		backgroundColor: midnightDream,
		paddingHorizontal: 7,
	},
	nameText: {
		fontWeight: '700',
		fontSize: 10,
		lineHeight: 15,
		marginLeft: 4,
		color: grey,
	},
	originalReplyContent: {
		color: 'rgba(255,255,255,0.5)',
		fontWeight: '400',
		fontSize: 10,
		lineHeight: 15,
	},
	originalReplyContentContainer: { flex: 1, marginLeft: 4 },
});

export default Reply;
