image=todolist-server:latest
user=saber2pr

docker build --build-arg NODE_ENV=production -t $image -f Dockerfile.prod .

docker tag $image $user/$image
docker push $user/$image