import { Meta } from "@storybook/react";
import Separator from ".";

export default {
  title: "Atoms/Separator",
  component: Separator,
} as Meta<typeof Separator>;

export const Standard = () => (
  <>
    <Separator>
      <pre>&#009;or&#009;</pre>
    </Separator>
    <Separator>and</Separator>
    <Separator />
  </>
);
