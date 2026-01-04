import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, SSRProvider } from 'react-bootstrap';

import '../styles/app.css';

import * as ga from '../lib/ga';

import buildClient from '../api/build-client';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

const MyApp = ({ Component, pageProps, currentUser }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
		<SSRProvider>
			<Head>
				<title>Aurapan | Women&apos;s Clothing Online Shop</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Header currentUser={currentUser} {...pageProps} />
			<main className="pb-5" style={{ marginTop: '74px' }}>
				<Container fluid className="px-0">
					<Component currentUser={currentUser} {...pageProps} />
				</Container>
			</main>
			<Footer />
		</SSRProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  
  let data = { currentUser: null };
  try {
    const res = await client.get('/api/users/currentuser');
    data = res.data;
  } catch (err) {
    console.error('Error fetching current user:', err.message);
  }

  let products = [];
  let orderProducts = [];
  let paymentProducts = [];
  let users = [];
  let bestseller = [];

  try {
    const res = await client.get('/api/products');
    products = res.data;
  } catch (err) {}

  try {
    const res = await client.get('/api/orders/products');
    orderProducts = res.data;
  } catch (err) {}

  try {
    const res = await client.get('/api/payments/products');
    paymentProducts = res.data;
  } catch (err) {}

  try {
    const res = await client.get('/api/users');
    users = res.data;
  } catch (err) {}

  try {
    const res = await client.get('/api/products/bestseller');
    bestseller = res.data;
  } catch (err) {}

  let pageProps = {
    products,
    orderProducts,
    paymentProducts,
    users,
    bestseller,
    myOrders: [],
    myReviews: [],
    orders: []
  };

  if (data.currentUser !== null) {
    try {
      const { data: myOrders } = await client.get('/api/orders/myorders');
      pageProps.myOrders = myOrders;
    } catch (err) {}

    try {
      const { data: myReviews } = await client.get('/api/products/myreviews');
      pageProps.myReviews = myReviews;
    } catch (err) {}

    try {
      const { data: orders } = await client.get('/api/orders');
      pageProps.orders = orders;
    } catch (err) {}
  }

  return {
    pageProps,
    ...data
  };
};

export default MyApp;
