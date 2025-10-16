import { ShoppingBag, Heart, Truck, Shield } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: ShoppingBag,
      title: 'Curated Collection',
      description: 'Hand-picked selection of premium shoes from top brands',
    },
    {
      icon: Heart,
      title: 'Quality Guaranteed',
      description: 'Only authentic products with verified quality assurance',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Express shipping across Pakistan with tracking',
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Safe and secure payment methods for your peace of mind',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              About ShoeHaven
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your trusted destination for premium footwear
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded with a passion for quality footwear, ShoeHaven has become Pakistan's premier
                destination for shoe enthusiasts. We believe that the right pair of shoes can
                transform not just your outfit, but your entire day.
              </p>
              <p className="text-muted-foreground mb-4">
                Our carefully curated collection features everything from elegant formal shoes to
                comfortable casual wear, athletic performance footwear to trendy fashion statements.
                Each product is selected with meticulous attention to quality, comfort, and style.
              </p>
              <p className="text-muted-foreground">
                At ShoeHaven, we're committed to providing an exceptional shopping experience,
                competitive prices, and customer service that goes above and beyond. Whether you're
                looking for your next favorite pair or exploring new styles, we're here to help
                you find the perfect fit.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 rounded-lg p-3 shadow-md">
                      <Icon className="h-6 w-6 text-white dark:text-slate-900" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 shadow-2xl text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-white/90 text-lg mb-6">
              Follow us on social media for the latest arrivals, exclusive deals, and style inspiration
            </p>
            <div className="flex justify-center gap-4">
              <div className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                @shoehaven
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
