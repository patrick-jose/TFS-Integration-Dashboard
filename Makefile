# ----------------------------------------------------------------------------------------
# Make Variables
# ----------------------------------------------------------------------------------------
image_name = ${DOCKER_IMAGE_NAME}
container_name = ${DOCKER_CONTAINER_NAME}_1
app_version = ${APP_VERSION}
docker_registy=${DOCKER_REGISTRY}

# ----------------------------------------------------------------------------------------
# Make Commands
# ----------------------------------------------------------------------------------------
all: build run

build:
	npm run build
	docker build -t ${image_name}:${app_version} .

push:
	docker login https://${docker_registy}
	docker tag ${image_name}:${app_version} ${docker_registy}/${image_name}:${app_version}
	docker push ${docker_registy}/${image_name}:${app_version}

down:
	docker-compose down

up:
	docker-compose up -d

run:
	docker run --name ${container_name} \
		-p 8080:80 -d ${container_name}:${app_version}

shell:
	docker exec -it ${container_name} sh

rm:
	docker rm $(docker ps -aq)
