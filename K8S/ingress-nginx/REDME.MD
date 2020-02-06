# NOTE
This ingress controller was supported by Kuberbetes

### Documentation:
  [https://kubernetes.github.io/ingress-nginx/](https://kubernetes.github.io/ingress-nginx/)

### Steps:
1. Apply ingress service: 
  > kubectl apply -f ingress-controller.yaml
2. Apply resource: 
  > kubectl apply -f ingress-resource.yaml
3. Apply NodePort or Loadbalancer
  > kubectl apply -f node-port.yaml
  or
  > kubectl apply -f loadbalacer.yaml

### References:
* Annotations: [https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/)
* Accessing nginx ingress controller on port 80: [https://stackoverflow.com/questions/53925931/accessing-nginx-ingress-controller-on-port-80](https://stackoverflow.com/questions/53925931/accessing-nginx-ingress-controller-on-port-80)

  
