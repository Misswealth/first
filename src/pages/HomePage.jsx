import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {ProductCardComp} from '../components/ProductCardComp';
import {LoadingBoxComp} from '../components/LoadingBoxComp';
import {MessageBox} from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/ProductActions';
import { listTopSellers } from '../redux/actions/UserActions';
import { Caro1 } from '../components/CarouselComp1';


export const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>

      {loadingSellers ? (
        <LoadingBoxComp></LoadingBoxComp>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          <Caro1/>
        </>
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBoxComp></LoadingBoxComp>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <ProductCardComp key={product._id} product={product}></ProductCardComp>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
