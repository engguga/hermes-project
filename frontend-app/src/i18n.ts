import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "title": "HERMES",
      "subtitle": "Swift Path Engine",
      "placeholder": "Paste your long link here...",
      "button": "Shorten Path",
      "processing": "Processing...",
      "copy": "Copy",
      "copied": "Copied!",
      "stats_title": "Live Insights",
      "stats_clicks": "Clicks",
      "error_title": "Path Lost",
      "error_desc": "Hermes traveled the skies but couldn't find the requested destination.",
      "error_button": "Back to Olympus",
      "footer": "Powered by Gustavo Viana"
    }
  },
  pt: {
    translation: {
      "title": "HERMES",
      "subtitle": "Motor de Caminhos Velozes",
      "placeholder": "Cole seu link longo aqui...",
      "button": "Encurtar Caminho",
      "processing": "Processando...",
      "copy": "Copiar",
      "copied": "Copiado!",
      "stats_title": "Insights em Tempo Real",
      "stats_clicks": "Cliques",
      "error_title": "Caminho Perdido",
      "error_desc": "Hermes percorreu os céus, mas não encontrou o destino solicitado.",
      "error_button": "Voltar ao Olimpo",
      "footer": "Desenvolvido por Gustavo Viana"
    }
  },
  es: {
    translation: {
      "title": "HERMES",
      "subtitle": "Motor de Caminos Veloces",
      "placeholder": "Pega tu enlace largo aquí...",
      "button": "Acortar Camino",
      "processing": "Procesando...",
      "copy": "Copiar",
      "copied": "¡Copiado!",
      "stats_title": "Estadísticas en Vivo",
      "stats_clicks": "Clics",
      "error_title": "Camino Perdido",
      "error_desc": "Hermes recorrió los cielos, pero no encontró el destino solicitado.",
      "error_button": "Volver al Olimpo",
      "footer": "Desarrollado por Gustavo Viana"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
