cd traccar-web || exit
npx cap add ios
mkdir assets
cp -v ../assets/* assets
npx capacitor-assets generate
mkdir ios/App/fastlane ios/App/assets
cp -v ../fastlane/* ios/App/fastlane
