import { CertProvider } from "@linz/cert-provider";
import {
  CodeDeployEcsServiceConstruct,
  RoutingAndHostingConstruct,
} from "@linz/ecs-codedeploy";
import * as cdk from "aws-cdk-lib";
import { LaunchType } from "aws-cdk-lib/aws-ecs";
import { ListenerCondition } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const certProvider = new CertProvider(this, "certificate", {
      certDomain: `httpbin.nonprod.enablement.awsint.linz.govt.nz`,
    });

    const routing = new RoutingAndHostingConstruct(this, "routing", {
      certificateArn: certProvider.certificateArn,
      recordName: "httpbin",
      clusterName: "httpbin",
    });

    const codedeploy = new CodeDeployEcsServiceConstruct(this, "codedeploy", {
      clusterName: "httpbin",
      loadBalancer: routing.loadBalancer,
      liveListener: routing.prodListener,
      testListener: routing.testListener,
      launchType: LaunchType.FARGATE,
      service: {
        serviceName: "httpbin",
        containerPort: 80,
        desiredCount: 1,
        githubRepo: "linz/httpbin",
        conditions: [ListenerCondition.pathPatterns(["/*"])],
      },
    });
  }
}
