import { Meta, StoryFn } from "@storybook/react";
import ShapeImage from ".";

export default {
  title: "Atoms/ShapeImage",
  component: ShapeImage,
} as Meta<typeof ShapeImage>;

const Template: StoryFn<typeof ShapeImage> = (args) => <ShapeImage {...args} />;

const imgPath = "UserImageSample.png";

export const Sm = Template.bind({});
Sm.args = { imgPath: imgPath };

export const Md = Template.bind({});
Md.args = { imgPath: imgPath, imgSize: "md" };

export const Lg = Template.bind({});
Lg.args = { imgPath: imgPath, imgSize: "lg" };
