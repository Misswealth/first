import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { MessageBox } from './MessageBox';
import { useSelector } from 'react-redux';

export const Caro1 = () => {
    const userTopSellersList = useSelector((state) => state.userTopSellersList);
    const {
        users: sellers,
    } = userTopSellersList;
    return (
        
        <>
            {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
            <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src="images/s2.png" alt={seller.seller.name} />
                  {/* <p className="legend">{seller.seller.name}</p> */}
                </Link>
              </div>,
              <div key={seller._id}>
              <Link to={`/seller/${seller._id}`}>
                <img src="images/s1.png" alt={seller.seller.name} />
                {/* <p className="legend">{seller.seller.name}</p> */}
              </Link>
            </div>
            ))}
          </Carousel>
        </>
    )
};




