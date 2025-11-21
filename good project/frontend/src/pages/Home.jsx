import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  const features = [
    {
      icon: '🍽️',
      title: 'Fresh Ingredients',
      description: 'We use only the freshest ingredients sourced locally from trusted farmers and suppliers',
      gradient: 'from-green-400 to-green-600',
    },
    {
      icon: '🤖',
      title: 'AI Recommendations',
      description: 'Get personalized dish recommendations powered by advanced AI that learns your preferences',
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      icon: '📅',
      title: 'Easy Reservations',
      description: 'Book your table online in just a few clicks with our seamless reservation system',
      gradient: 'from-blue-400 to-blue-600',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Orders Served', icon: '🍕' },
    { value: '5,000+', label: 'Happy Customers', icon: '😊' },
    { value: '4.9/5', label: 'Average Rating', icon: '⭐' },
    { value: '50+', label: 'Menu Items', icon: '📋' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Design */}
      <div className="hero min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary"></div>
        <div className="absolute inset-0 bg-[url(data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)] opacity-20"></div>

        <div className="hero-content text-center text-neutral-content relative z-10 px-4">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm mb-4 animate-float">
                <span className="text-6xl">🍽️</span>
              </div>
            </motion.div>

            <motion.h1
              className="mb-6 text-5xl md:text-7xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                {t('home.title')}
              </span>
            </motion.h1>

            <motion.p
              className="mb-8 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t('home.subtitle')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/menu"
                className="btn btn-lg bg-white text-primary hover:bg-white/90 text-lg px-8 shadow-2xl hover-lift border-none"
              >
                Explore Menu
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/reservations"
                className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary text-lg px-8 border-2 hover-lift"
              >
                Make Reservation
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="bg-base-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-base-content/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Why Choose Us?</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Experience the perfect blend of culinary excellence and cutting-edge technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card bg-base-100 shadow-xl hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="card-body items-center text-center p-8">
                <motion.div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-4xl">{feature.icon}</span>
                </motion.div>
                <h2 className="card-title text-2xl mb-3">{feature.title}</h2>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="gradient-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience Excellence?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made us their favorite dining destination
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/menu"
                className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none px-12 shadow-xl"
              >
                Order Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
