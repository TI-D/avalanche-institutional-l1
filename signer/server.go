package signer

import (
	"context"
	"fmt"
	"net"

	"google.golang.org/grpc"

	pb "github.com/ava-labs/avalanchego/proto/pb/signer"
	"github.com/ava-labs/avalanchego/utils/crypto/bls"
	"github.com/ava-labs/avalanchego/utils/crypto/bls/signer/localsigner"
)

// Server is a local gRPC BLS signer. It implements AvalancheGo's signer.proto.
// The private key stays in this process. It is not HSM-backed.
type Server struct {
	pb.UnimplementedSignerServer
	local bls.Signer
}

func NewServer(local bls.Signer) *Server {
	return &Server{local: local}
}

func (s *Server) PublicKey(_ context.Context, _ *pb.PublicKeyRequest) (*pb.PublicKeyResponse, error) {
	return &pb.PublicKeyResponse{
		PublicKey: bls.PublicKeyToCompressedBytes(s.local.PublicKey()),
	}, nil
}

func (s *Server) Sign(_ context.Context, req *pb.SignRequest) (*pb.SignResponse, error) {
	sig, err := s.local.Sign(req.GetMessage())
	if err != nil {
		return nil, err
	}
	return &pb.SignResponse{Signature: bls.SignatureToBytes(sig)}, nil
}

func (s *Server) SignProofOfPossession(_ context.Context, req *pb.SignProofOfPossessionRequest) (*pb.SignProofOfPossessionResponse, error) {
	sig, err := s.local.SignProofOfPossession(req.GetMessage())
	if err != nil {
		return nil, err
	}
	return &pb.SignProofOfPossessionResponse{Signature: bls.SignatureToBytes(sig)}, nil
}

func ListenAndServe(addr, keyPath string) (net.Listener, *grpc.Server, error) {
	local, err := localsigner.FromFileOrPersistNew(keyPath)
	if err != nil {
		return nil, nil, fmt.Errorf("load signer key: %w", err)
	}
	lis, err := net.Listen("tcp", addr)
	if err != nil {
		return nil, nil, err
	}
	gs := grpc.NewServer()
	pb.RegisterSignerServer(gs, NewServer(local))
	go func() { _ = gs.Serve(lis) }()
	return lis, gs, nil
}
