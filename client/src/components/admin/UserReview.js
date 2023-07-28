import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import { fetchReviews} from "../../features/reviews/slice";
import './chart.css'


const UserReview = () => {
  
  const dispatch = useDispatch();
 // const allReviews = useSelector(state => state.reviews.list);
  const [allReviews,setAllReviews] = useState([])
console.log(allReviews)
  // Fetch reviews on component mount
  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);
  console.log(allReviews)
  useEffect(() => {
    fetch('https://fashion-store-deployed.onrender.com/reviews')
      .then(response => response.json())
      .then(data => {
        setAllReviews(data.slice(0, 20))
      });
  }, []);
  
  // Sort reviews by date
// Sort reviews by date
const sortedReviews = [...allReviews].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  // Create arrays of ratings and dates
  const ratings = sortedReviews.map(review => review.rating);
  const dates = sortedReviews.map(review => review.created_at);

  const data = {
    series: [
      {
        name: "Review",
        data: ratings,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 10,
        width:'10%',
      },
      fill: {
        colors: ["#A488F0"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: ratings,
      },
      xaxis: {
        type: "datetime",
        categories: dates,
      },
      yaxis: {
        show: false
      },
      toolbar:{
        show: false
      }
    },
  };
  
  return <div className="customerReview">
    <h1 style={{textalign:'center'}}>User Reviews</h1>
    <Chart options={data.options} series={data.series} type="area"  className= "charts" />
  </div>;
};

export default UserReview;
