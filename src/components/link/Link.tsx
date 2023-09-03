// Props:
// - className (string): Optional. Class name of the link
// - to (stirng): Relative address of the link to redirect to
// - onClick (function () => void): Optional. Function that triggers when link is clicked
// - style (object): Optional. Inline styling of the link
// - state (object): Optional. Properties to be transferred to the redirected link
// - target (string): Optional. ReactRouterLink target. ('_blank' to open in new tab)
// - rel (string): Optional. ReactRouterLink rel. ('noopener noreferrer' to disallow robot crawling)
// - replace (boolean): Optional. Indicates replacing of current page in history stack
// ------------------------------------------------------------------------------

import { FC, PropsWithChildren } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

interface Props {
  className?: string;
  to: string;
  onClick?: () => void;
  style?: {};
  state?: {};
  target?: string;
  rel?: string;
  replace?: boolean;
}

const Link: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  to,
  onClick = () => {},
  style = {},
  target = "",
  rel = "",
  replace,
  state = {},
}) => {
  return (
    <ReactRouterLink
      to={to}
      className={className}
      onClick={onClick}
      style={style}
      target={target}
      rel={rel}
      replace={replace}
      state={{ ...state }}
    >
      {children}
    </ReactRouterLink>
  );
};

export default Link;
