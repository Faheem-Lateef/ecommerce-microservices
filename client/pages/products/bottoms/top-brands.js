import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Row } from 'react-bootstrap';
import Head from 'next/head';
import Link from 'next/link';

import Loader from '../../../components/common/Loader';
import Product from '../../../components/home/Product';
import useWindowSize from '../../../hooks/useWindowSize';

const BottomsTopBrands = ({ products, currentUser }) => {
  const [loading, setLoading] = useState(true);
  const [onMobile, setOnMobile] = useState(false);

  const { width } = useWindowSize();

  const filteredProducts = products?.filter((product) => product.category === 'Bottom');

  useEffect(() => {
    if (width <= 576) {
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }

    if (products) {
      setLoading(false);
    }
  }, [width, products]);

  return (
<>
<Head>
<title>Top Brands Bottoms | Aurapan</title>
</Head>
{loading
  ? (
<div
className="d-flex justify-content-center align-items-center px-0"
style={{ marginTop: '80px' }}
>
<Loader />
</div>
    )
  : (
<>
<h1 className="category-header">Top Brands Bottoms</h1>
<Breadcrumb className="breadcrumb-label">
<Link href="/" passHref>
<Breadcrumb.Item>Home</Breadcrumb.Item>
</Link>

<Link href="/products/bottoms" passHref>
<Breadcrumb.Item>Bottoms</Breadcrumb.Item>
</Link>

<Link href="/products/bottoms/top-brands" passHref>
<Breadcrumb.Item>Top Brands</Breadcrumb.Item>
</Link>
</Breadcrumb>

<Row className="mx-0">
{filteredProducts.map((item) => (
<Col key={item.id} xs={6} md={4} xl={3} className="p-0">
<Product
onMobile={onMobile}
product={item}
currentUser={currentUser}
/>
</Col>
))}
</Row>
</>
    )}
</>
  );
};

export default BottomsTopBrands;
