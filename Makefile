# EXAMPLE RUN COMMAND: make basic-e2e-flow 
PROJECT ?= chromium
DEBUG ?= false

ifeq ($(DEBUG),true)
	DEBUG_FLAG=--debug
else
	DEBUG_FLAG=
endif

basic-e2e-flow-regular:
	npx playwright test tests/basic-e2e-flow-regular-hours.spec.ts --project=$(PROJECT) --headed $(DEBUG_FLAG)

basic-e2e-flow-irregular:
	npx playwright test tests/basic-e2e-flow-irregular-hours.spec.ts --project=$(PROJECT) --headed $(DEBUG_FLAG)

invalid-date-validation:
	npx playwright test tests/invalid-date-validation.spec.ts --project=$(PROJECT) --headed $(DEBUG_FLAG)

updated-answer-table:
	npx playwright test tests/updated-answer-table.spec.ts --project=$(PROJECT) --headed $(DEBUG_FLAG)

vr-basic-flow:
	npx playwright test tests/vr-basic-flow.spec.ts --project=$(PROJECT) --headed $(DEBUG_FLAG)