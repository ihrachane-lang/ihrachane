import ShippingPartners from '@/components/Home/shiping-partners/ShippingPartners';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/Partner';
import React from 'react';

const page =async () => {
    await dbConnect()
    const partners = await Partner.find()
    
    return (
        <ShippingPartners partners={partners}/>
    );
};

export default page;