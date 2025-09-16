import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, ChevronRight } from "lucide-react";

const WalletConnect = () => {
  return (
    <Card className="p-6 bg-mystery-card border-mystery-border hover:border-neon-purple transition-all duration-300">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-mystery-gradient flex items-center justify-center">
          <Wallet className="w-8 h-8 text-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-glow-purple">Connect Your Wallet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Connect your wallet to start minting confidential NFTs
          </p>
        </div>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button 
                        variant="wallet" 
                        size="lg" 
                        onClick={openConnectModal}
                        className="w-full"
                      >
                        Connect Wallet
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <Button 
                        variant="destructive" 
                        size="lg" 
                        onClick={openChainModal}
                        className="w-full"
                      >
                        Wrong network
                      </Button>
                    );
                  }

                  return (
                    <div className="flex items-center justify-between w-full">
                      <Button
                        variant="outline"
                        onClick={openChainModal}
                        className="flex items-center gap-2"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: 'hidden',
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={openAccountModal}
                        className="flex items-center gap-2"
                      >
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </Card>
  );
};

export default WalletConnect;