import React, {useState} from 'react';
import {Box, Text, useInput, useApp} from 'ink';
import TextInput from 'ink-text-input';
import OpenAI from "openai";
const client = new OpenAI();



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
	const [inputValue, setInputValue] = useState('');
	const [response, setResponse] = useState('');
	const [loading, setLoading] = useState(false);
	const {exit} = useApp();

	const handleSubmit = async (value) => {
		if (!value.trim()) return;
		setLoading(true);
		setResponse('');
		try {
			const result = await client.responses.create({
				model: "gpt-4o-mini",
				input: value
			});
			setResponse(result.output_text);
		} catch (error) {
			setResponse('Error: ' + error.message);
		}
		setLoading(false);
	};

	useInput((input, key) => {
		if (page) {
			// On a sub-page: Escape or b = back to menu
			if (key.escape || (input === 'b' && page !== 'start')) {
				setPage(null);
				setInputValue('');
				setResponse('');
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

	// Start page with input
	if (page === 'start') {
		return (
			<Box flexDirection="column" alignItems="center" paddingX={2}>
				<Box marginBottom={1}>
					<Text bold color="cyan">
						Ask AI
					</Text>
				</Box>
				<Box marginBottom={1}>
					<Text>{'> '}</Text>
					<TextInput
						value={inputValue}
						onChange={setInputValue}
						onSubmit={handleSubmit}
						placeholder="Type your message..."
					/>
				</Box>
				{loading && (
					<Box marginY={1}>
						<Text color="yellow">Loading...</Text>
					</Box>
				)}
				{response && (
					<Box marginY={1} flexDirection="column">
						<Text bold color="green">Response:</Text>
						<Text>{response}</Text>
					</Box>
				)}
				<Box marginTop={1}>
					<Text dimColor>Enter to send · Esc to go back</Text>
				</Box>
			</Box>
		);
	}

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
