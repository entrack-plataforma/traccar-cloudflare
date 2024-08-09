git clone --depth 1 https://github.com/jcardus/traccar-web || true
rm -rf traccar-web/.git
cp -vr capacitor.config.ts *.js src public index.html traccar-web
cp -vr src traccar-web
{
  echo "import './capacitor.js';"
  cat traccar-web/src/index.jsx
} > temp && mv temp traccar-web/src/index.jsx
cd traccar-web || exit
npm install @capacitor/core @sentry/vue
npm install -D @capacitor/assets @capacitor/cli @capacitor/ios @capacitor/android typescript
npm run build
