import Link from "next/link";
import { FileText, Users, DollarSign, BarChart3, CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">InvoicePro</span>
        </div>
        <div className="space-x-4">
          <Link href="/sign-in" className="text-gray-600 hover:text-gray-900 font-medium">
            Sign In
          </Link>
          <Link 
            href="/sign-up" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Professional Invoicing
          <span className="text-blue-600"> Made Simple</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Create beautiful invoices, manage clients, track payments, and get paid faster. 
          Everything you need to run your business professionally.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/sign-up" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg flex items-center gap-2"
          >
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="#features" 
            className="bg-white text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition font-semibold text-lg border-2 border-gray-200"
          >
            Learn More
          </Link>
        </div>
        <p className="text-gray-500 mt-4">No credit card required • Free forever plan</p>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Everything You Need to Get Paid
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FileText className="w-12 h-12 text-blue-600" />}
            title="Professional Invoices"
            description="Create beautiful, branded invoices in seconds with our intuitive builder."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-purple-600" />}
            title="Client Portal"
            description="Give clients a dedicated portal to view and pay their invoices online."
          />
          <FeatureCard
            icon={<DollarSign className="w-12 h-12 text-green-600" />}
            title="Accept Payments"
            description="Integrate with Stripe to accept credit card payments instantly."
          />
          <FeatureCard
            icon={<BarChart3 className="w-12 h-12 text-orange-600" />}
            title="Track & Analytics"
            description="Monitor payment status, revenue, and outstanding invoices at a glance."
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose InvoicePro?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <BenefitItem text="Get paid 3x faster with automated payment reminders" />
            <BenefitItem text="Save hours with invoice templates and recurring invoices" />
            <BenefitItem text="Look professional with custom branding and logos" />
            <BenefitItem text="Never miss a payment with automatic status tracking" />
            <BenefitItem text="Accept payments from anywhere in the world" />
            <BenefitItem text="Export to PDF and send via email in one click" />
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Start free, upgrade when you need more
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            name="Free"
            price="$0"
            description="Perfect for getting started"
            features={[
              "Up to 5 invoices/month",
              "Basic client management",
              "PDF export",
              "Email support"
            ]}
          />
          <PricingCard
            name="Pro"
            price="$19"
            description="For growing businesses"
            features={[
              "Unlimited invoices",
              "Client portal",
              "Stripe payments",
              "Custom branding",
              "Priority support"
            ]}
            highlighted={true}
          />
          <PricingCard
            name="Business"
            price="$49"
            description="For established companies"
            features={[
              "Everything in Pro",
              "Multi-user access",
              "Advanced analytics",
              "API access",
              "Dedicated support"
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Paid Faster?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of freelancers and businesses using InvoicePro to manage their invoicing.
          </p>
          <Link 
            href="/sign-up" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg inline-flex items-center gap-2"
          >
            Start Free Today <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold text-white">InvoicePro</span>
          </div>
          <p className="mb-4">Professional invoice management for modern businesses</p>
          <p className="text-sm">© 2024 InvoicePro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
      <p className="text-lg text-gray-700">{text}</p>
    </div>
  );
}

function PricingCard({ 
  name, 
  price, 
  description, 
  features, 
  highlighted = false 
}: { 
  name: string; 
  price: string; 
  description: string; 
  features: string[]; 
  highlighted?: boolean;
}) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 ${highlighted ? 'ring-4 ring-blue-600 relative' : ''}`}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-6">
        <span className="text-5xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-600">/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <Link 
        href="/sign-up" 
        className={`block text-center py-3 rounded-lg font-semibold transition ${
          highlighted 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Get Started
      </Link>
    </div>
  );
}
