
cd ../
mkdir -p output/build
cp -r src/* output/build
cd output/build
npm install
react-native run-android

exit -1
