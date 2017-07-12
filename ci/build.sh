
cd ../
# echo "début du copie"
mkdir -p output/build
cp -r src/* output/build
cd output/build

# echo "début d'installation"
npm install

# installation des packages natives
react-native upgrade

# echo "début du lancement" for android greater than 5.0.0
if [ `uname -o` == 'darwin' ]; then
    react-native run-ios
else
    mkdir -p android/app/src/main/assets
    touch android/app/src/main/assets/index.android.bundle
    react-native run-android
    cd ../ && mkdir -p app/ios app/android
    cp -R build/android/app/build/outputs/apk/ app/android 

fi


