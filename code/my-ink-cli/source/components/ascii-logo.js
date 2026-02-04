import React from 'react';
import {Box, Text} from 'ink';

const DainAILOGO = `
  ██████╗  █████╗ ██╗███╗   ██╗     █████╗ ██╗
  ██╔══██╗██╔══██╗██║████╗  ██║    ██╔══██╗██║
  ██║  ██║███████║██║██╔██╗ ██║    ███████║██║
  ██║  ██║██╔══██║██║██║╚██╗██║    ██╔══██║██║
  ██████╔╝██║  ██║██║██║ ╚████║    ██║  ██║██║
  ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝╚═╝
`;

export default function AsciiLogo() {
	return (
		<Box flexDirection="column" alignItems="center" marginBottom={1}>
			<Text color="red" bold>
				{DainAILOGO}
			</Text>
		</Box>
	);
}
