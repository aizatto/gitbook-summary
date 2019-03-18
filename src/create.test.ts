/* eslint-env jest/globals */
import { detect, convert } from "./create";

const text = `
# Table of contents

* [aizatto.com](README.md)
* [Interview Guide](career-guide/README.md)
  * [Choosing A Company](career-guide/choosing-a-company.md)
  * [Job Boards](career-guide/job-boards.md)
  * [Practice](career-guide/practice.md)
  * [Interview Process](career-guide/interview-process/README.md)
    * [Questions to Ask](career-guide/interview-process/questions-to-ask.md)
    * [Coding](career-guide/interview-process/coding.md)
    * [Soft Skills](career-guide/interview-process/soft-skills.md)
    * [Rejection](career-guide/interview-process/rejection.md)
    * [Negotiation / Deciding](career-guide/interview-process/negotiation.md)
    * [Accepting, Joining](career-guide/interview-process/accepting.md)
  * [FAQ](career-guide/faq.md)
* [Engineering Code](engineering-code/README.md)
  * [Different Types of Coding](engineering-code/different-types-of-coding.md)
  * [Commit Messages](engineering-code/commit-messages.md)
  * [Reviewing Code](engineering-code/reviewing-code.md)
  * [Writing Code](engineering-code/writing-code.md)
  * [Engineering Code](engineering-code/engineering-code-1.md)
  * [Engineering Data](engineering-code/engineering-data.md)
  * [Pipelines](engineering-code/pipelines.md)
  * [Best Engineers](engineering-code/best-engineers.md)
* [Why GitBook?](why-gitbook.md)
* [Portfolio, Projects, Tools, Toys](projects-tools-toys.md)
* [Getting into Tech](getting-into-tech.md)

## Notes

* [AWS](notes/aws/README.md)
  * [Cognito](notes/aws/cognito.md)
  * [DynamoDB](notes/aws/dynamodb.md)
  * [IAM](notes/aws/iam.md)
  * [Lambda](notes/aws/lambda.md)
* [GraphQL](notes/graphql.md)
* [JavaScript](notes/javascript/README.md)
  * [Array](notes/javascript/array.md)
  * [Collections](notes/javascript/collections.md)
  * [Cons/Dislikes](notes/javascript/cons-dislikes.md)
  * [fetch](notes/javascript/fetch.md)
  * [Modules](notes/javascript/modules.md)
  * [Object](notes/javascript/object.md)
  * [Regex](notes/javascript/regex.md)
  * [Set](notes/javascript/set.md)
  * [Style Guides](notes/javascript/style-guides.md)
  * [Versions](notes/javascript/versions.md)
* [Node.js](notes/node.js/README.md)
  * [eslint](notes/node.js/eslint.md)
  * [Hapi](notes/node.js/hapi.md)
  * [Koa](notes/node.js/koa.md)
  * [TypeScript](notes/node.js/typescript.md)
* [Prototyping](notes/prototyping.md)
* [Serverless](notes/serverless.md)
* [Software Engineering](notes/software-engineering/README.md)
  * [Software Architectures](notes/software-engineering/software-architectures.md)
  * [Repository Management](notes/software-engineering/repository-management.md)
* [Success](notes/success.md)
* [Technical Due Diligence](notes/technical-due-diligence.md)
* [Web Development](notes/web-development/README.md)
  * [Progressive Web App](notes/web-development/progressive-web-app.md)
  * [React](notes/web-development/react.md)
* [Archive](notes/archive/README.md)
  * [Apple](notes/archive/apple/README.md)
    * [Apple Watch Series 4](notes/archive/apple/apple-watch.md)
    * [iPad Pro 11" 2018](notes/archive/apple/ipad-pro.md)
    * [MacBook Pro 15" 2017](notes/archive/apple/macbook-pro.md)
    * [macOS](notes/archive/apple/new-mac.md)
  * [B2B/B2C](notes/archive/b2b-b2c.md)
  * [Blockchain](notes/archive/blockchain.md)
  * [Cloud Providers](notes/archive/cloud-providers/README.md)
    * [GCP](notes/archive/cloud-providers/gcp.md)
  * [Cheap, Good, Fast](notes/archive/cheap-good-fast.md)
  * [Facebook for Developers](notes/archive/facebook-for-developers.md)
  * [git](notes/archive/git.md)
  * [Go Lang](notes/archive/go-lang.md)
  * [Property](notes/archive/property.md)
  * [UX](notes/archive/ux.md)
  * [Stripe](notes/archive/stripe.md)
  * [Venture Builder](notes/archive/venture-builder.md)
  * [xargs](notes/archive/xargs.md)
`;

test("Summarize", (): void => {
  //  console.log(detect('# Table of contents'));
  //  console.log(detect('* [AWS](notes/aws/README.md)'));
  expect(Array.from(detect("  * [Cognito](notes/aws/cognito.md)"))).toEqual([
    "  * [Cognito](notes/aws/cognito.md)",
    "  ",
    "Cognito",
    "notes/aws/cognito.md"
  ]);

  convert(text);
});
