#!/bin/bash

while getopts o:t:u:p: option
do
 case "${option}"
 in
    o) os=${OPTARG};;
    t) type=${OPTARG};;
    u) user=${OPTARG};;
    p) password=$OPTARG;;
 esac
done

if [ -z "$os" ] || [ -z "$type" ] || [ -z "$user" ] || [ -z "$password" ]
then
    echo 'Error: 
parameters empty or missing

    -o  system [ios | android]
    -t  type of build [marchand | client]
    -u  username for login
    -p  password 
    '
else
    exp login -u ${user} -p ${password} --non-interactive
    ../switch/switch.sh ${type}
    cd ../../src/
    exp publish
fi



# cd ../../switch
# ./switchToClient.sh
# cd ../../src/
# declare myname='nivo_dev'
# declare password='poiuytre123456'
# exp login -u $myname -p $password --non-interactive
# exp publish



exit -1   