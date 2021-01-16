import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from '../EditableSpan';

export default {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'EditableSpan clicked'
        },
        title: {
            defaultValue: "HTML",
            description: "Start value to editable span"
        }
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange: action("Value changed"),
    title: "Hello"
}