import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProductsIndex = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, []);

    return null;
};

export default ProductsIndex;
