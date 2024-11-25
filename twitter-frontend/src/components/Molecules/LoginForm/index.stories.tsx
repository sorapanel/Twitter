import { StoryFn, Meta } from "@storybook/react";
import Login from ".";

export default {
  title: "Molecules/LoginForm",
  component: Login,
} as Meta<typeof Login>;

export const Sample = () => <Login />;
