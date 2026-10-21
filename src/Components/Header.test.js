import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

jest.mock("./CircleParticles", () => () => <canvas data-testid="particles" />);

const data = {
  name: "Meik Kenworthy",
  description: "",
  image: "profilepic.jpg",
  bio: "First paragraph.\nSecond paragraph.\nThird paragraph."
};

test("renders the bio as paragraphs under the title", () => {
  render(<Header data={data} />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Meik Kenworthy");
  expect(screen.getByText("First paragraph.")).toBeInTheDocument();
  expect(screen.getByText("Second paragraph.")).toBeInTheDocument();
  expect(screen.getByText("Third paragraph.")).toBeInTheDocument();
});

test("LinkedIn button links to the profile", () => {
  render(<Header data={data} />);
  const link = screen.getByRole("link", { name: "LinkedIn" });
  expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/kenworthym");
  expect(screen.queryByText("Resume")).not.toBeInTheDocument();
});

test("Schedule a meeting opens a modal with both calendar links", () => {
  render(<Header data={data} />);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("link", { name: "Schedule a meeting" }));
  const dialog = screen.getByRole("dialog");
  expect(dialog).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Personal" })).toHaveAttribute(
    "href",
    "https://calendar.app.google/QmKRZNN5a9D2jqtx8"
  );
  expect(screen.getByRole("link", { name: "Professional" })).toHaveAttribute(
    "href",
    "https://calendar.app.google/5fRzmcHQeSTVerJ58"
  );

  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
