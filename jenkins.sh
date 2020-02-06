kubectl delete deployment --ignore-not-found=true web-client -n ci
kubectl delete service --ignore-not-found=true web-client -n ci
docker build .  -f ./Dockerfile -t "dingtoi/web-client:v1" --force-rm --rm
docker stop web_client || true
docker rm -f web_client || true
# docker run -t -d -p 30081:30081 --name web_client "dingtoi/web-client:v1" || true
kubectl apply -f K8S/web-client.yaml -n ci
# kubectl apply -f K8S/ingress-nginx/ingress-controller.yaml
# kubectl apply -f K8S/ingress-nginx/ingress-resource.yaml
# kubectl apply -f K8S/ingress-nginx/loadbalancer.yaml
docker system prune -f
docker system prune -f --volumes
curl -X POST --data-urlencode "payload={\"channel\": \"#alert\", \"username\": \"dingtoi.com\", \"text\": \"Build Client Successfully.\", \"icon_emoji\": \":shit:\"}" https://hooks.slack.com/services/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
