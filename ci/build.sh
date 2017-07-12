
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
if [ `uname -o` == 'Msys' ]; then
    react-native run-android
else
    react-native run-ios
fi


