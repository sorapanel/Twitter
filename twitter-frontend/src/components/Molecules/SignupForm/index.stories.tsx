import { Meta, StoryFn } from "@storybook/react";
import SignupForm from ".";

export default {
  title: "Molecules/SignupForm",
  component: SignupForm,
} as Meta<typeof SignupForm>;

//const Template: StoryFn<typeof SignupForm> = (args) => <SignupForm {...args} />
export const Sample = () => <SignupForm />;
