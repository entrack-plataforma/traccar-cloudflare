cd traccar-web || exit
npx cap add ios
npx capacitor-assets generate
mkdir -p ios/App/fastlane
cp ../fastlane/* ios/App/fastlane

