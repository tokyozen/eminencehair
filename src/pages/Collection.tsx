import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';

const Collection = () => {
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const products = [
    {
      id: 1,
      name: "13x6 HD Lace Body Wave Wig",
      category: "body-wave",
      density: "180%",
      lengths: ["18\"", "20\"", "22\"", "24\"", "26\"", "28\"", "30\""],
      prices: [271, 290, 328, 341, 373, 393, 438],
      image: "https://eminenceextensions.com/old/wp-content/uploads/2025/05/780c71b2-7749-454f-95b6-66ada0d324e7.jpg",
      description: "Natural body wave texture with HD lace for seamless blending"
    },
    {
      id: 2,
      name: "13x6 HD Lace Straight Wig",
      category: "straight",
      density: "180%",
      lengths: ["18\"", "20\"", "22\"", "24\"", "26\"", "28\"", "30\""],
      prices: [271, 290, 328, 341, 373, 393, 438],
      image: "https://eminenceextensions.com/old/wp-content/uploads/2025/05/4928a5b9-be1f-4d6e-9bdb-927a8f2afa9b.jpg",
      description: "Sleek straight hair with premium HD lace construction"
    },
    {
      id: 3,
      name: "HD Lace Deep Wave Wig",
      category: "curly",
      density: "180%",
      lengths: ["18\"", "20\"", "22\"", "24\"", "26\"", "28\"", "30\""],
      prices: [281, 300, 338, 351, 383, 403, 448],
      image: "https://eminenceextensions.com/old/wp-content/uploads/2025/05/ca7ef7cb-f5f7-4f21-be43-bd3b9c7725e9.jpg",
      description: "Beautiful deep wave curls for added volume and texture"
    },
    {
      id: 4,
      name: "13x6 HD Lace Body Wave Wig",
      category: "body-wave",
      density: "200%",
      lengths: ["32\"", "34\"", "36\"", "38\"", "40\""],
      prices: [445, 537, 597, 685, 750],
      image: "https://eminenceextensions.com/old/wp-content/uploads/2025/05/780c71b2-7749-454f-95b6-66ada0d324e7.jpg",
      description: "Extra length body wave with 200% density for fuller coverage"
    },
    {
      id: 5,
      name: "13x4 HD Lace Wig",
      category: "straight",
      density: "180%",
      lengths: ["20\"", "24\"", "26\"", "28\"", "30\""],
      prices: [268, 315, 351, 393, 423],
      image: "https://eminenceextensions.com/old/wp-content/uploads/2025/05/4928a5b9-be1f-4d6e-9bdb-927a8f2afa9b.jpg",
      description: "Classic 13x4 lace frontal with natural hairline"
    },
    {
      id: 6,
      name: "13x6 HD Lace Deep Wave Wig",
      category: "curly",
      density: "200%",
      lengths: ["18\"", "20\"", "22\"", "24\"", "26\"", "28\"", "30\"", "32\"", "34\"", "36\"", "38\"", "40\""],
      prices: [313, 338, 357, 413, 433, 453, 473, 455, 547, 607, 695, 765],
      image: "https://eminenceextensions.com/old/wp-content/uploads/2025/05/ca7ef7cb-f5f7-4f21-be43-bd3b9c7725e9.jpg",
      description: "Premium deep wave with maximum density for ultimate fullness"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'body-wave', name: 'Body Wave' },
    { id: 'straight', name: 'Straight' },
    { id: 'curly', name: 'Curly/Deep Wave' }
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Elegant Background */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-parallax-1.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-soft-black bg-opacity-50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="section-title text-shadow">Hair Collection</h1>
          <p className="text-xl text-warm-beige max-w-3xl mx-auto drop-shadow-lg text-shadow">
            Discover our premium collection of 100% human hair wigs and bundles. 
            Each piece is carefully crafted for natural beauty and lasting quality.
          </p>
        </div>
      </section>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filters and View Toggle */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    filter === category.id
                      ? 'bg-muted-coral text-warm-beige'
                      : 'bg-gray-800 text-gray-300 hover:bg-muted-coral hover:text-warm-beige'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-muted-coral text-warm-beige' : 'text-gray-400 hover:text-warm-beige'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-muted-coral text-warm-beige' : 'text-gray-400 hover:text-warm-beige'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={viewMode === 'grid' 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
          }>
            {filteredProducts.map((product) => (
              <div key={product.id} className={`card hover:scale-105 transition-all duration-300 group ${
                viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
              }`}>
                <div className={`aspect-square overflow-hidden rounded-lg mb-4 ${
                  viewMode === 'list' ? 'md:w-64 md:mr-6 md:mb-0' : ''
                }`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <h3 className="text-xl font-semibold mb-2 text-warm-beige group-hover:text-muted-coral transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 mb-3">{product.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <span className="bg-golden-yellow bg-opacity-20 text-golden-yellow px-2 py-1 rounded">
                        {product.density} Density
                      </span>
                      <span>HD Lace</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-300">Available Lengths & Prices:</div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                        {product.lengths.map((length, index) => (
                          <div key={index} className="bg-gray-800 bg-opacity-50 rounded px-2 py-1 text-center">
                            <span className="text-muted-coral font-medium">{length}</span>
                            <span className="text-gray-300 ml-2">${product.prices[index]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="w-full btn-primary">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Order CTA with Background */}
          <div className="mt-16 relative overflow-hidden rounded-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage: 'url(https://eminenceextensions.com/old/wp-content/uploads/2025/05/h1-slider2-background-img.jpg)'
              }}
            >
              <div className="absolute inset-0 bg-soft-black bg-opacity-50"></div>
            </div>
            
            <div className="relative z-10 card text-center bg-gradient-to-r from-muted-coral/10 to-golden-yellow/10 bg-soft-black bg-opacity-50">
              <h3 className="text-2xl font-bold mb-4 text-warm-beige text-shadow">Need Something Custom?</h3>
              <p className="text-gray-300 mb-6 text-shadow">
                Can't find exactly what you're looking for? We offer custom glueless wig units 
                made specifically for you.
              </p>
              <button className="btn-primary">
                Contact for Custom Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;