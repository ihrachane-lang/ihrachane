import PartnerUpdate from '@/components/dashboard/partner/PartnerUpdate';
import React from 'react';

const page = async ({ params }) => {
    const {id} = await params 
    return (
        <div>
            <PartnerUpdate partnerId={id} />
        </div>
    );
};

export default page;