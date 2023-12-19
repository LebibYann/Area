import { text } from "stream/consumers";
import "./Button.css";
import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren<React.HTMLProps<HTMLAnchorElement>>
{
}

const RedirectionButton = ({children, ...props} : ButtonProps): JSX.Element => {
    return (
        <a {...props}>
            {children}
        </a>
    );
};

export default RedirectionButton;