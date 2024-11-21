import { Meta } from "@storybook/react";
import Separator from ".";

export default {
  title: "Atoms/Separator",
  component: Separator,
} as Meta<typeof Separator>;

export const Standard = () => (
  <>
    <Separator>or</Separator>
    <Separator>and</Separator>
    <Separator />
  </>
);
