import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../components/contexts/AuthContext';
import { authAPI } from '../components/services/api';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [step, setStep] = useState('phone');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const { login } = useAuth();
    const otpRefs = useRef([]);

    useEffect(() => {
        if (step === 'otp' && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [step, timer]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');

        // Validate phone number
        if (phoneNumber.length !== 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        // Validate name
        if (!name.trim() || name.trim().length < 2) {
            setError('Please enter your name (at least 2 characters)');
            return;
        }

        setLoading(true);

        try {
            const result = await authAPI.sendOTP(phoneNumber, name.trim());

            if (result.success) {
                setStep('otp');
                setTimer(60);
                setCanResend(false);

                if (result.otp) {
                    console.log('Development OTP:', result.otp);
                    alert(`Development mode - OTP: ${result.otp}`);
                }
            } else {
                setError(result.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            setError('Please enter complete OTP');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await authAPI.verifyOTP(phoneNumber, otpCode, name.trim());

            if (result.success) {
                login(result.user, result.token);

                // Call success callback if provided
                if (onLoginSuccess) {
                    onLoginSuccess();
                } else {
                    onClose();
                }
            } else {
                setError(result.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }

        if (index === 5 && value) {
            setTimeout(() => handleVerifyOTP(), 100);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleResendOTP = () => {
        setOtp(['', '', '', '', '', '']);
        setTimer(60);
        setCanResend(false);
        handleSendOTP({ preventDefault: () => { } });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-[#1E1E1E] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-6">
                    <div className="text-4xl mb-3">🔐</div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {step === 'phone' ? 'Login to Continue' : 'Enter OTP'}
                    </h2>
                    <p className="text-sm text-gray-400">
                        {step === 'phone' ? 'Login to download notes and access features' : `OTP sent to +91 ${phoneNumber}`}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {step === 'phone' ? (
                    <form onSubmit={handleSendOTP} className="space-y-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                                maxLength={50}
                                required
                            />
                        </div>

                        {/* Phone Number Input */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                            <div className="flex gap-2">
                                <span className="px-3 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white">+91</span>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    placeholder="Enter 10-digit number"
                                    className="flex-1 px-4 py-2 bg-[#121212] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                                    maxLength={10}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || phoneNumber.length !== 10 || name.trim().length < 2}
                            className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <div>
                        <div className="flex justify-center gap-2 mb-6">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (otpRefs.current[index] = el)}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-xl font-bold bg-[#121212] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                    maxLength={1}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleVerifyOTP}
                            disabled={loading}
                            className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all disabled:opacity-50 mb-4"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                        <div className="text-center">
                            {canResend ? (
                                <button onClick={handleResendOTP} className="text-yellow-400 text-sm hover:underline">
                                    Resend OTP
                                </button>
                            ) : (
                                <p className="text-sm text-gray-400">Resend OTP in {timer}s</p>
                            )}
                        </div>
                        <button
                            onClick={() => { setStep('phone'); setOtp(['', '', '', '', '', '']); setError(''); }}
                            className="w-full mt-3 text-sm text-gray-400 hover:text-white"
                        >
                            ← Change details
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
