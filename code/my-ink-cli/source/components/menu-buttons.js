import React, {useState} from 'react';
import {Box, Text, useInput, useApp} from 'ink';

const BUTTONS = [
	{id: 'start', label: 'Start'},
	{id: 'docs', label: 'Docs'},
	{id: 'config', label: 'Config'},
	{id: 'quit', label: 'Quit'},
];

const PAGES = {
	start: {
		title: 'Start',
		content: 'Run the dev server and open your site in the browser.',
	},
	docs: {
		title: 'Docs',
		content: 'Read the documentation and API reference.',
	},
	config: {
		title: 'Config',
		content: 'Edit vis web configuration and preferences.',
	},
};

export default function MenuButtons() {
	const [selected, setSelected] = useState(0);
	const [page, setPage] = useState(null);
	const {exit} = useApp();

	useInput((input, key) => {
		if (page) {
			// On a sub-page: Escape or b = back to menu
			if (input === 'b' || key.escape) {
				setPage(null);
			}
			return;
		}

		// Main menu
		if (input === 'q' || key.escape) {
			exit();
			return;
		}
		if (key.upArrow) {
			setSelected(s => (s > 0 ? s - 1 : BUTTONS.length - 1));
		}
		if (key.downArrow) {
			setSelected(s => (s < BUTTONS.length - 1 ? s + 1 : 0));
		}
		if (key.return) {
			const item = BUTTONS[selected];
			if (item.id === 'quit') {
				exit();
			} else if (PAGES[item.id]) {
				setPage(item.id);
			}
		}
	});

	// Sub-page view
	if (page) {
		const {title, content} = PAGES[page];
		return (
			<Box flexDirection="column" alignItems="center" paddingX={2}>
				<Box marginBottom={1}>
					<Text bold color="cyan">
						{title}
					</Text>
				</Box>
				<Box marginBottom={2} minWidth={40}>
					<Text>{content}</Text>
				</Box>
				<Text dimColor>← Back: press Esc or b</Text>
			</Box>
		);
	}

	// Main menu
	return (
		<Box flexDirection="column" alignItems="center" gap={0}>
			{BUTTONS.map((btn, i) => {
				const isSelected = i === selected;
				return (
					<Box key={btn.id} marginY={0}>
						<Text
							color={isSelected ? 'green' : 'gray'}
							bold={isSelected}
							inverse={isSelected}
						>
							{isSelected ? '› ' : '  '}
							{btn.label}
							{isSelected ? ' ‹' : ''}
						</Text>
					</Box>
				);
			})}
			<Box marginTop={1}>
				<Text dimColor>↑/↓ select · Enter confirm · q to quit</Text>
			</Box>
		</Box>
	);
}
