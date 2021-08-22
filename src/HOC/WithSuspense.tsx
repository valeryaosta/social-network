import React, {ComponentType, Suspense} from 'react';
import Preloader from '../Common Components/Preloader/Preloader';

const WithSuspense = (Component: ComponentType) => {
    return <Suspense fallback={<Preloader/>}>
        <Component/>
    </Suspense>
};

export default WithSuspense;