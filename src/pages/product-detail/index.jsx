import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductActions from './components/ProductActions';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';
import MobileStickyActions from './components/MobileStickyActions';
import Icon from '../../components/AppIcon';

const ProductDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id') || '1';
  
  const [product, setProduct] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock product data
  const mockProduct = {
    id: productId,
    name: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation",
    brand: "AudioTech Pro",
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    rating: 4.5,
    reviewCount: 1247,
    sku: "ATP-WH-001",
    availability: "in-stock",
    description: `Experience premium audio quality with our flagship wireless headphones featuring advanced active noise cancellation technology.\n\nDesigned for audiophiles and professionals, these headphones deliver crystal-clear sound reproduction across all frequencies. The comfortable over-ear design ensures hours of listening comfort, while the long-lasting battery provides up to 30 hours of continuous playback.\n\nPerfect for travel, work, or leisure - these headphones adapt to your lifestyle with intelligent noise cancellation that automatically adjusts to your environment.`,
    features: [
      "Active Noise Cancellation with 3 modes",
      "30-hour battery life with quick charge",
      "Premium leather ear cushions",
      "Bluetooth 5.0 with multipoint connection",
      "Built-in microphone for calls",
      "Foldable design for portability",
      "Compatible with voice assistants"
    ],
    specifications: {
      "Driver Size": "40mm Dynamic",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32 Ohms",
      "Battery Life": "30 hours (ANC on)",
      "Charging Time": "2 hours",
      "Weight": "280g",
      "Connectivity": "Bluetooth 5.0, 3.5mm jack",
      "Warranty": "2 years"
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop"
    ],
    variants: [
      { id: 1, type: 'color', name: 'Midnight Black', available: true },
      { id: 2, type: 'color', name: 'Silver Gray', available: true },
      { id: 3, type: 'color', name: 'Rose Gold', available: false }
    ]
  };

  const mockReviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      title: "Exceptional sound quality!",
      comment: "These headphones exceeded my expectations. The noise cancellation is incredible and the sound quality is pristine. Perfect for my daily commute and work from home setup.",
      date: "2024-01-15",
      verified: true,
      helpful: 23
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 4,
      title: "Great value for money",
      comment: "Really impressed with the build quality and features. The battery life is as advertised and the comfort level is excellent for long listening sessions. Minor issue with the app connectivity but overall very satisfied.",
      date: "2024-01-10",
      verified: true,
      helpful: 18
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      rating: 5,
      title: "Perfect for travel",
      comment: "I travel frequently for work and these headphones have been a game changer. The noise cancellation makes flights so much more bearable and the foldable design is super convenient.",
      date: "2024-01-08",
      verified: true,
      helpful: 15
    },
    {
      id: 4,
      author: "David Thompson",
      rating: 4,
      title: "Solid performance",
      comment: "Good headphones overall. Sound quality is excellent and the build feels premium. The only downside is they can get a bit warm during extended use, but that's a minor complaint.",
      date: "2024-01-05",
      verified: true,
      helpful: 12
    }
  ];

  const mockRelatedProducts = [
    {
      id: 2,
      name: "Wireless Earbuds Pro",
      price: 149.99,
      originalPrice: 199.99,
      discount: 25,
      rating: 4.3,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Studio Monitor Headphones",
      price: 299.99,
      originalPrice: 0,
      discount: 0,
      rating: 4.7,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Gaming Headset RGB",
      price: 89.99,
      originalPrice: 129.99,
      discount: 31,
      rating: 4.2,
      reviewCount: 1203,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.4,
      reviewCount: 678,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 500);

    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.includes(productId));
  }, [productId]);

  const handleAddToCart = async ({ variant, quantity }) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find(item => 
      item.id === product.id && item.variant?.id === variant?.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        variant,
        quantity
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Show success message or redirect to cart
    navigate('/shopping-cart');
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter(id => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-surface-secondary rounded mb-8 w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-surface-secondary rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-surface-secondary rounded w-3/4"></div>
                <div className="h-6 bg-surface-secondary rounded w-1/2"></div>
                <div className="h-10 bg-surface-secondary rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-surface-secondary rounded"></div>
                  <div className="h-4 bg-surface-secondary rounded w-5/6"></div>
                  <div className="h-4 bg-surface-secondary rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <Icon name="Package" size={64} className="mx-auto mb-4 text-text-muted" />
            <h1 className="text-2xl font-bold text-text-primary mb-2">Product Not Found</h1>
            <p className="text-text-secondary mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/product-catalog-browse')}
              className="text-primary hover:text-primary-700 font-medium"
            >
              ← Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <NavigationBreadcrumbs className="mb-6" />

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductImageGallery 
              images={product.images} 
              productName={product.name} 
            />
          </div>

          {/* Product Information & Actions */}
          <div className="space-y-8">
            <ProductInfo
              title={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              rating={product.rating}
              reviewCount={product.reviewCount}
              description={product.description}
              features={product.features}
              specifications={product.specifications}
              brand={product.brand}
              sku={product.sku}
              availability={product.availability}
            />

            {/* Desktop Actions */}
            <div className="hidden md:block">
              <ProductActions
                variants={product.variants}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                isInWishlist={isInWishlist}
                availability={product.availability}
                maxQuantity={10}
              />
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-12">
          <CustomerReviews
            reviews={mockReviews}
            averageRating={product.rating}
            totalReviews={product.reviewCount}
          />
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <RelatedProducts products={mockRelatedProducts} />
        </div>
      </main>

      {/* Mobile Sticky Actions */}
      <MobileStickyActions
        price={product.price}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        isInWishlist={isInWishlist}
        availability={product.availability}
        variants={product.variants}
        maxQuantity={10}
      />
    </div>
  );
};

export default ProductDetail;