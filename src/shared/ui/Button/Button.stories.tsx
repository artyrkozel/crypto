import Button, { IButtonProps } from './Button';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'Components/Button',
	component: Button,
	parameters: {
		children: { type: 'React.ReactNode' },
		variant: { type: 'string' },
		onClick: { type: 'function' },
		className: { type: 'string' },
	},
} as Meta;

const Template: StoryFn<IButtonProps> = (args) => <Button {...args} />;

export const ContainedMedium = Template.bind({});
ContainedMedium.args = {
	...ContainedMedium.args,
	variant: 'primary',
	children: 'text',
};
