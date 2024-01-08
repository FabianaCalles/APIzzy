import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

function ConditionalButton({ onRemove, resourceIndex, methodType, conditionIndex }) {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const handleRemove = () => {
        if (!onRemove()) {
            setPopoverOpen(true);
        }
    };

    return (
        <>
            <Button 
                id={`deleteButton-${resourceIndex}-${methodType}-${conditionIndex}`} 
                onClick={handleRemove}
                style={{backgroundColor: popoverOpen ? 'red' : 'initial'}}
            >
                {popoverOpen ? 'No se pueden eliminar más' : 'Eliminar Condición'}
            </Button>
            <Popover 
                placement="bottom" 
                isOpen={popoverOpen} 
                target={`deleteButton-${resourceIndex}-${methodType}-${conditionIndex}`} 
                toggle={() => setPopoverOpen(false)}
            >
                <PopoverHeader>Error</PopoverHeader>
                <PopoverBody>No puedes eliminar todas las condiciones. Debe haber al menos una.</PopoverBody>
            </Popover>
        </>
    );
}

export default ConditionalButton;
