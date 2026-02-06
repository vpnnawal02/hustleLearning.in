import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/contexts/AuthContext';
import { authAPI } from '../components/services/api';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [step, setStep] = useState(1); // 1: Form, 2: OTP
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        class: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [resendTimer, setResendTimer] = useState(30);

    const otpInputRefs = useRef([]);
    const classes = ['6', '7', '8', '9', '10', '11', '12'];

    // Timer for resend OTP
    useEffect(() => {
        if (step === 2 && resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [step, resendTimer]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        if (!formData.class) {
            newErrors.class = 'Please select your class';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle sending OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            try {
                console.log('📤 Sending OTP to:', formData.phone);

                const result = await authAPI.sendOTP(
                    formData.phone,
                    formData.name,
                    parseInt(formData.class)
                );

                console.log('✅ OTP Send Result:', result);

                if (result.success) {
                    setStep(2);
                    setResendTimer(30);
                    // Focus first OTP input
                    setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
                } else {
                    setErrors({ phone: result.message || 'Failed to send OTP' });
                }
            } catch (error) {
                console.error('❌ Send OTP Error:', error);
                setErrors({ phone: error.response?.data?.detail || 'Failed to send OTP. Please try again.' });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Handle OTP input change
    const handleOtpChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Take only last character
        setOtp(newOtp);
        setOtpError('');

        // Auto-focus next input
        if (value && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    // Handle OTP input keydown
    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                otpInputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    // Handle OTP paste
    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);

        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('');
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);

        // Focus last filled input or last input
        const focusIndex = Math.min(newOtp.length, 5);
        otpInputRefs.current[focusIndex]?.focus();
    };

    // Verify OTP
    const handleVerifyOTP = async () => {
        const otpValue = otp.join('');

        if (otpValue.length !== 6) {
            setOtpError('Please enter complete 6-digit OTP');
            return;
        }

        setIsSubmitting(true);

        try {
            console.log('🔐 Verifying OTP:', otpValue);

            const result = await authAPI.verifyOTP(
                formData.phone,
                otpValue,
                formData.name,
                parseInt(formData.class)
            );

            console.log('✅ Verify Result:', result);

            if (result.success) {
                // Login with AuthContext
                login(result.user, result.token);

                console.log('🎉 Login successful!');

                // Show success message
                alert(`Welcome to Hustle Learning, ${result.user.name}! 🎉`);

                // Redirect to home or profile
                navigate('/');
            } else {
                setOtpError(result.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('❌ Verify OTP Error:', error);
            setOtpError(error.response?.data?.detail || 'Verification failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Resend OTP
    const handleResendOTP = async () => {
        try {
            console.log('🔄 Resending OTP...');

            const result = await authAPI.sendOTP(
                formData.phone,
                formData.name,
                parseInt(formData.class)
            );

            if (result.success) {
                setOtp(['', '', '', '', '', '']);
                setOtpError('');
                setResendTimer(30);
                alert('OTP sent again!');
                otpInputRefs.current[0]?.focus();
            } else {
                alert(result.message || 'Failed to resend OTP');
            }
        } catch (error) {
            console.error('❌ Resend Error:', error);
            alert('Failed to resend OTP. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#121212] via-[#1E1E1E] to-[#121212]">

            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#FFC107]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FFC107]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">

                {/* Logo/Header */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="text-white">Hustle</span>
                        <span className="text-[#FFC107]">Learning</span>
                    </h1>
                    <p className="text-gray-400">
                        {step === 1 ? 'Start your learning journey today' : 'Verify your phone number'}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-[#1E1E1E] border border-gray-800 rounded-2xl shadow-2xl p-8 animate-fade-in-up delay-300">

                    {step === 1 ? (
                        // Step 1: Registration Form
                        <>
                            <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

                            <form onSubmit={handleSendOTP} className="space-y-5">

                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Name <span className="text-[#FFC107]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className={`w-full bg-[#121212] border ${errors.name ? 'border-red-500' : 'border-gray-700'
                                            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC107] transition-colors`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone Number <span className="text-[#FFC107]">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            +91
                                        </span>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="9876543210"
                                            maxLength="10"
                                            className={`w-full bg-[#121212] border ${errors.phone ? 'border-red-500' : 'border-gray-700'
                                                } rounded-lg pl-14 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC107] transition-colors`}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address <span className="text-gray-500 text-xs">(Optional)</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        className={`w-full bg-[#121212] border ${errors.email ? 'border-red-500' : 'border-gray-700'
                                            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFC107] transition-colors`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Class Selection */}
                                <div>
                                    <label htmlFor="class" className="block text-sm font-medium text-gray-300 mb-2">
                                        Select Your Class <span className="text-[#FFC107]">*</span>
                                    </label>
                                    <select
                                        id="class"
                                        name="class"
                                        value={formData.class}
                                        onChange={handleChange}
                                        className={`w-full bg-[#121212] border ${errors.class ? 'border-red-500' : 'border-gray-700'
                                            } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFC107] transition-colors cursor-pointer`}
                                    >
                                        <option value="" className="bg-[#1E1E1E]">Choose your class</option>
                                        {classes.map((cls) => (
                                            <option key={cls} value={cls} className="bg-[#1E1E1E]">
                                                Class {cls}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.class && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.class}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-[#FFC107] text-[#121212] font-semibold py-3 rounded-lg transition-all duration-300 ${isSubmitting
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-[#FFD54F] hover:scale-[1.02] shadow-lg hover:shadow-[#FFC107]/50'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending OTP...
                                        </span>
                                    ) : (
                                        'Continue with OTP'
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        // Step 2: OTP Verification
                        <>
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-[#FFC107]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">📱</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Enter OTP</h2>
                                <p className="text-gray-400 text-sm">
                                    We've sent a 6-digit code to<br />
                                    <span className="text-[#FFC107] font-semibold">+91 {formData.phone}</span>
                                </p>
                            </div>

                            {/* OTP Input Fields */}
                            <div className="mb-6">
                                <div className="flex justify-center gap-2 mb-4" onPaste={handleOtpPaste}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (otpInputRefs.current[index] = el)}
                                            type="tel"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            onFocus={(e) => e.target.select()}
                                            className={`w-12 h-14 text-center text-2xl font-bold bg-[#121212] border-2 ${otpError ? 'border-red-500' : digit ? 'border-[#FFC107]' : 'border-gray-700'
                                                } rounded-lg text-white focus:outline-none focus:border-[#FFC107] transition-colors`}
                                            autoComplete={index === 0 ? 'one-time-code' : 'off'}
                                        />
                                    ))}
                                </div>

                                {otpError && (
                                    <p className="text-red-500 text-sm text-center flex items-center justify-center gap-1">
                                        <span>⚠</span> {otpError}
                                    </p>
                                )}
                            </div>

                            {/* Verify Button */}
                            <button
                                onClick={handleVerifyOTP}
                                disabled={isSubmitting}
                                className={`w-full bg-[#FFC107] text-[#121212] font-semibold py-3 rounded-lg transition-all duration-300 mb-4 ${isSubmitting
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-[#FFD54F] hover:scale-[1.02] shadow-lg hover:shadow-[#FFC107]/50'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Verifying...
                                    </span>
                                ) : (
                                    'Verify OTP'
                                )}
                            </button>

                            {/* Resend OTP */}
                            <div className="text-center">
                                {resendTimer > 0 ? (
                                    <p className="text-gray-400 text-sm">
                                        Resend OTP in <span className="text-[#FFC107] font-semibold">{resendTimer}s</span>
                                    </p>
                                ) : (
                                    <button
                                        onClick={handleResendOTP}
                                        className="text-[#FFC107] font-semibold text-sm hover:underline"
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </div>

                            {/* Change Number */}
                            <button
                                onClick={() => {
                                    setStep(1);
                                    setOtp(['', '', '', '', '', '']);
                                    setOtpError('');
                                }}
                                className="w-full mt-4 text-gray-400 text-sm hover:text-[#FFC107] transition-colors"
                            >
                                ← Change Phone Number
                            </button>
                        </>
                    )}

                    {/* Footer Text (Only on Step 1) */}
                    {step === 1 && (
                        <p className="text-center text-gray-400 text-sm mt-6">
                            By continuing, you agree to our{' '}
                            <a href="#" className="text-[#FFC107] hover:underline">Terms & Conditions</a>
                        </p>
                    )}
                </div>

                {/* Already have account */}
                {step === 1 && (
                    <p className="text-center text-gray-400 mt-6 animate-fade-in-up delay-500">
                        Already have an account?{' '}
                        <button
                            onClick={() => setStep(1)}
                            className="text-[#FFC107] font-semibold hover:underline"
                        >
                            Sign In
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}
