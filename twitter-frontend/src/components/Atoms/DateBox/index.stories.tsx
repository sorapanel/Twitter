import { Meta, StoryFn } from "@storybook/react";
import DateBox from ".";

export default {
  title: "Atoms/DateBox",
  component: DateBox,
} as Meta<typeof DateBox>;

const Template: StoryFn<typeof DateBox> = (args) => <DateBox {...args} />;

export const Month = Template.bind({});
Month.args = {
  label: "月",
  hasError: false,
};

export const Day = Template.bind({});
Day.args = {
  label: "日",
  hasError: false,
};

export const Year = Template.bind({});
Year.args = {
  label: "年",
  hasError: false,
};
