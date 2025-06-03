/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'aws-sst-nextjs-14',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: {
        aws: {
          profile: 'sandbox-poweruser-set-mentimeter-dev',
        },
      },
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket('MyBucket', {
      access: 'public',
    });
    new sst.aws.Nextjs('MyWeb', {
      link: [bucket],
    });
  },
});
