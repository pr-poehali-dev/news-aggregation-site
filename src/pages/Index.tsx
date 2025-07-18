import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentLang, setCurrentLang] = useState('ru');
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const languages = {
    ru: {
      title: 'Новости мирового большинства',
      subtitle: 'Живая лента из наших Telegram-каналов',
      contacts: 'Контакты',
      channels: 'Наши каналы',
      readMore: 'Читать далее',
      autoScroll: 'Автопрокрутка включена'
    },
    en: {
      title: 'World Majority News',
      subtitle: 'Live feed from our Telegram channels',
      contacts: 'Contacts',
      channels: 'Our channels',
      readMore: 'Read more',
      autoScroll: 'Auto-scroll enabled'
    },
    fr: {
      title: 'Nouvelles de la majorité mondiale',
      subtitle: 'Flux en direct de nos chaînes Telegram',
      contacts: 'Contacts',
      channels: 'Nos chaînes',
      readMore: 'Lire la suite',
      autoScroll: 'Défilement automatique activé'
    }
  };

  const channels = [
    {
      name: 'Пушкин в Африке',
      url: 'https://t.me/AfroPouchkine',
      lang: 'ru',
      description: 'Новости из Африки и мира'
    },
    {
      name: 'По кирпичику',
      url: 'https://t.me/TGBrics',
      lang: 'ru',
      description: 'Аналитика и новости БРИКС'
    },
    {
      name: 'From Russia with Love',
      url: 'https://t.me/ChannelFRL',
      lang: 'en',
      description: 'English news and analysis'
    },
    {
      name: 'Bons Baisers',
      url: 'https://t.me/BonsBaisers',
      lang: 'fr',
      description: 'Nouvelles et analyses en français'
    }
  ];

  const mockNews = [
    {
      id: 1,
      title: 'Саммит БРИКС 2024: новые перспективы сотрудничества',
      excerpt: 'Лидеры стран БРИКС обсудили расширение торговых связей и создание альтернативных финансовых механизмов...',
      channel: 'По кирпичику',
      time: '2 часа назад',
      lang: 'ru'
    },
    {
      id: 2,
      title: 'African Union Summit Highlights Economic Growth',
      excerpt: 'The African Union summit showcased remarkable economic achievements across the continent...',
      channel: 'From Russia with Love',
      time: '3 hours ago',
      lang: 'en'
    },
    {
      id: 3,
      title: 'Développement durable en Afrique subsaharienne',
      excerpt: 'Les nouvelles initiatives de développement durable montrent des résultats prometteurs...',
      channel: 'Bons Baisers',
      time: '4 heures',
      lang: 'fr'
    },
    {
      id: 4,
      title: 'Литературное наследие: Пушкин в современном мире',
      excerpt: 'Влияние русской литературы на африканских писателей продолжает расти...',
      channel: 'Пушкин в Африке',
      time: '5 часов назад',
      lang: 'ru'
    }
  ];

  const filteredNews = mockNews.filter(news => 
    currentLang === 'ru' ? news.lang === 'ru' : news.lang !== 'ru'
  );

  const filteredChannels = channels.filter(channel => 
    currentLang === 'ru' ? channel.lang === 'ru' : channel.lang !== 'ru'
  );

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => 
        prevIndex === filteredNews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change news every 5 seconds

    return () => clearInterval(interval);
  }, [filteredNews.length]);

  const currentText = languages[currentLang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{currentText.title}</h1>
              <p className="text-slate-600 mt-1">{currentText.subtitle}</p>
            </div>
            
            {/* Language Switcher */}
            <div className="flex gap-2">
              <Button
                variant={currentLang === 'ru' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentLang('ru')}
                className="px-3"
              >
                RU
              </Button>
              <Button
                variant={currentLang === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentLang('en')}
                className="px-3"
              >
                EN
              </Button>
              <Button
                variant={currentLang === 'fr' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentLang('fr')}
                className="px-3"
              >
                FR
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Auto-scroll indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-600">{currentText.autoScroll}</span>
        </div>

        {/* Featured News - Auto-scrolling */}
        <div className="mb-12">
          <Card className="overflow-hidden shadow-lg border-0 bg-white">
            <div className="relative">
              {filteredNews.length > 0 && (
                <div className="transition-all duration-500 ease-in-out">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {filteredNews[currentNewsIndex].channel}
                      </Badge>
                      <span className="text-sm opacity-90">{filteredNews[currentNewsIndex].time}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-white">
                      {filteredNews[currentNewsIndex].title}
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      {filteredNews[currentNewsIndex].excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => window.open(filteredChannels.find(c => c.name === filteredNews[currentNewsIndex].channel)?.url, '_blank')}
                    >
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      {currentText.readMore}
                    </Button>
                  </CardContent>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredNews.map((news, index) => (
            <Card 
              key={news.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                index === currentNewsIndex ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setCurrentNewsIndex(index)}
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{news.channel}</Badge>
                  <span className="text-xs text-slate-500">{news.time}</span>
                </div>
                <CardTitle className="text-lg">{news.title}</CardTitle>
                <CardDescription>{news.excerpt}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Channels Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{currentText.channels}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredChannels.map((channel) => (
              <Card key={channel.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{channel.name}</h3>
                      <p className="text-sm text-slate-600">{channel.description}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(channel.url, '_blank')}
                    >
                      <Icon name="Send" size={16} className="mr-2" />
                      Telegram
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contacts Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{currentText.contacts}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Icon name="Globe" size={20} className="text-blue-600" />
              <span className="text-slate-700">Аккредитованное СМИ</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Users" size={20} className="text-blue-600" />
              <span className="text-slate-700">Сеть международных Telegram-каналов</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MessageCircle" size={20} className="text-blue-600" />
              <span className="text-slate-700">Связь через наши каналы в Telegram</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-300">© 2024 Новости мирового большинства</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;