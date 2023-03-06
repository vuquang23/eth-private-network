bootnode:
	@bootnode -nodekey ./data/bootnode/boot.key -addr :30305

alice:
	@geth --datadir data/alice --port 30306 --bootnodes "enode://4f6abff31195f5082911fe88679eeffa7d3bf266f4f6dfe9195825bb6c72c0a285ba3442413c546e6284bb15689b6e98a3e6173a0ff011500edfb04f6978845a@127.0.0.1:0?discport=30305" --unlock 0x6FebeB89760c77164b8475cD6198d18efCFC1439 --password data/alice/password.txt --mine --authrpc.port 8551

bob:
	@geth --datadir data/bob --port 30307 --bootnodes "enode://4f6abff31195f5082911fe88679eeffa7d3bf266f4f6dfe9195825bb6c72c0a285ba3442413c546e6284bb15689b6e98a3e6173a0ff011500edfb04f6978845a@127.0.0.1:0?discport=30305" --authrpc.port 8552 --http --http.port 8652 --http.api admin,eth,debug --config data/bob/config.toml

reset:
	@rm -rf ./data/alice/geth
	@rm -rf ./data/bob/geth
	@geth init --datadir ./data/alice ./data/alice/genesis.json
	@geth init --datadir ./data/bob ./data/bob/genesis.json

reset-bob:
	@rm -rf ./data/bob/geth
	@geth init --datadir ./data/bob ./data/bob/genesis.json
