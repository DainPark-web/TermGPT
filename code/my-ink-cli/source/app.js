import React from 'react';
import {Box, Text} from 'ink';
import AsciiLogo from './components/ascii-logo.js';
import MenuButtons from './components/menu-buttons.js';

export default function App() {
	return (
		<Box flexDirection="column" alignItems="center" padding={2}>
			<AsciiLogo />
			<Box marginBottom={1}>
				<Text bold color="white">
					Welcome to vis web
				</Text>
			</Box>
			<Box marginBottom={2}>
				<Text dimColor>Build and preview your site in the terminal.</Text>
			</Box>
			<MenuButtons />
		</Box>
	);
}
