import React from 'react';
import {Box, Text} from 'ink';

const VIS_ART = `
  ██╗   ██╗██╗███████╗
  ██║   ██║██║██╔════╝
  ██║   ██║██║███████╗
  ╚██╗ ██╔╝██║╚════██║
   ╚████╔╝ ██║███████║
    ╚═══╝  ╚═╝╚══════╝
`;

export default function AsciiLogo() {
	return (
		<Box flexDirection="column" alignItems="center" marginBottom={1}>
			<Text color="cyan" bold>
				{VIS_ART}
			</Text>
		</Box>
	);
}
