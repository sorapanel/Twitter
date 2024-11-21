import { Meta, StoryFn } from "@storybook/react";
import TextBox from ".";

export default {
  title: "Atoms/TextBox",
  component: TextBox,
} as Meta<typeof TextBox>;

const Template: StoryFn<typeof TextBox> = (args) => <TextBox {...args} />;

export const Ex1 = Template.bind({});
Ex1.args = {
  placeholder: "電話番号/メールアドレス/ユーザー名",
  variant: "email",
};

export const Ex2 = Template.bind({});
Ex2.args = {
  placeholder: "電話番号/メールアドレス/ユーザー名",
  hasError: true,
};
