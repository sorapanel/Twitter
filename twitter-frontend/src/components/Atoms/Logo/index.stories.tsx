import { Meta, StoryFn } from "@storybook/react";
import Logo from ".";

export default {
  title: "Atoms/Logo",
  component: Logo,
} as Meta<typeof Logo>;

const Template: StoryFn<typeof Logo> = (args) => <Logo {...args} />;

const imgPath = "TwitterLogo.png";

export const Sm = Template.bind({});
Sm.args = { imgPath: imgPath, imgSize: "sm" };

export const Md = Template.bind({});
Md.args = { imgPath: imgPath, imgSize: "md" };

export const Lg = Template.bind({});
Lg.args = { imgPath: imgPath, imgSize: "lg" };

export const Xl = Template.bind({});
Xl.args = { imgPath: imgPath, imgSize: "xl" };
