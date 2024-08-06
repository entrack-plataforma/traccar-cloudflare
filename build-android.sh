cd traccar-web || exit
npx cap add android
mkdir assets
cp -v ../assets/* assets
npx capacitor-assets generate
mkdir android/fastlane
cp -v ../fastlane/* android/fastlane
