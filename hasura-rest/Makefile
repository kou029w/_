.env:
	touch .env
	chmod 600 .env
	echo POSTGRES_PASSWORD=$(shell openssl rand -hex 32) >> .env
	echo HASURA_GRAPHQL_ADMIN_SECRET=$(shell openssl rand -hex 32) >> .env
	echo HASURA_GRAPHQL_JWT_SECRET='{"type":"HS256","key":"$(shell openssl rand -hex 32)"}' >> .env
	echo JWT_SECRET=$(shell openssl rand -hex 32) >> .env
