import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div className="flex min-h-screen flex-col bg-base-200  bg-gradient-to-t font-Rajdhani">
    <div className="className=z-10 mx-auto w-full max-w-5xl">
      <Header />
      <div>{children}</div>
    </div>
  </div>
);

export default Layout;
