.env:
	touch .env
	chmod 600 .env
	@echo POSTGRES_PASSWORD=$(shell openssl rand -hex 32) >> .env
	@echo NC_AUTH_JWT_SECRET=$(shell openssl rand -hex 32) >> .env
