import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, sendMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    setLoading(true);
    setError('');
    
    try {
      await sendMagicLink(email);
      setMagicLinkSent(true);
    } catch (err) {
      setError('Failed to send magic link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
              {error}
            </div>
          )}
          
          {magicLinkSent ? (
            <div className="text-center p-4">
              <p className="text-green-600">Magic link sent! Check your email.</p>
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleMagicLink}
                disabled={loading}
              >
                <MdEmail className="mr-2 h-4 w-4" />
                Sign in with Magic Link
              </Button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a
                  href="/signup"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}