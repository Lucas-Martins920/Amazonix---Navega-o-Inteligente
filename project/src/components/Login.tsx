import { useState } from 'react';
import { Ship } from 'lucide-react';

interface LoginProps {
  onLogin: (isGuest: boolean) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('amazonix_user', JSON.stringify({ email, isGuest: false }));
      onLogin(false);
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('amazonix_user', JSON.stringify({ email: 'guest', isGuest: true }));
    onLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-green-600 p-4 rounded-full mb-4">
              <Ship className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Amazonix</h1>
            <p className="text-gray-600 text-center">
              Navegação Segura nos Rios da Amazônia
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Entrar
            </button>
          </form>

          <div className="mt-4">
            <button
              onClick={handleGuestLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continuar como Visitante
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Protótipo para feira universitária</p>
            <p>Tecnologia sustentável para a Amazônia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
