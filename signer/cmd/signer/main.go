package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	localsigner "github.com/TI-D/avalanche-institutional-l1/signer"
)

func main() {
	addr := env("SIGNER_ADDR", "127.0.0.1:50051")
	keyPath := env("SIGNER_KEY", "")
	if keyPath == "" {
		fmt.Fprintln(os.Stderr, "SIGNER_KEY is required")
		os.Exit(1)
	}
	lis, gs, err := localsigner.ListenAndServe(addr, keyPath)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	fmt.Printf("remote BLS signer prototype listening on %s\n", lis.Addr())
	fmt.Println("not HSM-backed. private key is a local file for this process only.")
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, syscall.SIGINT, syscall.SIGTERM)
	<-ch
	gs.GracefulStop()
}

func env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
