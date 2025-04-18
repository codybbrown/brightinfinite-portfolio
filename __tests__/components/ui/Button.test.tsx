import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies correct className", () => {
    render(<Button className="test-class">Click me</Button>);
    expect(screen.getByText("Click me")).toHaveClass("test-class");
  });
});
