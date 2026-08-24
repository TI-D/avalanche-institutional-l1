# Evidence

Machine-verifiable artifacts from a real run. This directory is empty of runs until `make local-up` succeeds.

```text
evidence/runs/<utc-timestamp>/
  manifest.json
  versions.txt
  git-commit.txt
  genesis-hashes.txt
  node-identities.json
  transactions.json
  block-heights.csv
  test-results/
  logs/
```

`manifest.json` must include git commit, tool versions, genesis hash, NodeIDs, timestamps, test results, and sha256 of every file in that run.

A missing run is not a failure. Claiming a missing run as Passed is.
