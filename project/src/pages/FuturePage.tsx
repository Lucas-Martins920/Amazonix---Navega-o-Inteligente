import { Lightbulb, Droplets, Brain, Navigation, Users, Map, Wifi, Database, Heart } from 'lucide-react';

export default function FuturePage() {
  const features = [
    {
      icon: Droplets,
      title: 'Monitoramento do Nível dos Rios em Tempo Real',
      description: 'Sistema conectado a sensores IoT para acompanhar variações do nível da água',
      color: 'bg-blue-500',
    },
    {
      icon: Brain,
      title: 'Predição de Bancos de Areia com IA',
      description: 'Inteligência artificial para prever formação e deslocamento de bancos de areia',
      color: 'bg-purple-500',
    },
    {
      icon: Navigation,
      title: 'Rotas Inteligentes Dinâmicas',
      description: 'Navegação que se adapta às condições em tempo real e sugere melhores trajetos',
      color: 'bg-green-500',
    },
    {
      icon: Users,
      title: 'Alertas Comunitários estilo Waze',
      description: 'Navegadores compartilham informações sobre condições e riscos identificados',
      color: 'bg-orange-500',
    },
    {
      icon: Map,
      title: 'Mapas Vetoriais Offline Profissionais',
      description: 'Navegação completa sem necessidade de internet, ideal para áreas remotas',
      color: 'bg-teal-500',
    },
    {
      icon: Wifi,
      title: 'Integração com Sensores Fluviais',
      description: 'Conexão direta com rede de sensores instalados ao longo dos rios',
      color: 'bg-indigo-500',
    },
    {
      icon: Database,
      title: 'Integração com Dados Hidrológicos Oficiais',
      description: 'Sincronização automática com dados da ANA e órgãos ambientais',
      color: 'bg-cyan-500',
    },
  ];

  const impacts = [
    {
      icon: Heart,
      title: 'Apoio às Comunidades Ribeirinhas',
      description: 'Facilitar o acesso e melhorar a qualidade de vida das populações que dependem dos rios',
    },
    {
      icon: Navigation,
      title: 'Melhoria da Segurança na Navegação',
      description: 'Reduzir acidentes e encalhes através de informações precisas e atualizadas',
    },
    {
      icon: Users,
      title: 'Redução de Acidentes Fluviais',
      description: 'Alertas preventivos que salvam vidas e protegem embarcações',
    },
    {
      icon: Lightbulb,
      title: 'Transporte Sustentável',
      description: 'Otimizar rotas para economizar combustível e reduzir impacto ambiental',
    },
    {
      icon: Map,
      title: 'Incentivo ao Ecoturismo',
      description: 'Facilitar o turismo responsável e valorizar a região amazônica',
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-y-auto pb-20">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 shadow-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Lightbulb className="w-7 h-7" />
          <h2 className="text-2xl font-bold">Evolução Futura</h2>
        </div>
        <p className="text-sm text-green-100">
          Visão do que o Amazonix pode se tornar
        </p>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Funcionalidades Planejadas
          </h3>
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`${feature.color} p-2 rounded-lg flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-md p-5 border-2 border-green-200">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-800">Impacto Social</h3>
          </div>
          <p className="text-gray-700 mb-4">
            O Amazonix visa transformar a navegação fluvial na Amazônia, trazendo benefícios diretos para:
          </p>
          <div className="space-y-4">
            {impacts.map((impact, index) => {
              const Icon = impact.icon;
              return (
                <div key={index} className="flex items-start space-x-3 bg-white rounded-lg p-3">
                  <div className="bg-green-600 p-2 rounded-lg flex-shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm mb-1">{impact.title}</h4>
                    <p className="text-xs text-gray-600">{impact.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
          <h4 className="font-bold text-yellow-900 mb-2 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            Sobre Este Protótipo
          </h4>
          <p className="text-sm text-yellow-800 mb-2">
            Este é um protótipo desenvolvido para feira universitária de tecnologia, demonstrando o potencial de soluções tecnológicas sustentáveis para a região amazônica.
          </p>
          <p className="text-sm text-yellow-800">
            O objetivo é mostrar como a tecnologia pode ajudar comunidades ribeirinhas, melhorar a segurança na navegação e promover o desenvolvimento sustentável da Amazônia.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-5 text-center">
          <h3 className="font-bold text-lg mb-2">Amazonix</h3>
          <p className="text-sm text-blue-100">
            Navegação segura e sustentável para a Amazônia
          </p>
          <p className="text-xs text-blue-200 mt-3">
            Protótipo Universitário - Tecnologia para o Bem Social
          </p>
        </div>
      </div>
    </div>
  );
}
