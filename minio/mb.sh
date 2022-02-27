#!/bin/sh
server_url=http://minio:9000

until curl -sf "$server_url/minio/health/live"
do
  echo 'waiting...'
  sleep 1
done

user=$(cat $MINIO_ROOT_USER_FILE)
pw=$(cat $MINIO_ROOT_PASSWORD_FILE)

/usr/bin/mc alias set myminio $server_url $user $pw
/usr/bin/mc mb --p "myminio/$MINIO_BUCKET"

if [ ! $? = 0 ]; then
  echo 'fail to create bucket'
  exit 1
fi

echo "create bucket ($MINIO_BUCKET)"
