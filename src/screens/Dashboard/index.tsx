import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { MAX_WIDTH } from '../../utils/constants';

import ControllerRow from './ControllerRow';
import QuickThread from './QuickThread';

export const BuildDashboard: FC = () => {
	return (
		<View style={styles.container}>
			<ControllerRow />
			<View style={styles.quickThreadContainer}>
				<QuickThread />
			</View>
		</View>
	);
};

export default BuildDashboard;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		maxWidth: MAX_WIDTH,
		alignSelf: 'center',
		paddingTop: 32,
	},
	quickThreadContainer: {
		marginTop: 46,
	},
});
