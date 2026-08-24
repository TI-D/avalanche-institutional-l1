export type LiveChain = {
  name: string;
  rpc: string;
  blockNumber: number | null;
  reachable: boolean;
  error: string | null;
  fetchedAt: string;
};

export type LiveSnapshot = {
  mode: "locally-executed";
  source: "evm-rpc";
  chains: LiveChain[];
  heightsAdvancing: boolean | null;
  note: string;
};

function rpcUrl(envName: string): string | null {
  const value = process.env[envName];
  return value && value.length > 0 ? value : null;
}

async function ethBlockNumber(rpc: string): Promise<{ blockNumber: number } | { error: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(rpc, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] }),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const body = (await res.json()) as { result?: string; error?: { message?: string } };
    if (body.error?.message) return { error: body.error.message };
    if (!body.result) return { error: "missing result" };
    return { blockNumber: Number.parseInt(body.result, 16) };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "rpc failed" };
  } finally {
    clearTimeout(timer);
  }
}

export async function readLiveSnapshot(): Promise<LiveSnapshot | null> {
  const northstar = rpcUrl("NORTHSTAR_RPC");
  const settlement = rpcUrl("SETTLEMENT_RPC");
  if (!northstar && !settlement) return null;

  const fetchedAt = new Date().toISOString();
  const targets = [
    { name: "northstar", rpc: northstar },
    { name: "settlement", rpc: settlement },
  ].filter((row): row is { name: string; rpc: string } => Boolean(row.rpc));

  const chains: LiveChain[] = await Promise.all(
    targets.map(async (row) => {
      const result = await ethBlockNumber(row.rpc);
      if ("error" in result) {
        return {
          name: row.name,
          rpc: row.rpc,
          blockNumber: null,
          reachable: false,
          error: result.error,
          fetchedAt,
        };
      }
      return {
        name: row.name,
        rpc: row.rpc,
        blockNumber: result.blockNumber,
        reachable: true,
        error: null,
        fetchedAt,
      };
    })
  );

  return {
    mode: "locally-executed",
    source: "evm-rpc",
    chains,
    heightsAdvancing: null,
    note: "Height advancing is proven by two samples in evidence/runs, not by this single request.",
  };
}
