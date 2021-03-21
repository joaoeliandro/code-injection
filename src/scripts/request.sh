curl -H "Content-Type: application/json" -X POST http://localhost:3333/exec --data '{"command": "ls -la"}' | jq
curl -H "Content-Type: application/json" -X POST http://localhost:3333/exec --data '{"command": "cd src && cd docs && ls -la"}' | jq

curl -H "Content-Type: application/json" -X POST http://localhost:3333/spawn --data '{"command": "ls -la"}' | jq