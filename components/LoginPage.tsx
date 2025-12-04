
import React, { useState } from 'react';
import { Mail, Lock, User, Loader2, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: { name: string; email: string; phone?: string }) => void;
}

const STORAGE_KEY = 'venkatagiri_users';

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError(null);
    setSuccessMsg(null);
    setShowPassword(false);
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user types
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const usersStr = localStorage.getItem(STORAGE_KEY);
      const users = usersStr ? JSON.parse(usersStr) : {};

      if (mode === 'signup') {
        // Validation
        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters long.");
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match.");
        }
        if (users[formData.email]) {
          throw new Error("An account with this email already exists.");
        }

        // Save User
        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password // In a real app, hash this!
        };
        
        users[formData.email] = newUser;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        
        setSuccessMsg("Account created successfully! Please sign in.");
        setTimeout(() => {
          setMode('signin');
          setSuccessMsg(null);
          setFormData(prev => ({ ...prev, password: '' })); // Keep email filled
          setLoading(false);
        }, 1500);
        return; // Don't stop loading yet if we were continuing, but here we pause
      } 
      
      if (mode === 'signin') {
        const user = users[formData.email];
        
        if (!user) {
          throw new Error("No account found with this email. Please sign up.");
        }
        
        if (user.password !== formData.password) {
          throw new Error("Incorrect password.");
        }

        // Login Success
        onLoginSuccess({
          name: user.name,
          email: user.email
        });
      }

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      if (mode === 'signin' || error) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex overflow-hidden min-h-[600px] animate-in fade-in zoom-in-95 duration-500">
        
        {/* Left Side - Visual (Hidden on Mobile) */}
        <div className="hidden md:flex w-5/12 bg-gradient-to-br from-orange-600 to-orange-500 flex-col justify-between p-12 relative overflow-hidden text-white">
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-4">Venkatagiri<span className="text-orange-200">Eats</span></h1>
            <h2 className="text-2xl font-semibold mb-6">
              {mode === 'signin' ? "Welcome Back!" : "Join the Community"}
            </h2>
            <p className="text-orange-100 text-lg leading-relaxed">
              {mode === 'signin' 
                ? "Hungry? Your favorite Venkatagiri flavors are just a click away. Login to track your orders."
                : "Sign up to unlock exclusive deals, track live orders, and enjoy the best food in town."}
            </p>
          </div>

          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-900 opacity-20 blur-3xl"></div>
          
          <div className="relative z-10 text-sm font-medium opacity-80">
            &copy; 2024 Venkatagiri Eats
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white relative">
          <div className="max-w-md mx-auto w-full">
            <div className="md:hidden mb-8 text-center">
               <h1 className="text-3xl font-extrabold text-gray-900">Venkatagiri<span className="text-orange-600">Eats</span></h1>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-gray-500 mb-8">
              {mode === 'signin' 
                ? 'Enter your details to proceed' 
                : 'Fill in your details to get started'}
            </p>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-in slide-in-from-top-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {successMsg && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2 animate-in slide-in-from-top-2">
                <CheckCircle size={18} />
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Field (Signup Only) */}
              {mode === 'signup' && (
                <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Siva Kumar"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder={mode === 'signup' ? "Min 6 characters" : "Enter password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Signup Only) */}
              {mode === 'signup' && (
                <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2">
                  <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98] mt-4"
              >
                {loading ? <Loader2 className="animate-spin" /> : (mode === 'signin' ? 'Sign In' : 'Sign Up')}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={toggleMode}
                  className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  {mode === 'signin' ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
