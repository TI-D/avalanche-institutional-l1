.PHONY: check frontend-check contracts-check fmt-check

check: frontend-check contracts-check

frontend-check:
	npm ci
	npx tsc --noEmit
	npm run lint
	npm run build

contracts-check:
	forge --version
	forge test --root contracts -vv

fmt-check:
	terraform fmt -check -recursive terraform
