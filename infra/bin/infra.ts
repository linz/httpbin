#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { InfraStack } from "../lib/infra-stack";
import { AwsAccounts, AwsEnv, LinzAccountName } from "@linz/accounts";

const app = new cdk.App();
new InfraStack(app, "httpbin", {
  env: {
    account: AwsAccounts.byNameEnv(
      LinzAccountName.StepEnablement,
      AwsEnv.NonProduction
    ).id,
    region: "ap-southeast-2",
  },
});
