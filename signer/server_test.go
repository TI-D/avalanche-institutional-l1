package signer

import (
	"context"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/ava-labs/avalanchego/utils/crypto/bls"
	"github.com/ava-labs/avalanchego/utils/crypto/bls/signer/rpcsigner"
)

func TestRemoteSignerSignAndPoP(t *testing.T) {
	dir := t.TempDir()
	keyPath := filepath.Join(dir, "signer.key")
	nodeDir := filepath.Join(dir, "node")
	if err := os.MkdirAll(nodeDir, 0o700); err != nil {
		t.Fatal(err)
	}

	lis, gs, err := ListenAndServe("127.0.0.1:0", keyPath)
	if err != nil {
		t.Fatal(err)
	}
	defer gs.Stop()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := rpcsigner.NewClient(ctx, lis.Addr().String())
	if err != nil {
		t.Fatal(err)
	}
	defer func() { _ = client.Shutdown() }()

	msg := []byte("northstar-local-signer-prototype")
	sig, err := client.Sign(msg)
	if err != nil {
		t.Fatal(err)
	}
	if !bls.Verify(client.PublicKey(), sig, msg) {
		t.Fatal("signature did not verify")
	}
	if bls.Verify(client.PublicKey(), sig, []byte("wrong")) {
		t.Fatal("wrong message verified")
	}

	pop, err := client.SignProofOfPossession(msg)
	if err != nil {
		t.Fatal(err)
	}
	if !bls.VerifyProofOfPossession(client.PublicKey(), pop, msg) {
		t.Fatal("proof of possession did not verify")
	}

	entries, err := os.ReadDir(nodeDir)
	if err != nil {
		t.Fatal(err)
	}
	if len(entries) != 0 {
		t.Fatalf("node dir should be empty, got %v", entries)
	}
	if _, err := os.Stat(keyPath); err != nil {
		t.Fatal("signer key should exist only in the signer dir")
	}
}
