.PHONY: bootstrap check frontend-check contracts-check fmt-check local-up live-health lifecycle-test icm-test recovery-test signer-test network-policy-test backup-test observe-test sprint-5-8

bootstrap:
	npm ci
	@command -v forge >/dev/null || (echo "Foundry (forge) is required. https://book.getfoundry.sh/getting-started/installation" && exit 1)
	@command -v avalanche >/dev/null || echo "avalanche-cli is not installed. Needed for make local-up. See docs/stage-2-local.md"

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

local-up:
	./scripts/local/create-l1s
	./scripts/local/up

live-health:
	./scripts/local/health

lifecycle-test:
	./scripts/local/add-validator
	@echo "Remove requires NODE_ID of the validator just added."
	@test -n "$(NODE_ID)" || (echo "Usage: make lifecycle-test NODE_ID=NodeID-..." && exit 1)
	./scripts/local/remove-validator $(NODE_ID)

icm-test:
	./scripts/local/deploy-contracts
	./scripts/local/send-approval

recovery-test:
	./scripts/local/recovery-drill

signer-test:
	./scripts/local/signer-test

network-policy-test:
	./scripts/local/network-policy-test

backup-test:
	./scripts/local/backup-bao

observe-test:
	./scripts/local/observe-test

sprint-5-8:
	./scripts/local/record-sprint-5-8
