package main

import (
	"encoding/pem"
	"fmt"
	"os"

	"github.com/ava-labs/avalanchego/ids"
	"github.com/ava-labs/avalanchego/staking"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "usage: nodeidfromcert <staker.crt>")
		os.Exit(2)
	}
	raw, err := os.ReadFile(os.Args[1])
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	block, _ := pem.Decode(raw)
	if block == nil {
		fmt.Fprintln(os.Stderr, "not a PEM certificate")
		os.Exit(1)
	}
	cert, err := staking.ParseCertificate(block.Bytes)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	fmt.Println(ids.NodeIDFromCert(cert))
}
