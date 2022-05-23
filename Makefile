UID := $(shell id -u)
GID := $(shell id -g)
ROOT_EMAIL := root@root.com
ROOT_PASSWORD := rootadmin

terraform_fmt:
	docker run --rm -v $(PWD)/infra/terraform:/infra -w /infra --user $(UID):$(GID) --network host hashicorp/terraform:light fmt

terraform_init:
	docker run --rm -v $(PWD)/infra/terraform:/infra -w /infra --user $(UID):$(GID) --network host hashicorp/terraform:light init -upgrade

terraform_plan:
	docker run --rm -v $(PWD)/infra/terraform:/infra -w /infra --user $(UID):$(GID) --network host hashicorp/terraform:light plan -out plan

terraform_apply:
	docker run --rm -v $(PWD)/infra/terraform:/infra -w /infra --user $(UID):$(GID) --network host hashicorp/terraform:light apply -auto-approve "plan"

terraform_destroy:
	docker run --rm -v $(PWD)/infra/terraform:/infra -w /infra --user $(UID):$(GID) --network host hashicorp/terraform:light destroy -auto-approve

docker_volume_folder:
	mkdir .docker
	chown $(UID):$(GID) .docker
	mkdir .docker/crm_service_mongo
	chown $(UID):$(GID) .docker/crm_service_mongo
	mkdir .docker/minio
	chown $(UID):$(GID) .docker/minio

docker_compose_up_build: docker_volume_folder
	CURRENT_UID=$(UID):$(GID) docker-compose up --build -d

root_admin: docker_compose_up_build
	docker-compose exec crm_service npm run user:create -- email=${ROOT_EMAIL} password=${ROOT_PASSWORD} role=admin

provide_infra: root_admin
	make terraform_init
	make terraform_plan
	make terraform_apply

infra: provide_infra

up:
	CURRENT_UID=$(UID):$(GID) docker-compose up -d

stop:
	CURRENT_UID=$(UID):$(GID) docker-compose stop

destroy:
	CURRENT_UID=$(UID):$(GID) docker-compose stop
	CURRENT_UID=$(UID):$(GID) docker-compose down
	rm -rf .docker

attach_logs:
	docker-compose logs --follow