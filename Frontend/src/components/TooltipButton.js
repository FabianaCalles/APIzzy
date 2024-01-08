import React from 'react';
import { Button, Tooltip } from 'reactstrap';

function TooltipButton({ tooltipText, id }) {
    const [tooltipOpen, setTooltipOpen] = React.useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <>
            <Button id={id} type="button" className="tooltip-button">
                ?
            </Button>
            <Tooltip 
                placement="right" 
                isOpen={tooltipOpen} 
                target={id} 
                toggle={toggle}>
                {tooltipText}
            </Tooltip>
        </>
    );
}

export default TooltipButton;
