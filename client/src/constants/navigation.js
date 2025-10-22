
import { ShoppingCart, Home, Package, User, Heart, Clock } from 'lucide-react';

export const NAV_LINKS = [
  { 
    path: '/', 
    label: 'Home',
    icon: Home,
    description: 'Go to homepage'
  },
  { 
    path: '/products', 
    label: 'Products',
    icon: Package,
    description: 'Browse all products'
  },
  { 
    path: '/cart', 
    label: 'Cart',
    icon: ShoppingCart,
    showBadge: true, 
    description: 'View your shopping cart'
  },
];

export const USER_MENU_LINKS = [
  {
    path: '/profile',
    label: 'My Profile',
    icon: User,
    description: 'View and edit your profile'
  },
  {
    path: '/orders',
    label: 'My Orders',
    icon: Package,
    description: 'Track your orders'
  },
  {
    path: '/wishlist',
    label: 'Wishlist',
    icon: Heart,
    description: 'View saved items'
  },
];

export const FOOTER_LINKS = {
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
      { label: 'Blog', path: '/blog' },
    ]
  },
  help: {
    title: 'Help & Support',
    links: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'FAQs', path: '/faqs' },
      { label: 'Shipping Info', path: '/shipping' },
      { label: 'Returns', path: '/returns' },
      { label: 'Size Guide', path: '/size-guide' },
    ]
  },
  shop: {
    title: 'Shop',
    links: [
      { label: 'All Products', path: '/products' },
      { label: 'Clothing', path: '/products?category=clothing' },
      { label: 'Footwear', path: '/products?category=footwear' },
      { label: 'Accessories', path: '/products?category=accessories' },
      { label: 'Electronics', path: '/products?category=electronics' },
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Disclaimer', path: '/disclaimer' },
    ]
  },
};

export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/fabrico',
    icon: 'facebook',
    color: '#1877F2'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/fabrico',
    icon: 'instagram',
    color: '#E4405F'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/fabrico',
    icon: 'twitter',
    color: '#1DA1F2'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/fabrico',
    icon: 'linkedin',
    color: '#0A66C2'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@fabrico',
    icon: 'youtube',
    color: '#FF0000'
  },
];

export const QUICK_ACTIONS = [
  {
    label: 'Track Order',
    path: '/track-order',
    icon: Clock,
    color: 'brand'
  },
  {
    label: 'Wishlist',
    path: '/wishlist',
    icon: Heart,
    color: 'negative'
  },
];
