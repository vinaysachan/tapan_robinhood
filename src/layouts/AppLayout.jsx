import { useState, useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

function AppLayout({ children }) {

    const tawkMessengerRef          =   useRef();

    return (<>
        {children}
        <TawkMessengerReact
            propertyId="662a861fa0c6737bd1306351"
            widgetId="1hsb1nrpf"
            ref={tawkMessengerRef}
        />
    </>)
}

export default AppLayout
