cd ../../switch
./switchToClient.sh
cd ../../src/
declare myname='nivo_dev'
declare password='poiuytre123456'
exp login -u $myname -p $password --non-interactive
exp publish



exit -1   