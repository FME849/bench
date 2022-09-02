import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { threads } from '../../../utils/mockupData';
import { Thread } from '../../../utils/types/thread';

import ThreadItem from './ThreadItem';

export const ThreadList: FC = () => {
	const [simpleThreads, setSimpleThreads] = useState<Array<Thread>>([]);

	useEffect(() => {
		setTimeout(() => {
			setSimpleThreads(threads);
		}, 1000);
	}, []);

	if (simpleThreads.length === 0) {
		return <ActivityIndicator />;
	}

	return (
		<FlatList
			data={simpleThreads}
			renderItem={({ item }) => (
				<ThreadItem
					avatarUrl={item.avatarUrl}
					name={item.name}
					postedTime={item.postedTime}
					thread={item.thread}
					nbLikes={item.nbLikes}
					nbComments={item.nbComments}
					isPinned={item.isPinned}
					isFollowed={item.isFollowed}
					isLiked={item.isLiked}
				/>
			)}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default ThreadList;
