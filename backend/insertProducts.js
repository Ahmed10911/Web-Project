const mongoose = require('mongoose');
const Product = require('./models/product'); // Make sure the path is correct

// MongoDB connection string (use your own MongoDB URI)
mongoose.connect('mongodb://127.0.0.1:27017/eshop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const products = [
  { name: "Men's Polo Shirts Long Sleeve Mercerized Cotton Stylish Collared Shirts", price: 30, image: "https://m.media-amazon.com/images/I/5148TNCvrFL._AC_UL320_.jpg", inStock: true },
  { name: "Alex Vando Mens Regular Fit Long Sleeve Casual Plaid Flannel Shirt", price: 45, image: "https://m.media-amazon.com/images/I/91CwZqgpsnL._AC_UL320_.jpg", inStock: true },
  { name: "Mens Golf Shirt", price: 20, image: "https://m.media-amazon.com/images/I/91xszuIZ7kL._AC_UL320_.jpg", inStock: true },
  { name: "Legendary Whitetails Legendary Flannel Shirt", price: 80, image: "https://m.media-amazon.com/images/I/71X5GiDgh4L._AC_UL320_.jpg", inStock: true },
  { name: "QLZ Men's Bomber Jackets Varsity Flight Jacket", price: 60, image: "https://m.media-amazon.com/images/I/71ceKQJxARL._AC_UL320_.jpg", inStock: true },
  { name: "MAGCOMSEN Men's Winter Coats Water Resistant Ski Snow Jacket", price: 35, image: "https://m.media-amazon.com/images/I/71BVbWYn5fL._AC_UL320_.jpg", inStock: true },
  { name: "MAGNIVIT Men's Lightweight Jackets Light Windbreake", price: 50, image: "https://m.media-amazon.com/images/I/61WDrXxExPL._AC_UL320_.jpg", inStock: true },
  { name: "TBMPOY Men's Lightweight Bomber Jackets", price: 40, image: "https://m.media-amazon.com/images/I/61LfdCd6X1L._AC_UL320_.jpg", inStock: true },
  { name: "Men's Fashion Washed Straight Fit Slim Jeans", price: 120, image: "https://www.amazon.com/TMMMT-Fashion-Washed-Straight-Black/dp/B0C4TFBMN3/ref=sr_1_39?dib=eyJ2IjoiMSJ9.am7WEoPCz7ro2VeZ_s7E8pe2jg70ZXe1lZWNWCCvLX9UDq9VZy1F7P8cLHQEPZhs8rer9E4p2bAMHbt-4hGV4AXev1J4gs2McYti0BRyoqKekYIQT9nwoG20tlTBBw138ZTfFWgKcd7zpDAvFesS35RSApzLggBc9HCKbdKDobcYFBiv0T33WB6VVrMrC3-OrEBGnCAxWxhtCOn-tmPllcTh6QEbM_njQQK76zV_zlMcM0V_18636TKnmr56odO7jWwDDR58dlBhRD91JtJ-SwMUJmiKfrQj75kp_-QLcO_TjGbU4Y2J6uNz0EZkmuFmLgHChmYW7byMx9bh8f8GUDYQ-u-l5zJl6ue8MQJ8J3hCAhZL_BG68ru2NUmKRWx3t352qiNKrAtKDM-le01u0bWZmsG0ULp686mtloGp3Dc3nOB01niMSvlRygshbH5N.FQfPUytKLX_xp0VwtPNjDjfNUaMzsObgZbZp01etTvQ&dib_tag=se&keywords=plain+jeans+for+men&qid=1735642370&sr=8-39", inStock: true },
  { name: "Men's Polo Shirt", price: 28, image: "https://via.placeholder.com/150?text=Polo+Shirt", inStock: true },
  { name: "Men's Bomber Jacket", price: 75, image: "https://via.placeholder.com/150?text=Bomber+Jacket", inStock: true },
  { name: "Men's Winter Coat", price: 100, image: "https://via.placeholder.com/150?text=Winter+Coat", inStock: true }
];

Product.insertMany(products)
  .then(() => {
    console.log('Products inserted successfully');
    mongoose.connection.close(); // Close the connection after insertion
  })
  .catch((err) => {
    console.error('Error inserting products:', err);
  });
