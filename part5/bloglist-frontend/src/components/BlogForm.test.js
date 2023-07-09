import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("BlogForm calls the event handler prop with the right details", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);
    const inputs = screen.getAllByRole("textbox");
    const createButton = screen.getByText("create");
    await user.type(inputs[0], "test title");
    await user.type(inputs[1], "test author");
    await user.type(inputs[2], "test url");
    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual({
      author: "test author",
      title: "test title",
      url: "test url",
    });
  });
});
