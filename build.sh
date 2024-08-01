git clone --depth 1 https://github.com/traccar/traccar-web || true
rm -rf traccar-web/.git
cp -v capacitor.config.ts traccar-web
cp -vr src traccar-web
{
  echo "import './capacitor.js';"
  cat traccar-web/src/index.jsx
} > temp && mv temp traccar-web/src/index.jsx
cd traccar-web || exit
npm install -D @capacitor/assets @capacitor/cli @capacitor/core @capacitor/ios typescript
npm run build
