import AppWithRedux from "../AppWithRedux";
import {Meta, Story} from "@storybook/react";
import React from "react";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: "Todolists/AppWithRedux",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () =>  <AppWithRedux/>

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};